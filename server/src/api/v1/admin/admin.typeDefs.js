require('../auth/auth.typeDefs')

/** @typedef FetchMeRes200
 * @property {Admin} me
 * @property {number} expiresIn
 * @property {boolean} isStore
*/

/** @typedef {object} MeBase
 * @property {string} description
 * @property {string} name
 * @property {string} contactEmail
 * @property {number} stateId
 * @property {string} fbUrl
 * @property {string} instagramUrl
 * @property {string} phone
 * @property {string} defaultColor
 * @property {number} zipCode
 * @property {string} address
*/

/** @typedef {object} MeMeta
 * @property {string} businessId
 * @property {boolean} verified
 * @property {string} lastPayDate
 * @property {number} suscriptionTypeId
 * @property {number} division
 */

/** @typedef {MeBase} UpdateMeReqBody */
/** @typedef {MeBase} UpdateMe200 */

/**
 * @typedef {MyStoreBase & MyStoreMeta} Me
 */

/**
 * @typedef {MyStore} MyStoreRes
 */
