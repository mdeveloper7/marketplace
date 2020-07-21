/** External libs */
const expressRouter = require('express').Router()
/** Internal libs */
const authController = require('./auth.controller')
const { validateSignInBody } = require('./auth.middlewares')
/** Routes */
expressRouter.post('/admin/sign-in', validateSignInBody, authController.adminSignIn)

module.exports = expressRouter
