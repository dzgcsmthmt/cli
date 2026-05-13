const fs = require("fs-extra");
const path = require('path');
const { parse, stringify } = require('comment-json');

// 读取源文件的内容并将其写入目标文件
async function copyTemplatePackage(s, to) {
   // 定义源文件和目标文件的路径
   const sourceFilePath = path.join(
       to,
       "package.copy.json"
   );
   const targetFilePath = path.join(
       to,
       "package.json"
   );
   try {
       const data = await fs.readFile(sourceFilePath, "utf8");
       await fs.writeFile(targetFilePath, data, "utf8");
       // 删除原文件
       await fs.unlink(sourceFilePath);
       console.log("完成配置项目的pachage.json");
   } catch (err) {
       console.error("发生错误：", err);
       s.stop('无法完成package.json的处理，请自行修改');
   }
}

function editPackage(info, to) {
    const file = path.join(to, "package.json");
    // 读取package.json文件
    const packageJson = parse(
        fs.readFileSync(file, "utf8")
    );
    // 修改属性
    packageJson.name = info.projectName;
    packageJson.version = "0.0.1";
    packageJson.description = info.description || "";
    packageJson.author = info.author || "";

    // 将修改后的内容写回package.json文件
    fs.writeFileSync(file, stringify(packageJson, null, 2));
}

module.exports = {
    copyTemplatePackage,
    editPackage
};