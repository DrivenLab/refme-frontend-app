const path = require("path");
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["@gluestack-style/babel-plugin-styled-resolver"],
  };
};
