const express = require('express')
const { connect } = require('mongoose')
const router = require('./router/userRouter')
const app = express()

connect('mongodb://localhost:27017/crudNode', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => console.log("Connection à la BDD réussi."))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./images'))
app.use('/users', router)

app.listen(3000, () => {
	console.clear()
	console.log("Listening on http://localhost:3000")
})
