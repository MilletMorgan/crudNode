import { ObjectId, Schema } from "mongoose";
import * as fs from "fs";

const User = require('../models/User')

const findOneUserById = async (id: string) => {
	return User.find({ _id: id }, (_err: Error, users: Schema) => users);
}

const findAllUsers = async () => {
	return User.find({}, (_err: Error, users: Schema) => users)
}

const addOneUser = async (user: Object) => {
	new User(user).save()
		.then(() => console.log('user saved'))
		.catch((err: Error) => console.error(err))
}

const editOneUser = async (id: string, user: Object) => {

	User.updateOne({ _id: id }, user)
		.then(() => {
			console.log('user modified')
		}).catch((err: Error) => {
		console.error(err)
	})
}

const deleteOneUser = async (id: string) => {
	User.deleteOne({ _id: id })
		.then(() => console.log("L'utilisateur à bien été supprimé."))
		.catch((err: Error) => console.error(err))
}

export {
	findOneUserById,
	findAllUsers,
	addOneUser,
	editOneUser,
	deleteOneUser
}
