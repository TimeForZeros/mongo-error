const baseRepository = require('@image-metrics/im-ws-repository');

const repo = new baseRepository();

const SampleSchema = repo.Schema({
  name: String,
  contents: String,
  dateAdded: { type: Date, default: Date.now },

});

exports.Schema = SampleSchema;