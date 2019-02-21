# ⚛️ Craig Component Library ⚛️

## 🚀 Getting started

```

### 👾 Usage

```javascript
import React, { Component } from 'react'

import MyComponent from 'craig-component-library/dist/MyComponent'

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
