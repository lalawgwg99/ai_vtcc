import React, { useState, useEffect, useMemo } from 'react';
import {
  Users, Play, Copy, Plus, Trash2, Save, RefreshCw, MessageSquare,
  Terminal, Gavel, ShieldCheck, Smartphone, Eye, EyeOff, Hammer, FileCode,
  TrendingUp, AlertTriangle, CheckCircle, XCircle, Globe, HelpCircle, X, Info, Zap, Activity, Coffee
} from 'lucide-react';

// ================================
// 1. Localization & Data Presets
// ================================

const TRANSLATIONS = {
  zh: {
    appTitle: "VTCC: AI 虛擬團隊指揮中心",
    appSubtitle: "萬用型多智能體決策引擎 v5.0",
    builderMode: "創新/執行模式",
    auditorMode: "風險/審計模式",
    modeBuilderDesc: "Creator",
    modeAuditorDesc: "Auditor",
    reset: "重置設定",
    missionTitle: "1. 定義任務 (Mission)",
    missionPlaceholder: "例：是否應該將實體咖啡廳擴展到電子商務領域？（任何生活、商業或技術問題）",
    enableDynamicTeam: "AI 動態組建團隊",
    enableDynamicTeamDesc: "AI 將根據任務自動招募 7 位最合適的頂級專家角色，取代現有預設團隊。",
    enableSRE: "SRE 維運標準",
    enableSREDesc: "注入監控指標 (KPIs, Alerts) 以確保執行後的成功與穩定性。",
    enablePlain: "白話文結案報告",
    enablePlainDesc: "新增「Phase 5」，由行銷經理向非專業背景的老闆解釋核心價值與結論。",
    simulationTitle: "2. 提案模擬 (Pre-Simulation)",
    simulationDesc: "調整參數，預覽團隊的決策反應。",
    riskLevel: "風險值 (Risk Level)",
    riskHelp: "設定此提案的潛在風險。數值越高，越容易觸發保守派角色（如 QA、資安專家）的反對或否決。",
    proposalTags: "提案標籤 (Tags)",
    tagsHelp: "選擇此提案包含的屬性。這些標籤會觸發不同角色的「偏好」或「厭惡」。",
    agentReactions: "團隊反應 (Agent Reactions)",
    reactionsHelp: "綠色代表支持，紅色代表反對。此處反應基於「預設團隊」，若啟用動態團隊則以 AI 最終生成為準。",
    promptOutput: "系統指令 (System Prompt)",
    promptReady: "指令已生成",
    promptReadyDesc: "虛擬指揮中心協議已就緒。包含完整的多階段決策邏輯。",
    promptReadySRE: "SRE 監控",
    promptReadyPlain: "白話文報告",
    promptReadyDynamic: "動態組隊",
    promptReadyDebate: "大師對決",
    enableDebate: "AI 巔峰競技場 (v6.0)",
    enableDebateDesc: "啟動擬人化大師辯論系統（Gemini, GPT, Claude），從不同面向對撞極致觀點。",
    arenaTitle: "🏆 AI 巔峰競技場",
    viewDetails: "檢視細節",
    hideDetails: "隱藏細節",
    copyPrompt: "複製指令 (Copy Prompt)",
    copied: "已複製！",
    active: "啟用中",
    addAgent: "新增成員",
    sectionCore: "核心執行團隊 (預設)",
    sectionUser: "模擬使用者 (預設)",
    sectionJudge: "決策審議團 (預設)",
    manualTitle: "VTCC 使用說明書",
    manualClose: "關閉",
    switchLangPrompt: "切換語言將重置所有設定為預設值，確定嗎？",
    defaultMissionBuilder: "",
    defaultMissionAuditor: "審查目前提供的資訊、文件或代碼，指出潛在風險並提出改進建議。",

    // Agent Roles for UI
    rolePM: "PM 專案經理",
    roleBackend: "架構工程師",
    roleFrontend: "介面設計師",
    roleDesigner: "美學總監",
    roleMarketing: "行銷公關",
    roleQA: "品質控管",
    roleAI: "AI 邏輯核心",
    roleUserSimple: "普通用戶",
    roleUserHard: "專家用戶",
    roleInvestor: "資本投資人",
    roleYouTuber: "媒體評論員",
    roleSec: "風險管理家",
    dynamicRecruitingTitle: "AI 專家現場招募中",
    dynamicRecruitingDesc: "系統正根據您的任務主旨，於背景鎖定全球頂尖智囊團。新團隊成員將在您貼上指令後於對話中正式現身。",
    dynamicRecruitingActive: "動態招募協議已啟動"
  },
  en: {
    appTitle: "VTCC: AI Virtual Command Center",
    appSubtitle: "Universal Multi-Agent Decision Engine v5.0",
    builderMode: "Creator Mode",
    auditorMode: "Auditor Mode",
    modeBuilderDesc: "Creator",
    modeAuditorDesc: "Auditor",
    reset: "Reset",
    missionTitle: "1. Define Mission",
    missionPlaceholder: "e.g., Should we expand our offline coffee chain into e-commerce? (Any domain)",
    enableDynamicTeam: "AI Dynamic Recruitment",
    enableDynamicTeamDesc: "AI will automatically recruit 7 most relevant top experts based on your mission.",
    enableSRE: "SRE Protocols",
    enableSREDesc: "Inject monitoring metrics (KPIs, Alerts) to ensure success and stability.",
    enablePlain: "Plain Language Report",
    enablePlainDesc: "Add 'Phase 5' for a non-technical summary explaining value & risks to the boss.",
    simulationTitle: "2. Pre-Simulation",
    simulationDesc: "Adjust parameters to preview agent reactions.",
    riskLevel: "Risk Level",
    riskHelp: "High risk triggers VETO from conservative agents but might attract risk-takers.",
    proposalTags: "Proposal Tags",
    tagsHelp: "Select attributes. These trigger agent 'Preferences' or 'Avoids'.",
    agentReactions: "Agent Reactions",
    reactionsHelp: "Green = Support, Red = Object. Note: This assumes default team unless Dynamic is on.",
    promptOutput: "System Prompt",
    promptReady: "Prompt Ready",
    promptReadyDesc: "Command center protocols loaded. Includes multi-phase decision logic.",
    promptReadySRE: "SRE Active",
    promptReadyPlain: "Plain Rpt",
    promptReadyDynamic: "AI Recruited",
    viewDetails: "View Code",
    hideDetails: "Hide Code",
    copyPrompt: "Copy Prompt",
    copied: "Copied!",
    active: "Active",
    addAgent: "Add Agent",
    sectionCore: "Core Team (Default)",
    sectionUser: "User Group (Default)",
    sectionJudge: "The Tribunal (Default)",
    manualTitle: "VTCC User Manual",
    manualClose: "Close",
    switchLangPrompt: "Switching language will reset all roles to defaults. Continue?",
    defaultMissionBuilder: "",
    defaultMissionAuditor: "Audit the provided information/data for risks and provide improvement suggestions.",

    // Agent Roles for UI
    rolePM: "Project Manager",
    roleBackend: "Sys Architect",
    roleFrontend: "Interface Dev",
    roleDesigner: "Design Lead",
    roleMarketing: "PR & Marketing",
    roleQA: "Quality Assurance",
    roleAI: "AI Logic Core",
    roleUserSimple: "Casual User",
    roleUserHard: "Power User",
    roleInvestor: "VC Investor",
    roleYouTuber: "Media Reviewer",
    roleSec: "Risk Manager"
  }
};

