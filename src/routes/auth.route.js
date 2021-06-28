const { request } = require('../middleware')
const controller = require('../controllers/auth.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'authorization, Origin, Content-Type, Accept'
    )
    next()
  })

  app.post(
    '/api/auth/register',
    [request.register.isUserExist],
    controller.register
  )

  app.post('/api/auth/login', controller.login)
}
