#!/usr/bin/env node
// 更新排行榜到 GitHub 的腳本
// 使用方式：node update-leaderboard.js '[{"name":"測試","score":100}]'

const https = require('https');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const OWNER = 'EasonLee72';
const REPO = 'mj_game1';
const BRANCH = 'main';

async function updateLeaderboard(leaderboard) {
    const content = JSON.stringify(leaderboard, null, 2);
    const encoded = Buffer.from(content).toString('base64');
    
    // 獲取當前 SHA
    const sha = await getFileSHA('leaderboard.json');
    
    const data = {
        message: '🏆 更新排行榜 [skip ci]',
        content: encoded,
        branch: BRANCH
    };
    
    if (sha) {
        data.sha = sha;
    }
    
    return makeRequest('/contents/leaderboard.json', 'PUT', data);
}

async function getFileSHA(path) {
    try {
        const result = await makeRequest(`/contents/${path}?ref=${BRANCH}`, 'GET');
        return result.sha;
    } catch (e) {
        return null;
    }
}

function makeRequest(path, method, body) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.github.com',
            path: `/repos/${OWNER}${REPO}${path}`,
            method: method,
            headers: {
                'User-Agent': 'mj-game-leaderboard',
                'Accept': 'application/vnd.github.v3+json'
            }
        };
        
        if (GITHUB_TOKEN) {
            options.headers['Authorization'] = `token ${GITHUB_TOKEN}`;
        }
        
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(JSON.parse(data));
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${data}`));
                }
            });
        });
        
        req.on('error', reject);
        
        if (body) {
            req.write(JSON.stringify(body));
        }
        
        req.end();
    });
}

// 主程式
if (process.argv[2]) {
    const leaderboard = JSON.parse(process.argv[2]);
    updateLeaderboard(leaderboard)
        .then(() => console.log('✅ 排行榜已更新'))
        .catch(err => console.error('❌ 更新失敗:', err.message));
}

module.exports = { updateLeaderboard };
