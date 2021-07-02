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

  app.get('/api/product', [authJwt.verifyToken], controller.index)
  app.post('/api/product', [authJwt.verifyToken], controller.create)
  app.get('/api/product/:id', [authJwt.verifyToken], controller.show)
  app.patch('/api/product/:id', [authJwt.verifyToken], controller.update)
  app.delete('/api/product/:id', [authJwt.verifyToken], controller.delete)
}
