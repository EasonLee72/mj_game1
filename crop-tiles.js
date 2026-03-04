const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function cropTiles() {
    const inputPath = path.join(__dirname, 'mahjong-reference.jpg');
    const tilesDir = path.join(__dirname, 'tiles');
    
    if (!fs.existsSync(inputPath)) {
        console.error('❌ 找不到輸入圖片');
        return;
    }
    
    if (!fs.existsSync(tilesDir)) {
        fs.mkdirSync(tilesDir, { recursive: true });
    }
    
    const suitNames = ['m', 'p', 's'];
    const suitNamesChinese = ['萬', '筒', '條'];
    const rows = 3;
    const cols = 9;
    
    const metadata = await sharp(inputPath).metadata();
    const width = metadata.width;
    const height = metadata.height;
    
    console.log('圖片尺寸:', width, 'x', height);
    
    const tileW = width / cols;
    const tileH = height / rows;
    
    console.log('每張牌尺寸:', tileW.toFixed(2), 'x', tileH.toFixed(2));
    
    let count = 0;
    
    // 每張牌都重新載入圖片
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const num = col + 1;
            const suit = suitNames[row];
            
            const left = Math.floor(col * tileW);
            const top = Math.floor(row * tileH);
            const tW = Math.floor((col + 1) * tileW) - left;
            const tH = Math.floor((row + 1) * tileH) - top;
            
            const pad = 2;
            const extLeft = left + pad;
            const extTop = top + pad;
            const extW = tW - (pad * 2);
            const extH = tH - (pad * 2);
            
            if (extW <= 0 || extH <= 0 || extLeft + extW > width || extTop + extH > height) {
                console.log(`⚠️  跳過 ${suit}${num}`);
                continue;
            }
            
            const outputPath = path.join(tilesDir, `${suit}${num}.png`);
            
            try {
                // 每次都重新載入圖片
                await sharp(inputPath)
                    .extract({ left: extLeft, top: extTop, width: extW, height: extH })
                    .resize(120, 168)
                    .png()
                    .toFile(outputPath);
                
                console.log(`✅ ${suit}${num}.png (${suitNamesChinese[row]}${num})`);
                count++;
            } catch (err) {
                console.log(`⚠️  ${suit}${num} 失敗：${err.message}`);
            }
        }
    }
    
    console.log(`\n🎉 完成！共生成 ${count}/27 張牌`);
}

cropTiles();
