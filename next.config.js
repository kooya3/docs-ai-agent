module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /schematic-components\.esm\.js$/,
      use: 'babel-loader',
    });

    return config;
  },
};