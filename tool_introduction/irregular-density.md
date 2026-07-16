---
name: 密度偵探社｜不規則物體密度測量
authorName: educatres
authorGitHub: educatres
repo: educatres/irregular-density
homepage:
launchUrl: https://educatres.github.io/irregular-density/
tags:
  - education
  - teaching
  - github
  - science
  - chemistry
  - physics
  - density
  - simulation
educationLevels:
  - 中小學
language: JavaScript
license: MIT
submittedAt: "2026-07-17"
---

# 密度偵探社｜不規則物體密度測量

## 簡短描述

國中理化互動教材，讓學生用電子天平、量筒與排水法測量不規則物體的質量、體積與密度。

## 教育工作者摘要

密度偵探社是一套可部署到 GitHub Pages 的純前端互動教材，主題聚焦在不規則物體的密度測量。學生在瀏覽器中依序選擇待測物、將電子天平歸零並讀取質量，再操作 100 mL 量筒以排水法測量體積，最後用質量除以體積計算密度並判斷材料。教材包含視線高低造成讀值差異、氣泡誤差、即時提示、扣分回饋、五個漸進式材料鑑定關卡、課後反思題與實驗紀錄 JSON 下載，也提供教師設定，可開關提示、自動填值、氣泡與挑戰模式，適合用來把「體積等於放入後水量減原始水量」「密度可用於材料判斷」等概念轉成可操作的探究活動。

## 教學用途

- 在國中自然科或理化課中示範不規則物體無法直接用長寬高求體積時，如何使用排水法測量
- 讓學生練習電子天平歸零、量筒讀值、體積差計算與密度公式，並依密度參考值推測材料
- 透過氣泡誤差、視差模擬與挑戰模式，引導學生討論實驗誤差、測量步驟與資料判讀

## 導入注意

- 本教材中的物體、質量、體積與密度值是教學用關卡資料，教師可依課程需求補充真實實驗數據或實物操作
- 學生可能把量筒視線、氣泡或單位換算忽略，建議搭配學習單要求寫出計算過程與誤差來源
- 若要新增全新材料或關卡，除了修改 levels.json，也需同步確認材料下拉選單與課堂說明是否一致

## 啟動或安裝方式

可直接開啟 GitHub Pages 線上版本使用。若要本機測試，因關卡資料透過 fetch() 讀取，請在專案資料夾執行 python3 -m http.server 8000 或使用 VS Code Live Server，再開啟 http://localhost:8000。
