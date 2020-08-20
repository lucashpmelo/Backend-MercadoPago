const repository = require('../repositories/mercadoPago-repository')
const repositoryUsuario = require('../repositories/usuario-repository')
const axios = require('axios')
const crypto = require('crypto')

exports.get = async (req, res, next) => {
  try {
    const usuario = await repositoryUsuario.getById(req.query.idUsuario)
    const indice = parseInt(req.query.indice || 0)
    const quantidade = parseInt(req.query.quantidade || 25)

    const { data } = await axios.get(
      `https://api.mercadopago.com/v1/payments/search?access_token=${usuario.accessToken}&limit=${quantidade}&offset=${indice}`
    )

    res.status(200).send(data)
    return next(data)
  } catch (erro) {
    const response = {
      message: 'Falha ao processar sua requisição.',
      erro,
    }
    res.status(500).send(response)
    return next(erro)
  }
}

exports.post = async (req, res, next) => {
  try {
    const usuario = await repositoryUsuario.getById(req.body.idUsuario)

    if (!usuario) {
      const response = {
        message: 'Usuario não encontrado.',
      }
      res.status(201).send(response)
      return next(response)
    }

    const hash = `${crypto.randomBytes(2).toString('HEX')}${Date.now()}`

    const preference = {
      items: [
        {
          title: 'Produto Teste Notificação',
          unit_price: 30,
          quantity: 1,
        },
      ],
      external_reference: hash,
      notification_url: `${usuario.routeNotifications}?source_news=webhooks`,
    }

    const { data } = await axios.post(
      `https://api.mercadopago.com/checkout/preferences?access_token=${usuario.accessToken}`,
      preference
    )

    const preferencia = {
      preference_id: data.id,
      preference_url: data.sandbox_init_point,
      external_reference: data.external_reference,
      date_created_preference: data.date_created,
    }

    const retorno = await repository.create(preferencia)

    const response = {
      retorno: retorno,
      preference: data,
    }

    res.status(201).send(response)
    return next(response)
  } catch (erro) {
    const response = {
      message: 'Falha ao processar sua requisição.',
      erro,
    }
    res.status(500).send(response)
    return next(erro)
  }
}

exports.notifications = async (req, res, next) => {
  try {
    const idPayment = req.query['data.id']
    const usuario = await repositoryUsuario.getByIdMercadoPago(req.body.user_id)

    if (!idPayment || !usuario) {
      const response = {
        message: 'Ok.',
      }

      res.status(201).send(response)
      return next(response)
    }

    const { data } = await axios.get(
      `https://api.mercadopago.com/v1/payments/${idPayment}?access_token=${usuario.accessToken}`
    )

    const pagamento = {
      payment_id: data.id,
      status_payment: data.status,
      external_reference: data.external_reference,
      date_created_payment: data.date_created,
      payer: data.payer,
    }

    await repository.update(pagamento)

    const response = {
      message: 'Ok.',
    }

    res.status(201).send(response)
    return next(response)
  } catch (erro) {
    const response = {
      message: 'Falha ao processar sua requisição.',
      erro,
    }
    res.status(500).send(response)
    return next(erro)
  }
}
