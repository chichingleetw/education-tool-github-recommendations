---
name: VoxPen Desktop 語墨桌面版
authorName: soanseng
authorGitHub: soanseng
repo: soanseng/voxpen-desktop
homepage: https://voxpen.app/
launchUrl:
tags:
  - education
  - teaching
  - github
  - speech-to-text
  - transcription
  - desktop-app
  - accessibility
educationLevels:
  - 不限領域
language: Rust
license: MIT
submittedAt: "2026-07-11"
---

# VoxPen Desktop 語墨桌面版

## 簡短描述

系統匣語音轉文字桌面工具，可用全域快捷鍵聽寫並把轉錄與修飾後的文字自動貼到目前游標位置。

## 教育工作者摘要

VoxPen Desktop 是一個 Windows 與 Linux 桌面語音轉文字工具，支援全域快捷鍵、按住聽寫或切換錄音、OpenAI/Groq Whisper/自訂 endpoint 的 STT 服務、LLM 文字修飾、翻譯模式與可搜尋轉錄歷史。它適合教師備課、回饋撰寫、課堂觀察筆記、會議紀錄草稿或學生以口述方式整理想法；BYOK 模式讓使用者自行提供 API key，但也需要事先確認語音資料、API 供應商與校內資安規範。

## 教學用途

- 教師用語音快速撰寫課後回饋、教案筆記或學習單初稿
- 學生以口述方式整理反思、構思作文、記錄專題討論重點
- 在輔助科技或無障礙情境中，降低長時間打字負擔並支援跨應用輸入

## 導入注意

- 語音會送往使用者設定的 STT 或 LLM 服務，導入前需確認同意、隱私與資料保存規範
- 自動修飾可能改變原意，正式交付前仍需人工檢查內容與語氣
- 桌面版目前主要支援 Windows 與 Linux；Linux Wayland 自動貼上可能需要額外系統權限與 ydotool 設定

## 啟動或安裝方式

可從 GitHub Releases 下載 Windows 安裝檔或 Linux AppImage/deb/native binary。若要從原始碼建置，需準備 Node.js LTS、pnpm、Rust stable 與 Tauri 相關系統相依套件，執行 pnpm install 後可用 cargo tauri dev 進行開發或 cargo tauri build 建置正式版本。
