# 免费优先 → 可加钱升级：一条龙顺序（橘 / Echo Island）

目标：**能放进当前站的** `echo-poster.webp`、可选 `echo-hero-loop.webm/.mp4`、`echo-island.glb`，以及 **小艾可** 一致形象。

---

## 阶段 A — 零代码站（全免费也可能）

| 步骤 | 做什么 | 免费做法 | 加钱 / 省时间 |
|------|--------|-----------|----------------|
| A1 | 定调 still 方图 1:1 | **Leonardo** / **Playground** 免费额度；或本地 **ComfyUI + SDXL**（显卡成本算一次性） | Midjourney 订阅 |
| A2 | 方图 → 循环短视频 | **可灵 / 海螺 / Pika** 等免费试用额度；或 CapCut「图片动起来」弱动效 | Runway 订阅、买积分 |
| A3 | 压成站用格式 | 本仓库 `scripts/build-hero-loop.ps1`（需本机 **ffmpeg**） | Fiverr 找人压一版 |
| A4 | 文生 3D | **Meshy** 免费额度（注意版权与导出次数） | Meshy 付费档、Tripo |

把 A1 最佳一帧导出 **`assets/echo-poster.webp`**（可用 Squoosh 网页免费压）；A2 导出 loop 后填进 `index.html` 的 `data-video-webm` / `data-video-mp4`（见 `3D_PIPELINE.md`）。

---

## 阶段 B — 建模与绑骨（建议 Blender，免费）

1. Meshy 出 `echo-island.glb` → Blender：**减面、修穿模、合并材质**。  
2. 小艾可：**单独** T-Pose 网格 → `xiao-aiko_tpose.glb`（见 `3D_PIPELINE.md` 拓扑要求）。  
3. 绑骨：Blender Rigify 或 **AccuRig**（有免费档）→ 再进 UE5 若需要。

---

## 阶段 C — 进当前静态站

- `assets/echo-island.glb` + 可选 `echo-poster.webp`  
- 可选 `assets/echo-hero-loop.webm` + `.mp4` + `.echo-globe-frame` 上 `data-hero-mode`  

---

## 具体 Prompt 文件

已拆成可复制文本（避免一条太长）：

- `assets/prompts/01_meshy_echo_island_en.txt`
- `assets/prompts/02_still_square_hero_en.txt`
- `assets/prompts/03_xiao_aiko_sheet_en.txt`
- `assets/prompts/04_image_to_video_zh.txt`
- `assets/prompts/05_negatives_en.txt`

角色与世界锁在 **`ECHO_IP_BIBLE.md`**。

---

*工具名会随时间变化；原则是「能本地就本地，不能就免费额度试完再订阅」.*
