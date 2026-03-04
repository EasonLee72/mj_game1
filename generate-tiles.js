// 生成麻將牌 SVG 圖片
const fs = require('fs');
const path = require('path');

const tilesDir = path.join(__dirname, 'tiles');
if (!fs.existsSync(tilesDir)) {
    fs.mkdirSync(tilesDir, { recursive: true });
}

// 麻將牌寬高 - 高解析度
const TILE_WIDTH = 120;
const TILE_HEIGHT = 168;
const TILE_RADIUS = 10;

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

// 筒子牌圓圈 - 按照參考圖：1-2 筒紅點，3-9 筒藍點（高解析度）
function generateTongCircles(num) {
    const patterns = {
        // 1 筒：一個大紅點居中
        1: `<circle cx="0" cy="0" r="20" fill="#e63946" stroke="#c1121f" stroke-width="2.5"/>`,
        
        // 2 筒：兩個紅點直排
        2: `
            <circle cx="0" cy="-24" r="16" fill="#e63946" stroke="#c1121f" stroke-width="2"/>
            <circle cx="0" cy="24" r="16" fill="#e63946" stroke="#c1121f" stroke-width="2"/>
        `,
        
        // 3 筒：上面兩個藍點，下面一個藍點
        3: `
            <circle cx="-20" cy="-20" r="14" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.5"/>
            <circle cx="20" cy="-20" r="14" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.5"/>
            <circle cx="0" cy="24" r="14" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.5"/>
        `,
        
        // 4 筒：2x2 藍點
        4: `
            <circle cx="-18" cy="-18" r="14" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.5"/>
            <circle cx="18" cy="-18" r="14" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.5"/>
            <circle cx="-18" cy="18" r="14" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.5"/>
            <circle cx="18" cy="18" r="14" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.5"/>
        `,
        
        // 5 筒：四角藍點 + 中間紅點
        5: `
            <circle cx="-22" cy="-22" r="12" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.3"/>
            <circle cx="22" cy="-22" r="12" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.3"/>
            <circle cx="0" cy="0" r="15" fill="#e63946" stroke="#c1121f" stroke-width="1.5"/>
            <circle cx="-22" cy="22" r="12" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.3"/>
            <circle cx="22" cy="22" r="12" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.3"/>
        `,
        
        // 6 筒：2x3 藍點
        6: `
            <circle cx="-16" cy="-28" r="12" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.3"/>
            <circle cx="16" cy="-28" r="12" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.3"/>
            <circle cx="-16" cy="0" r="12" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.3"/>
            <circle cx="16" cy="0" r="12" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.3"/>
            <circle cx="-16" cy="28" r="12" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.3"/>
            <circle cx="16" cy="28" r="12" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.3"/>
        `,
        
        // 7 筒：六個藍點 + 中間紅點
        7: `
            <circle cx="-16" cy="-28" r="11" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.2"/>
            <circle cx="16" cy="-28" r="11" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.2"/>
            <circle cx="-16" cy="0" r="11" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.2"/>
            <circle cx="16" cy="0" r="11" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.2"/>
            <circle cx="-16" cy="28" r="11" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.2"/>
            <circle cx="0" cy="0" r="13" fill="#e63946" stroke="#c1121f" stroke-width="1.3"/>
            <circle cx="16" cy="28" r="11" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.2"/>
        `,
        
        // 8 筒：2x4 藍點
        8: `
            <circle cx="-16" cy="-32" r="10" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.1"/>
            <circle cx="16" cy="-32" r="10" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.1"/>
            <circle cx="-16" cy="-10" r="10" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.1"/>
            <circle cx="16" cy="-10" r="10" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.1"/>
            <circle cx="-16" cy="10" r="10" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.1"/>
            <circle cx="16" cy="10" r="10" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.1"/>
            <circle cx="-16" cy="32" r="10" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.1"/>
            <circle cx="16" cy="32" r="10" fill="#1d3557" stroke="#0d1b2a" stroke-width="1.1"/>
        `,
        
        // 9 筒：九宮格（八藍 + 一中紅）
        9: `
            <circle cx="-22" cy="-22" r="9" fill="#1d3557" stroke="#0d1b2a" stroke-width="1"/>
            <circle cx="0" cy="-22" r="9" fill="#1d3557" stroke="#0d1b2a" stroke-width="1"/>
            <circle cx="22" cy="-22" r="9" fill="#1d3557" stroke="#0d1b2a" stroke-width="1"/>
            <circle cx="-22" cy="0" r="9" fill="#1d3557" stroke="#0d1b2a" stroke-width="1"/>
            <circle cx="0" cy="0" r="12" fill="#e63946" stroke="#c1121f" stroke-width="1.2"/>
            <circle cx="22" cy="0" r="9" fill="#1d3557" stroke="#0d1b2a" stroke-width="1"/>
            <circle cx="-22" cy="22" r="9" fill="#1d3557" stroke="#0d1b2a" stroke-width="1"/>
            <circle cx="0" cy="22" r="9" fill="#1d3557" stroke="#0d1b2a" stroke-width="1"/>
            <circle cx="22" cy="22" r="9" fill="#1d3557" stroke="#0d1b2a" stroke-width="1"/>
        `
    };
    
    return patterns[num] || '';
}

