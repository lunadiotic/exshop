const authJwt = require('./authJwt')
const RegisterRequest = require('./requests/register')

module.exports = {
  authJwt,
  request: {
    register: RegisterRequest,
  },
}
