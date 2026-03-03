// 生成麻將牌 SVG 圖片
const fs = require('fs');
const path = require('path');

const tilesDir = path.join(__dirname, 'tiles');
if (!fs.existsSync(tilesDir)) {
    fs.mkdirSync(tilesDir, { recursive: true });
}

// 麻將牌寬高
const TILE_WIDTH = 60;
const TILE_HEIGHT = 84;
const TILE_RADIUS = 5;

// 生成 SVG 麻將牌
function generateTileSVG(suit, num, content) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${TILE_WIDTH}" height="${TILE_HEIGHT}" viewBox="0 0 ${TILE_WIDTH} ${TILE_HEIGHT}">
  <defs>
    <linearGradient id="tileBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#fefefe;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f5f0e6;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- 牌面背景 -->
  <rect x="1" y="1" width="${TILE_WIDTH - 2}" height="${TILE_HEIGHT - 2}" rx="${TILE_RADIUS}" fill="url(#tileBg)" stroke="#d4c4a8" stroke-width="1.5"/>
  
  <!-- 內邊框 -->
  <rect x="4" y="4" width="${TILE_WIDTH - 8}" height="${TILE_HEIGHT - 8}" rx="${TILE_RADIUS - 2}" fill="none" stroke="#c9b896" stroke-width="0.5" opacity="0.5"/>
  
  <!-- 牌面內容 -->
  <g transform="translate(${TILE_WIDTH / 2}, ${TILE_HEIGHT / 2})">
    ${content}
  </g>
