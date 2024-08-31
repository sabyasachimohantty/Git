"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Git = void 0;
class Git {
    constructor(name) {
        this.branches = [];
        this.name = name;
        this.lastCommitId = -1;
        this.branches = [];
        const master = new Branch("master", null);
        this.branches.push(master);
        this.HEAD = master;
    }
    commit(message) {
        const commit = new Commit(++this.lastCommitId, message, this.HEAD.commit);
        this.HEAD.commit = commit;
        return commit;
    }
    checkout(branchName) {
        for (let i = 0; i < this.branches.length; i++) {
            if (this.branches[i].name == branchName) {
                console.log(`Switched to existing branch ${branchName}`);
                this.HEAD = this.branches[i];
                return this;
            }
        }
        const newBranch = new Branch(branchName, this.HEAD.commit);
        this.branches.push(newBranch);
        this.HEAD = newBranch;
        console.log(`Switched to new branch ${branchName}`);
        return this;
    }
    log() {
        const history = [];
        let commit = this.HEAD.commit;
        while (commit) {
            history.push(commit);
            commit = commit.parent;
        }
        return history;
    }
}
exports.Git = Git;
class Commit {
    constructor(id, message, parent) {
        this.id = id;
        this.message = message;
        this.parent = parent;
    }
}
class Branch {
    constructor(name, commit) {
        this.name = name;
        this.commit = commit;
    }
}
