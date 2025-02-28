const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'D&D Campaign Manager API',
    description: 'API for managing campaigns and encounters'
  },
  host: 'ddcm.onrender.com',
  schemes: ['https'],
  components: {
  securitySchemes: {
    GitHubOAuth: {
      type: 'oauth2',
      flows: {
        authorizationCode: {
      authorizationUrl: 'https://github.com/login/oauth/authorize',
      tokenUrl: 'https://github.com/login/oauth/access_token',
      scopes: {
        'user:email': 'Access your email address'
      }
      }
      }
      }
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);