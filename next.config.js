const { repository, version } = require('./package.json');

module.exports = {
  env: {
    PACKAGE_JSON_REPOSITORY_URL: repository.url.replace(/git\+|\.git/g, ''),
    PACKAGE_JSON_VERSION: version,
  },
  poweredByHeader: false,
};
