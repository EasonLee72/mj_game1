#!/bin/bash
# 開發版本部署腳本

echo "🚀 開始部署開發版本..."

cd ~/.openclaw/workspace/github-mj_game1

# 保存當前分支
CURRENT_BRANCH=$(git branch --show-current)

# 切換到 develop
git checkout develop

# 創建臨時部署資料夾
rm -rf deploy-temp
mkdir -p deploy-temp/dev

# 複製 develop 分支的檔案到 dev 資料夾
cp index.html deploy-temp/
cp firebase-storage.js deploy-temp/
cp -r tiles deploy-temp/
cp README.md deploy-temp/ 2>/dev/null || true

# 複製到 dev 資料夾
cp index.html deploy-temp/dev/
cp firebase-storage.js deploy-temp/dev/
cp -r tiles deploy-temp/dev/

# 切換到 gh-pages 分支
git checkout gh-pages 2>/dev/null || git checkout --orphan gh-pages

# 複製部署檔案
cp deploy-temp/* .
cp -r deploy-temp/dev .

# 提交
git add .
git commit -m "🚀 Deploy develop version $(date '+%Y-%m-%d %H:%M')"

# 推送
git push origin gh-pages --force

# 清理
rm -rf deploy-temp

# 切回原分支
git checkout $CURRENT_BRANCH

echo ""
echo "✅ 部署完成！"
echo ""
echo "📱 測試 URL:"
echo "   正式版：https://easonlee72.github.io/mj_game1/"
echo "   開發版：https://easonlee72.github.io/mj_game1/dev/"
echo ""
