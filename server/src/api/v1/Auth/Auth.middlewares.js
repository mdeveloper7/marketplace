/** External libs */
const Joi = require('joi')
require('express')

/** Internal libs */
const logger = require('../../../utils/logger')
const { REGEX } = require('../../../utils/globals')
const { ENTITY, MIDDLEWARE } = require('./auth.vars')

/**
 * Middleware to validate user input for sign in
 * @param {Express.Request} req Express request
 * @param {SignInReqBody} req.body My Store
 * @param {Express.Response} res Express response
 * @param {Function} next Express next function
 * @fires next
 * @returns {ResError|undefined}
*/
const validateSignInBody = async (req, res, next) => {
  const { email, password } = req.body
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().regex(REGEX.PASSWORD).required()
  })
  const admin = { email, password }
  try {
    const { error: bodyError } = schema.validate(admin)
    if (bodyError) {
      return res.status(422).json({
        meta: {
          input: {
            body: bodyError._object
          },
          reqId: req.uuid
        },
        msg: `${ENTITY}: ${bodyError.details.map(({ message }) => {
          return `\n${message}`
        }).join('')}`
      })
    }
    console.log(admin)
    req.admin = admin
    next()
  } catch (e) {
    e.pointOfFailure = e.pointOfFailure || []
    e.pointOfFailure.push(`${MIDDLEWARE}-${validateSignInBody.name}`)
    logger.error(JSON.stringify(e, null, 2))
    next(e)
  }
}

module.exports.validateSignInBody = validateSignInBody
