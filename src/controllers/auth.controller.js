const db = require('../models')
const User = db.user
const bcrypt = require('bcryptjs')

exports.register = (req, res) => {
  // Save User to Database
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    phone: req.body.phone,
  })
    .then((user) => {
      res.send({ message: 'User was registered successfully!' })
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
}
