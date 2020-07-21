/** Internal libs */
const meService = require('./admin.services')
const logger = require('../../../utils/logger')
const {
  CONTROLLER,
  ENTITY
} = require('./admin.vars')
require('./admin.typeDefs')
require('../../../utils/typeDefs/res')

/** GET
 * Me handler to deliver self data to admin
 * @param {Express.Request} req Express request
 * @param {Express.Response} res Express response
 * @param {Function} next Express next function
 * @returns {Promise<FetchMeRes200>|Promise<ResError>}
*/
const fetchMe = async (req, res, next) => {
  try {
    const admin = await meService.fetchMe(req)
    if (!admin) {
      return res.status(404).json({
        meta: { input: { body: req.body } },
        msg: `${ENTITY}: Admin not found`
      })
    }
    res.status(200).json({
      ...admin
    })
  } catch (e) {
    console.log(e)
    e.pointOfFailure = e.pointOfFailure || []
    e.pointOfFailure.push(`${CONTROLLER}-${fetchMe.name}`)
    logger.error(JSON.stringify(e, null, 2))
    next(e)
  }
}

/** PUT
 * Me handler to deliver self data to admin
 * @param {Express.Request} req Express request
 * @param {Express.Response} res Express response
 * @param {Function} next Express next function
 * @returns {Promise<UpdateMeReqBody>|Promise<ResError>}
*/
const updateMe = async (req, res, next) => {
  const { nextStore } = req
  try {
    await meService.updateMe(req, res, next)
    res.status(200).json(nextStore)
  } catch (e) {
    e.pointOfFailure = e.pointOfFailure || []
    e.pointOfFailure.push(`${CONTROLLER}-${updateMe.name}`)
    e.reqUuid = req.uuid
    logger.error(JSON.stringify(e, null, 2))
    next(e)
  }
}

module.exports.fetchMe = fetchMe
module.exports.updateMe = updateMe
