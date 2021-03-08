@twada/mocha-spec-tree-reporter
================================

Mocha reporter that generates API spec description for README

[![Build Status][ci-image]][ci-url]
[![NPM version][npm-image]][npm-url]
[![License][license-image]][license-url]


USAGE
---------------------------------------

```sh
mocha test --reporter @twada/mocha-spec-tree-reporter
```

SPEC
---------------------------------------

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
  - when multiple top level suites exist:
    - insert blank line after each top level suite


EXAMPLE
---------------------------------------

See self-hosting [tests](https://github.com/twada/mocha-spec-tree-reporter/blob/master/test/test.js) and its [output](https://github.com/twada/mocha-spec-tree-reporter/blob/master/test/fixtures/default.txt).


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

[ci-image]: https://github.com/twada/mocha-spec-tree-reporter/workflows/Node.js%20CI/badge.svg
[ci-url]: https://github.com/twada/mocha-spec-tree-reporter/actions?query=workflow%3A%22Node.js+CI%22

[npm-url]: https://www.npmjs.com/package/@twada/mocha-spec-tree-reporter
[npm-image]: https://badge.fury.io/js/%40twada%2Fmocha-spec-tree-reporter.svg

[license-url]: https://twada.mit-license.org
[license-image]: https://img.shields.io/badge/license-MIT-brightgreen.svg
