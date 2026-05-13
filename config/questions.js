/**
 * 用户交互问题配置
 */

const p = require("@clack/prompts");

/** package.json name 字段校验正则 */
const PACKAGE_NAME_REGEX =
    /^(?:(?:@(?:[a-z0-9-*~][a-z0-9-*._~]*)?\/[a-z0-9-._~])|[a-z0-9-~])[a-z0-9-._~]*$/;

/**
 * 收集项目基础信息
 * @returns {Promise<{projectName: string, description: string, author: string}>}
 */
async function collectProjectInfo() {
    const group = await p.group(
        {
            projectName: () =>
                p.text({
                    message: "输入项目名称",
                    placeholder: "没有默认，别直接回车",
                    initialValue: "",
                    validate: (value) => {
                        if (!PACKAGE_NAME_REGEX.test(value)) {
                            return "请根据package.json的name规范填写, 如：@fb-cli/rollup-npm-template，注意该命名规范不可以使用驼峰命名";
                        }
                    },
                }),
            description: () =>
                p.text({ message: "项目的描述，package.description" }),
            author: () => p.text({ message: "你的名子，package.author" }),
        },
        {
            onCancel: () => {
                p.cancel("初始化项目结束");
                process.exit(0);
            },
        }
    );

    return group;
}

/**
 * 选择项目模板
 * @returns {Promise<string|null>} 模板 value，空字符串表示空白项目
 */
async function selectTemplate() {
    const { getTemplateOptions } = require("./templates.js");

    const template = await p.select({
        message: "请选择项目模板类型",
        options: getTemplateOptions(),
    });

    if (p.isCancel(template)) {
        p.cancel("没有匹配模版，取消创建");
        process.exit(0);
    }

    return template;
}

module.exports = {
    collectProjectInfo,
    selectTemplate,
    PACKAGE_NAME_REGEX,
};
