const nunjucks = require('nunjucks');
const fs = require('fs');
const GithubApi = require('./utils/githubApi');

async function build() {
    const githubApi = new GithubApi({
        owner: 'buxuku',
        repo: 'buxuku.github.io',
        auth: process.env.GH_TOKEN,
    });
    githubApi.init();
    console.log('fetching');
    let data = await githubApi.fetchPageIssues({per_page: 10, page: 1});
    data = data.map(issue => ({title: issue.title, html_url: issue.html_url}));
    const temp = nunjucks.render('./readme.njk', {list: data});
    fs.writeFileSync("./README.md", temp);
}

try {
    build()
} catch (err) {
    console.log('err', err);
}