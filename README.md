## 项目报错: Unknown at rule @applyless(unknownAtRules)
请在 vscode中添加如下
```sh
  # .vscode > settings.json
  {
  "less.lint.unknownAtRules": "ignore"
  }
```
什么？ 没有效？ 重启编辑器

参考链接：https://github.com/tailwindlabs/tailwindcss/discussions/5258

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
