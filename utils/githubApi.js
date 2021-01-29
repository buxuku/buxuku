'use strict'
const {Octokit} = require("@octokit/rest");

class GithubApi {
    constructor(options) {
        this.repo = options.repo;
        this.owner = options.owner;
        this.auth = options.auth || process.env.GH_TOKEN;
        this.userAgent = 'github-readme';
    }

    init() {
        this.octokit = new Octokit({
            auth: this.auth,
            userAgent: this.userAgent,
        });
    }

    async fetchAllIssues() {
        const data = await this.octokit
            .paginate("GET /repos/{owner}/{repo}/issues", {
                owner: this.owner,
                repo: this.repo,
            });
        return data;
    }

    async fetchPageIssues(params = {}) {
        const res = await this.octokit.issues.listForRepo({
            owner: this.owner,
            repo: this.repo,
            ...params,
        });
        return res.status === 200 ? res.data : [];
    }

    async createIssue(issueData) {
        const res = await this.octokit.issues.create({
            owner: this.owner,
            repo: this.repo,
            ...issueData,
        });
        return res;
    }

    async updateIssue(issueData) {
        const res = await this.octokit.issues.update({
            owner: this.owner,
            repo: this.repo,
            ...issueData,
        })
        return res;
    }
}

module.exports = GithubApi;