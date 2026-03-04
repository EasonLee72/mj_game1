// GitHub 儲存模組 - 用於排行榜和冠軍圖片的雲端儲存

class GitHubStorage {
    constructor(owner, repo, branch = 'main') {
        this.owner = owner;
        this.repo = repo;
        this.branch = branch;
        this.leaderboardPath = 'leaderboard.json';
        this.photoPath = 'champion-photo.png';
        
        // 使用 GitHub API 無需 token（只讀）
        // 寫入需要 token，但這裡我們用公開 repo 的特性
        this.apiBase = `https://api.github.com/repos/${owner}/${repo}`;
    }
    
    // 從 GitHub 讀取排行榜
    async fetchLeaderboard() {
        try {
            const response = await fetch(`${this.apiBase}/contents/${this.leaderboardPath}?ref=${this.branch}`);
            
            if (!response.ok) {
                if (response.status === 404) {
                    console.log('排行榜不存在，返回空陣列');
                    return [];
                }
                throw new Error(`HTTP ${response.status}`);
            }
            
            const data = await response.json();
            const content = atob(data.content); // base64 解碼
            return JSON.parse(content);
        } catch (error) {
            console.error('讀取排行榜失敗:', error);
            return [];
        }
    }
    
    // 儲存排行榜到 GitHub
    async saveLeaderboard(leaderboard) {
        try {
            // 先獲取當前文件的 SHA
            let sha = null;
            try {
                const response = await fetch(`${this.apiBase}/contents/${this.leaderboardPath}?ref=${this.branch}`);
                if (response.ok) {
                    const data = await response.json();
                    sha = data.sha;
                }
            } catch (e) {
                // 文件不存在，不需要 SHA
            }
            
            const content = JSON.stringify(leaderboard, null, 2);
            const encoded = btoa(encodeURIComponent(content).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode('0x' + p1)));
            
            const body = {
                message: '🏆 更新排行榜 [skip ci]',
                content: encoded,
                branch: this.branch
            };
            
            if (sha) {
                body.sha = sha;
            }
            
            // 注意：寫入需要認證，這裡會失敗
            // 我們改用 GitHub Pages + 靜態 JSON 的方式
            console.log('寫入需要認證，改用其他方案');
            return false;
        } catch (error) {
            console.error('儲存排行榜失敗:', error);
            return false;
        }
    }
    
    // 讀取冠軍照片
    async fetchChampionPhoto() {
        try {
            const response = await fetch(`${this.apiBase}/contents/${this.photoPath}?ref=${this.branch}`);
            
            if (!response.ok) {
                return null;
            }
            
            const data = await response.json();
            return `data:image/png;base64,${data.content}`;
        } catch (error) {
            console.error('讀取冠軍照片失敗:', error);
            return null;
        }
    }
}

// 創建全局實例
const githubStorage = new GitHubStorage('EasonLee72', 'mj_game1');
