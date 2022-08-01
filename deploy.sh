#!/bin/bash
if [ $# -ne 1 ]; then
  exit 1
fi
# 前のビルドのデータを削除
rm build/*.js
rm build/*.js.LICENSE.txt
# ビルド
yarn build
# ハッシュ値を控えておく
VERSION=`git rev-parse --short HEAD`
cd build
# ハッシュ値を書き換え
sed -i -e s/HASH_PLACEHOLDER/$1@$VERSION/ *.js
# バージョン:日付を加えてDeploy
git add -u
git add *.js *.js.LICENSE.txt
git commit -m $1@`date +%Y-%m-%d`
git push origin master
