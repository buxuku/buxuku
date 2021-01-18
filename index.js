const fs = require('fs');
const axios = require('axios');

const URL = "http://blog.linxiaodong.com/latest.json";
const START_TAG = `<!-- POST-START -->`;
const END_TAG = `<!-- POST-END -->`;

async function build() {
    const {data = []} = await axios.get(URL);
    const readme = fs.readFileSync("./README.md", "utf8");
    const indexStart = readme.indexOf(START_TAG) + START_TAG.length;
    const indexEnd = readme.indexOf(END_TAG);
    const startContent = readme.substring(0, indexStart);
    const endContent = readme.substring(indexEnd);

    const postList = data.map(item => `- [${item.title}](https://blog.linxiaodong.com${item.path})`).join('\n');
    const readmeNew = `
${startContent}
${postList}
${endContent}
`;

    fs.writeFileSync("./README.md", readmeNew.trim());
}

try{
    build()
}catch(e){
    console.log('error',e );
}