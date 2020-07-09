#!/usr/bin/env node
const bcrypt = require('bcrypt');
const { promises: fs } = require('fs');
const { EOL } = require('os');
const path = require('path');

function panic(error, code = 1) {
  console.error(error);
  process.exit(code);
}

(async () => {
  const email = process.argv[2];
  const password = process.argv[3];
  if (!email) panic(new Error('email must be provided as argument'));
  if (!password) panic(new Error('password must be provided as argument'));
  try {
    const usersFilePath = path.resolve('data/users.json');
    const users = JSON.parse(await fs.readFile(usersFilePath, 'utf8'));
    const userIndex = users.findIndex(u => u.email === email);
    const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '10', 10);
    const hash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const user = { email, password: hash };
    userIndex > -1 ? users.splice(userIndex, 1, user) : users.push(user);
    await fs.writeFile(usersFilePath, `${JSON.stringify(users, undefined, 2)}${EOL}`, 'utf8');
    console.log(user);
  } catch (err) {
    panic(err);
  }
})();
