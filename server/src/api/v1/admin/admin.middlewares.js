/** External libs */
const Joi = require('joi')
require('express')

/** Internal libs */
const fs = require('fs')
const promisify = require('../../../utils/promisify')
const logger = require('../../../utils/logger')
const { ENTITY, MIDDLEWARE } = require('./admin.vars')
require('./admin.typeDefs')

/**
 * @function validateUpdateMyStoreBody Middleware to validate the input body to update my store
 * @param {Express.Request} req Express request
 * @param {UpdateMeReqBody} req.body Expected request body
 * @param {ReqIdentity} req.identity Expected identity
 * @param {Express.Response} res Express response
 * @param {Function} next Express next function
 * @fires next
 * @returns {ResError|undefined}
*/
const validateUpdateMeBody = async (req, res, next) => {
  const {
    description,
    contactEmail,
    phone,
    defaultColor,
    address,
    zipCode,
    stateId,
    fbUrl,
    instagramUrl,
    name,
    logoUrl
  } = req.body
  const { file } = req
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    contactEmail: Joi.string().email().required(),
    defaultColor: Joi.string().length(7),
    phone: Joi.string(),
    address: Joi.string(),
    stateId: Joi.number().max(32),
    zipCode: Joi.number().max(999999),
    fbUrl: Joi.string(),
    instagramUrl: Joi.string(),
    logoUrl: Joi.string()
  })
  const nextStore = {
    logoUrl,
    name,
    description,
    contactEmail,
    phone,
    defaultColor,
    address,
    zipCode,
    stateId,
    fbUrl,
    instagramUrl
  }

  try {
    const { error: bodyError } = schema.validate(nextStore)
    if (bodyError) {
      await promisify(fs.unlink, file.path)
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
    req.nextStore = nextStore
    next()
  } catch (e) {
    e.pointOfFailure = e.pointOfFailure || []
    e.pointOfFailure.push(`${MIDDLEWARE}-${validateUpdateMeBody.name}`)
    logger.error(JSON.stringify(e, null, 2))
    next(e)
  }
}

module.exports.validateUpdateMyStoreBody = validateUpdateMeBody
