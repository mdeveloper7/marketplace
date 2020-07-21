
/**
 * Regex enum for any regex in app
 * @enum {string}
 */
const REGEX = {
  /** @property {string} PASSWORD */
  PASSWORD: /(?=.*[0-9]+)(?=.*[a-zA-Z]+).{6,}/,
  EMAIL: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
}

/**
 * Mysql db store procedures
 * @enum */
const SP = {
  SIGN_IN: 'Login',
  FETCH_STATES: 'States_Get',
  FETCH_ADMIN: 'Business_Get'
}

module.exports.REGEX = REGEX
module.exports.SP = SP
