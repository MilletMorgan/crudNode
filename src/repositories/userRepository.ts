import { ObjectId, Schema } from "mongoose";
import * as fs from "fs";

const User = require('../models/User')

const findOneUserById = async (id: string) => {
	return User.find({ _id: id }, (err: Error, users: Schema) => users ? users : err);
}

const findAllUsers = async () => {
	return User.find({}, (_err: Error, users: Schema) => users)
}

const addOneUser = async (user: Object) => {
	return new User(user).save()
		.then(() => 201)
		.catch(() => 500)
}

const editOneUser = async (id: string, user: Object) => {
	return User.updateOne({ _id: id }, user)
		.then(() => 200)
		.catch(() => 500)
}

const deleteOneUser = async (id: string) => {
	return User.deleteOne({ _id: id })
		.then(() => 200)
		.catch(() => 500)
}

export {
	findOneUserById,
	findAllUsers,
	addOneUser,
	editOneUser,
	deleteOneUser
}
