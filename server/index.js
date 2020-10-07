const express = require('express')
let multer = require('multer')
const { diskStorage } = require('multer')

const app = express()

const port = 8080

app.use(express.json())
app.use(require('cors')())

const storage = diskStorage({
	destination: function (req, file, cb) {
		cb(null, __dirname + '/videos/')
	},
	filename: function (req, file, cb) {
		// console.log(req.query.user)
		cb(
			null,
			req.query.user + '-' + file.fieldname + '-' + Date.now() + '.webm'
		)
	},
})

var upload = multer({ storage: storage })
var type = upload.single('file')

app.use('/videos', express.static(__dirname + '/videos/'))

const fs = require('fs')

app.get('/list', (req, res) => {
	let sendFeed = []
	let files = fs.readdirSync(__dirname + '/videos/')
	let i = 0
	files.forEach((file) => {
		console.log('http://localhost:8080/videos/' + file)
		let obj = {}
		obj['id'] = i

		obj['username'] = '@' + file.split('-')[0]
		obj['tags'] = '#tag #tag #tag #tag #tagv #tag'
		obj['music'] = 'hello'
		obj['likes'] = 9444
		obj['comments'] = 6340

		obj['uri'] = 'http://localhost:8080/videos/' + file
		sendFeed.push(obj)
		i += 1
	})
	res.json(sendFeed)
})

app.post('/', type, (req, res) => {
	req.on('data', (data) => {
		console.log(data.toString())
	})
	// console.log(typeof req.body.file,req.file)
	res.send(req.body)
})

app.listen(8080, () => console.log(8080))
