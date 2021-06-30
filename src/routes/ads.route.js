const { authJwt } = require('../middleware')
const controller = require('../controllers/ads.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'authorization, Origin, Content-Type, Accept'
    )
    next()
  })

  app.get('/api/ads', [authJwt.verifyToken], controller.index)
  app.post('/api/ads', [authJwt.verifyToken], controller.create)
  app.get('/api/ads/:id', [authJwt.verifyToken], controller.show)
}