</svg>`;
}

// 筒子牌圓圈 - 按照參考圖：1-2 筒紅點，3-9 筒藍點
function generateTongCircles(num) {
    const patterns = {
        // 1 筒：一個大紅點居中
        1: `<circle cx="0" cy="0" r="12" fill="#e63946" stroke="#c1121f" stroke-width="1.5"/>`,
        
        // 2 筒：兩個紅點直排
        2: `
            <circle cx="0" cy="-12" r="9" fill="#e63946" stroke="#c1121f" stroke-width="1"/>
            <circle cx="0" cy="12" r="9" fill="#e63946" stroke="#c1121f" stroke-width="1"/>
        `,
        
        // 3 筒：上面兩個藍點，下面一個藍點
        3: `
            <circle cx="-10" cy="-10" r="7" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.8"/>
            <circle cx="10" cy="-10" r="7" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.8"/>
            <circle cx="0" cy="12" r="7" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.8"/>
        `,
        
        // 4 筒：2x2 藍點
        4: `
            <circle cx="-9" cy="-9" r="7" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.8"/>
            <circle cx="9" cy="-9" r="7" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.8"/>
            <circle cx="-9" cy="9" r="7" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.8"/>
            <circle cx="9" cy="9" r="7" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.8"/>
        `,
        
        // 5 筒：四角藍點 + 中間紅點
        5: `
            <circle cx="-11" cy="-11" r="6" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.7"/>
            <circle cx="11" cy="-11" r="6" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.7"/>
            <circle cx="0" cy="0" r="8" fill="#e63946" stroke="#c1121f" stroke-width="0.8"/>
            <circle cx="-11" cy="11" r="6" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.7"/>
            <circle cx="11" cy="11" r="6" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.7"/>
        `,
        
        // 6 筒：2x3 藍點
        6: `
            <circle cx="-8" cy="-14" r="6" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.7"/>
            <circle cx="8" cy="-14" r="6" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.7"/>
            <circle cx="-8" cy="0" r="6" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.7"/>
            <circle cx="8" cy="0" r="6" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.7"/>
            <circle cx="-8" cy="14" r="6" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.7"/>
            <circle cx="8" cy="14" r="6" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.7"/>
        `,
        
        // 7 筒：六個藍點 + 中間紅點
        7: `
            <circle cx="-8" cy="-14" r="5.5" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.6"/>
            <circle cx="8" cy="-14" r="5.5" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.6"/>
            <circle cx="-8" cy="0" r="5.5" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.6"/>
            <circle cx="8" cy="0" r="5.5" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.6"/>
            <circle cx="-8" cy="14" r="5.5" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.6"/>
            <circle cx="0" cy="0" r="7" fill="#e63946" stroke="#c1121f" stroke-width="0.7"/>
            <circle cx="8" cy="14" r="5.5" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.6"/>
        `,
        
        // 8 筒：2x4 藍點
        8: `
            <circle cx="-8" cy="-16" r="5" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.6"/>
            <circle cx="8" cy="-16" r="5" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.6"/>
            <circle cx="-8" cy="-5" r="5" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.6"/>
            <circle cx="8" cy="-5" r="5" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.6"/>
            <circle cx="-8" cy="5" r="5" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.6"/>
            <circle cx="8" cy="5" r="5" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.6"/>
            <circle cx="-8" cy="16" r="5" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.6"/>
            <circle cx="8" cy="16" r="5" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.6"/>
        `,
        
        // 9 筒：九宮格（八藍 + 一中紅）
        9: `
            <circle cx="-11" cy="-11" r="4.5" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.5"/>
            <circle cx="0" cy="-11" r="4.5" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.5"/>
            <circle cx="11" cy="-11" r="4.5" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.5"/>
            <circle cx="-11" cy="0" r="4.5" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.5"/>
            <circle cx="0" cy="0" r="6" fill="#e63946" stroke="#c1121f" stroke-width="0.6"/>
            <circle cx="11" cy="0" r="4.5" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.5"/>
            <circle cx="-11" cy="11" r="4.5" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.5"/>
            <circle cx="0" cy="11" r="4.5" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.5"/>
            <circle cx="11" cy="11" r="4.5" fill="#1d3557" stroke="#0d1b2a" stroke-width="0.5"/>
        `
    };
    
    return patterns[num] || '';
}

// 萬子牌文字
function generateWanText(num) {
    const wanChars = ['一','二','三','四','五','六','七','八','九'];
    return `
        <text x="0" y="-5" font-size="18" font-weight="bold" fill="#c41e3a" text-anchor="middle" writing-mode="tb" font-family="Microsoft JhengHei, Arial, sans-serif">${wanChars[num-1]}</text>
        <text x="0" y="20" font-size="18" font-weight="bold" fill="#c41e3a" text-anchor="middle" writing-mode="tb" font-family="Microsoft JhengHei, Arial, sans-serif">萬</text>
    `;
}

// 條子牌 - 橫排中文數字 + 條
function generateTiaoText(num) {
    if (num === 1) {
        // 一條是小鳥
        return `
            <text x="0" y="8" font-size="32" text-anchor="middle" font-family="Arial, sans-serif">🐦</text>
        `;
    } else {
        const tiaoChars = ['','一','二','三','四','五','六','七','八','九'];
        return `
            <text x="0" y="8" font-size="20" font-weight="bold" fill="#2d5a3d" text-anchor="middle" font-family="Microsoft JhengHei, Arial, sans-serif">${tiaoChars[num]}條</text>
        `;
    }
}

// 生成所有筒子牌
for (let num = 1; num <= 9; num++) {
    const content = generateTongCircles(num);
    const svg = generateTileSVG('tong', num, content);
    fs.writeFileSync(path.join(tilesDir, `p${num}.svg`), svg);
    console.log(`Generated p${num}.svg`);
}

// 生成所有萬子牌
for (let num = 1; num <= 9; num++) {
    const content = generateWanText(num);
    const svg = generateTileSVG('wan', num, content);
    fs.writeFileSync(path.join(tilesDir, `m${num}.svg`), svg);
    console.log(`Generated m${num}.svg`);
}

// 生成所有條子牌
for (let num = 1; num <= 9; num++) {
    const content = generateTiaoText(num);
    const svg = generateTileSVG('tiao', num, content);
    fs.writeFileSync(path.join(tilesDir, `s${num}.svg`), svg);
    console.log(`Generated s${num}.svg`);
}

console.log('\n✅ All tiles generated successfully!');
