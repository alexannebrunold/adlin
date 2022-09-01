import express from 'express'
import apiRoutes from './routes/routes.js'

const port = 8000

const app = express()

app.use(express.json())

app.use('/', apiRoutes)

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})