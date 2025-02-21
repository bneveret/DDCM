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
      GitHubAuth: {
        type: 'oauth2',
        description: 'OAuth2 authentication with GitHub',
        flows: {
          authorizationCode: {
            authorizationUrl: 'https://github.com/login/oauth/authorize',
            tokenUrl: 'https://github.com/login/oauth/access_token',
            scopes: {}
          }
        }
      }
    }
  },
  security: [
    {
      GitHubAuth: []
    }
  ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);