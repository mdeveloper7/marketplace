
/** External libs */
const compression = require('compression')
const express = require('express')
const responseTime = require('response-time')
const helmet = require('helmet')
const RateLimit = require('express-rate-limit')
const redis = require('redis')
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express')
const cors = require('cors')

/** Internal libs */
const reqUuid = require('./utils/middlewares/reqUuid')
const authRouter = require('./api/v1/auth/auth.routes')
const stateRouter = require('./api/v1/state/state.routes')
const adminRouter = require('./api/v1/admin/admin.routes')
const config = require('./config')
const swaggerDoc = require('./utils/swagger/swagger.root')
const mysqlPool = require('./utils/mysqlPool')
const logger = require('./utils/logger')

/** @todo move and refactor */
const corsOptions = {
  origin: true
}

/** @function addRequestMiddlewares Helper function to add request middlewares to app
 * @param {Express.Application} app Express app instance
*/
function addRequestMiddlewares (app) {
  const limiter = new RateLimit({
    windowMS: 15 * 6 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    delayMs: 0
  })
  app.enable('trust proxy')
  app.use(cors(corsOptions))
  app.use(compression())
  app.use(helmet())
  app.use(limiter)
  app.use(responseTime())
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json({ limit: '100kb' }))
  app.use(reqUuid)
  morgan.token('uuid', function getId (req) {
    return req.uuid
  })
  app.use(morgan(':uuid :method :url :status :response-time ms - :res[content-length]'))
}

/** @function addAppRoutes Helper function to add routes to app
 * @param {Express.Application} app Express app instance
*/
function addAppRoutes (app) {
  app.use('/api/v1/auth', authRouter)
  app.use('/api/v1/state', stateRouter)
  app.use('/api/v1/admin', adminRouter)
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, {}))
  app.use((req, res, next) => {
    const err = new Error('Route Not Found')
    err.status = 404
    next(err)
  })

  app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err)
    }
    return res.status(err.status || 500).json({
      msg: err.message
    })
  })
}

/** Entry point */
(async function () {
  mysqlPool.initPool()
  const app = express()
  addRequestMiddlewares(app)
  addAppRoutes(app)

  try {
    // TO DO refactor
    await redis.createClient(process.env.REDIS_PORT || 6379)
    logger.success('Redis up and running...')
  } catch (e) {
    logger.error('Error connecting to Redis')
  }
  try {
    const server = await app.listen(config.PORT)
    logger.success(`Server up and running on port: ${server.address().port}`)
  } catch (e) {
    logger.error('Error listening in Server')
  }
})()
