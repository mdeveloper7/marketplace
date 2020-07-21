const config = {
  MYSQL_DB: process.env.MYSQL_DB,
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_POOL_CONNECTIONS_LIMIT: process.env.MYSQL_POOL_CONNECTIONS_LIMIT,
  REDIS_PORT: process.env.REDIS_PORT,
  HASH_SECRET: process.env.HASH_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT,
  SALT_ROUNDS: +process.env.SALT_ROUNDS,
  CLIENT_PORT: process.env.CLIENT_PORT
}

module.exports = config