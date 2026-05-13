/**
 * 模板后处理逻辑
 * 各模板特有的初始化逻辑在此注册，便于扩展
 */

const path = require("path");

/** 模板处理器注册表：templateValue -> handler */
const handlers = new Map();

/**
 * 注册模板处理器
 * @param {string} templateValue - 模板 value
 * @param {Function} handler - 处理函数 (context) => Promise<void>
 *   context: { projectName, group, p, fs, stringify, color }
 */
function registerHandler(templateValue, handler) {
    handlers.set(templateValue, handler);
}

/**
 * 执行模板后处理
 * @param {string} templateValue - 模板 value
 * @param {object} context - 上下文
 */
async function runPostHandler(templateValue, context) {
    const handler = handlers.get(templateValue);
    if (handler) {
        await handler(context);
    }
}

// ========== 内置处理器 ==========

/**
 * rollup-npm-template: 执行 init.cjs 初始化
 */
registerHandler("rollup-npm-template", async (context) => {
    const { projectName, p, fs, stringify, color } = context;
    try {
        const initPath = path.resolve(process.cwd(), projectName, "init.cjs");
        const { initiate } = require(initPath);
        initiate(p, fs, stringify, color);
    } catch (err) {
        console.log("err :>> ", err);
        process.exit(1);
    }
});

module.exports = {
    registerHandler,
    runPostHandler,
};
