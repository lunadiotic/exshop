const controller = require('../controllers/adslist.controller')

module.exports = function (app) {
  app.get('/api/search', controller.search)
}
