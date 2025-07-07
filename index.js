import express from 'express'
import santaRoutes from './routes/santaRoutes.js'

const app = express()

app.use(express.json())
app.use('/santa', santaRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server on ${PORT}`))
