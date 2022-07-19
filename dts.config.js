const svg = require("rollup-plugin-svg-import");

module.exports = {
  rollup(config, _options)  {
    config.plugins.push(
      svg({ stringify: true })
    );

    return config;
  }
};
