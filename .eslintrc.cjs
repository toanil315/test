module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "xo",
        "plugin:prettier/recommended",
        'eslint:recommended',
        "plugin:@typescript-eslint/recommended",

        "prettier",
    ],
    "overrides": [
        {
            "extends": [
                "xo-typescript"
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
        "react",
        "prettier"
    ],
    "rules": {
      "prettier/prettier": "error"
    }
}
