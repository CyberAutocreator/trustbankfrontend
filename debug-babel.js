const path = require('path');
const babel = require('@babel/core');
const fs = require('fs');

const file = path.resolve(process.cwd(), 'src', 'index.js');
console.log('Checking Babel config for', file);
const rc = babel.loadPartialConfig({ filename: file });
console.log('babel config file:', rc && rc.configFile);
console.log('babel options plugins:', (rc && rc.options && rc.options.plugins) || []);
if (rc && rc.files) console.log('files included:', rc.files.length);

Run:
node debug-babel.js
