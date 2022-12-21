module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
  parser: '@typescript-eslint/parser',
	extends: [
    'xo',
    "plugin:@typescript-eslint/recommended",
    // 'prettier/@typescript-eslint',  //"prettier/@typescript-eslint" has been merged into "prettier" in eslint-config-prettier 8.0.0
		'plugin:react/recommended',

    "prettier",
    "plugin:prettier/recommended",
	],
	overrides: [
		{
			extends: [
				'xo-typescript',
			],
			files: [
				'*.ts',
				'*.tsx',
			],
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
    "prettier",
		'react',
	],
	rules: {
    "prettier/prettier": ["error"], // any prettier formatting error is considered as an ESLint error.
    "react/react-in-jsx-scope": "off",

	},
};
