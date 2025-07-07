import express from 'express'
import SantaController from '../controllers/SantaController.js'

const router = express.Router()
const santaController = new SantaController()

router.post('/assign', (req, res) => santaController.assign(req, res))
router.get('/export', (req, res) => santaController.export(req, res))

export default router
