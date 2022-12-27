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
  "@components/*": ["./components/*"],
  "@assets/*": ["./assets/*"],
  "@interfaces/*": ["./interfaces/*"],

}
```

In `vite.config.ts`:
```js
resolve: {

  alias: {
    "@components": path.resolve(__dirname, "./src/components"),
    "@assets": path.resolve(__dirname, "./src/assets"),
    "@interfaces": path.resolve(__dirname, "./src/interfaces"),
  }
}
```
# Atomic Design Pattern
- Atoms
- Molecules
- Organisms
- Templates
- Pages

## Atoms
- Basic building blocks of matter, such as a button, input or a form label. They’re not useful on their own
- It cannot be divided into smaller pieces.
- It doesn't have any actions
- We should implement it as general as possible.

...