// 萬子牌文字
function generateWanText(num) {
    const wanChars = ['一','二','三','四','五','六','七','八','九'];
    return `
        <text x="0" y="-10" font-size="36" font-weight="bold" fill="#c41e3a" text-anchor="middle" writing-mode="tb" font-family="Microsoft JhengHei, Arial, sans-serif">${wanChars[num-1]}</text>
        <text x="0" y="40" font-size="36" font-weight="bold" fill="#c41e3a" text-anchor="middle" writing-mode="tb" font-family="Microsoft JhengHei, Arial, sans-serif">萬</text>
    `;
}

// 條子牌 - 按照參考圖用竹節圖案
function generateTiaoText(num) {
    // 竹節的基本樣式 - 綠色竹節
    const bamboo = (x, y, red = false) => {
        const color = red ? '#e63946' : '#2d5a3d';
        const stroke = red ? '#c1121f' : '#1a3d2a';
        return `<g transform="translate(${x},${y})">
            <ellipse cx="0" cy="-10" rx="5" ry="12" fill="${color}" stroke="${stroke}" stroke-width="1.2"/>
            <ellipse cx="0" cy="0" rx="5" ry="12" fill="${color}" stroke="${stroke}" stroke-width="1.2"/>
            <ellipse cx="0" cy="10" rx="5" ry="12" fill="${color}" stroke="${stroke}" stroke-width="1.2"/>
        </g>`;
    };
    
    const patterns = {
        // 一條：小鳥
        1: `<g transform="scale(0.035)"><path d="M150,350 C100,300 50,250 30,200 C10,150 20,100 50,60 C80,20 130,0 180,10 C230,20 270,70 280,130 C290,190 260,250 210,280 C190,290 170,310 160,340 C150,370 170,400 200,400 L150,350 Z" fill="#e63946" stroke="#c1121f" stroke-width="4"/><circle cx="180" cy="120" r="12" fill="white"/><circle cx="185" cy="115" r="4" fill="black"/><path d="M230,150 L280,130 L230,170 Z" fill="#e63946"/><path d="M140,320 L110,370 L160,350 Z" fill="#e63946"/><path d="M180,320 L210,370 L160,350 Z" fill="#e63946"/></g>`,
        
        // 二條：兩個竹節直排
        2: `${bamboo(0, -20)}${bamboo(0, 20)}`,
        
        // 三條：上面兩個，下面一個居中
        3: `${bamboo(-18, -18)}${bamboo(18, -18)}${bamboo(0, 25)}`,
        
        // 四條：2x2 排列
        4: `${bamboo(-16, -20)}${bamboo(16, -20)}${bamboo(-16, 20)}${bamboo(16, 20)}`,
        
        // 五條：四角竹節 + 中間紅竹節
        5: `${bamboo(-18, -20)}${bamboo(18, -20)}${bamboo(0, 0, true)}${bamboo(-18, 20)}${bamboo(18, 20)}`,
        
        // 六條：2x3 排列
        6: `${bamboo(-16, -28)}${bamboo(16, -28)}${bamboo(-16, 0)}${bamboo(16, 0)}${bamboo(-16, 28)}${bamboo(16, 28)}`,
        
        // 七條：六個竹節 + 中間紅竹節
        7: `${bamboo(-16, -28)}${bamboo(16, -28)}${bamboo(-16, 0)}${bamboo(16, 0, true)}${bamboo(-16, 28)}${bamboo(16, 28)}`,
        
        // 八條：2x4 排列
        8: `${bamboo(-16, -36)}${bamboo(16, -36)}${bamboo(-16, -12)}${bamboo(16, -12)}${bamboo(-16, 12)}${bamboo(16, 12)}${bamboo(-16, 36)}${bamboo(16, 36)}`,
        
        // 九條：三列，中間有紅竹節
        9: `${bamboo(-20, -28)}${bamboo(0, -28)}${bamboo(20, -28)}${bamboo(-20, 0)}${bamboo(0, 0, true)}${bamboo(20, 0)}${bamboo(-20, 28)}${bamboo(0, 28)}${bamboo(20, 28)}`
    };
    
    return patterns[num] || '';
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
