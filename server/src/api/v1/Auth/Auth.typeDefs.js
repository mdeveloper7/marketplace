/** @typedef SignInReqBody
 * @property {string} email
 * @property {string} password
*/

/** @typedef Admin
 * @property {string} businessId
 * @property {string} name
 * @property {string} contactEmail
 * @property {string} registerDate
*/

/** @typedef SignInRes200
 * @property {Admin} me
 * @property {string} token
 * @property {number} expiresIn
 * @property {boolean} isStore
*/

/** @typedef SignInRes4XX
 * @property {object} meta
 * @property {object} meta.input
 * @property {number} msg
*/
