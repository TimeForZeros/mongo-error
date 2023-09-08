const {repoTasks, invalidRepo} = require('./lib');
const repo = invalidRepo();
repoTasks(repo, cleanup);