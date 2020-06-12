const contactsRouter = require('express').Router()
const Contact = require('../model/Contact')
const logger = require('../utils/logger')

contactsRouter.get('/', (request, response) => {
  Contact.find({})
    .then((contact) => {
      logger.info('getting contacts...')
      const contacts = contact.map((contact) => contact)
      response.json(contacts).end()
    })
    .catch((err) => {
      logger.error(err)
      response.json(err).end()
    })
})

contactsRouter.get('/:id', (request, response, next) => {
  const id = request.params.id
  Contact.findById(id)
    .then((contact) => {
      if (contact) {
        response.json(contact).end()
      } else {
        response.status(404).end()
      }
    })
    .catch(() => {
      response.status(400).json({ error: 'There was a problem finding a user with that ID' })
    })
})

contactsRouter.delete('/:id', (request, response) => {
  const id = request.params.id
  Contact.findByIdAndDelete(id)
    .then(() => response.status(204).json({ message: 'contact has been removed' }))
    .catch(() => response.status(404).end())
})

contactsRouter.get('/info', (request, response) => {
  Contact.find({})
    .then((contact) => {
      const contacts = contact.map((contact) => contact)
      response.send(`<p>Phonebook has info for ${contacts.length} people </p>
    <p>${Date.now()} </p>
    `)
    })
    .catch((err) => {
      logger.info('Something went wrong')
      response.json(err).end()
    })
})

contactsRouter.put('/:id', (request, response) => {
  const id = request.params.id

  const { name, number } = request.body
  const contact = {
    name,
    number,
  }
  Contact.findByIdAndUpdate(id, contact, { useFindAndModify: false })
    .then(() => {
      response.status(200).json(contact).end()
    })
    .catch((err) => {
      logger.info(err)
      response.status(400).json({ error: 'There was a problem updating that contact.' })
    })
})

contactsRouter.post('/', (request, response) => {
  const body = request.body
  const { name, number } = body
  const contact = new Contact({ name, number })
  contact
    .save()
    .then((savedContact) => {
      response.json(savedContact)
    })
    .catch((err) => response.status(400).json({ error: 'Something went wrong.' + err }))
})

module.exports = contactsRouter
