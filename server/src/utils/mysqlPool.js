/** External libs */
const mysql = require('mysql')
/** Internal libs */
const config = require('../config')

const mysqlPool = {
  /** @private */
  _pool: null,
  /** @public */
  get pool () {
    if (!this._pool) {
      throw new Error('Mysql pool is not initialized')
    }
    return this._pool
  },
  /** @function initPool Helper function to initialize mysql pool config
   * @public
  */
  initPool: function initPool () {
    const pool = mysql.createPool({
      connectionLimit: config.MYSQL_POOL_CONNECTIONS_LIMIT,
      host: config.MYSQL_HOST,
      user: config.MYSQL_USER,
      password: config.MYSQL_PASSWORD,
      database: config.MYSQL_DB
    })
    this._pool = pool
  }
}

module.exports = mysqlPool
