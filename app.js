const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const hbshelpers = require('handlebars-helpers')

const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main', helpers: hbshelpers() }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(routes)


app.listen(port, () => {
  console.log(`The app is runnung on http://localhost:${port}`)
})
