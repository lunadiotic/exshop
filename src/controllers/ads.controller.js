const db = require('../models')
const Ads = db.ads

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: 'title can not be empty!',
    })
    return
  }

  // Create an Ads
  const ads = {
    user_id: req.userId,
    title: req.body.title,
    category_id: req.body.category_id,
    brand: req.body.brand,
    model: req.body.model,
    year: req.body.year,
    price: req.body.price,
    description: req.body.description,
    address: req.body.address,
    location_lat: req.body.location_lat,
    location_long: req.body.location_long,
    sold: req.body.sold ? req.body.sold : false,
  }

  // Save Ads in the database
  Ads.create(ads)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Tutorial.',
      })
    })
}