// Tag Definitions with Bilingual Labels
const TAG_DEFINITIONS = [
  { id: 'stability', labelZh: 'Stability / 穩定性', labelEn: 'Stability' },
  { id: 'performance', labelZh: 'Efficiency / 效率', labelEn: 'Efficiency' },
  { id: 'ux', labelZh: 'Experience / 體驗', labelEn: 'Experience' },
  { id: 'security_risk', labelZh: 'Security / 安全風險', labelEn: 'Security' },
  { id: 'cost', labelZh: 'Budget / 預算成本', labelEn: 'Budget & Cost' },
  { id: 'viral', labelZh: 'Growth / 成長與傳播', labelEn: 'Viral Growth' },
  { id: 'feature', labelZh: 'Innovation / 創新點', labelEn: 'Innovation' },
  { id: 'legal', labelZh: 'Legal / 法律合規', labelEn: 'Legal/Ethics' },
  { id: 'timing', labelZh: 'Timing / 市場時機', labelEn: 'Market Timing' }
];

// Monitoring Schema Definition
const MONITORING_SCHEMA_TEMPLATE = {
  meta: {
    dashboardId: 'VTCC-MON-001',
    description: 'Post-Execution monitoring for success & risk',
    refreshIntervalSec: 60
  },
  globalKPIs: [
    { id: 'success_rate', label: 'Success Rate', type: 'percentage', threshold: { warning: 95, critical: 80 } },
    { id: 'user_sentiment', label: 'User Sentiment', type: 'score', threshold: { warning: 4, critical: 2 } },
    { id: 'roi', label: 'ROI Forecast', type: 'ratio', threshold: { warning: 1.2, critical: 1.0 } }
  ],
  alerts: {
    vetoConditions: [
      { metricId: 'risk_incident', operator: '>', value: 0, action: 'EMERGENCY_HALT' }
    ]
  }
};


// ================================
// 2. AI Agent Schema
// ================================

class AIAgent {
  constructor({ id, active = true, name, role, desc, icon, authority, personality, skills, decisionBias, behaviors }) {
    this.id = id;
    this.active = active;
    this.name = name;
    this.role = role;
    this.desc = desc;
    this.icon = icon;
    this.authority = authority || 0.5;
    this.personality = personality || { riskTolerance: 0.5, detailFocus: 0.5, speedVsQuality: 0.5 };
    this.skills = skills || {};
    this.decisionBias = decisionBias || { prefers: [], avoids: [], redFlags: [] };
    this.behaviors = behaviors || {};
  }

  evaluateProposal(proposal) {
    if (!this.active) return null;

    let score = 0;
    let reasons = [];

    // Logic
    if (proposal.risk > this.personality.riskTolerance) {
      const penalty = Math.round((proposal.risk - this.personality.riskTolerance) * 10);
      score -= penalty;
      reasons.push(`⚠️ Risk/風險高 (-${penalty})`);
    }

    this.decisionBias.prefers?.forEach(p => {
      if (proposal.tags.includes(p)) {
        score += 2;
        reasons.push(`✅ Prefers/偏好: ${p}`);
      }
    });

    this.decisionBias.avoids?.forEach(a => {
      if (proposal.tags.includes(a)) {
        score -= 2;
        reasons.push(`⛔ Avoids/厭惡: ${a}`);
      }
    });

    this.decisionBias.redFlags?.forEach(flag => {
      if (proposal.tags.includes(flag)) {
        score -= 5;
        reasons.push(`🚩 RED FLAG: ${flag}`);
      }
    });

    return {
      agentId: this.id,
      name: this.name,
      icon: this.icon,
      role: this.role,
      weightedScore: Number((score * this.authority).toFixed(2)),
      reasons: reasons
    };
  }
}

// ================================
// 3. Preset Data Generators (Bilingual)
// ================================

