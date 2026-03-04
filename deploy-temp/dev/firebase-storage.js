// Firebase 雲端儲存模組

// Firebase 設定
const firebaseConfig = {
  apiKey: "Bx7YihIpOc6vjdP5eLQFbAblO0GTokLd13vWEGVU",
  authDomain: "mjgame1-db.firebaseapp.com",
  databaseURL: "https://mjgame1-db-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mjgame1-db",
  storageBucket: "mjgame1-db.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Firebase 類別
class FirebaseStorage {
  constructor() {
    this.dbUrl = firebaseConfig.databaseURL;
    this.initialized = false;
  }
  
  // 初始化
  async init() {
    if (this.initialized) return true;
    
    try {
      // 測試連線
      const testUrl = `${this.dbUrl}/.json?shallow=true`;
      const response = await fetch(testUrl);
      this.initialized = true;
      console.log('✅ Firebase 已連接');
      return true;
    } catch (error) {
      console.error('❌ Firebase 連接失敗:', error);
      return false;
    }
  }
  
  // 讀取排行榜
  async fetchLeaderboard() {
    try {
      await this.init();
      const url = `${this.dbUrl}/leaderboard.json?t=${Date.now()}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data) {
        return [];
      }
      
      // 轉換物件為陣列
      const leaderboard = Object.values(data);
      console.log('✅ 從 Firebase 載入排行榜:', leaderboard.length, '筆資料');
      return leaderboard;
    } catch (error) {
      console.error('讀取排行榜失敗:', error);
      return this.getLocalLeaderboard();
    }
  }
  
  // 儲存排行榜
  async saveLeaderboard(leaderboard) {
    try {
      await this.init();
      const url = `${this.dbUrl}/leaderboard.json`;
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(leaderboard)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      console.log('✅ 排行榜已儲存到 Firebase');
      
      // 同時儲存到本地作為備份
      this.saveLocalLeaderboard(leaderboard);
      
      return true;
    } catch (error) {
      console.error('儲存排行榜失敗:', error);
      return this.saveLocalLeaderboard(leaderboard);
    }
  }
  
  // 讀取冠軍照片
  async fetchChampionPhoto() {
    try {
      await this.init();
      const url = `${this.dbUrl}/championPhoto.json?t=${Date.now()}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        return null;
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('讀取冠軍照片失敗:', error);
      return this.getLocalChampionPhoto();
    }
  }
  
  // 儲存冠軍照片
  async saveChampionPhoto(photoDataUrl) {
    try {
      await this.init();
      const url = `${this.dbUrl}/championPhoto.json`;
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(photoDataUrl)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      console.log('✅ 冠軍照片已儲存到 Firebase');
      
      // 同時儲存到本地作為備份
      this.saveLocalChampionPhoto(photoDataUrl);
      
      return true;
    } catch (error) {
      console.error('儲存冠軍照片失敗:', error);
      return this.saveLocalChampionPhoto(photoDataUrl);
    }
  }
  
  // 本地備援方法
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
  
  getLocalChampionPhoto() {
    return localStorage.getItem('mj_champion_photo');
  }
  
  saveLocalChampionPhoto(photoDataUrl) {
    try {
      localStorage.setItem('mj_champion_photo', photoDataUrl);
      return true;
    } catch (e) {
      return false;
    }
  }
}

// 創建全域實例
const firebaseStorage = new FirebaseStorage();
