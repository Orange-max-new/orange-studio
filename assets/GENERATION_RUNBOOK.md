# 一步一步：从 ECHO_IP_BIBLE → 网站能用（你来点生成，我来接线）

你已打开 `ECHO_IP_BIBLE.md`。下面按顺序做；**每步的产物文件名**尽量固定，后面改 `index.html` 不容易乱。

---

## 开始前（30 秒）

1. 在本机建文件夹：`pitch-site/assets/`（若已有就往里丢）。  
2. 打开 `ECHO_IP_BIBLE.md`，复制 **「LOCK — 世界与调色」英文块**。  
3. 再复制 **「LOCK — 小艾可」英文块**（若本步只做风景，可先不贴小艾可那段）。

---

## 第 1 步：生成「主视觉 Still」1:1 方图（必有）

**目的**：浏览器圆窗上的 **poster**、以及下一步 **图生视频** 的首帧。

**你可以用的网站（任选其一，免费先试）**

| 工具 | 说明 |
|------|------|
| **通义万相 / 豆包 / 文心一格** 等国内文生图 | 复制粘贴方便，额度看账号 |
| **Microsoft Designer（Copilot 出图）** | 部分地区可用，看微软账号 |
| **Leonardo.ai / Playground** | 常有免费额度，需注册 |

**具体操作**

1. 新建会话 → 画幅选 **1:1**（或正方形 **1024×1024** / **1080×1080**）。  
2. 先粘贴 **`ECHO_IP_BIBLE.md` 里两段 LOCK（世界 + 可选小艾可）**。  
3. 再打开 **`prompts/02_still_square_hero_en.txt`**，把 **去掉第一行 [PASTE LOCK…] 说明后的正文** 整段贴在后面，一次性发送生成。  
4. 多生成几张，选 **细节清晰、主体在中间、边缘不要被裁掉重要信息** 的一张。

**导出**

1. 下载 **PNG 或 JPG**。  
2. 用 **https://squoosh.app**（免费）打开 → 转 **WebP** → 质量约 **75～85** → 另存为：  
   **`pitch-site/assets/echo-poster.webp`**

**你现在完成的文件**

- `assets/echo-poster.webp`

---

## 第 2 步（强烈建议）：生成「循环短视频」给圆窗（可选但亮眼）

**目的**：左侧圆窗里的 **`echo-hero-loop.webm` + `.mp4`**，`model-viewer` 还没加载时也有动效。

**你可以用的网站**

| 工具 | 说明 |
|------|------|
| **可灵 / 海螺 / 即梦** 等图生视频 | 国内常用，按额度 |
| **Runway / Pika** | 常有试用 / 订阅 |

**具体操作**

1. 选 **图生视频**，上传 **第 1 步那张最满意的方图**。  
2. 打开 **`prompts/04_image_to_video_zh.txt`**，整段（含中文短锁）复制进「创意描述 / 提示词」。  
3. 时长选 **5～8 秒**，**不要**自动加字幕/水印（若可选关）。  
4. 下载视频（一般是 **MP4**）。

**变成网站要的两种格式**

- **有 ffmpeg**（推荐）：在项目里 PowerShell 执行：

  ```powershell
  cd pitch-site\scripts
  .\build-hero-loop.ps1 -InputVideo "你的下载路径\xxx.mp4"
  ```

  会在 `assets/` 生成 **`echo-hero-loop.mp4`** 和 **`echo-hero-loop.webm`**。

- **没有 ffmpeg**：至少保留 **MP4**，手动改名为 `echo-hero-loop.mp4`；WebM 可以后再补（Safari 以外也能先用 mp4 源，当前站点是用 webm+mp4 双 source，缺 webm 时可让我帮你改一行 HTML 只保留 mp4）。

**你现在完成的文件**

- `assets/echo-hero-loop.mp4`  
- `assets/echo-hero-loop.webm`（尽量有）

---

## 第 3 步（可选）：Meshy 文生 3D → `echo-island.glb`

**目的**：圆窗里可拖拽的 **GLB**。

**网站**：**https://www.meshy.ai**（或你习惯的 Tripo 等，流程类似）

**具体操作**

1. 注册登录 → 选 **Text to 3D**（或等价入口）。  
2. 打开 **`prompts/01_meshy_echo_island_en.txt`**：先把 **`ECHO_IP_BIBLE.md` 里「LOCK — 世界与调色」** 贴在前面，再贴 txt 里正文（删掉 `[PASTE LOCK…]` 那行）。  
3. 生成 → 下载 **GLB** → 保存为：  
   **`pitch-site/assets/echo-island.glb`**（覆盖旧文件即可）

**你现在完成的文件**

- `assets/echo-island.glb`

---

## 第 4 步（可选）：小艾可设定表 Still

**目的**：你自己留存 IP，对外 pitch 统一人设；**不是**网站必需文件。

重复 **第 1 步**，提示词改用 **`prompts/03_xiao_aiko_sheet_en.txt`**（前面同样贴 LOCK）。  
导出 PNG 即可，文件名随意，例如 `assets/xiao-aiko-sheet.png`。

---

## 第 5 步：把文件「接到网页上」（你做一半，我对照改也行）

打开 **`index.html`**，找到 **`class="echo-globe-frame"`** 那一块：

1. **Poster**：确认 **`model-viewer` 的 `poster="assets/echo-poster.webp"`**（你已放好文件即可）。  
2. **视频**：给同一个 div 填属性（路径按你实际文件名）：  

   ```html
   data-hero-mode="both"
   data-glb-opacity="0.9"
   data-video-webm="assets/echo-hero-loop.webm"
   data-video-mp4="assets/echo-hero-loop.mp4"
   ```

   - 若 **暂时没有 GLB**，可改成：`data-hero-mode="video"`，`data-glb-opacity="1"`，视频路径照旧。  
   - 若 **只要 GLB、不要视频**：保持 `data-hero-mode="glb"`，`data-video-*` 留空 `""`。

3. 本地双击 **`index.html`** 或用 VS Code Live Preview 打开，看圆窗是否显示 poster / 视频 / GLB。

---

## 你需要给我的「验收清单」（聊天里打勾即可）

- [ ] `echo-poster.webp` 已放进 `assets/`  
- [ ] （可选）`echo-hero-loop.mp4` + `.webm` 已放进 `assets/`  
- [ ] （可选）`echo-island.glb` 已更新  
- [ ] `index.html` 里 `data-hero-mode` / `data-video-*` 已按你情况填好  

你把 **上面四项实际情况** 发我一句（例如「只有 poster + mp4，没有 webm」），我可以告诉你 **下一行 HTML 精确该怎么写**，避免你自己试错。

---

## 免费优先小结

1. **图**：国内文生图 or Leonardo — **免费额度**  
2. **视频**：可灵/海螺等 — **试用**  
3. **压 webp**：Squoosh — **免费**  
4. **压 square 双格式**：ffmpeg + 仓库脚本 — **免费**  
5. **3D**：Meshy — **免费额度有限**，不够再付费  

*整条链路里，不需要把账号交给任何人；你只需要把生成文件下载进 `assets/`。*
