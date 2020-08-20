const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  preference_id: {
    type: String,
  },
  payment_id: {
    type: String,
  },
  preference_url: {
    type: String,
  },
  external_reference: {
    type: String,
  },
  status_payment: {
    type: String,
  },
  date_created_preference: {
    type: Date,
  },
  date_created_payment: {
    type: Date,
  },
  payer: {
    type: Object,
  },
})

module.exports = mongoose.model('Pagamento', schema)
