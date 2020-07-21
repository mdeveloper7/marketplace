/** External libs */
const jwt = require('jsonwebtoken')

/** Internal libs */
const mysqlPool = require('../../../utils/mysqlPool')
const hash = require('crypto').createHash
const { SP } = require('../../../utils/globals')
const { UTILS, EXPIRES_IN } = require('./auth.vars')
const promisify = require('../../../utils/promisify')
const config = require('../../../config')

/** Service to hash password and fetch user from db
 * @param {SignInReqBody} admin Admin input
 * @returns {Promise<>} - Login DB Object
 */
const fetchAdminSignInRecord = async (admin) => {
  try {
    const { email, password } = admin
    const hashedPassword = hash('md5').update(password).digest('hex')
    const sql = `CALL ${SP.SIGN_IN}(?,?)`
    const sqlArgs = [email, hashedPassword]
    const [[signIn]] = await promisify(mysqlPool.pool.query.bind(mysqlPool.pool), sql, sqlArgs)
    return signIn
  } catch (e) {
    e.pointOfFailure = e.pointOfFailure || []
    e.pointOfFailure.push(`${UTILS}-${fetchAdminSignInRecord.name}`)
    throw (e)
  }
}

/** Service to hash password and fetch user from db
 * @param {SignInReqBody} admin User
 * @returns {Promise<>} - Login DB Object
 */
const signToken = (admin) => {
  const payload = {
    id: admin.businessId,
    email: admin.contactEmail
  }
  const token = jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: EXPIRES_IN
  })
  return token
}

module.exports.fetchAdminSignInRecord = fetchAdminSignInRecord
module.exports.signToken = signToken
