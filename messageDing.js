// 导入 http 模块
// const http = require('http');
const axios = require('axios');
const options = require('./package.json');

function messageDing() {
    
    axios.post("http://192.168.0.225:4096/message",{
            at: {
                isAtAll: true,
            },
            markdown: {
                title: options.name + " 组件发布",
                text: `## 组件：${options.name}
                \n\n版本：${options.version}
                \n\n发布日期：${ new Date().toLocaleDateString()}
                \n\n功能描述：${ options.description || '未注明'}
                \n\n访问地址：${options.homepage || '未注明'}
                \n\n本次更新内容：${ options.UpdateDescription || '未注明'}`
            },
            msgtype: "markdown",
        },{
            // 配置跨域
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        }
    );
}

messageDing();