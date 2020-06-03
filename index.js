'use strict';

const EVENT_TEST_PASS = 'pass';
const EVENT_SUITE_BEGIN = 'suite';
const EVENT_SUITE_END = 'suite end';

class MochaSpecTreeReporter {
  constructor (runner) {
    this._indents = 0;
    this.puts = console.log;
    runner
      .on(EVENT_SUITE_BEGIN, (suite) => {
        if (!suite.root) {
          this.puts(`${this.indent()}${this.suiteMarker()} ${suite.title}`);
        }
        this.increaseIndent();
      })
      .on(EVENT_SUITE_END, (suite) => {
        this.decreaseIndent();
        if (this.isTopLevel()) {
          this.puts('');
        }
      })
      .on(EVENT_TEST_PASS, (test) => {
        this.puts(`${this.indent()}- ${test.title}`);
      });
  }

  isTopLevel () {
    return this._indents === 1;
  }

  suiteMarker () {
    return this.isTopLevel() ? '###' : '-';
  }

  indent () {
    return Array(this._indents).join('  ');
  }

  increaseIndent () {
    this._indents++;
  }

  decreaseIndent () {
    this._indents--;
  }
}

module.exports = MochaSpecTreeReporter;
