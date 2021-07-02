const controller = require('../controllers/adslist.controller')

module.exports = function (app) {
  app.get('/api/ads/search', controller.search)
  app.get('/api/ads/:id/detail', controller.detail)
}
