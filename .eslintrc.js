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
    "no-param-reassign": "off",
    "prettier/prettier": ["error", {
      "singleQuote": true,
      "printWidth": 100,
      "trailingComma": true,
    }]
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
              '~data': resolve(__dirname, 'data'),
            },
            extensions: ['.js', '.jsx', '.json']
          }
        }
      }
    },
  },
}