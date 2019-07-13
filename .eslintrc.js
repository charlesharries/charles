const { resolve } = require('path')

module.exports = {
  extends: [
    "wesbos"
  ],
  rules: {
    "jsx-a11y/label-has-for": [2, {
      "required": {
        "every": [ "id" ]
      }
    }],
    "jsx-a11y/label-has-associated-control": [2, {
      "required": {
        "every": [ "id" ]
      }
    }],
    "no-unused-expressions": ["error", {
      "allowTernary": true
    }],
    "react/no-danger": "off",
    "no-param-reassign": "off"
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              '~pages': resolve(__dirname, 'pages'),
              '~components': resolve(__dirname, 'components'),
              '~css': resolve(__dirname, 'assets', 'css'),
              '~util': resolve(__dirname, 'util'),
              '~config': resolve(__dirname, 'config')
            },
            extensions: ['.js', '.jsx', '.json']
          }
        }
      }
    },
  },
}