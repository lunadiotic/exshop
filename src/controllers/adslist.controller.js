const db = require('../models')
const Ads = db.ads

exports.search = (req, res) => {
  const lat = parseFloat(req.query.lat)
  const lng = parseFloat(req.query.lng)

  Ads.findAll({
    attributes: {
      include: [
        [
          db.sequelize.literal(
            `6371 *
            acos(cos(radians(${lat})) * cos(radians(loc_latitude)) *
            cos(radians(${lng}) - radians(loc_longitude)) +
            sin(radians(${lat})) * sin(radians(loc_latitude)))`
          ),
          'distance',
        ],
      ],
    },
    order: db.sequelize.col('distance'),
    limit: 10,
  }).then(function (instance) {
    return res.json(200, instance)
  })
}