const getPresets = (lang) => {
  const t = TRANSLATIONS[lang];

  const core = [
    new AIAgent({
      id: 1, active: true, name: 'Steve', icon: '👔', role: t.rolePM, desc: lang === 'zh' ? '極簡主義者，負責決策與派工，對細節有強迫症。' : 'Minimalist decision maker, detail-oriented.',
      authority: 0.9, personality: { riskTolerance: 0.3, detailFocus: 0.9, speedVsQuality: 0.4 },
      decisionBias: { prefers: ['stability', 'scalability'], avoids: ['rush'], redFlags: ['unmaintainable'] }
    }),
    new AIAgent({
      id: 2, active: true, name: 'Mike', icon: '👨‍💻', role: t.roleBackend, desc: lang === 'zh' ? '務實，講究效能與架構，負責核心邏輯。' : 'Pragmatic, performance-focused backend lead.',
      authority: 0.7, personality: { riskTolerance: 0.5, detailFocus: 0.8, speedVsQuality: 0.3 },
      decisionBias: { prefers: ['performance', 'structure'], avoids: ['overengineering'], redFlags: ['technical_debt'] }
    }),
    new AIAgent({
      id: 3, active: true, name: 'Leo', icon: '⚡', role: t.roleFrontend, desc: lang === 'zh' ? '負責動態效果與響應式操作。' : 'UI interactions and responsive design.',
      authority: 0.6, personality: { riskTolerance: 0.6, detailFocus: 0.7, speedVsQuality: 0.8 },
      decisionBias: { prefers: ['ux', 'animation', 'modern'], avoids: ['legacy_browser'], redFlags: ['bad_ux'] }
    }),
    new AIAgent({
      id: 4, active: true, name: 'Ivy', icon: '🎨', role: t.roleDesigner, desc: lang === 'zh' ? '重視美感與 UX，禁止醜陋的按鈕。' : 'Visuals and UX expert, forbids ugly UI.',
      authority: 0.6, personality: { riskTolerance: 0.4, detailFocus: 1.0, speedVsQuality: 0.2 },
      decisionBias: { prefers: ['aesthetic', 'minimalism'], avoids: ['clutter'], redFlags: ['ugly'] }
    }),
    new AIAgent({
      id: 5, active: true, name: 'Sam', icon: '📢', role: t.roleMarketing, desc: lang === 'zh' ? '負責文案包裝，能將 Bug 說成 Feature。' : 'Copywriting, spins bugs into features.',
      authority: 0.5, personality: { riskTolerance: 0.8, detailFocus: 0.3, speedVsQuality: 1.0 },
      decisionBias: { prefers: ['viral', 'feature'], avoids: ['technical_jargon'], redFlags: ['boring'] }
    }),
    new AIAgent({
      id: 6, active: true, name: 'Tess', icon: '🕵️‍♀️', role: t.roleQA, desc: lang === 'zh' ? '毒舌測試員，負責找漏洞與安全風險。' : 'Strict tester, finds vulnerabilities.',
      authority: 0.8, personality: { riskTolerance: 0.1, detailFocus: 1.0, speedVsQuality: 0.1 },
      decisionBias: { prefers: ['safety', 'stability'], avoids: ['shortcuts'], redFlags: ['security_risk', 'bug'] }
    }),
    new AIAgent({
      id: 7, active: true, name: 'Omega', icon: '🤖', role: t.roleAI, desc: lang === 'zh' ? '純粹的邏輯引擎，無感情，只講求效率。' : 'Pure logic engine, emotionless efficiency.',
      authority: 0.6, personality: { riskTolerance: 0.6, detailFocus: 0.95, speedVsQuality: 0.2 },
      decisionBias: { prefers: ['efficiency', 'logic'], avoids: ['ambiguity'], redFlags: ['inefficiency'] }
    })
  ];

  const users = [
    new AIAgent({
      id: 101, active: true, name: 'Alice', icon: '🐰', role: t.roleUserSimple, desc: lang === 'zh' ? '直覺派，討厭複雜設定，超過三步就放棄。' : 'Intuitive user, hates complexity.',
      authority: 0.4, personality: { riskTolerance: 0.2, detailFocus: 0.1, speedVsQuality: 0.9 },
      decisionBias: { prefers: ['simple', 'intuitive'], avoids: ['config'], redFlags: ['complex'] }
    }),
    new AIAgent({
      id: 102, active: true, name: 'Bob', icon: '🐯', role: t.roleUserHard, desc: lang === 'zh' ? '功能派，喜歡高度自定義與查看原始碼。' : 'Power user, loves customization.',
      authority: 0.4, personality: { riskTolerance: 0.8, detailFocus: 0.9, speedVsQuality: 0.5 },
      decisionBias: { prefers: ['customization', 'power'], avoids: ['lock_in'], redFlags: ['closed_source'] }
    })
  ];

  const judges = [
    new AIAgent({
      id: 201, active: true, name: 'VC Investor', icon: '💰', role: t.roleInvestor, desc: lang === 'zh' ? '關注商業價值、獲利能力與留存率。' : 'Focus on ROI, profit and retention.',
      authority: 1.0, personality: { riskTolerance: 0.4, detailFocus: 0.8, speedVsQuality: 0.6 },
      decisionBias: { prefers: ['profit', 'growth'], avoids: ['burn_rate'], redFlags: ['no_market'] }
    }),
    new AIAgent({
      id: 202, active: true, name: 'Tech YouTuber', icon: '📹', role: t.roleYouTuber, desc: lang === 'zh' ? '關注亮點、創新與視覺酷炫程度。' : 'Focus on innovation and cool factor.',
      authority: 0.8, personality: { riskTolerance: 0.7, detailFocus: 0.6, speedVsQuality: 0.8 },
      decisionBias: { prefers: ['cool', 'innovative'], avoids: ['boring'], redFlags: ['bad_ux'] }
    }),
    new AIAgent({
      id: 203, active: true, name: 'Sec Expert', icon: '🛡️', role: t.roleSec, desc: lang === 'zh' ? '關注代碼安全、隱私與架構漏洞。' : 'Focus on security, privacy and vulnerabilities.',
      authority: 1.0, personality: { riskTolerance: 0.0, detailFocus: 1.0, speedVsQuality: 0.1 },
      decisionBias: { prefers: ['secure', 'privacy'], avoids: ['leaks'], redFlags: ['security_risk', 'vulnerability'] }
    })
  ];

  return { core, users, judges };
};

