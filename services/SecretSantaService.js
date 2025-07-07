import fs from 'fs'
import path from 'path'
import csv from 'csv-parser'
import { parse } from 'json2csv'

export default class SecretSantaService {
	constructor() {
		this.employeeListFile = path.join('data', 'Employee-List.csv')
		this.assignmentFile = path.join('data', 'Secret-Santa-Assignments.csv')
	}

	async assign() {
		const employees = await this._readEmployeeList()
		const previousAssignments = this._extractPreviousAssignments(employees)

		const names = employees.map((e) => e.Employee_Name)
		let shuffled = this._shuffleArray([...names])

		const assignments = {}

		for (let i = 0; i < names.length; i++) {
			const giver = names[i]
			const receiver = shuffled[i]

			if (!giver || !receiver) {
				throw new Error(
					`Invalid name found: giver=${giver}, receiver=${receiver}`
				)
			}

			if (giver === receiver) {
				throw new Error(`Conflict: ${giver} assigned themselves`)
			}

			assignments[giver] = receiver
		}

		this._saveAssignments(assignments)
		return assignments
	}

	getExportFilePath() {
		if (!fs.existsSync(this.assignmentFile)) {
			throw new Error('No assignment file found.')
		}
		return this.assignmentFile
	}

	_readEmployeeList() {
		return new Promise((resolve, reject) => {
			const employees = []
			fs.createReadStream(this.employeeListFile)
				.pipe(csv())
				.on('data', (row) => employees.push(row))
				.on('end', () => resolve(employees))
				.on('error', reject)
		})
	}

	_extractPreviousAssignments(employees) {
		const prev = {}
		employees.forEach((emp) => {
			prev[emp.Employee_Name] = null
		})
		return prev
	}

	_shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	_saveAssignments(assignments) {
		const data = Object.entries(assignments).map(([giver, receiver]) => ({
			giver,
			receiver
		}))
		const csvData = parse(data)
		fs.writeFileSync(this.assignmentFile, csvData)
	}
}
