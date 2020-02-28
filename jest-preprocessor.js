const babelJest = require('babel-jest');

module.exports = {
  canInstrument: babelJest.canInstrument,
  getCacheKey: babelJest.getCacheKey,
  process: function(src, path, ...rest) {
    if (path.match(/\.(s?css)/)) {
      return;
    }
    if (path.indexOf('node_modules') === -1) {
      return babelJest.process(src, path, ...rest);
    }
    return src;
  }
};
