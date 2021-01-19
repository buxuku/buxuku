const fs = require('fs');
const axios = require('axios');
const nunjucks = require('nunjucks');

const URL = "http://blog.linxiaodong.com/latest.json";

async function build() {
    const {data = []} = await axios.get(URL);
    const temp = nunjucks.render('./readme.njk', {list: data});
    fs.writeFileSync("./README.md", temp);
}

try {
    build()
} catch (e) {
    console.log('error', e);
}