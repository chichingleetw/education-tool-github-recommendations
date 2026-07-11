---
name: ScholarSkill
authorName: EESJGong
authorGitHub: EESJGong
repo: EESJGong/scholar-skill
homepage:
launchUrl:
tags:
  - education
  - teaching
  - github
  - research
  - obsidian
  - knowledge-management
educationLevels:
  - 研究
language: Python
license: MIT
submittedAt: "2026-07-11"
---

# ScholarSkill

## 簡短描述

以 Obsidian 為核心的學術閱讀工作流，協助研究者把論文閱讀轉成可連結、可修訂、會持續演化的知識系統。

## 教育工作者摘要

ScholarSkill 是一個 OpenClaw skill，設計目標不是只產生一次性的論文摘要，而是協助代理人進行結構化閱讀、知識連結、舊理解修訂與批判性反思，並把成果沉澱到 Obsidian vault。它適合研究方法、文獻回顧、研究生讀書會或個人知識管理教學，讓學生練習把新論文放回既有研究脈絡，辨識概念關係、證據強弱與需要更新的舊筆記。

## 教學用途

- 引導研究生把論文閱讀產出整理成可重讀、可連結的 Obsidian 筆記
- 在文獻回顧課程中練習比較論文主張、證據、方法限制與研究脈絡
- 協助研究團隊建立會隨新文獻更新的知識地圖，而不只是累積摘要檔案

## 導入注意

- 專案仍在測試階段，正式導入課程或研究流程前應先以小型文獻集合試用
- 若連接 Obsidian vault，需先確認資料夾路徑、模板語言包與既有筆記備份
- AI 產出的閱讀筆記與知識連結仍需研究者查證，避免把錯誤摘要擴散到知識庫

## 啟動或安裝方式

可 clone repository 後在 OpenClaw 中安裝，並選擇 en 或 zh-CN 語言包，再執行對應的 configure.py 並指定 Obsidian vault path。README 也提供共享 skills 目錄與特定 workspace 兩種安裝方式，手動安裝時需依需求補齊 obsidian、arxiv、pdf、research hub 等相依 skill。
