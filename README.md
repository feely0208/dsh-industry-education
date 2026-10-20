# @deepwhale-cn/dsh-industry-education

[![Listed on dsh-plugin.org](https://dsh-plugin.org/badges/listed.svg)](https://dsh-plugin.org/zh/plugins/feely0208/dsh-industry-education)

**教育 App 上线前先过这一遍：备案号公示、备案信息表、成绩排名、广告 SDK、适龄范围、学籍号明文、儿童个人信息保护负责人。**

**关键词**：教育行业合规 · 教育移动应用备案 · 教APP备 · 学生信息保护 · 学籍号 · 未成年人保护 · 适龄提示 · 儿童个人信息保护负责人 · 成绩排名 · 广告 SDK

---

## 不装它会怎样

你的家校通 App 功能做得挺完整，作业通知、成绩查询、班级沟通都上线了。

检查来了，第一个问题不是「功能全不全」，而是：

```
「你们的教育移动应用备案号在哪公示？」
「备案信息表最近一次更新是什么时候？」
「这个班级排行榜——成绩和名次是能公开的吗？」
「App 里为什么有 AdMob？」
「面向中小学生，适龄范围写了吗？」
「学籍号怎么直接写进测试数据了？」
「儿童个人信息保护负责人是谁？」
```

这些问题一条条答不上来，就是上线卡住的地方。这个插件把其中**能静态查的 7 条**做成规则：
不查业务逻辑、不接后台、不传数据，只扫你的代码、配置与文档，告诉你「哪里像、哪里缺、请确认」。

---

## 先说清楚它是什么、不是什么

**是**：
- 一个**教育行业专项**静态检查器 —— 7 条判据，每条都指得到官方条款
- 只扫仓库里的**代码 / 配置 / 文档 / 依赖清单**，本地运行，不上传任何内容
- 命中是**提示你确认**，附「哪条法条、什么证据、怎么办」

**不是**：
- ❌ **不是合规认证** —— 它不下「合规 / 不合规」结论，也不承诺「保证通过检查」
- ❌ **不是业务功能审查** —— 不读你的数据库、不登录 App、不判断实际是否向学生展示了榜单
- ❌ **不是未成年人保护的完整实现** —— 监护人同意、儿童个人信息处理规则、青少年模式归 `dsh-minor-guard`
- ❌ **不是 APP 备案代办** —— `dsh-cn-filing` 查工信部 APP/ICP 备案公示，本插件查的是**教育移动应用**备案（教APP备）与备案信息表
- ❌ **不替代法律意见** —— 条款适用性（高校 / 职教 / 成人培训是否适用）请与法务确认

**一句话分界**：**`dsh-cn-filing` 看「有没有 APP 备案」，它看「教育行业那几条硬杠杠」。**

---

## 它查什么（7 条）

| 规则 | 查什么 | 级别 | 依据 |
|---|---|---|---|
| `EDU-APP-FILING-PUBLIC` | 关于页 / i18n / 前端资源 / app.json / Info.plist 里找不到 `教APP备NNNNNNN号` | 🔴 high | 教技厅〔2019〕3号 第十四条 |
| `EDU-APP-FILING-RECORD` | 找不到教育移动应用备案信息表（`docs/compliance/教育移动应用备案信息.md` 等） | 🟡 medium | 教技厅〔2019〕3号 第十二、十五、十七、十八条 |
| `EDU-SCORE-RANK-PUBLIC` | 代码/前端资源里出现成绩排名、名次榜单、`/score/rank`、高考喜报 / 升学率 | 🔴 high | 教育部令第50号 第十条第二款 |
| `EDU-AD-GAME-SDK` | 依赖清单里出现 AdMob / play-services-ads / 广点通 / mobads / BUAdSDK / Unity / Cocos2d | 🔴 high | 教技函〔2019〕55号 第（十一）条 |
| `EDU-AGE-RANGE-NOTICE` | 面向未成年人，但 app.json / Manifest / Info.plist / 关于页都没有适龄 / ageRating | 🟡 medium | 教技函〔2019〕55号 第（五）条 + 国令第766号 第二十八条 |
| `EDU-STUDENT-ID-EXPOSURE` | 文件里出现 `G`/`L` + 18 位 的学籍号格式 | 🔴 high | 教基一〔2013〕7号 第二十五条 |
| `EDU-CHILD-PI-OFFICER` | 文档/配置里找不到「儿童个人信息保护负责人」+ 联系方式（或 `child_pi_officer` / `dpo_contact`） | 🟡 medium | 网信办令第4号 第八条 |

### ⚠️ 行业规则都带 `when`（不适用就不跑）

这批规则**只对具备行业特征的项目生效**，不适用时会进 `notApplicable`，既不报也不假装查过：

- 第 1、2 条：项目里有移动端入口（`Info.plist` / `AndroidManifest` / `react-native` / `expo` / `uni-app` 等）才跑 —— **纯后端项目不会被误报「没公示备案号」**
- 第 3、4 条：出现教育行业信号（教育 / 学生 / 学籍 / 校园 / 学校 / 家长 / 教师 / 班级 / 课程等）才跑
- 第 5 条：出现「中小学生 / 小学 / 初中 / 高中 / 幼儿园 / 未成年」才跑 —— 高校 / 职教 / 成人培训不适用
- 第 6 条：出现教育 / 学籍 / 学生信号才跑
- 第 7 条：出现「儿童 / 未成年人 / 中小学生 / 幼儿园 / 青少年 / 14周岁」才跑 —— 不面向不满 14 周岁的项目不适用

---

## 安装

```bash
# 推荐：从市场 / GitHub 直接装进 DSH
dsh plugin --profile web add @deepwhale-cn/dsh-industry-education

# 或者只装成普通 npm 包，自己接进组合层
npm i -D @deepwhale-cn/dsh-industry-education
```

在 DSH 组合层里插入：

```yaml
- insert:
    - id: industry-education
      name: '@deepwhale-cn/dsh-industry-education'
```

## 用法

```bash
dsh-industry-education                    # 扫当前目录
dsh-industry-education --root <项目目录>   # 扫指定项目
dsh-industry-education --demo             # 内置样本，看检出效果
dsh-industry-education --json             # JSON（给 CI 二次处理）
dsh-industry-education --html report.html # HTML 报告
dsh-industry-education --list-rules       # 列出判据与出处
dsh-industry-education --quiet            # 只输出结论行
```

退出码：有 high 命中 → 1（可挂 CI 卡口）；否则 0。

---

## 怎么读结果

1. **先看扫描范围**：报告会写扫了多少文件、跑了多少条规则。如果规则数少于 7，
   说明有规则因 `when` 不适用而没跑（报告里会点名），**这不是全绿**。
2. **命中 ≠ 违规**，特别是这几条：
   - `EDU-SCORE-RANK-PUBLIC`：`rank` 可能只是数组排序变量名；命中请先看上下文
   - `EDU-AD-GAME-SDK`：**仅命中依赖名不判违规** —— 可能是历史遗留或间接依赖，
     请确认它是否真的会向学生展示广告或提供游戏
   - `EDU-STUDENT-ID-EXPOSURE`：**这是格式命中**，请确认是真实学籍号还是占位数据
   - `EDU-APP-FILING-RECORD`：备案信息表可能放在内部知识库，不在代码仓库
3. **absence 类规则整组只报一次**（第 1、5、7 条），不会按文件重复刷屏。

---

## 已知限制

- **不判断事实**：它只看仓库里有没有、像不像；后台是否真的返回了学籍号，它查不到
- **不处理否定句**：文档里写「本项目不面向未成年人」也会被当成未成年人信号（`when` 是关键词匹配）
- **有扫描盲区**：`dist/`、`build/`、`node_modules/` 等目录默认跳过；`.gradle` 文件不读内容
  （广告 SDK 检测主要靠 `package.json` / `Podfile` / `podspec`）
- **学籍号命中会显示号码片段**：样本里用的是明显伪造的 110101 段，真实扫描请自行打码保存报告
- **条款适用性需人工确认**：高校 / 职教 / 成人培训场景请先判断适用性

---

## 开发

```bash
bash tests/run.sh        # 双向验证：正例 7 条全报 + 反例 0 命中 + 纯后端不误报
```

样本目录（同时是 `--demo` 的数据源，没有第二套）：

```
tests/fixtures/fail/demo-project/     正例：教育移动端 App，7 条判据各埋一处
tests/fixtures/pass/clean-project/    反例：备案号 / 备案表 / 适龄 / 负责人 / 学籍占位号全部合规
tests/fixtures/pass/backend-only/     反例·when：成人培训纯后端，行业规则按设计不适用
```

---

## 相关插件

| 插件 | 分工 |
|---|---|
| `dsh-cn-filing` | 工信部 ICP / APP 备案公示（本插件查教育移动应用备案） |
| `dsh-minor-guard` | 监护人同意、儿童个人信息处理规则、青少年模式默认值 |
| `dsh-pipia` | 个人信息保护影响评估与处理记录 |
| `dsh-data-scan` | 更广的敏感数据扫描（身份证 / 银行卡 / 手机号等） |
| `dsh-consent-guard` | 用户同意与隐私授权流程 |

---

## 深鲸网安守护系列（共 39 个）

> 一个插件做一件事。**安全问题是链式的** —— 配套用才完整。

**国内合规**（12）｜ [等保对照](https://github.com/feely0208/dsh-cn-mlps) · [日志留存](https://github.com/feely0208/dsh-cn-log-retention) · [备案公示](https://github.com/feely0208/dsh-cn-filing) · [用户同意](https://github.com/feely0208/dsh-consent-guard) · [个人信息权利](https://github.com/feely0208/dsh-data-rights) · [未成年人保护](https://github.com/feely0208/dsh-minor-guard) · [影响评估](https://github.com/feely0208/dsh-pipia) · [数据分类分级](https://github.com/feely0208/dsh-data-classify) · [算法备案](https://github.com/feely0208/dsh-algorithm-filing) · [数据出境](https://github.com/feely0208/dsh-cn-data-export) · [国密合规](https://github.com/feely0208/dsh-cn-crypto) · [AI 内容标识](https://github.com/feely0208/dsh-cn-ai-labeling)

**AI 与 Agent 治理**（6）｜ [AI 输出信任](https://github.com/feely0208/dsh-ai-output-trust) · [外部内容信任](https://github.com/feely0208/dsh-content-trust) · [MCP 安全](https://github.com/feely0208/dsh-mcp-audit) · [Agent 权限](https://github.com/feely0208/dsh-agent-scope) · [策略核对](https://github.com/feely0208/dsh-agent-policy) · [可疑指令](https://github.com/feely0208/dsh-phishing-guard)

**数据与凭据**（5）｜ [敏感数据](https://github.com/feely0208/dsh-data-scan) · [密钥轮换](https://github.com/feely0208/dsh-key-rotate) · [数据留存](https://github.com/feely0208/dsh-data-lifecycle) · [配置审计](https://github.com/feely0208/dsh-env-audit) · [密钥扫描](https://github.com/feely0208/dsh-secret-scan)

**供应链与构建**（5）｜ [开源许可](https://github.com/feely0208/dsh-license-guard) · [依赖投毒](https://github.com/feely0208/dsh-dep-audit) · [CI 安全](https://github.com/feely0208/dsh-ci-guard) · [工具审查](https://github.com/feely0208/dsh-tool-vet) · [物料清单](https://github.com/feely0208/dsh-sbom)

**权限与应急**（3）｜ [最小权限](https://github.com/feely0208/dsh-least-privilege) · [告警外发](https://github.com/feely0208/dsh-alert-relay) · [应急证据包](https://github.com/feely0208/dsh-incident-package)

**行业专项**（4）｜ [医疗行业专项](https://github.com/feely0208/dsh-industry-medical) · [教育行业专项](https://github.com/feely0208/dsh-industry-education) · [金融行业专项](https://github.com/feely0208/dsh-industry-finance) · [地方数据条例](https://github.com/feely0208/dsh-local-regulation)

**编排与交付**（4）｜ [一键体检](https://github.com/feely0208/dsh-guard-suite) · [改前改后复核](https://github.com/feely0208/dsh-fix-verify) · [合规可交付文档](https://github.com/feely0208/dsh-compliance-doc) · [整改建议](https://github.com/feely0208/dsh-remediation)

都在 DSH 插件市场（dsh-plugin.org）、npm 和 deepwhale.org.cn/guard.html 上。

## License

MIT © 深鲸 DeepWhale
