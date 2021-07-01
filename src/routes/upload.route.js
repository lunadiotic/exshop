const { authJwt } = require('../middleware')
const controller = require('../controllers/uploadImage.controller')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'authorization, Origin, Content-Type, Accept'
    )
    next()
  })

  app.post('/api/image/:id', [authJwt.verifyToken], controller.upload)
  app.delete('/api/image/:id', [authJwt.verifyToken], controller.remove)
}
