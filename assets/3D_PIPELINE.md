# Echo Island 3D pipeline（球形主场景 + 小艾可绑骨）

**生成用快速入口（橘已备齐）：**

- `ECHO_IP_BIBLE.md` — 所有 AI 共用的 **LOCK** 文案（中英），防角色/调色漂移。  
- `AI_WORKFLOW_FREE_FIRST.md` — **免费优先** 工具顺序 + 何时值得加钱。  
- `prompts/*.txt` — Meshy / 主视觉方图 / 小艾可表 / 图生视频 / 负面词，逐条可复制。  
- `../scripts/build-hero-loop.ps1` — 有 ffmpeg 时把任意素材 **裁成 1:1 双格式** loop 用。

## 一定要建模吗？

**不一定。** Pitch / 对外网页的第一印象更多来自「美术方向是否统一 + 动效是否克制有记忆点」，而不是是否自建网格。

| 路线 | 适合场景 |
|------|-----------|
| **定制插画 + 微动效**（Rive / Lottie / 短视频 loop） | 最快做出「眼前一亮」、成本低、迭代快；社交 / 陪伴气质很容易靠平面确立。 |
| **屏录 / UI demo** | 产品已有界面时，比空场景 3D 更有说服力。 |
| **球形位放循环短视频** | 仍用现在的圆形视口，左侧换成 **透明底或球形 UV** 的 loop，交互弱一些但视觉可对齐 iPhone 地球。 |
| **自己做 / 外包 3D** | 品牌核心真的是「可逛的微缩世界」、或投放需要同名资产进 UE / 广告时再上；绑骨角色单独一条管线。 |

结论：**站点可以不依赖建模**；若艾可岛的核心卖点是「空间与陪伴场景」，再逐步加 GLB / UE 资产。

## 视频 / Lottie / 屏录 + 建模能不能同时？

**可以，而且推荐拆开用途：**

| 层 | 做什么 | 典型产出 |
|----|--------|-----------|
| **底层 loop** | 氛围、色块、云、粒子、插画动效、**UI 屏录** | `.webm` + `.mp4` 双格式（网页兼容） |
| **上层 GLB** | 可拖拽的「空间证明」、球上微缩世界 | `echo-island.glb` |
| **角标 Lottie / Rive**（可选） | 小艾可眨眼、心形、加载点缀 | JSON `.json` / `.riv` |

站内已在 **同一圆窗**里支持 **视频 + GLB 叠放**（以及纯视频、纯 GLB），靠 `index.html` 里 `.echo-globe-frame` 上的属性控制（`script.js` 会读）：

| 属性 | 含义 |
|------|------|
| `data-hero-mode="glb"` | 仅 3D（默认）。GLB 成功后隐藏视频。 |
| `data-hero-mode="video"` | 仅循环视频（隐藏 `model-viewer`）。适合还没 GLB、或对外只展示屏录。 |
| `data-hero-mode="both"` | **视频在底层循环**，GLB 在上层；用 `data-glb-opacity`（如 `0.88`）让底下「光 / 云」透出来（需你接受略透的 GLB）。 |
| `data-video-webm` / `data-video-mp4` | 填相对路径，例如 `assets/echo-hero-loop.webm`。留空则不加载视频。 |

**GLB 加载失败**时：若配置了视频路径，会自动退成 **纯视频** 主视觉，避免白屏。

### 1）环形短视频（屏录或渲染 loop）怎么做？

1. **画幅**：导出 **1:1 正方形**（如 1080×1080），长度 **8～20 秒** 无缝 loop（剪辑时对齐首尾帧）。  
2. **内容**：OBS 录 UI、AE 做循环、Blender 渲 turntable、或插画 AE 导出均可。  
3. **压缩**（示例，在项目根有 ffmpeg 时）：

```bash
ffmpeg -y -i echo-loop-src.mov -vf "scale=1080:1080:force_original_aspect_ratio=decrease,pad=1080:1080:(ow-iw)/2:(oh-ih)/2" -an -c:v libx264 -pix_fmt yuv420p -movflags +faststart assets/echo-hero-loop.mp4
ffmpeg -y -i echo-loop-src.mov -vf "scale=1080:1080:force_original_aspect_ratio=decrease,pad=1080:1080:(ow-iw)/2:(oh-ih)/2" -an -c:v libvpx-vp9 -b:v 0 -crf 32 assets/echo-hero-loop.webm
```

4. 把文件放进 `pitch-site/assets/`，在 `index.html` 的 `.echo-globe-frame` 上填写 `data-video-webm` / `data-video-mp4`，并把 `data-hero-mode` 设为 `video` 或 `both`。

### 2）Lottie（Bodymovin JSON）

1. After Effects + Bodymovin 导出 `.json`，或 Figma → Lottie 工作流。  
2. 页内接入（需额外脚本）：在 `</body>` 前加入 `lottie-web` CDN，在 `.echo-globe-frame` **旁**或**内**再放一个绝对定位的 `<div id="echo-lottie">`，用 `lottie.loadAnimation({ container, renderer: 'svg', loop: true, autoplay: true, path: 'assets/echo-corner.json' })`。  
3. **与 GLB 同屏**：Lottie 作为 **HUD 角标**（不占满球），不要和 `model-viewer` 争同一透明层，以免性能差。

### 3）Rive（.riv）

