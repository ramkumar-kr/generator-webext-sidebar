'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-webext-sidebar:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'));
  });

  it('creates files', () => {
    assert.file([
      'manifest.json',
      'sidebar.html',
      'sidebar.js',
      'icon.svg'
    ]);
  });
});
