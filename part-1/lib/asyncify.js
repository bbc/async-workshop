'use strict';

const path = require('path');
const Filehound = require('filehound');

// DO NOT MODIFY THIS FILE

function qualify(file) {
  return path.join(__dirname, path.basename(file));
}

function getName(file) {
  return path.basename(file, '.js');
}

function whoami() {
  return getName(__filename);
}

const files = Filehound.create()
  .path('./lib')
  .ext('js')
  .discard(`.*${whoami()}`, 'private')
  .findSync();

for (const file of files) {
  module.exports[getName(file)] = require(qualify(file));
}
