import SecretSantaService from '../services/SecretSantaService.js'

export default class SantaController {
	constructor() {
		this.secretSantaService = new SecretSantaService()
	}

	async assign(req, res) {
		try {
			const assignments = await this.secretSantaService.assign()
			res.json(assignments)
		} catch (err) {
			res.status(400).json({ error: err.message })
		}
	}

	export(req, res) {
		try {
			const filePath = this.secretSantaService.getExportFilePath()
			res.download(filePath)
		} catch (err) {
			res.status(500).json({ error: err.message })
		}
	}
}
