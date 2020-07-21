/** Internal libs */
const { fetchMeRecord, getLogoFileName, deleteNextLogo, deleteOldLogo, updateMeRecord, resizeAndStoreNextLogo } = require('./admin.utils')
const { SERVICE, LOGO_IMG_DEST } = require('./admin.vars')
const { normalize } = require('../../../utils/normalizer')
require('../auth/auth.typeDefs')

/** Service to fetch states
 * @param {Express.Request} req Express request
 * @param {Express.Request} req.identity Express request
 * @returns {Promise<Admin>} - Login DB Object
 */
const fetchMe = async (req) => {
  const { id } = req.identity
  try {
    const admin = await fetchMeRecord(id)
    return normalize(admin)
  } catch (e) {
    e.pointOfFailure = e.pointOfFailure || []
    e.pointOfFailure.push(`${SERVICE}-${fetchMe.name}`)
    throw e
  }
}

/** @function updateMyStore Service to search for a user in db
 * @param {Express.Request} req Express req
 * @param {Express.Multer.File} req.file Express req
 * @param {MyStoreReqBody} req.nextStore Store object to be update old store
 * @returns {Promise<MyStore>} updateMyStore
 */
async function updateMe (req) {
  const { logoUrl, name } = req.nextStore
  const { file } = req
  const { id } = req.identity
  let filePath = logoUrl
  try {
    if (file) {
      const toPath = `${LOGO_IMG_DEST}${getLogoFileName(name)}`
      filePath = await resizeAndStoreNextLogo(file.buffer, toPath)
      file.buffer = Buffer.alloc(0)
      if (logoUrl) {
        await deleteOldLogo(logoUrl)
      }
    }
    return await updateMeRecord(id, req.nextStore, filePath)
  } catch (e) {
    let err = e
    if (file) {
      try {
        await deleteNextLogo(filePath)
      } catch (e) {
        err = e
      }
    }
    err.pointOfFailure = err.pointOfFailure || []
    err.pointOfFailure.push(`${SERVICE}-${updateMe.name}`)
    throw (err)
  }
}

module.exports.fetchMe = fetchMe
module.exports.updateMe = updateMe
