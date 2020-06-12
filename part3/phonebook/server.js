const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
const config = require('./utils/config')

app.listen(config.PORT, () => {
  console.log(`server started on ${config.PORT}`)
})

module.exports = app
