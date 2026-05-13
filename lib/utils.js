/**
 * 通用工具函数
 */

const path = require("path");
const fs = require("fs-extra");
const p = require("@clack/prompts");
const color = require("picocolors");

/**
 * 复制项目模板到目标目录
 * 如果目标目录已存在，提示用户是否继续；复制过程遇到重复文件则覆盖
 * @param {object} s - 进度条或状态对象
 * @param {string} templateName - 模板目录名
 * @param {string} targetDir - 目标目录
 * @returns {Promise<boolean>} 是否成功
 */
async function copyTemplate(s, templateName, targetDir) {
    try {
        const src = path.join(__dirname, "..", templateName);
        console.log("准备复制 :>> ", src);

        if (!fs.pathExistsSync(src)) {
            s.stop(`目录模版不存在，请重新输入 ${templateName}`);
            return false;
        }

        if (fs.pathExistsSync(targetDir)) {
            const confirm = await p.confirm({
                message: `目录 ${targetDir} 已存在，是否继续？（会覆盖同名文件）`,
                initialValue: false,
            });
            if (!confirm) {
                s.stop(`已取消，目录 ${targetDir} 已存在`);
                process.exit(0);
            }
        } else {
            fs.ensureDirSync(targetDir);
        }

        console.log("开始复制到 :>> ", targetDir);
        fs.copySync(src, targetDir, { overwrite: true, errorOnExist: false });
        return true;
    } catch (err) {
        console.log("err :>> ", err);
        s.stop(`发生错误，复制失败，template ${templateName}`);
        return false;
    }
}

/**
 * 复制单个文件到项目内
 * @param {string} sourcePath - 源文件路径（相对于项目根）
 * @param {string} targetDir - 目标目录
 * @param {string} targetFileName - 目标文件名
 */
function copyFile(sourcePath, targetDir, targetFileName) {
    const src = path.join(__dirname, "..", sourcePath);
    const target = path.join(targetDir, targetFileName);
    try {
        fs.copyFileSync(src, target);
        p.log.step(`创建文件: ${color.cyan(target)}`);
    } catch (err) {
        console.log("err :>> ", err);
        p.cancel(`发生错误，复制文件失败 ${src}`);
        process.exit(0);
    }
}

/**
 * 项目创建完成后的提示语
 * @param {string} projectName - 项目目录名
 */
function endTips(projectName) {
    const nextSteps = [
        "# 进入你的目录",
        color.white(`cd ${projectName}`),
        "",
        "# 初始化项目，如 ",
        color.white(`npm install`),
        "",
        "# 查看文档",
        color.white(`REANME.md`),
        "",
        "# 后面就不管了",
    ];

    p.note(nextSteps.join("            \n"), "Next steps.");

    p.outro(
        `有啥问题? ${color.underline(
            color.cyan("http://192.168.0.161/module/fb-cli")
        )}`
    );
}

module.exports = {
    copyTemplate,
    copyFile,
    endTips,
};
