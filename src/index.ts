export class Git {
    name: string;
    lastCommitId: number;
    HEAD: Branch;
    branches: Branch[] = []

    constructor(name: string) {
        this.name = name
        this.lastCommitId = -1
        this.branches = []
        const master = new Branch("master", null)
        this.branches.push(master)
        this.HEAD = master
    }

    commit(message: string) {
        const commit = new Commit(++this.lastCommitId, message, this.HEAD.commit)
        this.HEAD.commit = commit
        return commit
    }

    checkout(branchName: string) {
        for (let i = 0; i < this.branches.length; i++) {
            if (this.branches[i].name == branchName) {
                console.log(`Switched to existing branch ${branchName}`)
                this.HEAD = this.branches[i]
                return this
            }   
        }

        const newBranch = new Branch(branchName, this.HEAD.commit)
        this.branches.push(newBranch)
        this.HEAD = newBranch
        console.log(`Switched to new branch ${branchName}`)
        return this
    }

    log() {
        const history = []
        let commit = this.HEAD.commit
        while (commit) {
            history.push(commit)
            commit = commit.parent
        }
        return history
    }
}

class Commit {
    id: number;
    message: string;
    parent: null | Commit

    constructor(id: number, message: string, parent: null | Commit) {
        this.id = id
        this.message = message
        this.parent = parent
    }
}

class Branch {
    name: string;
    commit: null | Commit;

    constructor(name: string, commit: null | Commit) {
        this.name = name
        this.commit = commit
    }
}