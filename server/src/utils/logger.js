const winston = require('winston')

const levels = {
  error: 0,
  warn: 1,
  success: 2,
  info: 3,
  debug: 4
}

const colors = {
  error: 'italic white redBG',
  warn: 'italic white yellowBG',
  success: 'italic white greenBG',
  info: 'italic white blueBG',
  debug: 'italic white magentaBG'
}

winston.addColors(colors)

const logger = winston.createLogger({
  level: 'debug',
  levels,
  format: winston.format.combine(
    winston.format.colorize()
  )
  // transports: [
  //   //
  //   // - Write all logs with level `error` and below to `error.log`
  //   // - Write all logs with level `info` and below to `combined.log`
  //   //
  //   new winston.transports.File({ filename: 'error.log', level: 'error' }),
  //   new winston.transports.File({ filename: 'combined.log' })
  // ]
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}

module.exports = logger
