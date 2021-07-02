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

exports.detail = (req, res) => {
  id = req.params.id
  Ads.findByPk(id)
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) => {
      res.status(404).send({
        message: 'Error retrieving Ads with id=' + id,
      })
    })
}
