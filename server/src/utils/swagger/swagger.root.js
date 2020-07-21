const authSpec = require('./auth.spec')

const swaggerDoc = {
  openapi: '3.0.1',
  info: {
    version: '0.0.1',
    title: 'Marketplace APIs Document',
    description: '...',
    termsOfService: '',
    contact: {
      name: 'Miguel Rodríguez',
      email: 'rdz.miguel7@gmail.com',
      url: ''
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  servers: [
    {
      url: 'http://localhost:5000/api/v1',
      description: 'Local server'
    }
  ],
  paths: {
    '/auth/sign-in': {
      post: authSpec.postSignIn
    }
  }
}

module.exports = swaggerDoc
