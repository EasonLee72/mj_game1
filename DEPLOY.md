# 📖 開發版本部署設定指南

## 方法 1：GitHub Actions（自動部署）

### 步驟 1：啟用 GitHub Actions

1. 前往 GitHub Repo: https://github.com/EasonLee72/mj_game1
2. 點擊 **Settings** → **Actions** → **General**
3. 確保 **Allow all actions and reusable workflows** 已啟用

### 步驟 2：設定 GitHub Pages

1. **Settings** → **Pages**
2. **Source**: GitHub Actions
3. 點擊 **Save**

### 步驟 3：推送 workflow 檔案

```bash
cd ~/.openclaw/workspace/github-mj_game1
git checkout develop
git push origin develop
```

### 步驟 4：等待部署

GitHub Actions 會自動執行，約 1-2 分鐘後：
- **開發版 URL**: `https://easonlee72.github.io/mj_game1/dev/`

---

## 方法 2：手動部署 gh-pages 分支（簡單！）

### 執行部署腳本：

```bash
cd ~/.openclaw/workspace/github-mj_game1

# 1. 創建 gh-pages 分支
git checkout --orphan gh-pages
git reset --hard

# 2. 複製檔案
cp index.html .
cp firebase-storage.js .
cp -r tiles/ .

# 3. 創建 dev 資料夾（開發版）
mkdir dev
git checkout develop -- index.html firebase-storage.js
cp index.html dev/
cp firebase-storage.js dev/
cp -r tiles/ dev/

# 4. 提交
git add .
git commit -m "🚀 Deploy v1.0.0 + dev"
git push origin gh-pages --force

# 5. 切回 develop
git checkout develop
```

### 設定 GitHub Pages:

1. **Settings** → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: gh-pages → `/ (root)`
4. 點擊 **Save**

### 完成後 URL:

- **正式版**: `https://easonlee72.github.io/mj_game1/`
- **開發版**: `https://easonlee72.github.io/mj_game1/dev/`

---

## 方法 3：使用 Netlify（最簡單！）

1. 前往 https://netlify.com
2. 登入 GitHub
3. 選擇 `mj_game1` Repo
4. **Base directory**: (空白)
5. **Publish directory**: `.`
6. 點擊 **Deploy**

然後在 Netlify 設定：
- **main 分支** → 正式版
- **develop 分支** → Deploy Preview（自動生成測試 URL）

---

**推薦使用方法 2（手動部署）**，最快最簡單！
