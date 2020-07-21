const postSignIn = {
  tags: ['Auth'],
  summary: 'Allow a shop to sign in',
  operationId: 'postSignIn',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            password: { type: 'string' }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: 'user',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              firstname: {
                type: 'string'
              }
            }
          }
        }
      }
    }
  }
}

module.exports.postSignIn = postSignIn
