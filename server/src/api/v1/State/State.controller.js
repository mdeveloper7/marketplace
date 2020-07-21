/** Internal libs */
const logger = require('../../../utils/logger')
const stateService = require('./state.services')
const { CONTROLLER } = require('./state.vars')
require('./State.typeDefs')

/** GET
 * @param {Express.Request} req Express request
 * @param {Express.Response} res Express response
 * @param {Function} next Express next function
 * @returns {Promise<StateRes200|undefined>}
*/
const fetchStates = async (req, res, next) => {
  try {
    const states = await stateService.fetchStates(req, res, next)
    res.status(200).json(states)
  } catch (e) {
    e.pointOfFailure = e.pointOfFailure || []
    e.pointOfFailure.push(`${CONTROLLER}-${fetchStates.name}`)
    logger.error(JSON.stringify(e, null, 2))
    next(e)
  }
}

module.exports.fetchStates = fetchStates
