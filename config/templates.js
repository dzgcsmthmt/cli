/**
 * 项目模板配置
 * 新增模板时，在此添加配置项即可
 */

const TEMPLATES = [
    {
        value: "rollup-npm-template",
        label: "组件库模板，可支持TS/JS/Vue2开发",
        hint: "基于Rollup构建的现代组件库模板，支持TypeScript开发，可扩展scss/vue等功能【Node.js >= 18】",
        usePackageCopy: true,
        postInit: "rollup-npm-template",
    },
    {
        value: "web-components-template",
        label: "Web Components 组件库模板",
        hint: "基于Vue3构建的Web Components组件库，双版本输出、多格式、支持Vue2项目引入【Node.js ^20.19 || >=22.12】",
        usePackageCopy: false,
    },
    {
        value: "web-components-solid-template",
        label: "Solid.js Web Components 组件库模板",
        hint: "基于Solid.js构建的Web Components组件库，双版本输出、多格式、支持Vue2项目引入【Node.js ^20.19 || >=22.12】",
        usePackageCopy: false,
    },
    {
        value: "fb-vue2-template",
        label: "Vue2 + Vite项目模板",
        hint: "基于Vite + Vue2 + ElementUI的完整项目开发模板【Node.js >= 18】",
        usePackageCopy: true,
    },
    {
        value: "vue3-preject-template",
        label: "Vue3 + Vite项目模板",
        hint: "Vite 8 + Vue3 + Element Plus + TailwindCSS/SCSS + Pinia + GraphQL，含鉴权、Mock、Oxlint【Node.js >= 20.19】",
        usePackageCopy: true,
    },
    {
        value: "",
        label: "基础空白项目",
        hint: "仅包含基础项目结构的空白模板，适合从零开始自定义项目",
        isBlank: true,
    },
    {
        value: "npm-templace",
        label: "Vue2传统组件库模板",
        hint: "基于Vue CLI的Vue2组件库开发模板 (Node.js >= 12，技术支持: @songyang)",
        usePackageCopy: true,
    },
];

/**
 * 获取模板选择选项（供 @clack/prompts select 使用）
 */
function getTemplateOptions() {
    return TEMPLATES.map(({ value, label, hint }) => ({
        value,
        label,
        hint,
    }));
}

/**
 * 根据模板 value 获取完整配置
 */
function getTemplateConfig(templateValue) {
    return TEMPLATES.find((t) => t.value === templateValue) || null;
}

module.exports = {
    TEMPLATES,
    getTemplateOptions,
    getTemplateConfig,
};
