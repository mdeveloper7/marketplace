/** Internal libs */
const { fetchStatesRecords } = require('./state.utils')
const { SERVICE } = require('./state.vars')
const { normalize } = require('../../../utils/normalizer')
/** Service to fetch states
 * @returns {Promise<State[]>} - Login DB Object
 */
const fetchStates = async () => {
  try {
    const states = await fetchStatesRecords()
    return normalize(states)
  } catch (e) {
    e.pointOfFailure = e.pointOfFailure || []
    e.pointOfFailure.push(`${SERVICE}-${fetchStates.name}`)
    throw e
  }
}

module.exports.fetchStates = fetchStates
