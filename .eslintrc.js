module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parser: 'babel-eslint',
  extends: [
    'standard-jsx',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:flowtype/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/react',
    'prettier/flowtype'
  ],
  plugins: ['react', 'prettier', 'flowtype'],
  rules: {},
  settings: {
    'import/resolver': 'webpack',
    flowtype: {
      onlyFilesWithFlowAnnotation: true
    },
    react: {
      version: 'detect'
    }
  }
};
