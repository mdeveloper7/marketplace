const { v4: uuidv4 } = require('uuid')

const reqUuid = (req, res, next) => {
  req.uuid = uuidv4()
  next()
}

module.exports = reqUuid
