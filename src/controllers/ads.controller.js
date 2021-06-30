const db = require('../models')
const Ads = db.ads

exports.index = (req, res) => {
  Ads.findAll({
    where: {
      user_id: req.userId,
    },
  })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving ads.',
      })
    })
}

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: 'title can not be empty!',
    })
    return
  }

  const ads = {
    ...req.body,
    user_id: req.userId,
  }

  //   Save Ads in the database
  Ads.create(ads)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the ads.',
      })
    })
}

exports.show = (req, res) => {
  const id = req.params.id

  Ads.findByPk(id)
    .then((data) => {
      if (data.user_id === req.userId) {
        res.send(data)
      }
      res.status(401).send({
        message: 'Ads data is not authorized',
      })
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Ads with id=' + id,
      })
    })
}

exports.update = (req, res) => {
  const id = req.params.id

  Ads.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Ads was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update ads with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Ads with id=' + id,
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id

  Ads.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Ads was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}.`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Ads with id=' + id,
      })
    })
}
