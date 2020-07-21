
const promisify = (nodeFn, ...args) => {
  console.log(nodeFn, ...args)
  return new Promise((resolve, reject) => {
    nodeFn(...args, (err, data) => {
      console.log('in')
      if (err) {
        console.log(err)
        reject(err)
        return
      }
      resolve(data)
    })
  })
}

module.exports = promisify
