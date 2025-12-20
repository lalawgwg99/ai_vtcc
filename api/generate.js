import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * VTCC v5.0 - Gemini API 生成端點
 * Vercel Serverless Function
 */

export default async function handler(req, res) {
    // CORS 設定
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { mission, agents, risk, tags, enableSRE, enablePlain } = req.body;

        // 驗證輸入
        if (!mission || !agents) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        // 初始化 Gemini
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash-thinking-exp-1219',
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 8192,
            }
        });

        // 執行完整分析
        const report = await runPromptChain(model, {
            mission,
            agents,
            risk,
            tags,
            enableSRE,
            enablePlain
        });

        return res.status(200).json({
            success: true,
            report,
            metadata: {
                generatedAt: new Date().toISOString(),
                model: 'gemini-2.0-flash-thinking-exp-1219'
            }
        });

    } catch (error) {
        console.error('Generation error:', error);
        return res.status(500).json({
            error: 'Generation failed',
            message: error.message
        });
    }
}

/**
 * 執行 5 階段 Prompt Chain
 */
async function runPromptChain(model, config) {
    const { mission, agents, risk, tags, enableSRE, enablePlain, enableDynamicTeam } = config;

    const report = {
        phase0: null,
        phase1: null,
        phase2: null,
        phase3: null,
        phase4: null,
        phase5: null,
        metadata: { startTime: Date.now() }
    };

    // 建立初始 Prompt
    const initialPrompt = buildInitialPrompt({ mission, agents, risk, tags, enableSRE, enablePlain, enableDynamicTeam });

    // 建立 Chat Session
    const chat = model.startChat({
        history: [],
        generationConfig: {
            maxOutputTokens: 8192,
        }
    });

    // Phase 1 (或 Phase 0): 初始化與評估/組隊
    const result1 = await chat.sendMessage(initialPrompt);
    const firstResponse = result1.response.text();

    if (enableDynamicTeam) {
        report.phase0 = firstResponse;
        // 如果有 Phase 0，則需要手動啟動 Phase 1
        const resultPhase1 = await chat.sendMessage("請根據剛組建的動態團隊，開始 Phase 1: 團隊初步評估 (Evaluation)。");
        report.phase1 = resultPhase1.response.text();
    } else {
        report.phase1 = firstResponse;
    }

    // Phase 2: 衝突、質疑與對抗
    const result2 = await chat.sendMessage(
        "請繼續 Phase 2: 衝突、質疑與對抗 (Debate)。成員之間必須有針對性的質疑與火花，挑戰彼此的假設。"
    );
    report.phase2 = result2.response.text();

    // Phase 3: 加權投票與否決權
    const result3 = await chat.sendMessage(
        "請繼續 Phase 3: 加權投票與否決權 (Voting)。模擬計算最終加權得分，並檢查是否有核心成員行使一票否決。"
    );
    report.phase3 = result3.response.text();

    // Phase 4: 執行摘要與 GO/NO-GO 建言
    const result4 = await chat.sendMessage(
        "請繼續 Phase 4: 執行摘要與 GO/NO-GO 建言 (Summary)。給出明確的行動建議。"
    );
    report.phase4 = result4.response.text();

    // Phase 5: 商業價值與白話文報告（選用）
    if (enablePlain) {
        const result5 = await chat.sendMessage(
            "請繼續 Phase 5: 商業價值與白話文報告 (Strategic Report)。由行銷公關撰寫給 BOSS 看的最終總結，禁止專業術語，專注於 ROI 與風險比喻。"
        );
        report.phase5 = result5.response.text();
    }

    report.metadata.endTime = Date.now();
    report.metadata.duration = report.metadata.endTime - report.metadata.startTime;

    return report;
}

/**
 * 建立初始 System Prompt
 */
function buildInitialPrompt({ mission, agents, risk, tags, enableSRE, enablePlain, enableDynamicTeam }) {
    const agentProfiles = agents.map(a => {
        return `- ${a.icon} **${a.name}** (${a.role})
  - **Auth**: ${a.authority}, **RiskTol**: ${a.personality?.riskTolerance || 0.5}
  - **Bias**: Prefers [${a.decisionBias?.prefers?.join(', ') || ''}], Avoids [${a.decisionBias?.avoids?.join(', ') || ''}]
  - **RedFlags**: [${a.decisionBias?.redFlags?.join(', ') || ''}]
  - **Desc**: ${a.desc}`;
    }).join('\n');

    let dynamicModule = '';
    if (enableDynamicTeam) {
        dynamicModule = `
### 🔄 Phase 0: 動態專家招募 (Dynamic Recruitment)
**指令**：請忽略預設角色。基於當前任務的領域（如：法律、醫學、商業、科學等），請自行定義 **7 位** 該領域最具權威的虛擬專家角色。
接下來的流程請使用這批新招募的專家。
`;
    }

    let sreModule = '';
    if (enableSRE) {
        sreModule = `
### 📊 監控與維運 (Monitoring & SRE)
團隊已啟用 SRE 協議。請在輸出中包含「即時監控儀表板定義」，列出關鍵 Metrics 與 Alert 條件。
`;
    }

    let plainModule = '';
    if (enablePlain) {
        plainModule = `
### ☕ 商業價值與白話文報告 (Strategic Value Report)
請追加 **Phase 5**，由行銷專家撰寫一份「給真人老闆看的結案報告」。禁止專業術語，專注於價值、風險比喻與執行建議。
`;
    }

    return `**[SYSTEM START: AI_VIRTUAL_COMMAND_CENTER_v5]**

請初始化「全領域多智能體決策引擎」。
當前任務/提案：**${mission}**
提案風險值 (0-1): **${risk}**
提案標籤: **[${tags.join(', ')}]**

---

${enableDynamicTeam ? dynamicModule : `### 🧠 預設智能體架構 (Agent Schema)\n${agentProfiles}`}
${sreModule}
${plainModule}
---

### 🔄 決策模擬流程 (Simulation Protocol)
每個階段請保持高度的領域專業性，成員之間要有真實的辯論火花。

${enableDynamicTeam ? '請先執行 Phase 0：組建團隊。' : '請直接開始 Phase 1 的初步評估。'}`;
}
