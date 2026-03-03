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

// 筒子牌圓圈
function generateTongCircles(num) {
    const circleSize = 10;
    const spacing = 14;
    
    const patterns = {
        1: `<circle cx="0" cy="0" r="${circleSize}" fill="url(#redCircle)" stroke="#c03030" stroke-width="1"/>`,
        
        2: `
            <circle cx="0" cy="-${spacing/2}" r="${circleSize * 0.85}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.8"/>
            <circle cx="0" cy="${spacing/2}" r="${circleSize * 0.85}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.8"/>
        `,
        
        3: `
            <circle cx="-${spacing/3}" cy="-${spacing/3}" r="${circleSize * 0.75}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.7"/>
            <circle cx="${spacing/3}" cy="-${spacing/3}" r="${circleSize * 0.75}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.7"/>
            <circle cx="0" cy="${spacing/2}" r="${circleSize * 0.75}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.7"/>
        `,
        
        4: `
            <circle cx="-${spacing/3}" cy="-${spacing/3}" r="${circleSize * 0.75}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.7"/>
            <circle cx="${spacing/3}" cy="-${spacing/3}" r="${circleSize * 0.75}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.7"/>
            <circle cx="-${spacing/3}" cy="${spacing/3}" r="${circleSize * 0.75}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.7"/>
            <circle cx="${spacing/3}" cy="${spacing/3}" r="${circleSize * 0.75}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.7"/>
        `,
        
        5: `
            <circle cx="-${spacing/2.5}" cy="-${spacing/2.5}" r="${circleSize * 0.65}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.6"/>
            <circle cx="${spacing/2.5}" cy="-${spacing/2.5}" r="${circleSize * 0.65}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.6"/>
            <circle cx="0" cy="0" r="${circleSize * 0.8}" fill="url(#redCircle)" stroke="#c03030" stroke-width="0.8"/>
            <circle cx="-${spacing/2.5}" cy="${spacing/2.5}" r="${circleSize * 0.65}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.6"/>
            <circle cx="${spacing/2.5}" cy="${spacing/2.5}" r="${circleSize * 0.65}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.6"/>
        `,
        
        6: `
            <circle cx="-${spacing/3}" cy="-${spacing/2}" r="${circleSize * 0.65}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.6"/>
            <circle cx="${spacing/3}" cy="-${spacing/2}" r="${circleSize * 0.65}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.6"/>
            <circle cx="-${spacing/3}" cy="0" r="${circleSize * 0.65}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.6"/>
            <circle cx="${spacing/3}" cy="0" r="${circleSize * 0.65}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.6"/>
            <circle cx="-${spacing/3}" cy="${spacing/2}" r="${circleSize * 0.65}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.6"/>
            <circle cx="${spacing/3}" cy="${spacing/2}" r="${circleSize * 0.65}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.6"/>
        `,
        
        7: `
            <circle cx="-${spacing/3}" cy="-${spacing/2}" r="${circleSize * 0.6}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.5"/>
            <circle cx="${spacing/3}" cy="-${spacing/2}" r="${circleSize * 0.6}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.5"/>
            <circle cx="-${spacing/3}" cy="0" r="${circleSize * 0.6}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.5"/>
            <circle cx="${spacing/3}" cy="0" r="${circleSize * 0.6}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.5"/>
            <circle cx="-${spacing/3}" cy="${spacing/2}" r="${circleSize * 0.6}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.5"/>
            <circle cx="0" cy="0" r="${circleSize * 0.75}" fill="url(#redCircle)" stroke="#c03030" stroke-width="0.7"/>
            <circle cx="${spacing/3}" cy="${spacing/2}" r="${circleSize * 0.6}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.5"/>
        `,
        
        8: `
            <circle cx="-${spacing/3}" cy="-${spacing/2.5}" r="${circleSize * 0.55}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.5"/>
            <circle cx="${spacing/3}" cy="-${spacing/2.5}" r="${circleSize * 0.55}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.5"/>
            <circle cx="-${spacing/3}" cy="-${spacing/6}" r="${circleSize * 0.55}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.5"/>
            <circle cx="${spacing/3}" cy="-${spacing/6}" r="${circleSize * 0.55}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.5"/>
            <circle cx="-${spacing/3}" cy="${spacing/6}" r="${circleSize * 0.55}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.5"/>
            <circle cx="${spacing/3}" cy="${spacing/6}" r="${circleSize * 0.55}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.5"/>
            <circle cx="-${spacing/3}" cy="${spacing/2.5}" r="${circleSize * 0.55}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.5"/>
            <circle cx="${spacing/3}" cy="${spacing/2.5}" r="${circleSize * 0.55}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.5"/>
        `,
        
        9: `
            <circle cx="-${spacing/2}" cy="-${spacing/2}" r="${circleSize * 0.5}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.45"/>
            <circle cx="0" cy="-${spacing/2}" r="${circleSize * 0.5}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.45"/>
            <circle cx="${spacing/2}" cy="-${spacing/2}" r="${circleSize * 0.5}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.45"/>
            <circle cx="-${spacing/2}" cy="0" r="${circleSize * 0.5}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.45"/>
            <circle cx="0" cy="0" r="${circleSize * 0.7}" fill="url(#redCircle)" stroke="#c03030" stroke-width="0.65"/>
            <circle cx="${spacing/2}" cy="0" r="${circleSize * 0.5}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.45"/>
            <circle cx="-${spacing/2}" cy="${spacing/2}" r="${circleSize * 0.5}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.45"/>
            <circle cx="0" cy="${spacing/2}" r="${circleSize * 0.5}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.45"/>
            <circle cx="${spacing/2}" cy="${spacing/2}" r="${circleSize * 0.5}" fill="url(#blueCircle)" stroke="#1850a0" stroke-width="0.45"/>
        `
    };
    
    return `
        <defs>
            <radialGradient id="redCircle" cx="35%" cy="35%">
                <stop offset="0%" style="stop-color:#ff8888"/>
                <stop offset="100%" style="stop-color:#e04040"/>
            </radialGradient>
            <radialGradient id="blueCircle" cx="35%" cy="35%">
                <stop offset="0%" style="stop-color:#66a8ff"/>
                <stop offset="100%" style="stop-color:#2060c0"/>
            </radialGradient>
        </defs>
        ${patterns[num]}
    `;
}

// 萬子牌文字
function generateWanText(num) {
    const wanChars = ['一','二','三','四','五','六','七','八','九'];
    return `
        <text x="0" y="5" font-size="16" font-weight="bold" fill="#c41e3a" text-anchor="middle" writing-mode="tb" font-family="Arial, sans-serif">${wanChars[num-1]}</text>
        <text x="0" y="25" font-size="16" font-weight="bold" fill="#c41e3a" text-anchor="middle" writing-mode="tb" font-family="Arial, sans-serif">萬</text>
    `;
}

// 條子牌
function generateTiaoText(num) {
    if (num === 1) {
        // 一條是小鳥
        return `
            <text x="0" y="8" font-size="32" text-anchor="middle" font-family="Arial, sans-serif">🐦</text>
        `;
    } else {
        const tiaoChars = ['','一','二','三','四','五','六','七','八','九'];
        return `
            <text x="0" y="5" font-size="16" font-weight="bold" fill="#2d7a4f" text-anchor="middle" writing-mode="tb" font-family="Arial, sans-serif">${tiaoChars[num]}</text>
            <text x="0" y="25" font-size="16" font-weight="bold" fill="#2d7a4f" text-anchor="middle" writing-mode="tb" font-family="Arial, sans-serif">條</text>
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
