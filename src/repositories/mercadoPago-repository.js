const mongoose = require('mongoose')
const Pagamento = mongoose.model('Pagamento')

exports.create = async (data) => {
  const pagamento = new Pagamento(data)
  return await pagamento.save()
}

exports.update = async (data) => {
  const retorno = await Pagamento.findOneAndUpdate(
    {
      external_reference: data.external_reference,
    },
    {
      $set: {
        payment_id: data.payment_id,
        status_payment: data.status_payment,
        date_created_payment: data.date_created_payment,
        payer: data.payer,
      },
    },
    { new: true },
    function (err, res) {
      // Deal with the response data/error
    }
  )
  return retorno
}
