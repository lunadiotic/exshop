const category = require('./category.seed')
const user = require('./user.seed')

module.exports = {
  userSeed: user.userSeed,
  categorySeed: category.categorySeed,
}
