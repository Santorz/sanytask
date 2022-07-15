module.exports = {
  // experimental: {
  //   esmExternals: false,
  // },
  webpack: (config) => {
    config.experiments = config.experiments || {};
    config.experiments.topLevelAwait = true;
    return config;
  },
};
