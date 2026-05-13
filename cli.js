#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const p = require("@clack/prompts");
const color = require("picocolors");

const { copyTemplatePackage, editPackage } = require("./editPackage.js");
const { collectProjectInfo, selectTemplate } = require("./config/questions.js");
const { getTemplateConfig } = require("./config/templates.js");
const { copyTemplate, copyFile, endTips } = require("./lib/utils.js");
const { runPostHandler } = require("./lib/templateHandlers.js");

// 清屏并留空行
console.clear();
console.log("");

/**
 * 主流程：创建带模板的项目
 */
async function createTemplateProject(group, templateValue, templateConfig) {
    const s = p.spinner();
    s.start("开始复制");

    await copyTemplate(s, templateValue, group.projectName);

    // 除 web-components-template 外，使用 package.copy.json 转换为 package.json
    if (templateConfig.usePackageCopy !== false) {
        await copyTemplatePackage(s, group.projectName);
    }

    editPackage(group, group.projectName);
    copyFile("copyFiles/gitignore", group.projectName, ".gitignore");
    fs.removeSync(path.join(group.projectName, ".git"));

    s.stop(`项目创建完成，已将模版 ${templateValue} 复制到 ${group.projectName}`);
    endTips(group.projectName);

    // 执行模板后处理（如 rollup-npm-template 的 init.cjs）
    if (templateConfig.postInit) {
        await runPostHandler(templateConfig.postInit, {
            projectName: group.projectName,
            group,
            p,
            fs,
            stringify: require("comment-json").stringify,
            color,
        });
    }
}

/**
 * 主流程：创建空白项目
 */
async function createBlankProject(group) {
    p.intro("没有选择模版，跳过复制模版");
    await fs.mkdir(group.projectName, { recursive: true });
    p.log.step(`创建空模板: ${color.cyan(group.projectName)}`);

    copyFile("copyFiles/package.json", group.projectName, "package.json");
    copyFile("copyFiles/gitignore", group.projectName, ".gitignore");
    copyFile("copyFiles/README.md", group.projectName, "README.md");
    editPackage(group, group.projectName);
    endTips(group.projectName);
}

/**
 * 主入口
 */
async function main() {
    p.intro(color.bgCyan(color.black(" create-fbnpm-project 准备创建个项目 ")));

    const group = await collectProjectInfo();
    const templateValue = await selectTemplate();
    const templateConfig = getTemplateConfig(templateValue);

    if (templateConfig?.isBlank || templateValue === "") {
        await createBlankProject(group);
    } else {
        await createTemplateProject(group, templateValue, templateConfig);
    }
}

main();
