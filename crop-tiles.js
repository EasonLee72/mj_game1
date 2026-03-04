const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function cropTiles() {
    // 輸入圖片路徑
    const inputPath = path.join(__dirname, 'mahjong-reference.jpg');
    const tilesDir = path.join(__dirname, 'tiles');
    
    if (!fs.existsSync(inputPath)) {
        console.error('❌ 找不到輸入圖片：' + inputPath);
        console.log('請將截圖保存為 mahjong-reference.jpg');
        return;
    }
    
    if (!fs.existsSync(tilesDir)) {
        fs.mkdirSync(tilesDir, { recursive: true });
    }
    
    try {
        // 讀取圖片
        const image = sharp(inputPath);
        const metadata = await image.metadata();
        console.log('圖片尺寸:', metadata.width, 'x', metadata.height);
        
        // 假設圖片是 3 列 x 9 行的排列
        const rows = 3;
        const cols = 9;
        
        // 計算每張牌的尺寸（扣除邊距）
        const tileWidth = Math.floor(metadata.width / cols);
        const tileHeight = Math.floor(metadata.height / rows);
        
        console.log('每張牌尺寸:', tileWidth, 'x', tileHeight);
        
        // 三列分別是：筒子、萬子、條子
        const suitNames = ['p', 'm', 's']; // p=筒，m=萬，s=條
        
        // 裁剪每一張牌
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const num = col + 1;
                const suit = suitNames[row];
                
                const left = col * tileWidth;
                const top = row * tileHeight;
                
                const outputPath = path.join(tilesDir, `${suit}${num}.png`);
                
                await image
                    .extract({
                        left: left + 5,  // 稍微內縮，去掉邊框
                        top: top + 5,
                        width: tileWidth - 10,
                        height: tileHeight - 10
                    })
                    .resize(120, 168)  // 統一尺寸
                    .png()
                    .toFile(outputPath);
                
                console.log(`✅ 已生成：${suit}${num}.png`);
            }
        }
        
        console.log('\n🎉 所有麻將牌圖片已生成完成！');
        
    } catch (error) {
        console.error('❌ 處理失敗:', error.message);
    }
}

cropTiles();
