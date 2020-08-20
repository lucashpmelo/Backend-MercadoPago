const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const config = require('./config')

const app = express()

//Banco
mongoose.set('useFindAndModify', false)
mongoose
  .connect(config.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Conectado'))
  .catch((err) => console.log(err))

//Models
const Pagamento = require('./models/pagamento')
const Usuario = require('./models/usuario')

//Rotas
const indexRoute = require('./routes/index-route')
const mercadoPago = require('./routes/mercadoPago-route')

app.use(cors())
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use('/', indexRoute)
app.use('/mercadoPago', mercadoPago)

module.exports = app
