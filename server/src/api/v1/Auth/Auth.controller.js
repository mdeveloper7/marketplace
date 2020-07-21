/** Internal libs */
const authService = require('./auth.service')
const logger = require('../../../utils/logger')
const {
  CONTROLLER,
  ENTITY,
  GENERIC_SIGN_IN_ERROR_MSG,
  EXPIRES_IN
} = require('./auth.vars')
require('./auth.typeDefs')

/** Sign in handler
 * @param {Express.Request} req Express request
 * @param {Express.Response} res Express response
 * @param {Function} next Express next function
 * @returns {Promise<SignInRes200>}
*/
const adminSignIn = async (req, res, next) => {
  console.log(req.admin)
  try {
    const { admin, token } = await authService.adminSignIn(req, res, next)
    if (!admin) {
      return res.status(404).json({
        meta: { input: { body: req.body } },
        msg: `${ENTITY}: ${GENERIC_SIGN_IN_ERROR_MSG}`
      })
    }
    if (!admin.registerDate) {
      return res.status(403).json({ meta: { input: { body: req.body } }, msg: `${ENTITY}: Account has not been activated yet` })
    }

    res.status(200).json({
      token,
      expiresIn: EXPIRES_IN,
      me: admin,
      isStore: true
    })
  } catch (e) {
    console.log(e)
    e.pointOfFailure = e.pointOfFailure || []
    e.pointOfFailure.push(`${CONTROLLER}-${adminSignIn.name}`)
    logger.error(JSON.stringify(e, null, 2))
    next(e)
  }
}

module.exports.adminSignIn = adminSignIn
