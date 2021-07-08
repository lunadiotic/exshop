const db = require('../models')
const Ads = db.ads
const { getPagination, getPagingData } = require('../services/pagination')
const Op = db.Sequelize.Op

exports.search = (req, res) => {
  const lat = parseFloat(req.query.lat)
  const lng = parseFloat(req.query.lng)
  const { page, size, title } = req.query
  let condition = title ? { title: { [Op.like]: `%${title}%` } } : null
  const { limit, offset } = getPagination(page, size)

  Ads.findAndCountAll({
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
    where: {
      sold: false,
      ...condition,
    },
    limit,
    offset,
    order: db.sequelize.col('distance'),
    include: db.image,
  }).then(function (result) {
    const response = getPagingData(result, page, limit)
    res.send(response)
  })
}

exports.detail = (req, res) => {
  id = req.params.id
  Ads.findByPk(id, {
    include: db.image,
  })
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) => {
      res.status(404).send({
        message: 'Error retrieving Ads with id=' + id,
      })
    })
}

exports.random = (req, res) => {
  Ads.findAll({
    where: {
      sold: false,
    },
    order: db.sequelize.literal('rand()'),
    limit: 10,
    include: db.image,
  })
    .then((result) => {
      return res.json(200, result)
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Something wrong...',
      })
    })
}
