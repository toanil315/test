module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "xo",
        'eslint:recommended',
        "plugin:@typescript-eslint/recommended",

        "plugin:prettier/recommended"
    ],
    "overrides": [
        {
            "extends": [
                "xo-typescript",
                "plugin:prettier/recommended"  // don't forget this scope
            ],
            "files": [
                "*.ts",
                "*.tsx"
            ]
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": 'error',
      "react/no-unescaped-entities": "off",
      "react/no-unknown-property": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "react/display-name": 'off',
      "@typescript-eslint/consistent-type-assertions": [ 0,
        {
          "assertionStyle": "as" | "angle-bracket",
          "objectLiteralTypeAssertions": "allow" | "allow-as-parameter"
        }
      ]
    }
}
