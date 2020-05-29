const Bot = require('./modules/bot');
const process = require('process');

require('./modules/date-format');

class Plugin extends Bot {
  constructor () {
    super();
  }
  async run () {
    const now= new Date(new Date().valueOf() + 8 * 60 * 60 * 1000).Format('M/d h:m:s');
    await this.sendImage('assets/geekbot.png');
    // 发送环境配置信息
    const CONF_DATA = `
## GeekBot Secrets Dump
> 备份导出您的项目\`secrets\`设置数据

## 1. \`bot_api\`
\`\`\`
${process.env.bot_api}
\`\`\`

## 2. \`caiyun_gps\`
\`\`\`
${process.env.secrets_caiyun_gps}
\`\`\`

## 2. \`caiyun_key\`
\`\`\`
${process.env.secrets_caiyun_key}
\`\`\`

> 导出时间：${now}
> https://github.com/im3x/GeekBot`;
    const f = await this.uploadFile("配置数据备份.md", Buffer.from(CONF_DATA));
    //await this.sendFile(f);
    //await this.sendMarkdown("🤖 Hello! GeekBot!\n> 项目地址：[@GeekBot](https://github.com/im3x/GeekBot)\n> 启动时间：" + now);
    await this.sendMarkdown("🤖 此条消息由徐鑫鑫赞助！\n> 项目地址：[@个人主页](https://www.baidu.com/s?wd=%E4%BD%A0%E6%9C%89%E6%AF%9B%E7%97%85%EF%BC%9F)\n> 启动时间：" + now);
    const axios = require('axios').default;
    axios.get('https://api.qinor.cn/soup/').then(res => {
      await this.sendMarkdown(`> 🌺🐔来碗毒鸡汤\n\n${res.data}`);
    })
    // test env
    // const $f = await this.uploadFile("env.txt", new Buffer(JSON.stringify(process.env)));
    // await this.sendFile($f);
  }
}

new Plugin().run();
