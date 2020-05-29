@twada/mocha-spec-tree-reporter
================================

Mocha reporter that generates API spec description for README

[![License][license-image]][license-url]


USAGE
---------------------------------------

```sh
mocha test --reporter @twada/mocha-spec-tree-reporter
```

### MochaSpecTreeReporter: generates API spec description for README
  - when rendering top level tests:
    - renders bullet list marker `-` at the beginning of a line, followed by test title
  - when top level suites enclose tests:
    - renders headings `###` at the beginning of a line, followed by top level suite title
    - renders bullet list marker with indentation `  -` at the beginning of a line, followed by inner test title
  - when top level outer suites enclose inner suites, and inner suites enclose innermost tests:
    - renders headings `###` at the beginning of a line, followed by top level outer suite title
    - renders bullet list marker with indentation `  -` at the beginning of a line, followed by inner suite title
    - renders bullet list marker with double indentation `    -` at the beginning of a line, followed by innermost test title


INSTALL
---------------------------------------

```sh
$ npm install @twada/mocha-spec-tree-reporter
```


AUTHOR
---------------------------------------
* [Takuto Wada](https://github.com/twada)


LICENSE
---------------------------------------
Licensed under the [MIT](https://twada.mit-license.org) license.

[license-url]: https://twada.mit-license.org
[license-image]: https://img.shields.io/badge/license-MIT-brightgreen.svg
