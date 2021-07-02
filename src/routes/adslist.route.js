const controller = require('../controllers/adslist.controller')

module.exports = function (app) {
  app.get('/api/ads/search', controller.search)
}
