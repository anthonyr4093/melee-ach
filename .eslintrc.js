/** @type import("eslint").Linter.Config */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["prettier"],
  extends: ["@nuxtjs", "prettier", "prettier/vue"],
  rules: {
    // "arrow-parens": ["error", "as-needed"],
    "import/no-extraneous-dependencies": "off",
    "require-await": 0,

    curly: ["warn", "multi-or-nest"],
    "global-require": 0,
    "import/no-unresolved": 0,
    "import/newline-after-import": 0,
    "no-underscore-dangle": 0,

    "prettier/prettier": "warn",

    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,

    "no-undef": "off",
    "vue/max-attributes-per-line": "off",
    "vue/singleline-html-element-content-newline": 0,
  },
};
