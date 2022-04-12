const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.once('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connect test success...')
})

module.exports = db
