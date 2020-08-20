const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  idMercadoPago: {
    type: String,
  },
  nickname: {
    type: String,
  },
  password: {
    type: String,
  },
  siteStatus: {
    type: String,
  },
  email: {
    type: String,
  },
  accessToken: {
    type: String,
  },
  routeNotifications: {
    type: String,
  },
})

module.exports = mongoose.model('Usuario', schema)
