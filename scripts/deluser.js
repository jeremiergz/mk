#!/usr/bin/env node
const { promises: fs } = require('fs');
const { EOL } = require('os');
const path = require('path');

function panic(error, code = 1) {
  console.error(error);
  process.exit(code);
}

(async () => {
  const email = process.argv[2];
  if (!email) panic(new Error('email must be provided as argument'));
  try {
    const usersFilePath = path.resolve('data/users.json');
    const users = JSON.parse(await fs.readFile(usersFilePath, 'utf8'));
    const userIndex = users.findIndex(u => u.email === email);
    const deletedUser = userIndex > -1 ? users.splice(userIndex, 1) : panic(new Error('user not found'));
    await fs.writeFile(usersFilePath, `${JSON.stringify(users, undefined, 2)}${EOL}`, 'utf8');
    console.log(deletedUser[0]);
  } catch (err) {
    panic(err);
  }
})();
