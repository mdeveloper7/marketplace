/** External libs */
const expressRouter = require('express').Router()
/** Internal libs */
const stateController = require('./state.controller')

/** Routes */
expressRouter.get('/', stateController.fetchStates)

module.exports = expressRouter
