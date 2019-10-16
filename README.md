# ⚛️ Craigponent Library ⚛️

## 🚀 Getting started

#### Install package
```bash
yarn add craigponent-library
```

### 👾 Usage

```javascript
import React, { Component } from 'react'

import MyComponent from 'craigponent-library/dist/MyComponent'

...

<MyComponent prop="yes please" />
```


## 💅 Style management
CSS Modules


## ✨ Developer experience
* `yarn start` or `yarn dev` - Starts the documentation at http://localhost:3000/
* `yarn watch` - rollup watches any changes (not really needed)
* `yarn build` - builds the component library
* `yarn build:web` - builds the docs
* `yarn test` - runs any tests


### Docz
The docs are built with ❤️ from [docz][]

### Create a new component
1. Create a new directory in `src/lib`. with the name of the component
2. Make a `.jsx` file with the name of the component and a `[componentName].module/scss` file.
3. Create a new `.mdx` file in `src/documentation/components`.
4. Follow the format of other `.mdx` files. Make sure to add the component config at the top like so:
```
---
name: Accordion
menu: Components
route: /components-Accordion
---
```
5. Update `package.json` according to semver.
6. Give a description of what changed in `src/CHANGELOG.mdx` followed by who made the changes.
7. Profit 💰

### Automatic code formatting

[prettier][] is an opinionated code formatter aiming to provide codebase consistency when multiple developers work on the same project. The main reason behind adopting Prettier is to [stop all the on-going debates over coding styles][].

### Linting

[Linters][lint] are tools that analyze source code to flag programming errors, bugs, stylistic errors, and suspicious constructs.

- JavaScript is linted by [ESLint][], enforcing the [Airbnb JavaScript Style Guide][] through an overridable set of rules provided by [eslint-config-airbnb-base][].
- Styles are linted by [stylelint][], adhering to the rules specified in [stylelint-config-recommended][].



---
<!-- LINKS -->
[docz]: https://www.docz.site/
[prettier]: https://prettier.io/
[lint]: https://en.wikipedia.org/wiki/Lint_(software)
[eslint]: https://eslint.org/
[airbnb javascript style guide]: https://github.com/airbnb/javascript
[eslint-config-airbnb-base]: https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base
[stylelint]: https://stylelint.io/
[stylelint-config-recommended]: https://github.com/stylelint/stylelint-config-recommended
[stop all the on-going debates over coding styles]: https://prettier.io/docs/en/why-prettier.html
