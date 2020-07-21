/** External libs */
const jwt = require('jsonwebtoken')

/** Internal libs */
const config = require('../../config')
const logger = require('../logger')

/** Constants */
const TOKEN_PREFIX = 'Bearer '

/**
 * @function authFromJwt Set identity in reqfrom auth token if successfull otherwise 
 * @param {Express.Request} req Express request
 * @param {Express.Response} res Express response
 * @param {Function} next Express next function
 * @returns {[ResError]} returns res error if auth is not found
*/
const authFromJwt = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    res.status(401).json({
      msg: 'Invalid auth token'
    })
  }

  const token = authorization.replace(TOKEN_PREFIX, '')
  try {
    const identity = jwt.verify(token, config.JWT_SECRET)
    req.identity = identity
    next()
  } catch (err) {
    logger.error(err)
    res.status(401).json({
      msg: 'Invalid auth token'
    })
  }
}

module.exports.authFromJwt = authFromJwt
