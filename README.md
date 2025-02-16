# 一款带动画效果的简单线路检测页

通过轮询地址来确定网址是否可用，支持前后分离方式检测

## 部署指南

### 直接 HTML 部署

下载 Release，解压 html 文件，修改 config.json

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
