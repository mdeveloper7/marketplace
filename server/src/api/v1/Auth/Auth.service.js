/** Internal libs */
const { fetchAdminSignInRecord, signToken } = require('./auth.utils')
const { SERVICE } = require('./auth.vars')
const { normalize } = require('../../../utils/normalizer')

/** Service to fetch user if exists
 * @param {Express.Request} req Express request
 * @param {SignInReqBody} req.admin Sign in input admin
 * @returns {Promise<{admin: {Admin}, token: {string}}>} - Login DB Object
 */
async function adminSignIn (req) {
  const {
    admin: reqAdmin
  } = req
  try {
    let admin = await fetchAdminSignInRecord(reqAdmin)
    if (!admin) {
      return { admin }
    }
    admin = normalize(admin)
    const token = signToken(admin)
    return { admin, token }
  } catch (e) {
    e.pointOfFailure = e.pointOfFailure || []
    e.pointOfFailure.push(`${SERVICE}-${adminSignIn.name}`)
    throw e
  }
}

module.exports.adminSignIn = adminSignIn
