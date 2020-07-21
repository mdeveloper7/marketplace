
/** External libs */
const sharp = require('sharp')
const multer = require('multer')
const moment = require('moment')

/** Internal libs */
const fs = require('fs')
const mysqlPool = require('../../../utils/mysqlPool')
const { SP } = require('../../../utils/globals')
const promisify = require('../../../utils/promisify')
const { UTILS } = require('./admin.vars')
require('../auth/auth.typeDefs')

/** Util to search for admin self in db
 * @returns {Promise<Admin>} - Admin db object
 */
const fetchMeRecord = async (id) => {
  try {
    const sql = `CALL ${SP.FETCH_ADMIN}(?)`
    const sqlArgs = [id]
    const [[admin]] = await promisify(mysqlPool.pool.query.bind(mysqlPool.pool), sql, sqlArgs)
    return admin
  } catch (e) {
    e.pointOfFailure = e.pointOfFailure || []
    e.pointOfFailure.push(`${UTILS}-${fetchMeRecord.name}`)
    throw (e)
  }
}

/**
 * @function sharpFile Service to delete old logo
 * @param {string} path Path of file to be resized
 * @returns {Promise<undefined>} updateMyStore
 */
async function deleteOldLogo (path) {
  try {
    await promisify(fs.unlink, path)
  } catch (e) {
    e.pointOfFailure = e.pointOfFailure || []
    e.pointOfFailure.push(`${UTILS}-${deleteOldLogo.name}`)
    throw (e)
  }
}

/**
 * @function deleteNextLogo Service to delete pending logo if any operation fails
 * @param {string} path Path of file to be resized
 * @returns {Promise<undefined>} updateMyStore
 */
async function deleteNextLogo (path) {
  try {
    await promisify(fs.unlink, path)
  } catch (e) {
    e.pointOfFailure = e.pointOfFailure || []
    e.pointOfFailure.push(`${UTILS}-${deleteNextLogo.name}`)
    throw (e)
  }
}

/**
 * @function resizeAndStoreNextLogo Service to resize logo file uptaded by multer
 * @param {Buffer} buffer Buffer of file to be resized and stored
 * @param {string} toPath File path for image to be stored
 * @returns {Promise<undefined>} updateMyStore
 */
async function resizeAndStoreNextLogo (buffer, toPath) {
  try {
    const nextPath = `${toPath}.webp`
    await sharp(buffer).resize(200).toFile(nextPath)
    return nextPath
  } catch (e) {
    e.pointOfFailure = e.pointOfFailure || []
    e.pointOfFailure.push(`${UTILS}-${resizeAndStoreNextLogo.name}`)
    throw (e)
  }
}

/**
 * @function updateMyStoreRecord Service to update MyStore record in mysql db
 * @param {string} id Identity id
 * @param {MyStoreReqBody} nextStore Store values to be updated(next version of my store)
 * @param {string} path File path for logo
 * @returns {Promise<MyStoreRes>} updateMyStore
 */
async function updateMeRecord (id, nextStore, path) {
  const {
    contactEmail,
    description,
    phone,
    fbUrl,
    instagramUrl,
    stateId,
    defaultColor,
    address,
    zipCode
  } = nextStore
  const sql = 'CALL Business_Update(?,?,?,?,?,?,?,?,?,?,?)'
  const sqlArgs = [id, description, contactEmail, phone, fbUrl, instagramUrl, path, defaultColor, stateId, address, zipCode]
  try {
    const result = await promisify(mysqlPool.pool.query.bind(mysqlPool.pool), sql, sqlArgs)
    return result
  } catch (e) {
    e.pointOfFailure = e.pointOfFailure || []
    e.pointOfFailure.push(`${UTILS}-${updateMeRecord.name}`)
    throw (e)
  }
}

/**
 * @function getMyStoreRecord Service to get MyStore record in mysql db
 * @param {string} id Identity id
 * @returns {Promise<MyStoreRes>} updateMyStore
 */
async function getMyStoreRecord (id) {
  const sql = 'CALL Business_Get(?)'
  const sqlParams = [id]
  try {
    const [[store]] = await promisify(mysqlPool.pool.query.bind(mysqlPool.pool), sql, sqlParams)
    return store
  } catch (e) {
    e.pointOfFailure = e.pointOfFailure || []
    e.pointOfFailure.push(`${UTILS}-${getMyStoreRecord.name}`)
    throw (e)
  }
}

/** @function getLogoFileName Helper function to ge storage for logo
 * @param {string} storeName
 * @returns {string} logoName
*/
function getLogoFileName (storeName) {
  const uniqueSuffix = moment().valueOf()
  return `${storeName}-${uniqueSuffix}`
}

/** @function logoFileFilter Helper function to get filter for logo file uploads */
function logoFileFilter (req, file, cb) {
  if (['image/png', 'image/jpg', 'image/jpeg'].indexOf(file.mimetype) !== -1) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

module.exports.deleteOldLogo = deleteOldLogo
module.exports.deleteNextLogo = deleteNextLogo
module.exports.resizeAndStoreNextLogo = resizeAndStoreNextLogo
module.exports.updateMeRecord = updateMeRecord
module.exports.getMyStoreRecord = getMyStoreRecord
module.exports.logoFileFilter = logoFileFilter
module.exports.getLogoFileName = getLogoFileName
module.exports.fetchMeRecord = fetchMeRecord
