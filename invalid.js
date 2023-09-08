const {repoTasks, invalidRepo, cleanup} = require('./lib');
const repo = invalidRepo();
repoTasks(repo, cleanup);