// --- Helper Hook for LocalStorage ---
const usePersistentState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        const parsed = JSON.parse(storedValue);
        // 如果是 Array，嘗試還原成 AIAgent (簡單還原，遺失 methods)
        // 為了讓 methods 運作，後面 render 時會重新 new AIAgent
        return parsed;
      }
      return defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn(`Error writing localStorage key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setState];
};

// ================================
// 4. Main Component
// ================================

const VirtualTeamBuilder = () => {
  // State
  const [lang, setLang] = usePersistentState('vtcc_lang', 'zh'); // 'zh' or 'en'
  const [mode, setMode] = usePersistentState('vtcc_mode_v3', 'builder');

  // Load initial data based on current lang logic is handled in reset/init
  // But for persistent state, we load what's saved. 
  // We'll init with ZH presets if empty.
  const initialPresets = getPresets('zh');

  const [coreTeam, setCoreTeam] = usePersistentState('vtcc_coreTeam_v3', initialPresets.core);
  const [users, setUsers] = usePersistentState('vtcc_users_v3', initialPresets.users);
  const [judges, setJudges] = usePersistentState('vtcc_judges_v3', initialPresets.judges);

  const [meetingRound, setMeetingRound] = usePersistentState('vtcc_round', 1);
  const [mission, setMission] = usePersistentState('vtcc_mission', TRANSLATIONS.zh.defaultMissionBuilder);

  // Proposal Simulation
  const [proposalRisk, setProposalRisk] = useState(0.5);
  const [proposalTags, setProposalTags] = useState(['stability', 'ux']);
  const [enableDynamicTeam, setEnableDynamicTeam] = useState(false); // Dynamic Team Toggle
  const [enableSRE, setEnableSRE] = useState(false); // SRE Toggle State
  const [enablePlain, setEnablePlain] = useState(false); // Plain Language Report Toggle

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [showPromptDetails, setShowPromptDetails] = useState(false); // Default hidden

  const t = TRANSLATIONS[lang]; // Current translation object

  // Theme
  const theme = {
    builder: {
      bg: 'bg-slate-900',
      cardBg: 'bg-slate-800',
      textMain: 'text-slate-100',
      accent: 'text-blue-400',
      gradient: 'from-blue-400 to-purple-500',
      border: 'border-slate-700',
      button: 'bg-blue-600 hover:bg-blue-500',
      activeBorder: 'border-blue-500',
    },
    auditor: {
      bg: 'bg-black',
      cardBg: 'bg-zinc-900',
      textMain: 'text-green-50',
      accent: 'text-green-500',
      gradient: 'from-green-400 to-emerald-600',
      border: 'border-green-900',
      button: 'bg-green-700 hover:bg-green-600',
      activeBorder: 'border-green-500',
    }
  };
  const currentTheme = theme[mode];

  // Logic: Switch Language & Reset Data
  const switchLanguage = (newLang) => {
    if (newLang === lang) return;
    if (window.confirm(TRANSLATIONS[lang].switchLangPrompt)) {
      const presets = getPresets(newLang);
      setLang(newLang);
      setCoreTeam(presets.core);
      setUsers(presets.users);
      setJudges(presets.judges);
      setMission(mode === 'builder' ? TRANSLATIONS[newLang].defaultMissionBuilder : TRANSLATIONS[newLang].defaultMissionAuditor);
    }
  };

  const resetData = () => {
    if (window.confirm('Reset all data?')) {
      const presets = getPresets(lang);
      setCoreTeam(presets.core);
      setUsers(presets.users);
      setJudges(presets.judges);
      setMeetingRound(1);
      setMission(mode === 'builder' ? t.defaultMissionBuilder : t.defaultMissionAuditor);
      setMode('builder');
      setEnableSRE(false);
      setEnablePlain(false);
      setEnableDynamicTeam(false);
    }
  };

  const toggleMember = (list, setList, id) => {
    const newList = list.map(m => {
      if (m.id === id) {
        return new AIAgent({ ...m, active: !m.active });
      }
      return new AIAgent(m);
    });
    setList(newList);
  };

  const deleteMember = (list, setList, id) => {
    setList(list.filter(m => m.id !== id).map(m => new AIAgent(m)));
  };

  const toggleTag = (tagId) => {
    setProposalTags(prev => prev.includes(tagId) ? prev.filter(t => t !== tagId) : [...prev, tagId]);
  };

  // Simulation Engine
  const simulationResults = useMemo(() => {
    const allAgents = [...coreTeam, ...users, ...judges];
    const proposal = { risk: proposalRisk, tags: proposalTags };

    const results = allAgents
      .filter(a => a.active)
      .map(agent => {
        const agentInstance = agent instanceof AIAgent ? agent : new AIAgent(agent);
        return agentInstance.evaluateProposal(proposal);
      })
      .filter(r => r !== null);

    const totalScore = results.reduce((sum, r) => sum + r.weightedScore, 0);
    return { results, totalScore, passed: totalScore >= 0 };
  }, [coreTeam, users, judges, proposalRisk, proposalTags]);

  // Prompt Generation
  const generatePrompt = () => {
    const allActive = [...coreTeam, ...users, ...judges].filter(m => m.active);

    const systemHeader = `**[SYSTEM START: AI_VIRTUAL_COMMAND_CENTER_v5]**`;

    const agentProfiles = allActive.map(m => {
      return `- ${m.icon} **${m.name}** (${m.role})
  - **Auth**: ${m.authority}, **RiskTol**: ${m.personality.riskTolerance}
  - **Bias**: Prefers [${m.decisionBias.prefers?.join(', ')}], Avoids [${m.decisionBias.avoids?.join(', ')}]
  - **RedFlags**: [${m.decisionBias.redFlags?.join(', ')}]
  - **Desc**: ${m.desc}`;
    }).join('\n');

    let dynamicTeamModule = '';
    if (enableDynamicTeam) {
      dynamicTeamModule = lang === 'zh' ? `
### 🔄 Phase 0: 動態專家招募 (Dynamic Recruitment)
**指令**：請忽略上述預設角色。基於當前任務的領域（如：法律、醫學、商業、科學、家庭），請自行定義 **7 位** 該領域最具權威的虛擬專家。
- 每個專家需包含：姓名、頭銜、權限等級 (0-1.0)、風險容忍度、決策偏好、以及一段背景描述。
- 接下來的 Phase 1-4 請使用這批新招募的專家進行決策。
` : `
### 🔄 Phase 0: Dynamic Recruitment
**Instruction**: Ignore the default roles listed above. Based on the domain of the current mission (e.g., Legal, Medical, Business, Science, Domestic), please define **7 virtual experts** who are top authorities in this field.
- Each expert must have: Name, Title, Authority (0-1.0), Risk Tolerance, Bias, and a background bio.
- Use this newly recruited team for all subsequent phases (Phase 1-4).
`;
    }

    let additionalInstructions = '';
    if (enableSRE) {
      additionalInstructions += lang === 'zh' ? `
### 📊 監控與維運 (Monitoring & SRE)
團隊已啟用 SRE 協議。請根據以下監控架構定義對此任務執行後的「成功指標」與「自動預警機制」：
\`\`\`json
${JSON.stringify(MONITORING_SCHEMA_TEMPLATE, null, 2)}
\`\`\`
**任務**：在 Phase 4 或 5 中包含一個「即時監控儀表板定義」，列出此決策對應的關鍵 Metrics。
` : `
### 📊 Monitoring & SRE Schema
SRE protocols active. Define success metrics and alert rules using this schema:
\`\`\`json
${JSON.stringify(MONITORING_SCHEMA_TEMPLATE, null, 2)}
\`\`\`
**Task**: Include a "Monitoring Dashboard" section in the summary, listing key Metrics and Alerts for this mission.
`;
    }

    if (enablePlain) {
      additionalInstructions += lang === 'zh' ? `
### ☕ 白話文/商業價值報告 (Plain Language & Value Report)
請追加 **Phase 5**，由團隊中的 **行銷經理/首席溝通官** 撰寫一份「給真人老闆看的最終結案報告」。
- 🚫 **禁止專業術語**：將複雜概念比喻化、生活化。
- ✅ **專注於價值**：明確指出這項決策如何省錢、賺錢或降低風險。
- ✅ **執行建議**：提供 1-2 個立即可以執行的 Action Items。
- **語氣**：專業、具備說服力，像是頂級諮詢公司的執行摘要。
` : `
### ☕ Plain Language & Business Value Report
Add **Phase 5**, written by the **PR/Marketing Lead** for the "Human Boss".
- 🚫 **No Jargon**: Use real-world analogies.
- ✅ **Focus on Value**: Clearly state ROI, time saved, or risks mitigated.
- ✅ **Actionable**: Provide 1-2 immediate next steps.
- **Tone**: Persuasive, professional, like an executive summary from a top-tier consultancy.
`;
    }

    const promptInstructions = lang === 'zh' ? `
請初始化「全領域多智能體決策引擎」。
當前任務/提案：**${mission}**
提案風險值 (0-1): **${proposalRisk}**
提案標籤: **[${proposalTags.join(', ')}]**

---
${enableDynamicTeam ? dynamicTeamModule : `### 🧠 預設智能體架構 (Agent Schema)\n${agentProfiles}`}

