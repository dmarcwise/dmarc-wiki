# dmarc.wiki

This is the source code for the [dmarc.wiki](https://dmarc.wiki) website.

## Developing

Install dependencies with `npm install`, then run:

```bash
npm run dev
```

Or start the server and open the app in a new browser tab:

```bash
npm run dev -- --open
```

## Formatting and linting

Code formatting is handled by [Prettier](https://prettier.io/) and enforced in CI. To format the whole repository:

```bash
npm run format
```

To check formatting and run [ESLint](https://eslint.org/), as CI does:

```bash
npm run lint
```

In VS Code, the recommended [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extensions (see `.vscode/extensions.json`) run both on save.

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
