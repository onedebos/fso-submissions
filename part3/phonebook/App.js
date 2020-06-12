const app = require('./server')
const contactsRouter = require('./controller/contact')
const middleware = require('./utils/middleware')

app.use('/api/contacts', contactsRouter)
app.use(middleware.unknownEndpoint)
