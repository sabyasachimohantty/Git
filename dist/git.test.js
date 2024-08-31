"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
// console.log("Git.checkout() test");
// const repo = new Git("test");
// repo.commit("Initial Commit");
// console.assert(repo.HEAD.name === "master"); // Should be on master branch.
// repo.checkout("testing");
// console.assert(repo.HEAD.name === "testing"); // Should be on new testing branch.
// repo.checkout("master");
// console.assert(repo.HEAD.name === "master"); // Should be on master branch.
// repo.checkout("testing");
// console.assert(repo.HEAD.name === "testing"); // Should be on testing branch again.
console.log("3. Branches test");
var repo = new index_1.Git("test");
repo.commit("Initial commit");
repo.commit("Change 1");
// Maps the array of commits into a string of commit ids.
// For [C2, C1,C3], it returns "2-1-0"
function historyToIdMapper(history) {
    var ids = history.map(function (commit) {
        return commit.id;
    });
    return ids.join("-");
}
console.assert(historyToIdMapper(repo.log()) === "1-0"); // Should show 2 commits.
repo.checkout("testing");
repo.commit("Change 3");
console.assert(historyToIdMapper(repo.log()) === "2-1-0"); // Should show 3 commits.
repo.checkout("master");
console.assert(historyToIdMapper(repo.log()) === "1-0"); // Should show 2 commits. Master unpolluted.
repo.commit("Change 3");
console.assert(historyToIdMapper(repo.log()) === "3-1-0"); // Continue on master with 4th commit.
