'use strict';

delete require.cache[require.resolve('..')];
const MochaSpecTreeReporter = require('..');
const assert = require('assert').strict;
const EventEmitter = require('events');
class FakeRunner extends EventEmitter {}

describe('MochaSpecTreeReporter', () => {
  let fakeRunner;
  let actualLines;

  beforeEach(() => {
    fakeRunner = new FakeRunner();
    const reporter = new MochaSpecTreeReporter(fakeRunner);
    actualLines = [];
    reporter.puts = (line) => { actualLines.push(line); };
  });

  context('top level `it`', () => {
    beforeEach(() => {
      fakeRunner.emit('suite', { title: '', root: true });
      fakeRunner.emit('pass', { title: 'top level `it`' });
      fakeRunner.emit('suite end', { title: '', root: true });
    });
    it('top level `it` uses bullet list marker `-` without indentation at the beginning of a line, followed by a title', () => {
      assert.equal(actualLines[0], '- top level `it`');
    });
  });

  context('`it` enclosed in `describe`', () => {
    beforeEach(() => {
      fakeRunner.emit('suite', { title: '', root: true });
      fakeRunner.emit('suite', { title: 'top level `describe`' });
      fakeRunner.emit('pass', { title: '`it`' });
      fakeRunner.emit('suite end', { title: 'top level `describe`' });
      fakeRunner.emit('suite end', { title: '', root: true });
    });
    it('top level `describe` uses headings `###` at the beginning of a line, followed by a title', () => {
      assert(actualLines[0] === '### top level `describe`');
    });
    it('`it` enclosed in `describe` uses bullet list marker `-` with indentation at the beginning of a line, followed by a title', () => {
      assert(actualLines[1] === '  - `it`');
    });
  });

  context('`it` enclosed in inner `describe`, that is enclosed in outer `describe`', () => {
    beforeEach(() => {
      fakeRunner.emit('suite', { title: '', root: true });
      fakeRunner.emit('suite', { title: 'outer top level `describe`' });
      fakeRunner.emit('suite', { title: 'inner `describe`' });
      fakeRunner.emit('pass', { title: '`it`' });
      fakeRunner.emit('suite end', { title: 'inner `describe`' });
      fakeRunner.emit('suite end', { title: 'outer top level `describe`' });
      fakeRunner.emit('suite end', { title: '', root: true });
    });
    it('outer top level `describe` uses headings `###` at the beginning of a line, followed by a title', () => {
      assert(actualLines[0] === '### outer top level `describe`');
    });
    it('inner `describe` enclosed in outer `describe` uses bullet list marker `-` with indentation at the beginning of a line, followed by a title', () => {
      assert(actualLines[1] === '  - inner `describe`');
    });
    it('`it` enclosed in inner `describe` uses bullet list marker `-` with indentation at the beginning of a line, followed by a title', () => {
      assert(actualLines[2] === '    - `it`');
    });
  });

});