1. Rive Editor 导出 `.riv`，用 [Rive JS](https://rive.app/community/doc/web-js/docD30dU9M1) 挂载到 `<canvas>`。  
2. 与 Lottie 类似：小画幅、角落、与 GLB **分工**（动效 vs 空间）。

### 4）和建模并行时的推荐分工

- **视频 / Lottie**：首屏情绪、产品气质、**迭代极快**（改一版 JSON 或重导视频即可）。  
- **GLB**：需要「转一下证明是 3D」或给投资人 **可交互** 时用；绑骨角色仍走单独 `xiao-aiko_tpose.glb`。  
- **不要指望** Meshy 一次导出「视频级氛围 + 游戏级拓扑」；叠层是工业里常见做法。

## 你要的视觉：iPhone「地球」+ 猫眼感

- **圆形视口**：页面里用 CSS 把 `model-viewer` 裁成圆（像地图里的球），不是方盒子主视觉。
- **可旋转**：`model-viewer` 自带轨道相机，手指/鼠标拖拽绕球转；略大的 **FOV** 会有「广角的鼓胀感」，接近你说的猫眼/鱼眼**味道**（真·鱼眼畸变需要自定义着色器，网页默认不做）。
- **球上内容**：一个 **小型星球 / 巨形岛丘**，表面挤满 **房子、路、花草、小道具**；像微缩世界而不是一片平地。

## 文件怎么拆（推荐）

| 文件 | 用途 |
|------|------|
| `echo-island.glb` | 官网主视觉：**球形场景 + 环境小物**；可含 **摆姿势的小艾可** 当「景里角色」（无骨骼或简单父节点即可）。 |
| `xiao-aiko_tpose.glb` | **绑骨专用**：单独导出，**T-Pose（或 A-Pose）**，进 Blender / UE5 做骨骼与蒙皮。 |

文生 3D（Meshy 等）很难一次给出游戏级拓扑和分件，**绑骨用网格务必在 DCC 里修拓扑、分件、命名**。

## 「小艾可」建模规范（给绑骨 / 姿势）

1. **姿势**  
   - 绑骨前用 **标准 T-Pose**（双臂侧平举）或 **A-Pose**（双臂略斜下），二选一，全管线统一。  
   - 不要摆复杂动作再绑骨；姿势动画在 **骨骼** 上做。

2. **「手脚不能连在一起」**（拓扑含义）  
   - **手腕、脚踝**处要有清晰的 **边循环（edge loop）**，手掌/脚掌与手臂/小腿是 **可区分的表面区域**，不要糊成 **一体泥团 / 连指手套式** 造型。  
   - **左右腿根、左右上臂根** 在模型上应有 **分开的体积**（不要从胸口直接熔成一整块到指尖）。  
   - 若方便拆 **Mesh 对象**：`Body` / `Head` / `L_UpperArm` / `L_Forearm` / `L_Hand` … 有利于权重，但 **同一骨架下可合并为一个 Skinned Mesh**；关键是 **关节处拓扑干净**，不是必须物理断开网格。

3. **手指**  
   - 社交向 Q 版可 **四指简化** 或 **不分开手指** 的球手，但 **腕关节** 仍要清晰，便于手腕 twist。

## Meshy 英文 prompt 方向（≤800 字时自行压缩）

Single cohesive **mini planet / large round hillock** viewed from outside, **dense village**: many small houses, paths, trees, flowers, grass clumps, tiny props on the surface; soft pastel mint and blush accents; **avoid** flat island on ocean only, **avoid** one giant hero building, **avoid** dark cyberpunk; one GLB-friendly scene, many instanced-looking props, cute social-app mood.

（小艾可若要一起生成：加一句 `small chibi mascot character on the surface, standing, simple silhouette`；**绑骨仍建议在 Blender 里用 T-Pose 重做或修型**。）

## 网页端「多加几个小建模」

- **同一 GLB** 里多个 mesh / 多个 root 对象即可，导出时一起进 `echo-island.glb`。  
- 或拆多个 GLB 用多个 `<model-viewer>`（更重，一般没必要）。  
- 性能：控制总面数；重复房子可用 **实例** 或低模复制。

---

## 用 AI 做可以吗？工具怎么选（简表）

**可以。** 适合快速出「方向」和「一版能用的素材」；**绑骨用 T-Pose、干净拓扑** 仍建议在 Blender 里修或重拓。

| 目标 | AI 能帮什么 | 常用工具方向（按类型） |
|------|-------------|------------------------|
| **主视觉插画 / mood** | 多方案、色板、构图 | 文生图：Midjourney / SD（本地或云端）/ 国内各厂绘画模型；**同一角色**要固定 ref + 同一 seed 策略或角色 LoRA。 |
| **球形 loop 视频** | 图生视频、镜头微动 | Runway、Pika、Kling、可灵、海螺等 **图生视频**；先用插画定一帧，再生成 5～10s，自己 **首尾剪辑成 loop**。 |
| **文生 3D / 扫描修** | 球景初稿、小物堆叠 | **Meshy**（你已在用）、Tripo、Rodin 等；导出 GLB 后 **减面、合并、修 UV** 用 Blender。 |
| **屏录 + AI** | 文案、剪辑节奏、配音字幕 | 录屏 OBS；剪辑 CapCut / DaVinci；文案 ChatGPT / Claude；**界面本身**仍是你产品。 |
| **Lottie 感动效** | 关键帧思路、参考 | AE 里做或 **Rive** 里手 K；纯「AI 直接吐 Lottie」链路仍不稳定，一般 **图/视频 → 人简化 → 矢量**。 |

**务实建议：**  
- **Pitch 站**：AI 插画 + 图生视频 loop（进圆窗）最快「亮眼」；GLB 作为加分。  
- **小艾可 IP**：固定 **角色描述表**（正面、侧面、配色 hex、禁止项），所有模型用同一套 prompt 前缀，减少「每张脸不一样」。  
- **绑骨**：AI 3D 当 **粗模**，T-Pose / 分件 / 权重 **人做**。

---

*Internal notes for Orange-Studio / Echo Island pitch site.*
