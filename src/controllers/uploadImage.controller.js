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
