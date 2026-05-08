/* Ju / Orange-Studio personal homepage — zh / en / ja / ko */
(function () {
  var STORAGE_KEY = "echo-island-lang";

  var DICT = {
    zh: {
      metaDesc:
        "橘 Ju · Orange-Studio — AI 建站与自动化、UE5、艾可岛企划；开放项目委托、投资与合作洽谈。",
      title: "橘 Ju｜Orange-Studio · 个人主页",
      skip: "跳到主要内容",
      navMenu: "菜单",
      navTop: "首页",
      navAbout: "关于",
      navSkills: "技能",
      navWork: "作品",
      navContact: "联系",
      langLabel: "界面语言",
      navAria: "主导航",
      orbitAria: "首屏 · 介绍与实时预览",
      announceText:
        "Orange-Studio · 开放项目委托 · 投资与合作洽谈 · 微信 Oz2888888",
      heroKicker: "独立创作者 · 一人公司",
      heroName: "橘",
      heroNameEn: "Ju",
      heroRole:
        "AI 建站与流程自动化 · UE5 独立游戏 · 艾可岛 Echo Island",
      heroLead:
        "你好，我是<strong>橘</strong>，<strong>Orange-Studio</strong> 主理人。我这边主线是 <strong>AI 方向的网站落地与流程自动化</strong>，同时推进 <strong>UE5 独立游戏《归虚》</strong>，以及社交向企划 <strong>艾可岛 Echo Island</strong>（一座「听得见回声」的虚拟小岛与陪伴型叙事）。<br /><br />目前<strong>对外开放</strong>：<strong>项目委托与服务接入</strong>；<strong>艾可岛及相关企划</strong>也欢迎<strong>投资与合作洽谈</strong>——具体范围与材料我们通过邮件或微信一对一沟通。",
      heroCtaContact: "合作咨询",
      heroCtaWork: "查看作品",
      heroMail: "发邮件",
      heroScrollSkills: "技能栈",
      islandVideoAria: "艾可岛球幕循环影像",
      islandWhisper: "艾可岛 · 球幕里的循环影像——叙事的一部分。",
      aikoWhisper: "角色艾可 · 可拖拽的 GLB 预览。",
      modelAltAiko: "艾可 Echo",
      islandImgAlt: "",
      islandTabsAria: "艾可岛展示模式",
      islandTabVideo: "循环影像",
      islandTabGlb: "3D 岛屿 GLB",
      islandModeHint:
        "「循环影像」与「3D 岛屿 GLB」可切换；岛屿模型文件为 echo-island.glb（本站 assets）。",
      modelAltIsland: "艾可岛 · 可旋转岛屿模型（echo-island.glb）",
      exploreH: "可探索的岛 · 点一点小屋",
      exploreLead:
        "示意<strong>热点 → 切面阅读</strong>：访客不只看到成片与建模，还能完成一次「点开—读懂结构」的路径。（插画为快速演示稿，可替换成你的 UE / App 真画面。）",
      exploreMapAlt: "艾可岛外景示意地图",
      exploreHotspotHouse: "岛上小屋",
      exploreFoot:
        "若要升级到「真·产品体验」，可把热点接入真实关卡流、商店截图墙或 WebGL 行走相机；商务与技术边界私信对齐即可。",
      exploreCloseAria: "关闭切面说明",
      exploreCutawayAlt: "小屋切面示意插画",
      exploreDialogTitle: "小屋切面（可读的空间）",
      exploreDialogBody:
        "演示链路：<strong>地图热点 → 弹出信息层 → 剖面/室内阅读</strong>。你可换成关卡纵剖、关卡平面图、角色设定层或 App 关键屏。",
      aboutH: "关于",
      aboutP:
        "我这个人<strong>想法比较多</strong>，也更愿意把点子落成<strong>能上线的产品与页面</strong>——做过站点、自动化流程，也在啃 UE5 与 3D 管线。平时会从 <strong>GitHub</strong> 和当下的前端实践里持续吸收有用的东西，包括<strong>现代的界面审美与信息层级</strong>，但最终交付一定是为你的场景裁剪过的，而不是把教程抄一页给大家看。",
      contactDirect:
        "<strong>想聊合作、投资，或技术接入？</strong>请加微信 <strong>Oz2888888</strong>，或手机 / 短信 <strong>+86&nbsp;155&nbsp;5906&nbsp;8707</strong>。涉及<strong>部署方案、内部资料包</strong>（例如 Agent / OpenClaw 一类场景）<strong>不在网站公开发布</strong>，适合在确认意向后再单独提供。",
      skillsH: "技能与工具",
      skillsLead:
        "以下为常用能力与工具栈，具体方案按项目单独评估与报价。",
      workH: "作品与企划",
      workLead:
        "当前对外展示的主轴方向；若你希望看更贴近业务的 demo 或商业材料，请直接微信或邮件说明行业与预算区间。",
      workTagProduct: "Product",
      workTagGame: "Game",
      workTagClient: "For hire",
      workEchoTitle: "艾可岛 Echo Island",
      workEchoDesc:
        "社交向 AI 陪伴与虚拟小岛叙事：<strong>一键进入、二次人生</strong>；首屏可见岛上的循环影像与角色艾可 GLB 预览。",
      workGuiTitle: "归虚 <span>Gui Xu · UE5</span>",
      workGuiDesc:
        "长线独立游戏方向：梦境层级、碎片与执念机制——需要时可单独展开页面或垂直切片演示。",
      workUpworkTitle: "接单与自动化",
      workUpworkDesc:
        "<strong>AI 建站</strong>、落地页与组件化界面；<strong>流程自动化</strong>与工具链拼接。英语沟通与交付节奏可按 Upwork 习惯来。",
      flipbookH: "艾可岛 · 掌上小样画册",
      flipbookLead:
        "翻页式介绍（素材来自本站已有视觉；你可随时换成真实 App 截图）。拖拽页角翻页。",
      flipHint: "提示：在书页两侧空白或角落拖动即可翻页。",
      flipFallbackNote:
        "静态预览（系统开启了「减少动态效果」或翻页脚本未加载时的备选）。",
      flipCoverKicker: "Echo Island",
      flipCoverTitle: "企划视觉小样",
      flipCoverSub: "占位画册 · 可替换 App 真机截图",
      flipCapConcept: "概念气氛 · AI 概念稿",
      flipCapPoster: "主视觉海报",
      flipCapIsland: "岛屿镜头 · 静态帧",
      flipCapAlt: "备选画面",
      flipBackTitle: "下一步",
      flipBackHtml:
        "把本画册里的图片换成你的 <strong>App Store / 安卓应用截图</strong>，就能变成「真·应用介绍」。合作咨询微信 <strong>Oz2888888</strong>。",
      flipCap1: "概念稿",
      flipCap2: "海报",
      flipCap3: "岛屿帧",
      flipCap4: "备选",
      marquee:
        "ORANGE STUDIO · JU · AI WEB · AUTOMATION · UE5 · ECHO ISLAND · GUI XU · ",
      moreH: "合作与接入",
      moreLead:
        "本站只展示能力与方向；具体需求、报价与交付边界，默认通过微信或邮件先对齐，再进入资料与合同环节。",
      moreC1h: "投资与共创",
      moreC1p:
        "艾可岛及相关企划接受<strong>投融资与战略合作</strong>洽谈。商业计划、里程碑与数据材料在意向确认后另行发送，不在此公开发布。",
      moreC2h: "委托与技术支持",
      moreC2p:
        "网站落地、自动化、部署与运维类需求可预约沟通。<strong>不提供</strong>面向匿名访客的全套内部讲义或资料包下载；深度文档与打包交付仅在商务框架内提供。",
      trustKicker: "WHY REACH OUT",
      trustH: "为什么建议先私信沟通",
      trust1h: "对齐场景",
      trust1p:
        "同样叫「自动化」或「Agent」，落地差异很大。先用一两轮对话确认你的目标、时限与约束，再决定交付形态。",
      trust2h: "资料分层",
      trust2p:
        "对外页面只放能力与案例线索；<strong>实施方案、脚本与打包资料</strong>在合作或投资意向清晰后再提供，避免无效扩散。",
      trust3h: "责任边界",
      trust3p:
        "涉及部署、账号与合规的部分，会在报价与合同里写清范围；不把「整包知识」当作公开福利散发。",
      ctH: "联系",
      ctLead:
        "提交后用邮件客户端打开（标题随界面语言变化）。也可直接加微信 <strong>Oz2888888</strong> 或致电 <strong>+86&nbsp;155&nbsp;5906&nbsp;8707</strong>。",
      fName: "称呼",
      fEmail: "邮箱",
      fOrg: "机构（可选）",
      fTopic: "议题",
      fTopic0: "选择",
      fTopic1: "项目委托",
      fTopicInvest: "投资洽谈",
      fTopic2: "合作 / 交流",
      fTopic3: "艾可岛相关",
      fTopic4: "其他",
      fMsg: "留言",
      fSend: "发送",
      mailFormSubject: "Orange-Studio · 联系",
      footTagline: "橘 Ju · 一人公司 · AI 与 UE5 双主线",
      footExplore: "浏览",
      footContactTitle: "联系",
      footContactBlock:
        "<a href=\"mailto:zht1427639560@outlook.com\">zht1427639560@outlook.com</a><br />微信：<strong>Oz2888888</strong><br />手机：<a href=\"tel:+8615559068707\">+86&nbsp;155&nbsp;5906&nbsp;8707</a>",
      footPayNote: "本站为静态展示页；方案与资料包请私信索取。",
      footer: "Orange-Studio · Ju",
    },
    en: {
      metaDesc:
        "Ju · Orange-Studio — AI web & automation, UE5, Echo Island; open for commissions, investment & partnerships.",
      title: "Ju｜Orange-Studio · Personal site",
      skip: "Skip to content",
      navMenu: "Menu",
      navTop: "Home",
      navAbout: "About",
      navSkills: "Skills",
      navWork: "Work",
      navContact: "Contact",
      langLabel: "Language",
      navAria: "Primary navigation",
      orbitAria: "Hero · intro and live previews",
      announceText:
        "Orange-Studio · commissions · investment & partnerships · WeChat Oz2888888",
      heroKicker: "Solo creator · one-person studio",
      heroName: "Ju",
      heroNameEn: "橘",
      heroRole:
        "AI web & workflow automation · UE5 indie game · Echo Island",
      heroLead:
        "Hi — I’m <strong>Ju</strong>, founder of <strong>Orange-Studio</strong>. I ship <strong>AI-forward websites and automation</strong>, develop the <strong>UE5 indie game <em>Gui Xu</em></strong>, and run the <strong>Echo Island</strong> concept — a companion-AI narrative around a small virtual islet.<br /><br />I’m <strong>open</strong> for <strong>client work & service engagements</strong>; Echo Island and related initiatives also welcome <strong>investment & partnership</strong> conversations — scope and materials after we align privately via email or WeChat.",
      heroCtaContact: "Work with me",
      heroCtaWork: "See work",
      heroMail: "Email",
      heroScrollSkills: "Skills",
      islandVideoAria: "Echo Island looping sphere video",
      islandWhisper: "Echo Island · looping footage inside the sphere.",
      aikoWhisper: "Echo · draggable GLB preview.",
      modelAltAiko: "Echo companion",
      islandImgAlt: "",
      islandTabsAria: "Echo Island display mode",
      islandTabVideo: "Loop video",
      islandTabGlb: "Island GLB",
      islandModeHint:
        "Toggle loop footage vs the downloadable island mesh (assets/echo-island.glb).",
      modelAltIsland: "Echo Island · orbitable island mesh (echo-island.glb)",
      exploreH: "Tiny island you can poke · tap the house",
      exploreLead:
        "A lightweight <strong>hotspot → cross-section read</strong> pattern so visitors don’t only passively watch video/GLB.",
      exploreMapAlt: "Stylized exterior map for the Echo Island demo",
      exploreHotspotHouse: "House",
      exploreFoot:
        "Art here is fast generated polish for the web demo — swap for UE captures, store shots, or branded boards anytime.",
      exploreCloseAria: "Close cutaway panel",
      exploreCutawayAlt: "Illustrated dollhouse-style cutaway interior",
      exploreDialogTitle: "House cutaway (readable space)",
      exploreDialogBody:
        "Shows the interaction spine: <strong>hotspot → overlay → deeper visual read</strong>. Replace with level slices, UX storyboards, or hero screens.",
      aboutH: "About",
      aboutP:
        "I’m <strong>idea-heavy</strong> and like turning concepts into <strong>real products and pages</strong> — sites, automation flows, plus UE5 / 3D pipelines in progress. I keep learning from <strong>GitHub</strong> and modern front-end practice (including <strong>UI hierarchy & polish</strong>), but delivery stays tailored to your context — not a public tutorial dump.",
      contactDirect:
        "<strong>Commission, investment, or technical onboarding?</strong> WeChat <strong>Oz2888888</strong>, or call / text <strong>+86&nbsp;155&nbsp;5906&nbsp;8707</strong>. <strong>Deployment packs and internal docs</strong> (e.g. Agent / OpenClaw-style setups) are <strong>not posted publicly</strong> — shared after intent is clear.",
      skillsH: "Skills & tools",
      skillsLead:
        "Representative stack — scope, estimate, and boundaries are defined per project.",
      workH: "Projects",
      workLead:
        "Flagship directions shown here; for demos or decks closer to your industry and budget, ping me on WeChat or email first.",
      workTagProduct: "Product",
      workTagGame: "Game",
      workTagClient: "For hire",
      workEchoTitle: "Echo Island",
      workEchoDesc:
        "Social AI companion + pocket island narrative; the hero shows looping island footage and an Echo GLB preview.",
      workGuiTitle: "Gui Xu <span>UE5</span>",
      workGuiDesc:
        "Long-horizon indie game — dream layers, fragments, obsession loop; can branch into its own page or vertical slice.",
      workUpworkTitle: "Client & automation",
      workUpworkDesc:
        "<strong>AI-assisted sites</strong>, landing pages, UI components; <strong>automation</strong> and toolchain glue. English-friendly delivery cadence.",
      flipbookH: "Echo Island · pocket flipbook",
      flipbookLead:
        "A quick page-flip walkthrough using visuals already on this site — swap in real app screenshots anytime.",
      flipHint: "Drag near the page edges or corners to flip.",
      flipFallbackNote:
        "Static gallery (reduced motion enabled or flip script unavailable).",
      flipCoverKicker: "Echo Island",
      flipCoverTitle: "Visual sampler",
      flipCoverSub: "Placeholder spreads · swap for real device captures",
      flipCapConcept: "Mood concept · AI render",
      flipCapPoster: "Key art poster",
      flipCapIsland: "Island frame · still",
      flipCapAlt: "Alternate shot",
      flipBackTitle: "Next step",
      flipBackHtml:
        "Replace these panels with your <strong>App Store / Play Store captures</strong> for a real product story. Collabs: WeChat <strong>Oz2888888</strong>.",
      flipCap1: "Concept",
      flipCap2: "Poster",
      flipCap3: "Island",
      flipCap4: "Alt",
      marquee:
        "ORANGE STUDIO · JU · AI WEB · AUTOMATION · UE5 · ECHO ISLAND · GUI XU · ",
      moreH: "Collaboration",
      moreLead:
        "This site is a capability overview only — pricing, scope, and paperwork come after a quick private alignment.",
      moreC1h: "Investment & co-creation",
      moreC1p:
        "Echo Island and related initiatives welcome <strong>funding & strategic partnership</strong> talks — decks and metrics are shared once intent is mutual, not dumped publicly.",
      moreC2h: "Client work & tech support",
      moreC2p:
        "Websites, automation, deployment & ops — scheduled conversations welcome. <strong>No</strong> full internal syllabi or ZIP giveaways for anonymous traffic; deeper packs ship under a commercial frame.",
      trustKicker: "WHY REACH OUT",
      trustH: "Why DM first",
      trust1h: "Fit the scenario",
      trust1p:
        "“Automation” or “agents” mean different deliveries — a short chat nails goals, timeline, and constraints first.",
      trust2h: "Layered materials",
      trust2p:
        "Public page = skills + hooks; <strong>runbooks, scripts, and bundles</strong> after partnership or investment intent is clear — reduces noise.",
      trust3h: "Clear liability",
      trust3p:
        "Deployment, accounts, and compliance are scoped in quotes/contracts — not “free knowledge drops.”",
      ctH: "Contact",
      ctLead:
        "Submit opens your mail client (subject follows UI language). Or WeChat <strong>Oz2888888</strong> / phone <strong>+86&nbsp;155&nbsp;5906&nbsp;8707</strong>.",
      fName: "Name",
      fEmail: "Email",
      fOrg: "Organization (optional)",
      fTopic: "Topic",
      fTopic0: "Choose",
      fTopic1: "Commission",
      fTopicInvest: "Investment",
      fTopic2: "Collaboration",
      fTopic3: "Echo Island",
      fTopic4: "Other",
      fMsg: "Message",
      fSend: "Send",
      mailFormSubject: "Orange-Studio · Inquiry",
      footTagline: "Ju · solo studio · AI & UE5 threads",
      footExplore: "Explore",
      footContactTitle: "Contact",
      footContactBlock:
        "<a href=\"mailto:zht1427639560@outlook.com\">zht1427639560@outlook.com</a><br />WeChat: <strong>Oz2888888</strong><br />Phone: <a href=\"tel:+8615559068707\">+86&nbsp;155&nbsp;5906&nbsp;8707</a>",
      footPayNote: "Static showcase — decks & packs on request via DM.",
      footer: "Orange-Studio · Ju",
    },
    ja: {
      metaDesc:
        "Ju · Orange-Studio — AIウェブ・自動化、UE5、エコアイランド；受託・投資・協業の相談可。",
      title: "Ju｜Orange-Studio · 個人サイト",
      skip: "本文へ",
      navMenu: "メニュー",
      navTop: "ホーム",
      navAbout: "について",
      navSkills: "スキル",
      navWork: "作品",
      navContact: "連絡",
      langLabel: "表示言語",
      navAria: "メインナビ",
      orbitAria: "ヒーロー · 紹介とプレビュー",
      announceText:
        "Orange-Studio · 受託 · 投資/協業 · WeChat Oz2888888",
      heroKicker: "個人クリエイター · 一人会社",
      heroName: "橘",
      heroNameEn: "Ju",
      heroRole:
        "AIウェブと業務自動化 · UE5インディー · エコアイランド",
      heroLead:
        "はじめまして、<strong>橘（Ju）</strong>。<strong>Orange-Studio</strong> 代表です。主軸は <strong>AI寄りのサイト実装と自動化</strong>、並行して <strong>UE5インディー『帰虚』</strong> と、<strong>エコアイランド</strong>（こだまの小さな島とコンパニオンAIの企画）を進めています。<br /><br /><strong>受託・サービス提供</strong>に加え、<strong>エコアイランド関連は投資・協業</strong>の相談も歓迎です。範囲と資料はメール/WeChatで個別にご案内します。",
      heroCtaContact: "相談する",
      heroCtaWork: "作品を見る",
      heroMail: "メール",
      heroScrollSkills: "スキル",
      islandVideoAria: "エコアイランド球面ループ映像",
      islandWhisper: "エコアイランド · 球体内のループ映像。",
      aikoWhisper: "エコ · ドラッグ可能なGLB。",
      modelAltAiko: "エコ",
      islandImgAlt: "",
      islandTabsAria: "エコアイランド表示モード",
      islandTabVideo: "ループ映像",
      islandTabGlb: "島GLB",
      islandModeHint:
        "ループ映像と3D島モデル（assets/echo-island.glb）を切替できます。",
      modelAltIsland: "エコアイランド · 回転可能な島メッシュ",
      exploreH: "探索できる島 · 家をタップ",
      exploreLead:
        "ホットスポット→断面ビューの<strong>示意インタラクション</strong>（デモ用イラスト、後で差し替え可）。",
      exploreMapAlt: "エコアイランド外景マップ（デモ）",
      exploreHotspotHouse: "小屋",
      exploreFoot:
        "本番ではUEキャプチャやアプリ画面に差し替え可能。詳細は個別相談。",
      exploreCloseAria: "断面パネルを閉じる",
      exploreCutawayAlt: "小屋の断面イメージ",
      exploreDialogTitle: "小屋断面（空間の読み）",
      exploreDialogBody:
        "ホットスポット→情報レイヤ→断面という流れのデモです。",
      aboutH: "について",
      aboutP:
        "アイデアが多く、<strong>プロダクトやページとして形にする</strong>ことに強みがあります。サイト・自動化・UE5/3Dも進行中。<strong>GitHub</strong>や現代的なフロント実践から<strong>UIの見せ方や情報設計</strong>も取り入れますが、公開ページでチュートリアルを丸ごと晒すことはしません。",
      contactDirect:
        "<strong>協業・投資・技術導入</strong>は WeChat <strong>Oz2888888</strong>、または電話/SMS <strong>+86&nbsp;155&nbsp;5906&nbsp;8707</strong>。<strong>OpenClaw等のデプロイ資料パック</strong>は<strong>サイトでは公開せず</strong>、意向確認後に個別提供します。",
      skillsH: "スキルとツール",
      skillsLead:
        "代表的なスタックです。見積り・範囲は案件ごとに確定します。",
      workH: "プロジェクト",
      workLead:
        "対外の主軸。業界・予算に近いデモや資料が必要な場合は、まずWeChat/メールでご連絡ください。",
      workTagProduct: "プロダクト",
      workTagGame: "ゲーム",
      workTagClient: "受託",
      workEchoTitle: "エコアイランド Echo Island",
      workEchoDesc:
        "ソーシャルAIと島のナラティブ。<strong>ワンタップでセカンドライフ</strong>。ヒーローで島のループ映像とエコGLBを確認できます。",
      workGuiTitle: "帰虚 <span>Gui Xu · UE5</span>",
      workGuiDesc:
        "長期IP · 夢の階層/欠片/執念ループ。必要なら独立ページへ。",
      workUpworkTitle: "受託 · 自動化",
      workUpworkDesc:
        "<strong>AIウェブ</strong>、LP、UI。<strong>自動化</strong>とツール連携。英語でのやり取りも可能。",
      flipbookH: "エコアイランド · ミニブック",
      flipbookLead:
        "ページめくりデモ（素材は既存ビジュアル。アプリ画面に差し替え可能）。",
      flipHint: "ページ端や角をドラッグしてめくれます。",
      flipFallbackNote:
        "静的表示（視差効果を減らす設定、またはスクリプト未読込時）。",
      flipCoverKicker: "Echo Island",
      flipCoverTitle: "ビジュアルサンプル",
      flipCoverSub: "プレースホルダー · 実機スクショに置換可",
      flipCapConcept: "コンセプト · AIイメージ",
      flipCapPoster: "キービジュアル",
      flipCapIsland: "島のカット · 静止画",
      flipCapAlt: "別カット",
      flipBackTitle: "次の一歩",
      flipBackHtml:
        "ここを<strong>ストアのスクショ</strong>に差し替えれば製品紹介に。WeChat <strong>Oz2888888</strong>。",
      flipCap1: "コンセプト",
      flipCap2: "KV",
      flipCap3: "島",
      flipCap4: "別画",
      marquee:
        "ORANGE STUDIO · JU · AI WEB · AUTOMATION · UE5 · ECHO ISLAND · GUI XU · ",
      moreH: "協業と接続",
      moreLead:
        "本サイトは能力の概要のみ。要件・見積り・境界はWeChat/メールで握ってから資料・契約へ進みます。",
      moreC1h: "投資・共創",
      moreC1p:
        "エコアイランド等は<strong>投資・戦略提携</strong>の相談可。BPや数値は相互意向後に共有し、公開しません。",
      moreC2h: "受託・技術支援",
      moreC2p:
        "サイト・自動化・運用などは面談ベース。<strong>匿名向けの教材一式ダウンロードは提供しません</strong>。詳細パックは商談枠内のみ。",
      trustKicker: "WHY REACH OUT",
      trustH: "まずDMを勧める理由",
      trust1h: "シナリオのすり合わせ",
      trust1p:
        "「自動化」も「Agent」も案件で中身が変わる。目的・期限・制約を短い対話で確定します。",
      trust2h: "資料の段階分け",
      trust2p:
        "公開は能力と手がかりのみ。<strong>手順書・スクリプト・ZIP</strong>は協業/投資の意志が明確になってから。",
      trust3h: "責任範囲",
      trust3p:
        "デプロイやアカウント・コンプラは見積り/契約で明文化。知識の無償ばらまきはしません。",
      ctH: "連絡",
      ctLead:
        "送信でメールアプリ（件名は言語連動）。または WeChat <strong>Oz2888888</strong> / <strong>+86&nbsp;155&nbsp;5906&nbsp;8707</strong>。",
      fName: "お名前",
      fEmail: "メール",
      fOrg: "組織（任意）",
      fTopic: "件名",
      fTopic0: "選択",
      fTopic1: "案件依頼",
      fTopicInvest: "投資相談",
      fTopic2: "協業",
      fTopic3: "エコアイランド",
      fTopic4: "その他",
      fMsg: "メッセージ",
      fSend: "送信",
      mailFormSubject: "Orange-Studio · お問い合わせ",
      footTagline: "Ju · 一人会社 · AIとUE5",
      footExplore: "リンク",
      footContactTitle: "連絡先",
      footContactBlock:
        "<a href=\"mailto:zht1427639560@outlook.com\">zht1427639560@outlook.com</a><br />WeChat: <strong>Oz2888888</strong><br />電話: <a href=\"tel:+8615559068707\">+86&nbsp;155&nbsp;5906&nbsp;8707</a>",
      footPayNote: "静的紹介ページ。資料はDMで。",
      footer: "Orange-Studio · Ju",
    },
    ko: {
      metaDesc:
        "Ju · Orange-Studio — AI 웹·자동화, UE5, 에코 아일랜드; 의뢰·투자·협업 문의 가능.",
      title: "Ju｜Orange-Studio · 개인 사이트",
      skip: "본문으로",
      navMenu: "메뉴",
      navTop: "홈",
      navAbout: "소개",
      navSkills: "스킬",
      navWork: "작업",
      navContact: "문의",
      langLabel: "언어",
      navAria: "주 내비게이션",
      orbitAria: "히어로 · 소개와 미리보기",
      announceText:
        "Orange-Studio · 의뢰 · 투자/협업 · WeChat Oz2888888",
      heroKicker: "1인 창작자 · 1인 회사",
      heroName: "橘",
      heroNameEn: "Ju",
      heroRole:
        "AI 웹 · 워크플로 자동화 · UE5 인디 · 에코 아일랜드",
      heroLead:
        "안녕하세요, <strong>橘 Ju</strong> — <strong>Orange-Studio</strong> 입니다. <strong>AI 웹 구현과 자동화</strong>, <strong>UE5 인디 『귀허』</strong>, 그리고 <strong>에코 아일랜드</strong>(메아리 같은 작은 섬과 동반 AI 서사)를 함께 밀고 있습니다.<br /><br /><strong>외주·서비스 연계</strong>를 받고 있으며, <strong>에코 아일랜드 관련 투자·협업</strong>도 환영합니다. 범위와 자료는 메일/WeChat으로 개별 조율합니다.",
      heroCtaContact: "협업 문의",
      heroCtaWork: "작업 보기",
      heroMail: "메일",
      heroScrollSkills: "스킬",
      islandVideoAria: "에코 아일랜드 구면 루프 영상",
      islandWhisper: "에코 아일랜드 · 구 안의 루프 영상.",
      aikoWhisper: "에코 · 드래그 가능한 GLB.",
      modelAltAiko: "에코",
      islandImgAlt: "",
      islandTabsAria: "에코 아일랜드 표시 모드",
      islandTabVideo: "루프 영상",
      islandTabGlb: "섬 GLB",
      islandModeHint:
        "루프 영상과 3D 섬 메시(assets/echo-island.glb)를 전환할 수 있습니다.",
      modelAltIsland: "에코 아일랜드 · 회전 가능한 섬 메시",
      exploreH: "탐험 섬 · 집을 눌러보기",
      exploreLead:
        "핫스팟→단면 뷰로 이어지는 <strong>체험형 데모</strong>(삽화는 빠른 시안).",
      exploreMapAlt: "에코 아일랜드 외경 맵 데모",
      exploreHotspotHouse: "오두막",
      exploreFoot:
        "실제 서비스에서는 UE 캡처·앱 화면으로 교체 가능. 상세는 DM으로.",
      exploreCloseAria: "단면 패널 닫기",
      exploreCutawayAlt: "오두막 단면 일러스트",
      exploreDialogTitle: "오두막 단면(공간 읽기)",
      exploreDialogBody:
        "핫스포트→정보 레이어→단면 읽기 흐름을 보여주는 데모입니다.",
      aboutH: "소개",
      aboutP:
        "아이디어가 많고 <strong>실제 제품·페이지로 옮기는 일</strong>을 좋아합니다. 사이트·자동화·UE5/3D도 진행 중입니다. <strong>GitHub</strong>와 최신 프론트 관행에서 <strong>UI 계층과 미적 기준</strong>을 배우지만, 공개 페이지에 튜토리얼 전체를 풀지는 않습니다.",
      contactDirect:
        "<strong>협업·투자·기술 도입</strong>은 WeChat <strong>Oz2888888</strong> 또는 전화/SMS <strong>+86&nbsp;155&nbsp;5906&nbsp;8707</strong>. <strong>OpenClaw류 배포 패키지</strong>는 <strong>사이트에 공개하지 않으며</strong> 의향 확인 후 개별 제공합니다.",
      skillsH: "스킬 · 도구",
      skillsLead:
        "대표 스택입니다. 범위·견적은 프로젝트별로 확정합니다.",
      workH: "프로젝트",
      workLead:
        "대외 메인 축입니다. 업종·예산에 맞는 데모나 자료가 필요하면 WeChat/메일로 먼저 알려주세요.",
      workTagProduct: "프로덕트",
      workTagGame: "게임",
      workTagClient: "의뢰",
      workEchoTitle: "에코 아일랜드 Echo Island",
      workEchoDesc:
        "소셜 AI와 섬 내러티브. <strong>원터치 두 번째 삶</strong>. 히어로에서 섬 루프 영상과 에코 GLB를 확인합니다.",
      workGuiTitle: "귀허 <span>Gui Xu · UE5</span>",
      workGuiDesc:
        "장기 IP · 꿈 층·조각·집착 루프. 필요 시 독립 페이지로.",
      workUpworkTitle: "의뢰 · 자동화",
      workUpworkDesc:
        "<strong>AI 웹</strong>, 랜딩, UI.<strong>자동화</strong>와 툴 연동. 영어 커뮤니케이션 가능.",
      flipbookH: "에코 아일랜드 · 플립북 데모",
      flipbookLead:
        "페이지 넘김 소개(기존 비주얼 기반, 앱 스크린으로 교체 가능).",
      flipHint: "페이지 모서리 근처를 드래그해 넘기세요.",
      flipFallbackNote:
        "정적 미리보기(모션 축소 설정 또는 스크립트 미로드).",
      flipCoverKicker: "Echo Island",
      flipCoverTitle: "비주얼 샘플",
      flipCoverSub: "플레이스홀더 · 실제 스크린샷으로 교체",
      flipCapConcept: "무드 컨셉 · AI 이미지",
      flipCapPoster: "키 비주얼 포스터",
      flipCapIsland: "섬 컷 · 스틸",
      flipCapAlt: "대체 샷",
      flipBackTitle: "다음 단계",
      flipBackHtml:
        "패널을 <strong>스토어 스크린샷</strong>으로 바꾸면 제품 소개가 됩니다. WeChat <strong>Oz2888888</strong>.",
      flipCap1: "컨셉",
      flipCap2: "포스터",
      flipCap3: "섬",
      flipCap4: "대체",
      marquee:
        "ORANGE STUDIO · JU · AI WEB · AUTOMATION · UE5 · ECHO ISLAND · GUI XU · ",
      moreH: "협업 · 연결",
      moreLead:
        "이 사이트는 역량 소개만 합니다. 요구·견적·경계는 WeChat/메일로 먼저 맞춘 뒤 자료·계약으로 갑니다.",
      moreC1h: "투자 · 공동 창작",
      moreC1p:
        "에코 아일랜드 등 <strong>투자·전략 제휴</strong> 가능. BP·지표는 상호 의향 후 공유, 공개 게시 없음.",
      moreC2h: "외주 · 기술 지원",
      moreC2p:
        "웹·자동화·운영 등 일정 협의.<strong>익명 대상 전체 강의/ZIP 무료 배포 없음</strong>. 심화 패키지는 상업 틀 안에서만.",
      trustKicker: "WHY REACH OUT",
      trustH: "먼저 DM 하는 이유",
      trust1h: "시나리오 정합",
      trust1p:
        "‘자동화’나 ‘Agent’도 프로젝트마다 다릅니다. 목표·일정·제약을 짧게 확인 후 형태 결정.",
      trust2h: "자료 단계화",
      trust2p:
        "공개 페이지는 역량과 단서만.<strong>실행안·스크립트·번들</strong>은 협업/투자 의향이 분명해진 뒤.",
      trust3h: "책임 범위",
      trust3p:
        "배포·계정·컴플라이언스는 견적/계약에 명시. 지식 무료 뿌리기 아님.",
      ctH: "문의",
      ctLead:
        "제출 시 메일 클라이언트가 열립니다(제목은 UI 언어). 또는 WeChat <strong>Oz2888888</strong> / <strong>+86&nbsp;155&nbsp;5906&nbsp;8707</strong>.",
      fName: "이름",
      fEmail: "이메일",
      fOrg: "소속 (선택)",
      fTopic: "주제",
      fTopic0: "선택",
      fTopic1: "프로젝트 의뢰",
      fTopicInvest: "투자 상담",
      fTopic2: "협업",
      fTopic3: "에코 아일랜드",
      fTopic4: "기타",
      fMsg: "메시지",
      fSend: "보내기",
      mailFormSubject: "Orange-Studio · 문의",
      footTagline: "Ju · 1인 스튜디오 · AI와 UE5",
      footExplore: "둘러보기",
      footContactTitle: "연락처",
      footContactBlock:
        "<a href=\"mailto:zht1427639560@outlook.com\">zht1427639560@outlook.com</a><br />WeChat: <strong>Oz2888888</strong><br />전화: <a href=\"tel:+8615559068707\">+86&nbsp;155&nbsp;5906&nbsp;8707</a>",
      footPayNote: "정적 소개 페이지. 자료는 DM으로 요청.",
      footer: "Orange-Studio · Ju",
    },
  };

  function getLang() {
    try {
      var s = localStorage.getItem(STORAGE_KEY);
      if (s && DICT[s]) return s;
    } catch (e) {}
    var h = document.documentElement.lang || "zh-Hans";
    if (h.startsWith("ja")) return "ja";
    if (h.startsWith("ko")) return "ko";
    if (h.startsWith("en")) return "en";
    return "zh";
  }

  function setLang(lang) {
    if (!DICT[lang]) lang = "zh";
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    apply(lang);
  }

  function apply(lang) {
    var D = DICT[lang];
    if (!D) return;

    var langHtml = {
      zh: "zh-Hans",
      en: "en",
      ja: "ja",
      ko: "ko",
    };
    document.documentElement.lang = langHtml[lang] || "zh-Hans";
    document.documentElement.setAttribute("data-lang", lang);

    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", D.metaDesc);
    document.title = D.title;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (k && D[k] !== undefined) el.textContent = D[k];
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-html");
      if (k && D[k] !== undefined) el.innerHTML = D[k];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-placeholder");
      if (k && D[k] !== undefined) el.setAttribute("placeholder", D[k]);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-aria");
      if (k && D[k] !== undefined) el.setAttribute("aria-label", D[k]);
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-alt");
      if (k && D[k] !== undefined) el.setAttribute("alt", D[k]);
    });

    var mvAiko = document.getElementById("echo-model-aiko");
    if (mvAiko && D.modelAltAiko !== undefined)
      mvAiko.setAttribute("alt", D.modelAltAiko);

    var ls = document.getElementById("lang-switch");
    if (ls && D.langLabel) ls.setAttribute("aria-label", D.langLabel);

    var deck = document.querySelector("[data-mail-deck]");
    if (deck && D.mailDeckSubject) {
      deck.setAttribute(
        "href",
        "mailto:zht1427639560@outlook.com?subject=" +
          encodeURIComponent(D.mailDeckSubject)
      );
    }

    var rootSubj = DICT[lang].mailFormSubject;
    var form = document.querySelector(".contact-form");
    if (form && rootSubj) {
      form.setAttribute("data-mail-subject", rootSubj);
    }

    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      var bLang = btn.getAttribute("data-lang-btn");
      btn.classList.toggle("is-active", bLang === lang);
      btn.setAttribute("aria-pressed", bLang === lang ? "true" : "false");
    });

    try {
      window.dispatchEvent(new CustomEvent("echo-lang-change", { detail: { lang: lang } }));
    } catch (e) {}
  }

  function bindLangButtons() {
    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lang = btn.getAttribute("data-lang-btn");
        setLang(lang);
      });
    });
  }

  window.EchoI18n = {
    apply: apply,
    setLang: setLang,
    getLang: getLang,
    init: function () {
      apply(getLang());
      bindLangButtons();
    },
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      window.EchoI18n.init();
    });
  } else {
    window.EchoI18n.init();
  }
})();
