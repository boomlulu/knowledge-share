# Slidev GitHub Pages 部署

## 正确步骤

### 1. Slidev 配置

在 `slides.md` frontmatter 中使用 hash 路由：

```yaml
routerMode: hash
```

GitHub Pages 项目页通常部署在子路径，例如：

```text
https://boomlulu.github.io/knowledge-share/
```

Slidev 如果使用 history 路由，刷新或直接访问某一页时容易被 GitHub Pages 当成真实文件路径处理，所以项目页优先用 hash 路由。

### 2. 构建命令

GitHub Pages 上建议使用相对 base：

```bash
slidev build --base ./
```

不要在 hash 路由下继续使用：

```bash
slidev build --base /knowledge-share/
```

原因是 `/knowledge-share/` 会参与 Slidev 前端路由生成，可能导致导航地址变成：

```text
#/knowledge-share/2
```

正确的页面地址应该是：

```text
https://boomlulu.github.io/knowledge-share/#/2
```

### 3. package.json 脚本

推荐把 GitHub Pages 构建脚本固定下来：

```json
{
  "scripts": {
    "build:github": "slidev build --base ./ && node scripts/patch-github-pages.js"
  }
}
```

### 4. 兼容旧错误链接

如果线上曾经发布过错误路由，建议在 `dist/index.html` 和 `dist/404.html` 注入一个轻量纠偏脚本。

本项目使用：

```text
帧同步技术分享/slidev/scripts/patch-github-pages.js
```

作用：

- 把 `#/knowledge-share/2` 自动改成 `#/2`
- 把 `/knowledge-share/2` 自动改成 `/#/2`

这样旧链接、刷新、误跳转都能回到正确路由。

### 5. GitHub Actions 部署

workflow 核心配置：

```yaml
permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    defaults:
      run:
        working-directory: 帧同步技术分享/slidev
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
          cache-dependency-path: 帧同步技术分享/slidev/package-lock.json
      - run: npm ci
      - run: npm run build:github
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: 帧同步技术分享/slidev/dist

  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

### 6. 验证方式

部署后至少验证三类地址：

```text
https://boomlulu.github.io/knowledge-share/
https://boomlulu.github.io/knowledge-share/#/2
https://boomlulu.github.io/knowledge-share/#/knowledge-share/2
```

最后一个应该自动跳转到：

```text
https://boomlulu.github.io/knowledge-share/#/2
```

再按方向键或点击下一页，URL 应该类似：

```text
#/2 -> #/3 -> #/3?clicks=1
```

不能再出现：

```text
#/knowledge-share/2
```

## 踩过的坑

### 1. Node 版本太低

本地系统 Node 18.16.1 构建失败：

```text
SyntaxError: The requested module 'node:util' does not provide an export named 'styleText'
```

原因是当前 Slidev 依赖需要更新的 Node API。

处理方式：

- 本地使用较新的 Node
- GitHub Actions 使用 Node 22

### 2. OAuth token 没有 workflow 权限

第一次推送 `.github/workflows/deploy-slidev.yml` 失败：

```text
refusing to allow an OAuth App to create or update workflow without workflow scope
```

处理方式：

```bash
gh auth refresh -h github.com -s workflow
```

授权完成后再推送。

### 3. GitHub Pages 环境不允许 main 部署

Actions 第一次部署失败：

```text
Branch "main" is not allowed to deploy to github-pages due to environment protection rules.
```

处理方式：

- 在仓库环境 `github-pages` 中允许 `main`
- 或通过 GitHub API 添加 deployment branch policy

### 4. history 路由在 GitHub Pages 子路径下不稳

`routerMode: history` 时，直接访问：

```text
/knowledge-share/3
```

容易变成 GitHub Pages 404 或 Slidev 404。

处理方式：

```yaml
routerMode: hash
```

### 5. hash 路由不能配绝对 base

`routerMode: hash` 配合：

```bash
slidev build --base /knowledge-share/
```

会导致右键或下一页导航生成：

```text
https://boomlulu.github.io/knowledge-share/#/knowledge-share/2
```

Slidev 会报：

```text
Page /knowledge-share/2 not found
```

根因是 base 被拼进了前端路由。

处理方式：

```bash
slidev build --base ./
```

### 6. GitHub Pages 发布有延迟

有时已经推送成功，但线上仍然返回旧 bundle，例如：

```text
assets/index-BbFeRNxz.js
```

处理方式：

- 等待 Pages build 完成
- 检查 Pages build 指向的 commit
- 必要时手动触发 Pages build
- 用线上 HTML 确认 bundle 名和脚本内容是否更新

### 7. gh-pages 分支和 Actions 部署不要混着依赖

这次中间同时试过：

- `gh-pages` 静态分支
- GitHub Actions Pages artifact

两种都能用，但混用时容易遇到状态不同步和构建队列等待。

长期建议选一种：

- 自动化优先：Actions + `actions/deploy-pages`
- 简单兜底：直接推 `dist` 到 `gh-pages`

本项目最终保留 Actions 自动部署，同时确认 `gh-pages` 静态发布也能作为兜底。
