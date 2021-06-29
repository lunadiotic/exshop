const db = require('../config/database.js')

db.user = require('./user.model')(db.sequelize, db.Sequelize)
db.category = require('./category.model')(db.sequelize, db.Sequelize)
db.ads = require('./ads.model')(db.sequelize, db.Sequelize)
db.image = require('./image.model')(db.sequelize, db.Sequelize)

module.exports = db
