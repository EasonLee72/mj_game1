// GitHub API 儲存模組

const GitHubAPI = {
    owner: 'EasonLee72',
    repo: 'mj_game1',
    branch: 'main',
    
    // 讀取排行榜
    async fetchLeaderboard() {
        try {
            const url = `https://raw.githubusercontent.com/${this.owner}/${this.repo}/${this.branch}/leaderboard.json?t=${Date.now()}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                return [];
            }
            
            return await response.json();
        } catch (error) {
            console.error('讀取排行榜失敗:', error);
            return this.getLocalLeaderboard();
        }
    },
    
    // 儲存排行榜（需要寫入權限）
    async saveLeaderboard(leaderboard) {
        // 寫入需要 GitHub Token 和 API 調用
        // 這裡我們用一個技巧：創建一個 GitHub Issue 或者用其他服務
        
        // 簡單方案：保存到本地，並提示用戶
        console.log('寫入到 GitHub 需要後端支援');
        return this.saveLocalLeaderboard(leaderboard);
    },
    
    // 本地備援
    getLocalLeaderboard() {
        try {
            return JSON.parse(localStorage.getItem('mj_leaderboard') || '[]');
        } catch (e) {
            return [];
        }
    },
    
    saveLocalLeaderboard(leaderboard) {
        try {
            localStorage.setItem('mj_leaderboard', JSON.stringify(leaderboard));
            return true;
        } catch (e) {
            return false;
        }
    },
    
    // 冠軍照片
    getChampionPhoto() {
        return localStorage.getItem('mj_champion_photo');
    },
    
    saveChampionPhoto(photoDataUrl) {
        try {
            localStorage.setItem('mj_champion_photo', photoDataUrl);
            return true;
        } catch (e) {
            return false;
        }
    }
};
