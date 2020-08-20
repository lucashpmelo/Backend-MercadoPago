const mongoose = require('mongoose')
const Usuario = mongoose.model('Usuario')

exports.getById = async (id) => {
  const res = await Usuario.findById(id)
  return res
}

exports.getByIdMercadoPago = async (id) => {
  const res = await Usuario.findOne({ idMercadoPago: id })
  return res
}
