const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	firstname: String,
	lastname: String,
	birthday: Date,
	country: String,
	role: String,
	image: String
})

const User = mongoose.model('User', userSchema)

module.exports = User
