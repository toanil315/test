<!-- @format -->

# What?

Just a template


# Solve Eslint and Prettier conflict
First:

```json
npm i -D prettier

npm i -D eslint-config-prettier
npm i -D eslint-plugin-prettier

npm i -D tslint-config-prettier
npm i -D tslint-plugin-prettier
```
Then you need to add `plugin:prettier/recommended` as the **last** extension in your `.eslintrc.json`:

```json
{
  "extends": ["plugin:prettier/recommended"]
}
```

Exactly what does `plugin:prettier/recommended` do? Well, this is what it expands to:

```json
{
  "extends": ["prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off"
  }
}
```
# Cleaner importing
In `tsconfig.json`:
```json
"paths": {
  "@/*": ["./src/*"] //@/components <=> ./src/components => @ <=> ./src
}
```

In `vite.config.ts`:
```js
resolve: {
  //@components <=> ./src/components => @ <=> ./src/
  alias: {
    '@': path.resolve(__dirname, './src')
  }
}
```
