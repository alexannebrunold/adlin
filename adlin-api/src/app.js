import express from 'express'
import apiRoutes from './routes/routes.js'
import cors from 'cors'

const port = 8000

const app = express()

app.use(express.json())
app.use(cors())
app.options('http://localhost/8080', cors)

app.use('/api', apiRoutes)

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})