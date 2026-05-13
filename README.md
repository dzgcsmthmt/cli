# fb-cli

一个用于快速创建和初始化新组件项目的命令行工具。支持多种项目模板，包括 Vue2/Vue3 项目模板、组件库模板等，帮助开发者快速搭建项目基础结构。

## 功能特性

- 🚀 **快速创建项目**：通过交互式命令行界面快速创建新项目
- 📦 **多种模板支持**：提供多种预设模板，满足不同开发需求
- 🔧 **自动配置**：自动处理 package.json 配置，减少手动配置工作
- 💡 **友好交互**：使用 `@clack/prompts` 提供美观的命令行交互体验
- 📝 **规范校验**：自动校验项目名称是否符合 npm 包命名规范

## 安装

### 全局安装（推荐）

```shell
npm install -g fb-cli
```

安装完成后，可以在任意目录使用 `fb-cli` 命令。

### 临时使用

如果不想全局安装，可以使用 `npx` 直接运行：

```shell
npx fb-cli
```

## 使用方法

### 基本使用

1. 在目标目录下运行命令：

```shell
fb-cli
```

2. 按照提示输入项目信息：
   - **项目名称**：输入符合 npm 包命名规范的项目名称（如：`@fb-cli/rollup-npm-template`）
   - **项目描述**：输入项目的简要描述
   - **作者名称**：输入作者名称

3. 选择项目模板类型（详见下方模板说明）

4. 等待项目创建完成

### 使用示例

```shell
# 1. 运行命令
fb-cli

# 2. 交互式输入
? 输入项目名称: @my-org/my-component
? 项目的描述，package.description: 我的组件库
? 你的名子，package.author: 张三
? 请选择项目模板类型: 组件库模板，可支持TS/JS/Vue2开发

# 3. 项目创建完成后，进入项目目录
cd @my-org/my-component

# 4. 安装依赖
npm install

# 5. 查看项目文档
cat README.md
```

## 支持的模板类型

### 1. rollup-npm-template
**组件库模板，可支持TS/JS/Vue2开发**

- 基于 Rollup 构建的现代组件库模板
- 支持 TypeScript 开发
- 可扩展 scss/vue 等功能
- 支持 Rolldown 构建工具
- 集成 Prettier 代码格式化
- **要求：Node.js >= 18**

### 2. web-components-template
**Web Components 组件库模板**

- 基于 Vue3 构建的 Web Components 组件库模板
- 支持 development、test、production 三种构建环境
- 双版本输出：不含 Vue 运行时 / 含 Vue 运行时（独立使用）
- 多格式输出：ESM、UMD
- TypeScript、SCSS、完整文档
- 支持 Vue2 项目引入
- 自动化构建、CDN 上传、npm 发布
- **要求：Node.js ^20.19.0 || >=22.12.0**
- **模板地址**：[web-components-template](http://192.168.0.161/guochanhua/product-develop-group/dependencies-npm/web-components-template)
- **创建后**：进入项目执行 `npm install`，运行 `npm run dev` 启动开发；完整文档见项目内 `doc/README.md`

### 3. fb-vue2-template
**Vue2 + Vite项目模板**

- 基于 Vite + Vue2 + ElementUI 的完整项目开发模板
- 包含完整的项目结构和常用功能模块
- 集成路由、状态管理等常用功能
- **要求：Node.js >= 18**

### 4. vue3-preject-template
**Vue3 + Vite项目模板**

- 基于 Vite + Vue3 + ElementPlus 的完整项目开发模板
- 现代化的 Vue3 开发体验
- 包含完整的项目结构和常用功能模块
- **要求：Node.js >= 18**

### 5. npm-templace
**Vue2传统组件库模板**

- 基于 Vue CLI 的 Vue2 组件库开发模板
- 传统构建方式，兼容性更好
- **要求：Node.js >= 12**
- **技术支持：@songyang**

### 6. 基础空白项目
**仅包含基础项目结构的空白模板**

- 仅包含基础的 package.json、.gitignore、README.md
- 适合从零开始自定义项目

## 项目结构

创建的项目将包含以下内容：

```
项目名称/
├── package.json          # 项目配置文件（已自动配置）
├── .gitignore           # Git 忽略文件配置
├── README.md            # 项目说明文档
└── [模板相关文件]        # 根据选择的模板包含相应文件
```

## 工作原理

1. **收集信息**：通过交互式命令行收集项目名称、描述、作者等信息
2. **选择模板**：用户从预设模板中选择合适的项目模板
3. **复制模板**：将选定的模板文件复制到目标目录
4. **配置项目**：
   - 复制并处理 `package.copy.json` 为 `package.json`
   - 自动更新 `package.json` 中的项目名称、版本、描述、作者等信息
   - 复制 `.gitignore` 等配置文件
   - 清理模板中的 `.git` 目录
5. **初始化**：对于 `rollup-npm-template` 模板，会执行额外的初始化脚本

## 注意事项

1. **项目名称规范**：
   - 必须符合 npm 包命名规范
   - 支持作用域包（如：`@org/package-name`）
   - 不支持驼峰命名
   - 示例：`@fb-cli/rollup-npm-template` ✅ | `myComponent` ❌

2. **目录覆盖**：
   - 如果目标目录已存在，工具会提示是否继续
   - 选择继续会覆盖同名文件，请谨慎操作

3. **Node.js 版本**：
   - 不同模板对 Node.js 版本有不同要求
   - 建议使用 Node.js >= 18 以获得最佳体验

## 常见问题

### Q: 项目名称验证失败怎么办？
A: 请确保项目名称符合 npm 包命名规范：
- 可以使用作用域包格式：`@org/package-name`
- 或普通包格式：`package-name`
- 不能使用驼峰命名，应使用连字符或下划线

### Q: 如何更新模板？
A: 模板文件位于 `fb-cli` 安装目录下的对应模板文件夹中，更新模板后需要重新发布 npm 包。

### Q: 创建的项目在哪里？
A: 项目会创建在当前执行命令的目录下，以项目名称作为文件夹名称。

### Q: 如何自定义模板？
A: 可以在 `fb-cli` 的源码目录中添加新的模板文件夹，然后修改 `cli.js` 中的模板选项列表。

## 开发

### 本地开发

```shell
# 克隆项目
git clone http://192.168.0.161/module/fb-cli.git

# 进入项目目录
cd fb-cli

# 安装依赖
npm install

# 测试运行
node cli.js
```

### 项目结构

```
fb-cli/
├── cli.js              # 主入口文件
├── editPackage.js      # package.json 处理逻辑
├── copyFiles/          # 基础文件模板
│   ├── package.json
│   ├── README.md
│   └── gitignore
├── rollup-npm-template/       # Rollup 组件库模板
├── web-components-template/  # Web Components 组件库模板
├── fb-vue2-template/          # Vue2 项目模板
├── vue3-preject-template/     # Vue3 项目模板
└── npm-templace/              # Vue2 传统组件库模板
```

## 更新日志

### v1.13.0
- 新增 web-components-template 模板，基于 Vue3 的 Web Components 组件库

### v1.12.0
- rollup-npm-template 支持 rolldown
- rollup-npm-template 支持 prettier

## 许可证

ISC

## 联系方式

如有问题或建议，请访问：[项目主页](http://192.168.0.161/module/fb-cli)