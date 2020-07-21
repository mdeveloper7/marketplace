const camelcaseKeys = require('camelcase-keys')

/** Helper function to normalize and convert db fields to camel case
 * @param {Object|Array} input
 * @returns {Object|Array} Normalized input
 */
const normalize = (input) => {
  return camelcaseKeys(input, { deep: true })
}

/** Helper function to normalize and convert db fields to camel case
 * @param {Object|Array} input
 * @returns {Object|Array} Normalized input
 */
const deNormalize = (input) => {
  return camelcaseKeys(input, { deep: true, pascalCase: true })
}

module.exports.normalize = normalize
module.exports.deNormalize = deNormalize
