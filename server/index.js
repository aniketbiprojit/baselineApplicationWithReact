const express = require('express')

const app = express()

const port = 8080

app.use(express.json())
app.use(require('cors')())

let multer = require('multer')
var upload = multer({ dest: __dirname + '/videos/' });
var type = upload.single('file');

app.post('/', type, (req, res) => {
	req.on('data', (data) => {
		console.log(data.toString())
    })
    // console.log(typeof req.body.file,req.file)
	res.send(req.body)
})

app.listen(8080, () => console.log(8080))
