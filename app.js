const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.json())
if (process.env.NODE_ENV !== 'development') app.use(morgan('dev'))

app.disable('x-powered-by')

//// ROUTE
const snacksRoute = require('./src/routes/snacks')
app.use('/snacks', snacksRoute)

//// DEFAULT ROUTE
app.use(function(res, req, next) {
  const status = 404
  const message = `Route not found`
  next({status, message})
})

//// ERROR HANDLING
app.use((err, req, res, next) => {
  console.error(err)
  const status = err.status || 500
  const message = err.message || 'Internal Server Error'

  res.status(status).json({ error: err })
})

//// STARTING SERVER
const port = process.env.PORT || 5000
const listener = () => console.log(`Listening on port ${port}`)
app.listen(port, listener)

//// MODULE EXPORTS
module.exports = app
