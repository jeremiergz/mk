#!/usr/bin/env node
const { EOL } = require('os');
const path = require('path');
const { promisify } = require('util');
const packageJSON = require('./package.json');
const exec = promisify(require('child_process').exec);
const writeFile = promisify(require('fs').writeFile);

const packageJSONPath = path.resolve(__dirname, 'package.json');
const version = process.argv[2];

function exit(message) {
  console.log(message);
  process.exit(1);
}

if (!version) exit('Version must be passed as parameter');
if (!version.match(/^(\d+\.){2}\d+$/)) exit('Version must match /^(\\d+\\.){2}\\d+$/');

(async () => {
  try {
    // 1. Go on master branch & rebase on develop
    console.log('Checkout master branch');
    await exec('git checkout master');
    console.log('Rebase master branch on develop');
    await exec('git rebase develop');

    // 2. Bump package.json & update package-lock.json
    console.log('Bump package.json version');
    const newPackageJSON = `${JSON.stringify(
      {
        ...packageJSON,
        version,
      },
      undefined,
      2,
    )}${EOL}`;
    await writeFile(packageJSONPath, newPackageJSON, 'utf8');
    console.log('Update package-lock.json');
    await exec('npm install');

    // 3. Create release commit, tag it & push it to remote
    console.log('Create release commit');
    await exec('git add package.json package-lock.json');
    await exec(`git commit -m 'chore: release v${version}'`);
    console.log('Tag release commit');
    await exec(`git tag -a '${version}' -m 'release v${version}'`);
    console.log('Push new master version');
    await exec('git push --follow-tags');

    // 4. Go back to develop branch, rebase on released master & push it to remote
    console.log('Checkout develop branch');
    await exec('git checkout develop');
    console.log('Rebase develop branch on master');
    await exec('git rebase master');
    console.log('Push develop branch');
    await exec('git push');
  } catch (err) {
    exit(err.message);
  }
})();
