/** External libs */
const expressRouter = require('express').Router()
const multer = require('multer')
/** Internal libs */
const adminController = require('./admin.controller')
const { logoFileFilter } = require('./admin.utils')
const { validateUpdateMyStoreBody } = require('./admin.middlewares')
const { authFromJwt } = require('../../../utils/middlewares/auth')

/** Constants */
const storage = multer.memoryStorage()
const upload = multer({ storage, fileFilter: logoFileFilter }).single('logo')

/** Routes */
expressRouter.get('/me', authFromJwt, adminController.fetchMe)
expressRouter.put('/me', authFromJwt, upload, validateUpdateMyStoreBody, adminController.updateMe)

module.exports = expressRouter
