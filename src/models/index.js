const db = require('../config/database.js')

db.user = require('./user.model')(db.sequelize, db.Sequelize)

module.exports = db
