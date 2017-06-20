import express  from 'express'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import wdm from 'webpack-dev-middleware'
import whm from 'webpack-hot-middleware'

import mongoose from 'mongoose'

// const multer = require('multer')
// const fs = require('fs')
// const upload = multer({ dest: 'media' })
// const nodemailer = require('nodemailer')

const mlogin = 'admin'
const mpassword = '190496'
mongoose.Promise = global.Promise
mongoose.connect(`mongodb://${mlogin}:${mpassword}@ds137441.mlab.com:37441/wallet-tracker`)

const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = require('./server/typeDefs')
const resolvers = require('./server/resolvers')

const app = express()
const schema = makeExecutableSchema({ typeDefs, resolvers })

if (process.env.NODE_ENV !== 'production') {
  const config = require('./webpack.config')
  const compiler = webpack(config)

  app.use(wdm(compiler, { noInfo: true, publicPath: config.output.publicPath }))
  app.use(whm(compiler))
}

app.use(express.static(`${__dirname}/dist`))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/graphql', bodyParser.json(), graphqlExpress(req => ({
  schema,
  context: req.headers.token
})))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
app.get('/image/media/:name', (req, res) => res.sendFile(__dirname + '/media/' + req.params.name))
app.get('/*', (req, res) => { res.sendFile(__dirname + '/dist/index.html')})
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'
  res.set('Content-Encoding', 'gzip')
  next()
})

app.listen(process.env.PORT || 5000)
