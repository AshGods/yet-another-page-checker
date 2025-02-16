# 一款带动画效果的简单线路检测页

通过轮询地址来确定网址是否可用，支持前后分离方式检测

## 部署指南

### 直接 HTML 部署

下载 Release，解压 html 文件，修改 config.json

### 通过 Vercel 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FDyAxy%2Fyet-another-page-checker&project-name=yet-another-page-checker-fork&repository-name=yet-another-page-checker-fork&demo-title=Demo%20App&demo-description=A%20statically%20generated%20example%20page.&demo-url=https%3A%2F%2Fyet-another-page-checker.vercel.app%2F)

部署好之后，在自己的仓库中修改 config.json 即可

## 开发指南

0. **安装 Bun**:
   
   ```bash
   # macOS/Linux:
   curl -fsSL https://bun.sh/install | bash
   # Windows PowerShell:
   powershell -c "irm bun.sh/install.ps1 | iex"
   ```
1. **下载源码**:
   
   ```bash
   git clone https://github.com/DyAxy/yet-another-page-checker.git
   ```
2. **安装依赖**:
   
   ```bash
   bun install
   ```
3. **启动开发环境**:
   
   ```bash
   bun dev
   ```
   
   
4. **构建生产文件**:
   
   ```bash
   bun run build
   ```
