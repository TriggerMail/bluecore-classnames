module.exports = api => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          useBuiltIns: 'entry',
          corejs: 2,

          // To later enable tree shaking, replace all module.exports with es6
          // use `modules: false` and add a sideEffects list in package.json
          modules: 'commonjs'
        }
      ],
      '@babel/preset-react',
      '@babel/preset-flow'
    ],
    plugins: [['@babel/plugin-proposal-class-properties', {loose: true}]]
  };
};
