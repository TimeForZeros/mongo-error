const BaseRepository = require('@image-metrics/im-ws-repository');
const Sample = require('../SampleSchema');

const baseRepository = new BaseRepository();

const connectionRegular = {
  dbName: 'mongo-error-db',
  connection: {
    host: 'localhost',
    port: 27017,
  },
};

const connectionInvalid = {
  dbName: 'mongo-error-db',
  connection: {
    username: 'foo',
    password: 'bar',
    host: 'localhost',
    port: 27017,
  },
};

const regularRepo = () =>
  baseRepository.createRepository({
    name: 'test-collection',
    schema: Sample.Schema,
    db: connectionRegular,
  });

const invalidRepo = () =>
  baseRepository.createRepository({
    name: 'test-collection',
    schema: Sample.Schema,
    db: connectionInvalid,
  });

const cleanup = () => {
  const repo = regularRepo();
  repo.DeleteAll({}, async (err, res) => {
    if (err) {
      console.error('failed to delete collection');
      process.exit(1);
    }
    try {
      await repo.Connection.db.dropDatabase();
      console.log('successfully deleted db');
      process.exit(0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });
};

const repoTasks = (repo, callback) => {
  const clearCollection = (cb) =>
    repo.DeleteAll({}, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log('successfully reset test db');
      return cb();
    });

  const addEntry = (cb) =>
    repo.SaveOrUpdate({ name: 'name', contents: 'contents' }, (err, res) => {
      if (err) {
        console.error(err);
        cleanup();
      } else {
        console.log('successfully added an entry')
        return cb();
      }
    });

  const findEntry = (cb) =>
    repo.FindOne({criteria: { name: 'name' }}, (err, res) => {
      if (err) {
        console.error(err);
      } else if (res) {
        console.log('successfully found entry');
        console.log(res);
      }
      return cb();
    });

  clearCollection(() => addEntry(() =>findEntry(() => callback())));
};

module.exports = {
  regularRepo,
  invalidRepo,
  repoTasks,
  cleanup,
};
