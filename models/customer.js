const mongoose = require('mongoose')
const Schema = mongoose.Schema
const customerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  favorite: {
    type: [mongoose.Types.ObjectId],
    default: []
  }
})

module.exports = mongoose.model('customer', customerSchema)