${additionalInstructions}
---

### 🔄 決策模擬流程 (Simulation Protocol)

#### **Phase 1: 團隊初步評估 (Evaluation)**
- 每個成員從其專業角度進行深度分析。

#### **Phase 2: 衝突、質疑與對抗 (Debate)**
- 低風險容忍度者挑戰高風險提案。
- 重視價值者挑戰過度複雜的方案。
- 成員之間必須有互動與火花。

#### **Phase 3: 加權投票與否決權 (Voting)**
- 模擬計算加權得分。
- 若有核心成員行使「一票否決」，需詳細說明理由。

#### **Phase 4: 執行摘要與 GO/NO-GO 建言 (Summary)**
- 總結決策並給出明確建議。

#### **🏆 AI 巔峰競技場：大師對決 (Persona Debate Arena)**
請分別以 **Gemini (全知建築師)**、**GPT (精準策略家)**、**Claude (人文倫理官)** 三種身份進行最後的思維對撞，提供不同面向的極致洞察。

${enablePlain ? '#### **Phase 5: 商業價值與白話文報告 (Strategic Report)**\n- 轉換為老闆聽得懂的戰略建議，並給出「終極合成建議」。' : ''}

請直接開始 Phase 1 (若啟用了 Phase 0 則先執行組隊)。` : `
Initialize "Universal Multi-Agent Decision Engine".
Current Mission: **${mission}**
Proposal Risk (0-1): **${proposalRisk}**
Tags: **[${proposalTags.join(', ')}]**

---
${enableDynamicTeam ? dynamicTeamModule : `### 🧠 Default Agent Schema\n${agentProfiles}`}

${additionalInstructions}
---

### 🔄 Protocol

#### **Phase 1: Initial Evaluation**
- Members analyze based on their roles.

#### **Phase 2: Intensive Debate**
- Agents challenge each other's assumptions and risks.

#### **Phase 3: Weighted Voting**
- Calculate final score. Check for Vetoes.

#### **Phase 4: Summary & Recommendations**
- Provide a clear GO / NO-GO summary.

${enablePlain ? '#### **Phase 5: Strategic Value Report**\n- Translate results into business value for stakeholders.' : ''}

