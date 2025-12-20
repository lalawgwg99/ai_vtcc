# 🛡️ VTCC - Virtual Team Command Center

<div align="center">

# VTCC: AI 虛擬團隊指揮中心 (v5.0)  
>
> **「不只是寫程式，我們為您解決任何領域的複雜決策。」**  
*Stop Prompting Alone. Command a Workforce.*

[![Live Demo](https://img.shields.io/badge/Demo-Online-success.svg)](#)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[🚀 線上使用](#) | [📖 使用指南](#-使用指南--user-guide) | [🌐 English](#-english-version)

</div>

---

## 💡 這是什麼？ | What is VTCC?

VTCC 不是另一個 ChatGPT 封裝工具，它是您的 **全領域決策指揮中心 (Universal Command Center)**。

不論是寫程式、商業投資、法律諮詢還是生活規劃，VTCC 透過模擬 **7-12 位虛擬專家的對抗式辯論**，幫您找出單一 AI 容易忽略的盲點。

### 🎯 誰需要這個工具？

- **一人開發者**：身兼數職容易有盲點？讓虛擬資安專家與 SRE 幫您把關
- **接案公司 PM**：需要快速產出專業的「技術評估報告」或「白話文結案報告」給客戶
- **初中階工程師**：不知道如何寫出結構完整的 Prompt？VTCC 幫您結構化思考

---

## ✨ 核心功能 | Features

### 🔨 雙模運作 (Dual Modes)

- **創新/執行模式 (Creator)**：專注於創造。從零到一的計畫設計、架構規劃
- **風險/審計模式 (Auditor)**：專注於找碴。嚴格的風險評估、資安檢測、合約審查

### 📊 預判模擬 (Pre-Simulation)

- **即時決策面板**：在送出 Prompt 之前，先看到虛擬團隊的反應
- **風險/標籤控制**：微調參數，觀察 QA、資安專家、投資人的態度變化

### 🔧 進階輸出模組

- **👥 AI 動態組隊 (Dynamic Team)**：AI 會根據任務自動招募該領域的全球頂尖專家。
- **📊 SRE 監控協議**：為決策產出對應的 KPIs、Alerts 與執行監控指標。
- **☕ 策略價值報告**：由行銷/公關專家將複雜決策轉化為老闆聽得懂的戰略建議。

### 🌏 雙語支援

- 繁體中文 / English 無縫切換

---

## 🚀 快速開始 | Quick Start

### 方法 1：線上使用（推薦）

直接訪問：**[https://ai-vtcc.pages.dev](#)** *(等待 Cloudflare Pages 部署)*

### 方法 2：本地運行

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
npm run build  # 輸出到 dist/
npm run preview  # 預覽生產版本
```

---

## 📖 使用指南 | User Guide

### **步驟 1：定義任務**

在左側「定義任務」欄位輸入您的需求，例如：

- "分析跨國電商進入東南亞市場的法律與物流風險"
- "評估是否應該將實體咖啡廳轉型為訂閱制會員專賣店"
- "審查此遺留系統 (Legacy System) 的架構漏洞並提出重構計畫"

### **步驟 2：調整提案參數**

使用「提案模擬」調整：

- **風險值**：0-1，風險越高越容易激怒 QA 與資安專家
- **提案標籤**：選擇相關屬性（UX、效能、technical_debt 等）

### **步驟 3：啟用進階功能**（選用）

- ✅ **SRE 監控標準**：注入監控儀表板 Schema
- ✅ **白話文結案報告**：自動生成 Phase 5，用通俗語言向老闆報告

### **步驟 4：生成與複製指令**

點擊「檢視內容」查看完整 Prompt → 點擊「複製指令」

### **步驟 5：貼到 AI 助手**

將 Prompt 貼到 ChatGPT/Gemini/Claude，然後：

- 上傳您的代碼檔案或專案資料夾
- 讓虛擬團隊開始分析

---

## 🌐 部署到 Cloudflare Pages（圖文教學）

### 📋 前置需求

- GitHub 帳號
- Cloudflare 帳號（[免費註冊](https://dash.cloudflare.com/sign-up)）

---

### **步驟 1：推送代碼到 GitHub**

如果您還沒有推送代碼：

```bash
cd ai_vtcc

# 初始化 Git（如果尚未初始化）
git init
git add .
git commit -m "Initial commit"

# 連接到 GitHub 儲存庫
git remote add origin https://github.com/你的用戶名/ai_vtcc.git
git branch -M main
git push -u origin main
```

---

### **步驟 2：登入 Cloudflare Pages**

1. 前往 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 點擊左側選單 **Pages**
3. 點擊 **Create a project**

---

### **步驟 3：連接 GitHub 儲存庫**

1. 選擇 **Connect to Git**
2. 點擊 **Connect GitHub**
3. 授權 Cloudflare 存取您的 GitHub 帳號
4. 在儲存庫列表中選擇 **ai_vtcc**
5. 點擊 **Begin setup**

---

### **步驟 4：配置建置設定**

在「Set up builds and deployments」頁面填寫以下資訊：

| 欄位 | 設定值 |
|------|--------|
| **Project name** | `ai-vtcc`（或您喜歡的名稱）|
| **Production branch** | `main` |
| **Framework preset** | **None**（或選 Vite）|
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |

> ⚠️ **重要**：選擇 "None" 或 "Vite"，**不要**選 "VitePress"！

點擊 **Save and Deploy**

---

### **步驟 5：等待部署完成**

- Cloudflare 會自動安裝依賴、建置專案、部署到 CDN
- 整個過程約 **1-3 分鐘**
- 部署成功後，您會看到綠色的 ✅ 成功訊息

---

### **步驟 6：取得網站連結**

部署完成後，Cloudflare 會提供一個網址：

```
https://ai-vtcc.pages.dev
```

**您可以分享這個連結給任何人！** 🎉

---

### 🔄 自動重新部署

每次您推送新代碼到 GitHub：

```bash
git add .
git commit -m "Update features"
git push origin main
```

Cloudflare Pages 會**自動偵測並重新部署**，無需手動操作！

---

### 🎨 自訂網域（選用）

如果您有自己的網域（例如 `vtcc.example.com`）：

1. 在 Cloudflare Pages 專案中點擊 **Custom domains**
2. 點擊 **Set up a custom domain**
3. 輸入您的網域名稱
4. 按照指示設定 DNS 記錄
5. 完成！

---

## 🗺️ Roadmap | 未來規劃

- [x] **v5.0** - 全領域決策支持、AI 動態專家招募、策略價值報告 *(Current)*
- [ ] **v5.1** - Browser Extension（瀏覽器外掛）：在 ChatGPT/Gemini 中直接注入面板
- [ ] **v6.0** - 多模型並行評估（Cross-Model Debate）

---

## 🏗️ 技術架構 | Tech Stack

- **Frontend**: React 18.2 + TypeScript（計劃中）
- **Build Tool**: Vite 5.0
- **CSS**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Deployment**: Cloudflare Pages
- **Future**: Chrome Extension (Manifest V3)

---

## 📂 專案結構 | Project Structure

```
ai_vtcc/
├── src/
│   ├── App.jsx          # 主應用（多智能體引擎）
│   ├── main.jsx         # React 入口
│   └── index.css        # Tailwind CSS
├── public/              # 靜態資源
├── index.html           # HTML 入口
├── vite.config.js       # Vite 配置
├── tailwind.config.js   # Tailwind 配置
├── package.json         # 依賴
└── README.md            # 本文件
```

---

## 🤝 貢獻指南 | Contributing

歡迎提交 Issue 或 Pull Request！

1. Fork 本專案
2. 創建分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

---

## 📄 授權 | License

MIT License - 詳見 [LICENSE](LICENSE)

---

## 🙏 致謝 | Credits

- **靈感來源**：軟體工程多角色決策模型
- **UI 美學**：Hacker Terminal 風格
- **圖示**：[Lucide Icons](https://lucide.dev/)

---

<div align="center">

**Built with ❤️ for Developers**

[⬆ 回到頂部](#-vtcc---virtual-team-command-center)

</div>

---

## 🌐 English Version

### About

VTCC is a **Universal AI Command Center** for critical decision-making. It simulates a "Virtual Brain Trust" composed of top-tier experts (tailored to your domain) to debate your proposals before you commit resources.

### Key Features (v5.0)

- **Universal Support**: Handles business, legal, tech, and life planning.
- **AI Dynamic Recruitment**: Automatically hires 7 domain-specific experts at Phase 0.
- **Strategic Value Reports**: Executive-level summaries focusing on business ROI.
- **SRE 2.0 Monitoring**: Auto-generates execution KPIs and alert protocols.

### Quickstart

```bash
npm install
npm run dev
```

### Roadmap

- **v5.1**: Chrome Extension (inject VTCC into AI chat pages)
- **v6.0**: Multi-Model Parallel Debate (Cross-Model verification)

---

**For detailed Chinese documentation, see above ↑**
