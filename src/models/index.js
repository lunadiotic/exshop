const db = require('../config/database.js')

db.user = require('./user.model')(db.sequelize, db.Sequelize)
db.category = require('./category.model')(db.sequelize, db.Sequelize)
db.ads = require('./ads.model')(db.sequelize, db.Sequelize)
db.image = require('./image.model')(db.sequelize, db.Sequelize)

db.ads.hasMany(db.image, {
  foreignKey: 'ads_id',
})

module.exports = db