Please start Phase 1 (or Phase 0 if Dynamic Recruitment is active).
`;

    setGeneratedPrompt(`${systemHeader}\n${promptInstructions}`);
  };

  const copyToClipboard = () => {
    try {
      // 優先使用 execCommand 作為 iframe/sandboxed 環境的 fallback
      const textArea = document.createElement("textarea");
      textArea.value = generatedPrompt;

      // 確保元素存在但不可見，避免影響畫面佈局
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);

      textArea.focus();
      textArea.select();

      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (successful) {
        setCopyFeedback(true);
        setTimeout(() => setCopyFeedback(false), 2000);
      } else {
        throw new Error("execCommand failed");
      }
    } catch (err) {
      console.warn('Fallback copy failed, trying navigator.clipboard...', err);
      // 如果 execCommand 失敗，嘗試使用現代 API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(generatedPrompt)
          .then(() => {
            setCopyFeedback(true);
            setTimeout(() => setCopyFeedback(false), 2000);
          })
          .catch(e => {
            console.error('All copy methods failed', e);
            alert("無法存取剪貼簿，請手動選取文字複製 (Ctrl+A, Ctrl+C)。");
          });
      } else {
        alert("您的瀏覽器不支援自動複製，請手動選取文字複製。");
      }
    }
  };

  // v6.0 Debate Arena State
  const [enableDebate, setEnableDebate] = useState(true);

  // Debounce Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      generatePrompt();
    }, 600); // 600ms debounce to prevent input lag

    return () => clearTimeout(timer);
  }, [coreTeam, users, judges, meetingRound, mission, mode, proposalRisk, proposalTags, lang, enableSRE, enablePlain, enableDynamicTeam, enableDebate]);

  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.textMain} p-6 font-sans pb-24 lg:pb-6 transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <header className={`flex justify-between items-center border-b ${currentTheme.border} pb-6 flex-wrap gap-4`}>
          <div>
            <h1 className={`text-3xl font-bold bg-gradient-to-r ${currentTheme.gradient} bg-clip-text text-transparent flex items-center gap-3`}>
              <Terminal className={`w-8 h-8 ${currentTheme.accent}`} />
              {t.appTitle}
            </h1>
            <p className="text-slate-400 mt-2 text-sm flex gap-2 items-center">
              {t.appSubtitle}
              <span className={`px-2 py-0.5 rounded text-xs border ${mode === 'auditor' ? 'border-green-500 text-green-400' : 'border-blue-500 text-blue-400'}`}>
                {mode === 'auditor' ? t.modeAuditorDesc : t.modeBuilderDesc}
              </span>
            </p>
          </div>
          <div className="flex gap-2 items-center">
            {/* Language Switcher */}
            <div className="flex bg-slate-800 rounded p-1 mr-2 border border-slate-700">
              <button
                onClick={() => switchLanguage('zh')}
                className={`px-2 py-1 rounded text-xs ${lang === 'zh' ? 'bg-slate-600 text-white' : 'text-slate-400'}`}
              >
                繁中
              </button>
              <button
                onClick={() => switchLanguage('en')}
                className={`px-2 py-1 rounded text-xs ${lang === 'en' ? 'bg-slate-600 text-white' : 'text-slate-400'}`}
              >
                EN
              </button>
            </div>

            <button onClick={() => setMode('builder')} className={`px-3 py-1.5 text-xs rounded border ${mode === 'builder' ? 'bg-blue-600 border-blue-500' : 'border-slate-600'} transition-all`}>{t.modeBuilderDesc}</button>
            <button onClick={() => setMode('auditor')} className={`px-3 py-1.5 text-xs rounded border ${mode === 'auditor' ? 'bg-green-700 border-green-500' : 'border-slate-600'} transition-all`}>{t.modeAuditorDesc}</button>

            {/* Help Button */}
            <button onClick={() => setShowManual(true)} className="p-2 text-slate-400 hover:text-white transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left: Configuration */}
          <div className="lg:col-span-5 space-y-6">
            <section className={`${currentTheme.cardBg} rounded-xl p-5 border ${currentTheme.border}`}>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">{t.missionTitle}</h2>
              <textarea
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                className="w-full bg-black/20 border border-slate-600 rounded p-3 text-sm focus:border-blue-500 outline-none resize-none h-24 mb-3"
                placeholder={t.missionPlaceholder}
              />

              <div className="grid grid-cols-1 gap-2">
                {/* Dynamic Team Toggle */}
                <div
                  onClick={() => setEnableDynamicTeam(!enableDynamicTeam)}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${enableDynamicTeam ? 'bg-purple-900/40 border-purple-500' : 'bg-black/20 border-slate-700 hover:bg-slate-800'}`}
                >
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors ${enableDynamicTeam ? 'bg-purple-500' : 'bg-slate-600'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${enableDynamicTeam ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-bold flex items-center gap-2 ${enableDynamicTeam ? 'text-purple-300' : 'text-slate-400'}`}>
                      <Users className="w-4 h-4" />
                      {t.enableDynamicTeam}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 leading-tight opacity-80">
                      {t.enableDynamicTeamDesc}
                    </div>
                  </div>
                </div>

                {/* SRE Toggle */}
                <div
                  onClick={() => setEnableSRE(!enableSRE)}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${enableSRE ? 'bg-indigo-900/40 border-indigo-500' : 'bg-black/20 border-slate-700 hover:bg-slate-800'}`}
                >
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors ${enableSRE ? 'bg-indigo-500' : 'bg-slate-600'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${enableSRE ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-bold flex items-center gap-2 ${enableSRE ? 'text-indigo-300' : 'text-slate-400'}`}>
                      <Activity className="w-4 h-4" />
                      {t.enableSRE}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 leading-tight opacity-80">
                      {t.enableSREDesc}
                    </div>
                  </div>
                </div>

                {/* Plain Language Toggle */}
                <div
                  onClick={() => setEnablePlain(!enablePlain)}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${enablePlain ? 'bg-amber-900/40 border-amber-500' : 'bg-black/20 border-slate-700 hover:bg-slate-800'}`}
                >
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors ${enablePlain ? 'bg-amber-500' : 'bg-slate-600'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${enablePlain ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-bold flex items-center gap-2 ${enablePlain ? 'text-amber-300' : 'text-slate-400'}`}>
                      <Coffee className="w-4 h-4" />
                      {t.enablePlain}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 leading-tight opacity-80">
                      {t.enablePlainDesc}
                    </div>
                  </div>
                </div>

                {/* Debate Arena Toggle (v6.0) */}
                <div
                  onClick={() => setEnableDebate(!enableDebate)}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${enableDebate ? 'bg-red-900/40 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'bg-black/20 border-slate-700 hover:bg-slate-800'}`}
                >
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors ${enableDebate ? 'bg-red-500' : 'bg-slate-600'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${enableDebate ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-bold flex items-center gap-2 ${enableDebate ? 'text-red-300' : 'text-slate-400'}`}>
                      <Gavel className="w-4 h-4" />
                      {t.enableDebate}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 leading-tight opacity-80">
                      {t.enableDebateDesc}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="space-y-4 relative">
              {enableDynamicTeam && (
                <div className="absolute inset-0 z-10 bg-slate-900/60 backdrop-blur-md rounded-xl border border-purple-500/50 flex flex-col items-center justify-center p-6 text-center shadow-[0_0_30px_rgba(168,85,247,0.15)] animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-purple-900/30 rounded-full flex items-center justify-center border border-purple-500/30 mb-4 animate-pulse">
                    <Users className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-purple-300 font-bold text-lg mb-2">{t.dynamicRecruitingTitle}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed max-w-[280px]">
                    {t.dynamicRecruitingDesc}
                  </p>
                  <div className="mt-4 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
              <div className={enableDynamicTeam ? 'opacity-20 pointer-events-none' : ''}>
                <RosterGroup title={t.sectionCore} list={coreTeam} setList={setCoreTeam} toggle={toggleMember} deleteMember={deleteMember} theme={currentTheme} t={t} />
                <div className="h-4" />
                <RosterGroup title={t.sectionUser} list={users} setList={setUsers} toggle={toggleMember} deleteMember={deleteMember} theme={currentTheme} t={t} />
                <div className="h-4" />
                <RosterGroup title={t.sectionJudge} list={judges} setList={setJudges} toggle={toggleMember} deleteMember={deleteMember} theme={currentTheme} t={t} />
              </div>
            </div>
          </div>

          {/* Middle: Simulation */}
          <div className="lg:col-span-4 space-y-6">
            <section className={`${currentTheme.cardBg} rounded-xl p-5 border ${currentTheme.border} h-full flex flex-col`}>
              <div className="mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-yellow-400" />
                  {t.simulationTitle}
                </h2>
                <p className="text-xs text-slate-400 mt-1">{t.simulationDesc}</p>
              </div>

              {/* Simulation Controls */}
              <div className="space-y-4 mb-6 bg-black/20 p-4 rounded-lg border border-slate-700/50">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-1.5 font-medium text-slate-300">
                      {t.riskLevel}
                    </span>
                    <span className={proposalRisk > 0.7 ? 'text-red-400 font-bold' : 'text-green-400 font-bold'}>{proposalRisk}</span>
                  </div>
                  <input
                    type="range" min="0" max="1" step="0.1"
                    value={proposalRisk}
                    onChange={(e) => setProposalRisk(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex items-start gap-2 mt-2 text-xs text-slate-500 bg-black/30 p-2 rounded">
                    <Info className="w-3 h-3 mt-0.5 shrink-0" />
                    {t.riskHelp}
                  </div>
                </div>
                <div>
                  <span className="text-sm block mb-2 font-medium text-slate-300">{t.proposalTags}</span>
                  <div className="flex flex-wrap gap-2">
                    {TAG_DEFINITIONS.map(tagDef => (
                      <button
                        key={tagDef.id}
                        onClick={() => toggleTag(tagDef.id)}
                        className={`px-2 py-1 text-xs rounded border transition-all ${proposalTags.includes(tagDef.id) ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-500'}`}
                      >
                        {lang === 'zh' ? tagDef.labelZh : tagDef.labelEn}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-start gap-2 mt-2 text-xs text-slate-500 bg-black/30 p-2 rounded">
                    <Info className="w-3 h-3 mt-0.5 shrink-0" />
                    {t.tagsHelp}
                  </div>
                </div>
              </div>

              {/* Simulation Results */}
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-300">{t.agentReactions}</span>
                  <span className={`text-sm font-bold px-2 py-0.5 rounded ${simulationResults.passed ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                    Score: {simulationResults.totalScore.toFixed(1)}
                  </span>
                </div>

                <div className="mb-3 text-xs text-slate-500 flex items-start gap-2 bg-black/30 p-2 rounded">
                  <Info className="w-3 h-3 mt-0.5 shrink-0" />
                  {t.reactionsHelp}
                </div>

                {simulationResults.results.map(r => (
                  <div key={r.agentId} className={`p-3 rounded border text-sm flex gap-3 ${r.weightedScore >= 0 ? 'border-slate-700 bg-slate-800/50' : 'border-red-900/50 bg-red-900/10'}`}>
                    <div className="text-xl pt-0.5">{r.icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold flex items-center gap-1.5">
                          {r.name}
                          <span className="text-[10px] font-normal opacity-50 bg-black/30 px-1.5 py-0.5 rounded border border-white/10">{r.role}</span>
                        </span>
                        <span className={r.weightedScore >= 0 ? 'text-green-400 font-mono' : 'text-red-400 font-mono'}>{r.weightedScore > 0 ? '+' : ''}{r.weightedScore}</span>
                      </div>
                      <div className="mt-1 space-y-1">
                        {r.reasons.length > 0 ? r.reasons.map((reason, idx) => (
                          <div key={idx} className="text-xs opacity-80 flex items-center gap-1.5">
                            {reason.includes('RED FLAG') || reason.includes('嚴重紅旗') ? <AlertTriangle className="w-3 h-3 text-red-500" /> : <div className="w-3 h-0.5 bg-slate-600 rounded-full" />}
                            {reason}
                          </div>
                        )) : <span className="text-xs opacity-40 italic">...</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Output (Clean Version) */}
          <div className="lg:col-span-3 space-y-4">
            <div className={`${currentTheme.cardBg} rounded-xl p-1 border ${currentTheme.border} shadow-xl flex flex-col max-h-[calc(100vh-200px)] transition-all duration-300`}>
              <div className="bg-black/20 p-3 border-b border-slate-700 flex justify-between items-center">
                <span className="text-xs font-mono uppercase flex gap-2 items-center">
                  <Terminal className="w-3 h-3" /> {t.promptOutput}
                </span>
                {/* Toggle Visibility */}
                <button
                  onClick={() => setShowPromptDetails(!showPromptDetails)}
                  className="text-[10px] flex items-center gap-1 text-slate-500 hover:text-white transition-colors"
                >
                  {showPromptDetails ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  {showPromptDetails ? t.hideDetails : t.viewDetails}
                </button>
              </div>

              {showPromptDetails ? (
                // Raw Text Area
                <textarea
                  className="flex-1 bg-black/40 p-4 font-mono text-xs resize-none focus:outline-none text-slate-300 custom-scrollbar"
                  value={generatedPrompt}
                  readOnly
                />
              ) : (
                // Clean "Prompt Ready" UI
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4 bg-black/10 relative">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center ${mode === 'auditor' ? 'bg-green-900/20 text-green-400 border border-green-800/50' : 'bg-blue-900/20 text-blue-400 border border-blue-800/50'}`}>
                    <Zap className="w-10 h-10 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-200">{t.promptReady}</h3>
                    <p className="text-sm text-slate-500 max-w-[200px] mx-auto leading-relaxed">
                      {t.promptReadyDesc}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      {enableDynamicTeam && (
                        <div className="inline-flex items-center gap-1 bg-purple-900/50 border border-purple-500/50 text-purple-300 px-2 py-1 rounded text-xs animate-bounce delay-75">
                          <Users className="w-3 h-3" />
                          {t.promptReadyDynamic}
                        </div>
                      )}
                      {enableSRE && (
                        <div className="inline-flex items-center gap-1 bg-indigo-900/50 border border-indigo-500/50 text-indigo-300 px-2 py-1 rounded text-xs animate-bounce">
                          <Activity className="w-3 h-3" />
                          {t.promptReadySRE}
                        </div>
                      )}
                      {enablePlain && (
                        <div className="inline-flex items-center gap-1 bg-amber-900/50 border border-amber-500/50 text-amber-300 px-2 py-1 rounded text-xs animate-bounce delay-100">
                          <Coffee className="w-3 h-3" />
                          {t.promptReadyPlain}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="p-4 border-t border-slate-700 bg-black/20">
                <button onClick={copyToClipboard} className={`w-full py-4 rounded-lg font-bold flex justify-center items-center gap-2 transition-all transform active:scale-95 shadow-lg ${copyFeedback ? 'bg-green-600' : currentTheme.button} text-white`}>
                  {copyFeedback ? <><CheckCircle className="w-5 h-5" /> {t.copied}</> : <><Copy className="w-5 h-5" /> {t.copyPrompt}</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div >

      {/* Manual Modal */}
      {
        showManual && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className={`w-full max-w-3xl ${currentTheme.cardBg} border ${currentTheme.border} rounded-2xl shadow-2xl max-h-[80vh] flex flex-col`}>
              <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                  <HelpCircle className="w-6 h-6 text-blue-400" />
                  {t.manualTitle}
                </h2>
                <button onClick={() => setShowManual(false)} className="text-slate-400 hover:text-white"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-6 overflow-y-auto text-slate-300 space-y-6 custom-scrollbar leading-relaxed">
                {lang === 'zh' ? (
                  <>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">1. 核心概念</h3>
                      <p>VTCC 是一個<strong>「萬用型多智能體指揮中心」</strong>。它不只能處理軟體開發，更能解決生活、商業或科學上的任何複雜決策。</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
                        <strong className="text-blue-400">🔨 創新/執行模式</strong>
                        <p className="text-sm mt-1">用於「創造與執行」。規劃新計畫、寫企劃書、解決具體困難。團隊會專注於實踐與效益。</p>
                      </div>
                      <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
                        <strong className="text-green-400">🛡️ 風險/審計模式</strong>
                        <p className="text-sm mt-1">用於「找碴與風控」。審查合約、評估投資風險、安全檢查。團隊會全面質疑，確保萬無一失。</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">2. 進階功能：AI 動態組隊</h3>
                      <p className="text-sm">開啟 <strong>Dynamic Team</strong> 後，AI 會根據您的任務主旨（如：煮紅酒燉牛肉、購買加密貨幣、應徵跨國企業），自動在 Phase 0 招募該領域的全球頂尖專家，打造百分之百契合的智囊團。</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">3. 使用流程</h3>
                      <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>輸入您的<strong>「任務主旨」</strong>（任何問題皆可）。</li>
                        <li>開啟<strong>「AI 動態組建團隊」</strong>獲得最精準的專家建議。</li>
                        <li>(選用) 啟用<strong>「SRE 維運」</strong>（產出監控指標）或<strong>「白話文報告」</strong>（更精鍊的結論）。</li>
                        <li>複製指令並貼給 ChatGPT/Gemini，它將會開始這場虛擬決策會議。</li>
                      </ol>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">1. Core Concept</h3>
                      <p>VTCC is a <strong>Universal Multi-Agent Command Center</strong> for any complex decision-making, from software to business strategy or life planning.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
                        <strong className="text-blue-400">🔨 Creator Mode</strong>
                        <p className="text-sm mt-1">For creation and execution. Planning projects, proposals, solving problems.</p>
                      </div>
                      <div className="bg-slate-900/50 p-3 rounded border border-slate-700">
                        <strong className="text-green-400">🛡️ Auditor Mode</strong>
                        <p className="text-sm mt-1">For risk assessment and auditing. Contract review, investment risks, safety checks.</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">2. Dynamic Recruitment</h3>
                      <p className="text-sm">With <strong>Dynamic Team</strong> enabled, the AI will recruit 7 domain-specific experts at Phase 0, perfectly tailored to your unique mission.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">3. How to Use</h3>
                      <ol className="list-decimal list-inside space-y-2 text-sm">
                        <li>Enter your <strong>Mission</strong> (Any topic).</li>
                        <li>Toggle <strong>"AI Dynamic Recruitment"</strong> for specialized expertise.</li>
                        <li>(Optional) Toggle <strong>"SRE Schema"</strong> or <strong>"Plain Language Report"</strong>.</li>
                        <li>Copy the prompt and paste it to ChatGPT/Gemini to start the virtual conference.</li>
                      </ol>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};

// Sub-component
const RosterGroup = ({ title, list, toggle, theme, t }) => (
  <div className={`border ${theme.border} rounded-lg overflow-hidden`}>
    <div className="bg-black/20 px-3 py-2 text-xs font-bold uppercase text-slate-500 flex justify-between">
      <span>{title}</span>
      <span>{list.filter(m => m.active).length} {t.active}</span>
    </div>
    <div>
      {list.map(m => (
        <div key={m.id} onClick={() => toggle(list, () => { }, m.id)} className={`px-3 py-2 border-b ${theme.border} last:border-0 flex items-center gap-3 cursor-pointer hover:bg-white/5 transition-colors ${!m.active && 'opacity-40 grayscale'}`}>
          <div className={`w-2 h-2 rounded-full ${m.active ? 'bg-green-500' : 'bg-slate-600'}`} />
          <span className="text-lg">{m.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium flex items-center gap-2">
              {m.name}
            </div>
            <div className="text-xs text-slate-400 opacity-80 truncate" title={m.desc}>
              {m.desc}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default VirtualTeamBuilder;