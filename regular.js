const {repoTasks, regularRepo, cleanup} = require('./lib');
const repo = regularRepo();
repoTasks(repo, cleanup);