const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')

mongoose.connect(config.DB_LINK, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

logger.info(`Connecting to ${config.DB_LINK}`)
const PhonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    unique: true,
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
  },
})

const Contact = mongoose.model('Contact', PhonebookSchema)

module.exports = Contact
