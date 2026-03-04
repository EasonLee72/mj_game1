// 雲端儲存模組 - 使用 JSONBin.io 免費服務

class CloudStorage {
    constructor() {
        // JSONBin.io 的免費 Bin ID
        this.binId = '65e4a8b2ad19ca3f5605f5c1';
        this.apiKey = '$2a$10$7X8ZqY5Y5Z5Z5Z5Z5Z5Z5e'; // 這是示例，需要替換
        this.apiBase = 'https://api.jsonbin.io/v3/b';
    }
    
    // 從雲端讀取排行榜
    async fetchLeaderboard() {
        try {
            const response = await fetch(`${this.apiBase}/${this.binId}/latest`, {
                method: 'GET',
                headers: {
                    'X-Master-Key': this.apiKey
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const data = await response.json();
            return data.record.leaderboard || [];
        } catch (error) {
            console.error('讀取排行榜失敗:', error);
            return this.getLocalLeaderboard();
        }
    }
    
    // 儲存排行榜到雲端
    async saveLeaderboard(leaderboard) {
        try {
            const response = await fetch(`${this.apiBase}/${this.binId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': this.apiKey
                },
                body: JSON.stringify({ leaderboard })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            return true;
        } catch (error) {
            console.error('儲存排行榜失敗:', error);
            return this.saveLocalLeaderboard(leaderboard);
        }
    }
    
    // 本地備援
    getLocalLeaderboard() {
        try {
            return JSON.parse(localStorage.getItem('mj_leaderboard') || '[]');
        } catch (e) {
            return [];
        }
    }
    
    saveLocalLeaderboard(leaderboard) {
        try {
            localStorage.setItem('mj_leaderboard', JSON.stringify(leaderboard));
            return true;
        } catch (e) {
            return false;
        }
    }
    
    // 冠軍照片（太大，只存本地）
    getChampionPhoto() {
        return localStorage.getItem('mj_champion_photo');
    }
    
    saveChampionPhoto(photoDataUrl) {
        try {
            localStorage.setItem('mj_champion_photo', photoDataUrl);
            return true;
        } catch (e) {
            console.error('儲存照片失敗:', e);
            return false;
        }
    }
}

// 創建全局實例
const cloudStorage = new CloudStorage();
