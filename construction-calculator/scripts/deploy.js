const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Clean old builds
console.log('Cleaning old builds...');
execSync('npm run clean');

// Build the app
console.log('Building app...');
execSync('npm run build:pwa');

// Create a zip of the build
console.log('Creating distribution package...');
const version = require('../package.json').version;
const zipName = `mathrax-${version}.zip`;

execSync(`cd out && zip -r ../${zipName} ./*`);

console.log(`\nBuild complete! Distribution package created: ${zipName}`);
