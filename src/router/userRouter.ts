import { Request, Response } from "express";
import { MulterRequest } from "../interfaces/MulterRequest";
import {
	addOneUserService, deleteOneUserService, editOneUserService,
	findAllUsersService,
	findImageByFilenameService,
	findOneUserByIdService
} from "../services/userService";

const multer = require("multer")
const express = require('express')

const userRouter = express.Router()
const upload = multer({
	dest: "/images"
})

// ok
userRouter.post('/', upload.single("image"), (req: MulterRequest, res: Response) => {
	const user = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		city: req.body.city,
		country: req.body.country,
		image: req.file.filename
	}

	addOneUserService(user, req.file.path, req.file.filename)
		.then((response:any) => res.send(response))
		.catch((error: Error) => console.error(error))
})

// OK
userRouter.get('/get/:id', (req: Request, res: Response) => {
	findOneUserByIdService(req.params.id)
		.then((response: Array<any>) => res.send(response))
		.catch((error: Error) => console.error(error))
})

userRouter.get('/image/:filename', (req: Request, res: Response) => {
	findImageByFilenameService(req.params.filename)
		.then((response: any) => res.send(response))
		.catch((error: Error) => console.error(error))
})

// ok
userRouter.get('/get-all', (req: Request, res: Response) => {
	findAllUsersService()
		.then((response: any) => res.send(response))
		.catch((error: Error) => console.error(error))
})

// req.body vide mais modifie bien
userRouter.put('/edit/:id', (req: Request, res: Response) => {
	/*User.updateOne({ _id: req.params.id }, {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		city: req.body.city,
		country: req.body.country
	}).then(() => {
		console.log('user modified')
		res.end(JSON.stringify(req.body))
	}).catch((err: Error) => {
		console.error(err)
		res.end(err)
	})*/

	const user = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		city: req.body.city,
		country: req.body.country
	}

	console.log("user:", req.body)
	console.log("id:", req.params.id)
	editOneUserService(req.params.id, user)
		.then((response: any) => res.send(response))
		.catch((error: Error) => console.error(error))
})

// OK
userRouter.delete('/delete/:id', (req: Request, res: Response) => {
	deleteOneUserService(req.params.id)
		.then((response: any) => res.send(response))
		.catch((error: Error) => console.error(error))
})

module.exports = userRouter
