const fs = require('fs')
const path = require('path')
const __basedir = path.resolve()
const uploadImage = require('../middleware/uploadImage')
const db = require('../models')
const Image = db.image

exports.upload = async (req, res) => {
  const id = req.params.id
  try {
    await uploadImage(req, res)

    if (req.files == undefined) {
      return res.status(400).send({ message: 'Please upload a file!' })
    }

    let images = req.files.map((item) => {
      const image = {}
      image.ads_id = id
      image.url_image = item.filename
      return image
    })

    Image.bulkCreate(images)
      .then((result) => {
        res.status(200).send({
          message: 'Uploaded files successfully',
        })
      })
      .catch((err) => {
        res.status(403).send({
          message: 'Uploaded files failed',
        })
      })
  } catch (error) {
    console.log(error)
    return res.send(`Error when trying upload images: ${error}`)
  }
}

exports.remove = (req, res) => {
  const id = req.params.id
  Image.findByPk(id)
    .then((data) => {
      fs.unlink(
        __basedir + `/storage/upload/${data.url_image}`,
        function (err) {
          if (err)
            throw res.status(500).send({
              message: 'Delete image failed!',
            })
          Image.destroy({
            where: { id: id },
          })
            .then((num) => {
              if (num == 1) {
                res.send({
                  message: 'Image was deleted successfully!',
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
      )
    })
    .catch((err) => {
      res.status(404).send({
        message: 'Could not find image with id=' + id,
      })
    })
}
