const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()

// enabling dotenv
dotenv.config()

// define all client source
let whitelist = ['http://localhost:8080']
// make object option for the cors
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// enable cors
app.use(cors(corsOptions))
// parse request of content-type - application/json
app.use(express.json())
// parse content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
)

// simple route
app.get('/', (req, res) => {
    res.json({ message: 'server running...' })
})

// set port, listen for requests
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}.`)
})