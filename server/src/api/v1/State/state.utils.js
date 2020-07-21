/** Internal libs */
const mysqlPool = require('../../../utils/mysqlPool')
const { SP } = require('../../../utils/globals')
const promisify = require('../../../utils/promisify')
const { UTILS } = require('./state.vars')
require('./State.typeDefs')

/** Util to search for states in db
 * @returns {Promise<State[]>} - Login DB Object
 */
const fetchStatesRecords = async () => {
  try {
    const sql = `CALL ${SP.FETCH_STATES}`
    const [[states]] = await promisify(mysqlPool.pool.query.bind(mysqlPool.pool), sql)
    return states
  } catch (e) {
    e.pointOfFailure = e.pointOfFailure || []
    e.pointOfFailure.push(`${UTILS}-${fetchStatesRecords.name}`)
    throw (e)
  }
}

module.exports.fetchStatesRecords = fetchStatesRecords
