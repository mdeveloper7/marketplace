const bcrypt = require('bcrypt')

const SALT_ROUNDS = 10
async function hash() {
  const password = 'admin'
  
  const hashed = await bcrypt.hash(password, SALT_ROUNDS)
  console.log(hashed)
}

hash();