# VTCC - Virtual Team Command Center

## 虛擬團隊指揮中心

<div align="center">

**多智能體決策引擎 v3.6**  
*Multi-Agent Decision Engine for Software Development*

[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[🚀 線上演示](#) | [📖 使用指南](#使用指南) | [🌐 English](#english-version)

</div>

---

## 📋 專案簡介 | Introduction

VTCC（Virtual Team Command Center）是一個創新的 **多智能體決策引擎**，透過模擬 12 位虛擬團隊成員的交互，幫助開發者做出更全面的軟體決策或代碼審查。

**核心功能：**

- 🔨 **Builder 模式**：創建新功能、設計架構、撰寫文案
- 🛡️ **Auditor 模式**：代碼審查、資安健檢、架構漏洞分析
- 📊 **SRE 監控標準**：自動生成監控儀表板 Schema
- ☕ **白話文報告**：將技術決策轉換為非技術人員可讀的商業報告
- 🌏 **雙語支援**：繁體中文 / English

---

## 🚀 快速開始 | Quick Start

### 環境需求

- Node.js >= 18.0
- npm >= 9.0

### 安裝步驟

```bash
# 1. 克隆專案
git clone https://github.com/lalawgwg99/ai_vtcc.git
cd ai_vtcc

# 2. 安裝依賴
npm install

# 3. 啟動開發伺服器
npm run dev

# 4. 在瀏覽器中開啟
# http://localhost:5173
```

### 生產建置

```bash
# 建置生產版本
npm run build

# 預覽生產版本
npm run preview
```

---

## 📖 使用指南 | User Guide

### **步驟 1：定義任務**

在左側「定義任務 (Mission)」欄位輸入您的需求，例如：

- "優化登入驗證邏輯"
- "審查此 GitHub 專案的資安風險"

### **步驟 2：調整參數**

使用「提案模擬 (Pre-Simulation)」調整：

- **風險值 (Risk Level)**：0-1，影響團隊反應
- **提案標籤 (Tags)**：選擇相關屬性（穩定性、效能、UX 等）

### **步驟 3：啟用進階功能（選用）**

- ✅ **SRE 監控標準**：生成 KPIs 與警報條件
- ✅ **白話文結案報告**：自動產生商業價值說明

### **步驟 4：生成與複製**

點擊右下角 **「複製指令 (Copy Prompt)」**，貼到您的 AI 助手（ChatGPT / Gemini）中。

### **步驟 5：分析**

在 AI 對話中，上傳您的代碼檔案或專案資料夾，讓虛擬團隊進行分析。

---

## 🏗️ 技術架構 | Tech Stack

- **Frontend Framework**: React 18.2
- **Build Tool**: Vite 5.0
- **CSS Framework**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Deployment**: Cloudflare Pages / Vercel / Netlify

---

## 🌐 部署到 Cloudflare Pages

### 方法 1：通過 Git 自動部署（推薦）

1. **推送代碼到 GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/lalawgwg99/ai_vtcc.git
   git push -u origin main
   ```

2. **連接 Cloudflare Pages**
   - 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 前往 **Pages** → **Create a project**
   - 選擇 **Connect to Git** → 授權 GitHub 存取
   - 選擇 `ai_vtcc` 儲存庫

3. **設定建置配置**
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Framework preset**: Vite
   - 點擊 **Save and Deploy**

4. **完成！**
   - 大約 1-2 分鐘後，您的網站將部署到類似 `https://ai-vtcc.pages.dev` 的網址

### 方法 2：手動部署

```bash
# 建置
npm run build

# 使用 Wrangler CLI
npx wrangler pages deploy dist
```

---

## 📂 專案結構 | Project Structure

```
ai_vtcc/
├── src/
│   ├── App.jsx          # 主應用元件（多智能體引擎）
│   ├── main.jsx         # React 入口點
│   └── index.css        # Tailwind CSS 與自訂樣式
├── public/              # 靜態資源
├── index.html           # HTML 入口
├── vite.config.js       # Vite 配置
├── tailwind.config.js   # Tailwind 配置
├── package.json         # 專案依賴
└── README.md            # 本文件
```

---

## 🤝 貢獻指南 | Contributing

歡迎提交 Issue 或 Pull Request！

1. Fork 本專案
2. 創建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

---

## 📄 授權 | License

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案

---

## 🙏 致謝 | Acknowledgments

- 靈感來源：軟體工程中的多角色決策模型
- UI 設計：受 Hacker Terminal 美學啟發
- 圖示庫：[Lucide Icons](https://lucide.dev/)

---

<div align="center">

**Built with ❤️ by VTCC Team**

[⬆ 回到頂部](#vtcc---virtual-team-command-center)

</div>

---

## English Version

### About VTCC

VTCC (Virtual Team Command Center) is an innovative **Multi-Agent Decision Engine** that simulates 12 virtual team members to help developers make comprehensive software decisions and code reviews.

### Features

- 🔨 **Builder Mode**: Create new features, design architecture
- 🛡️ **Auditor Mode**: Code review, security audit
- 📊 **SRE Monitoring**: Auto-generate monitoring dashboard schemas
- ☕ **Plain Language Reports**: Convert technical decisions into business-friendly reports
- 🌏 **Bilingual**: Traditional Chinese / English

### Quick Setup

```bash
npm install
npm run dev
```

### Deploy to Cloudflare Pages

1. Push to GitHub
2. Connect repository at [Cloudflare Pages](https://pages.cloudflare.com/)
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy! 🚀

---

**For detailed Chinese documentation, see above ↑**
