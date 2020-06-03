'use strict';

delete require.cache[require.resolve('..')];
const MochaSpecTreeReporter = require('..');
const assert = require('assert').strict;
const EventEmitter = require('events');
class FakeRunner extends EventEmitter {}

describe('MochaSpecTreeReporter: generates API spec description for README', () => {
  let fakeRunner;
  let actualLines;

  beforeEach(() => {
    fakeRunner = new FakeRunner();
    const reporter = new MochaSpecTreeReporter(fakeRunner);
    actualLines = [];
    reporter.puts = (line) => { actualLines.push(line); };
  });

  context('when rendering top level tests:', () => {
    beforeEach(() => {
      fakeRunner.emit('suite', { title: '', root: true });
      fakeRunner.emit('pass', { title: 'top level `it`' });
      fakeRunner.emit('suite end', { title: '', root: true });
    });
    it('renders bullet list marker `-` at the beginning of a line, followed by test title', () => {
      assert.equal(actualLines[0], '- top level `it`');
    });
  });

  context('when top level suites enclose tests:', () => {
    beforeEach(() => {
      fakeRunner.emit('suite', { title: '', root: true });
      fakeRunner.emit('suite', { title: 'top level `describe`' });
      fakeRunner.emit('pass', { title: 'inner `it`' });
      fakeRunner.emit('suite end', { title: 'top level `describe`' });
      fakeRunner.emit('suite end', { title: '', root: true });
    });
    it('renders headings `###` at the beginning of a line, followed by top level suite title', () => {
      assert.equal(actualLines[0], '### top level `describe`');
    });
    it('renders bullet list marker with indentation `  -` at the beginning of a line, followed by inner test title', () => {
      assert.equal(actualLines[1], '  - inner `it`');
    });
  });

  context('when top level outer suites enclose inner suites, and inner suites enclose innermost tests:', () => {
    beforeEach(() => {
      fakeRunner.emit('suite', { title: '', root: true });
      fakeRunner.emit('suite', { title: 'outer top level `describe`' });
      fakeRunner.emit('suite', { title: 'inner `describe`' });
      fakeRunner.emit('pass', { title: 'the innermost `it`' });
      fakeRunner.emit('suite end', { title: 'inner `describe`' });
      fakeRunner.emit('suite end', { title: 'outer top level `describe`' });
      fakeRunner.emit('suite end', { title: '', root: true });
    });
    it('renders headings `###` at the beginning of a line, followed by top level outer suite title', () => {
      assert.equal(actualLines[0], '### outer top level `describe`');
    });
    it('renders bullet list marker with indentation `  -` at the beginning of a line, followed by inner suite title', () => {
      assert.equal(actualLines[1], '  - inner `describe`');
    });
    it('renders bullet list marker with double indentation `    -` at the beginning of a line, followed by innermost test title', () => {
      assert.equal(actualLines[2], '    - the innermost `it`');
    });
  });

  context('when multiple top level suites exist:', () => {
    beforeEach(() => {
      fakeRunner.emit('suite', { title: '', root: true });
      fakeRunner.emit('suite', { title: 'top level suite 1' });
      fakeRunner.emit('suite', { title: 'inner suite 1' });
      fakeRunner.emit('pass', { title: 'inner test 1' });
      fakeRunner.emit('suite end', { title: 'inner suite 1' });
      fakeRunner.emit('suite end', { title: 'top level suite 1' });
      fakeRunner.emit('suite', { title: 'top level suite 2' });
      fakeRunner.emit('suite', { title: 'inner suite 2' });
      fakeRunner.emit('pass', { title: 'inner test 2' });
      fakeRunner.emit('suite end', { title: 'inner suite 2' });
      fakeRunner.emit('suite end', { title: 'top level suite 2' });
      fakeRunner.emit('suite end', { title: '', root: true });
    });
    it('insert blank line after each top level suite', () => {
      assert.deepStrictEqual(actualLines, [
        '### top level suite 1',
        '  - inner suite 1',
        '    - inner test 1',
        '',
        '### top level suite 2',
        '  - inner suite 2',
        '    - inner test 2',
        '',
      ]);
    });
  });
});
