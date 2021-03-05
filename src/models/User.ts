const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	firstname: String,
	lastname: String,
	city: String,
	country: String,
	image: String
})

const User = mongoose.model('User', userSchema)

module.exports = User
