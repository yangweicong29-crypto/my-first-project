# 新世界理发店预约小程序

一个无需后端依赖的静态理发店预约示例，包含服务选择、发型师选择、到店日期时间、客户信息、预约预览与预约列表。

## 本地预览

```bash
npm start
```

启动后访问：<http://localhost:5173>

## 构建检查

```bash
npm run build
```

该命令会校验静态应用入口文件和核心页面标记是否存在。

## 部署为可访问网址

本项目已内置 GitHub Pages 自动部署工作流：`.github/workflows/deploy-pages.yml`。

使用方式：

1. 将代码推送到 GitHub 仓库的 `main`、`master` 或 `work` 分支。
2. 在仓库页面进入 **Settings → Pages**。
3. 将 **Build and deployment → Source** 设置为 **GitHub Actions**。
4. 进入 **Actions**，运行或等待 `Deploy static barber booking app` 工作流完成。
5. 部署成功后，GitHub 会在工作流摘要和仓库 Pages 设置页显示公网访问地址，通常格式为：

```text
https://<你的 GitHub 用户名>.github.io/<仓库名>/
```text

> 当前执行环境没有配置 GitHub 远程仓库或 Pages 权限，因此无法在本机直接生成最终公网域名；推送到 GitHub 后工作流会自动发布。
