---
name: 地形探險隊-歐洲
authorName: educatres
authorGitHub: educatres
repo: educatres/terrain-explorer-europe
homepage: https://educatres.github.io/terrain-explorer-europe/
launchUrl: https://educatres.github.io/terrain-explorer-europe/
tags:
  - education
  - teaching
  - github
  - geography
  - earth-science
  - ecology
  - interactive-map
  - leaflet
educationLevels:
  - 中小學
  - 高中
language: JavaScript
license: NOASSERTION
submittedAt: "2026-07-19"
---

# 地形探險隊-歐洲

## 簡短描述

歐洲互動式地理教材，可在衛星底圖上探索歐洲地形、國家公園、代表性動植物與資料來源。

## 教育工作者摘要

地形探險隊-歐洲是一套可部署到 GitHub Pages 的互動式地理教材。學生可在以歐洲為中心的 Esri World Imagery 衛星底圖上縮放、拖曳與點選標註，探索山脈、河流、湖泊、特殊地形、國家公園、代表性動物與特色植物。教材使用 Leaflet 地圖與歐洲山脈、河流、湖區的 GeoJSON 教學概略圖層，提供景點搜尋、歐洲導覽、觀察任務與隨機測驗。資訊卡會呈現地理成因、生態特徵、物種學名、棲地、保育現況、官方或主要來源、Google Maps 探索、YouTube 公開搜尋連結，以及 Wikimedia Commons 免費授權實景照片的作者、授權與原始來源。它適合用於地理、自然科學與環境教育課程，讓學生比較阿爾卑斯山脈、斯堪地那維亞山脈、歐洲主要河流、湖泊、冰河地形與不同棲地生態。

## 教學用途

- 在地理或自然科課程中帶學生辨識歐洲主要山脈、河流、湖泊、特殊地形與國家公園的位置關係
- 讓學生比較阿爾卑斯、斯堪地那維亞等山地與歐洲河流、湖泊、冰河地形及代表物種棲地
- 搭配歐洲導覽、觀察任務與隨機測驗，引導學生從衛星影像、照片、地圖標註與資料來源提出地理觀察

## 導入注意

- 線面圖層與物種點位是課堂辨識用概略資料，不可用於導航、工程、土地界線、物種調查、災害判定或科學研究
- 衛星底圖、Wikimedia Commons 照片、官方資料、UNESCO、IUCN、歐洲環境署與 Kew 等來源各有授權條件，公開使用前應逐項確認
- 歐洲地形與國界、語言及歷史區域常交錯，建議教師搭配政治地圖或課本圖表，協助學生區分自然地理與行政邊界

## 啟動或安裝方式

可直接開啟 GitHub Pages 線上版本使用。若要本機測試，因網站會透過 fetch() 載入 JSON 與 GeoJSON 資料，請在專案資料夾執行 python3 -m http.server 8000，再開啟 http://localhost:8000。
