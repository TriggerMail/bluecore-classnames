module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
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
  plugins: ['react', 'prettier', 'flowtype', "jest", "import"],
  rules: {
    "strict": ["error", "global"],
    "max-depth": ["error", 4],
    "max-nested-callbacks": ["error", 4],
    "max-params": ["error", 4],
    "complexity": ["warn", {"max": 20}],
    "no-useless-constructor": "error",
    "import/no-unresolved": ["error"],
    "react/jsx-no-target-blank": "off",
    "react/no-find-dom-node": "off",
    "react/no-string-refs": "off",
    "react/no-unescaped-entities": ["error", {"forbid": [">", "}"]}],
    "react/jsx-curly-brace-presence": [2, {
      "props": "never",
      "children": "never"
    }],
    "flowtype/boolean-style": [
      2,
      "boolean"
    ],
    "flowtype/define-flow-type": 1,
    "flowtype/delimiter-dangle": 0,
    "flowtype/no-dupe-keys": "error",
    "flowtype/no-primitive-constructor-types": "error",
    "flowtype/no-weak-types": 0,
    "flowtype/object-type-delimiter": 0,
    "flowtype/require-parameter-type": 2,
    "flowtype/require-return-type": 0,
    "flowtype/require-valid-file-annotation": 2,
    "flowtype/type-id-match": [
      2,
      "^T([A-Z][a-z0-9]+)+$"
    ],
    "flowtype/use-flow-type": 1,
    "flowtype/array-style-simple-type": [
      2, "shorthand"
    ],
    "prettier/prettier": "error",
    "eqeqeq": ["error", "smart"]
  },
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
