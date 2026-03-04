# 🀄 台灣麻將聽牌挑戰 - 排行榜同步說明

## 雲端排行榜設定

### 目前狀態
- ✅ **讀取**：自動從 GitHub 讀取 `leaderboard.json`
- ⚠️ **寫入**：需要手動更新到 GitHub

### 自動同步設定（推薦）

#### 方法 1：使用 GitHub Actions（自動）

1. 在 GitHub Repository 建立 `.github/workflows/sync-leaderboard.yml`
2. 設定定時同步或 webhook 觸發

#### 方法 2：手動更新（簡單）

每次有玩家上傳成績後，執行：

```bash
# 1. 複製本地的 leaderboard.json
cp ~/.openclaw/workspace/github-mj_game1/leaderboard.json .

# 2. 提交到 GitHub
git add leaderboard.json
git commit -m "🏆 更新排行榜"
git push origin main
```

### 技術說明

**讀取流程：**
1. 遊戲啟動時從 `leaderboard.json` 讀取
2. 載入到 localStorage
3. 顯示在排行榜

**寫入流程：**
1. 玩家上傳成績 → 儲存到 localStorage
2. 管理員手動 commit 到 GitHub
3. 其他玩家下次啟動時自動同步

### 未來改進

- [ ] 整合 Firebase 即時資料庫
- [ ] 使用 GitHub API 自動寫入
- [ ] 建立後端伺服器

---

**当前版本：** v1.0 (localStorage + GitHub 讀取)
