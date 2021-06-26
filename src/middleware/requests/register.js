const db = require('../../models')
const User = db.user

checkDuplicateUser = (req, res, next) => {
  // Email
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: 'Email is already in exists!',
      })
      return
    }

    next()
  })
}

const RegisterRequest = {
  isUserExist: checkDuplicateUser,
}

module.exports = RegisterRequest
