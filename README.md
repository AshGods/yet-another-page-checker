# 一款带动画效果的简单线路检测页

通过轮询地址来确定网址是否可用，支持前后分离方式检测

## 部署指南

### 通过 Release 静态文件部署：

1. 下载 Release 中的 `static.zip` 压缩包
2. 解压 `static.zip` 压缩包，并上传到你网站的根目录
3. 配置 `config.json` 文件
4. 访问你的网站即可看到线路检测页

### 通过环境变量配置：

项目使用环境变量进行配置。在开发环境中，你可以创建 `.env.local` 文件来设置这些变量。

在生产环境中，请在你的部署平台（如 Vercel）中设置这些环境变量，或直接修改 `config.json` 中的文件。


### 通过 Vercel 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FDyAxy%2Fyet-another-page-checker&env=NEXT_PUBLIC_SITE_NAME%2CNEXT_PUBLIC_TELEGRAM_LINK%2CNEXT_PUBLIC_TIMEOUT%2CNEXT_PUBLIC_DOMAIN_1_API%2CNEXT_PUBLIC_DOMAIN_1_SITE&envDescription=%E8%AF%A6%E6%83%85%E8%AF%B7%E5%8F%82%E7%85%A7&envLink=https%3A%2F%2Fgithub.com%2FDyAxy%2Fyet-another-page-checker&project-name=yet-another-page-checker-fork&repository-name=yet-another-page-checker-fork&demo-title=Demo+App&demo-description=A+statically+generated+example+page.&demo-url=https%3A%2F%2Fyet-another-page-checker.vercel.app&teamSlug=7f8f76a3acfc-projects)

部署时，可以在 Vercel 项目设置中配置环境变量。

## 可选环境变量

以下是所有支持的环境变量：

```env
# 必选项 - 基本设置
NEXT_PUBLIC_SITE_NAME="Your Site Name"
NEXT_PUBLIC_TELEGRAM_LINK="https://t.me/yourgroup"
NEXT_PUBLIC_TIMEOUT="15000"  # 检测超时时间（毫秒）

# 必选项 - 域名配置
# API 和站点地址不同的情况
NEXT_PUBLIC_DOMAIN_1_API="https://api1.example.com/config"
NEXT_PUBLIC_DOMAIN_1_SITE="https://site1.example.com"
NEXT_PUBLIC_DOMAIN_2_API="https://api2.example.com/config"
NEXT_PUBLIC_DOMAIN_2_SITE="https://site2.example.com"

# API 和站点地址相同的情况，复制一遍即可
NEXT_PUBLIC_DOMAIN_3_API="https://example3.com"
NEXT_PUBLIC_DOMAIN_3_SITE="https://example3.com"
```
### 注意事项：

1. 必需的环境变量：`NEXT_PUBLIC_SITE_NAME`, `NEXT_PUBLIC_TELEGRAM_LINK`, 至少一个 `NEXT_PUBLIC_DOMAIN_<n>_API`
2. 如果 API 地址和站点地址相同，也请设置一对一样的 `NEXT_PUBLIC_DOMAIN_<n>_API` 和 `NEXT_PUBLIC_DOMAIN_<n>_SITE`
3. `<n>` 配置为一个整数，从 1 开始按顺序编号，中间不能跳过编号


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

3. **配置环境变量**:

    复制 `.env.example` 到 `.env.local` 并根据你的需求修改配置。

4. **启动开发环境**:

    ```bash
    bun dev
    ```

5. **构建生产文件**:

    ```bash
    bun run build
    ```
