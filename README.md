# vue-osv-scanner

This project is a Vue 3 + TypeScript application that scans package.json files for vulnerabilities using the OSV API. It allows users to upload a file, perform a scan, and view the results in a structured table.
## Features
* Upload package.json file for vulnerability scanning
* Fetch vulnerability data from the OSV API
* Display results in a table with severity levels
* View detailed vulnerability information
* Reset functionality to scan new files
  
## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

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

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
