const { regularRepo, invalidRepo, cleanup, repoTasks } = require('./lib');
try {
  repoTasks(regularRepo(), () => repoTasks(invalidRepo(), cleanup));
} catch (err) {
  console.error(err);
  console.log('error caught!');
  cleanup();
}
