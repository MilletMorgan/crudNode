import { Request, Response } from "express";
import { MulterRequest } from "../interfaces/MulterRequest";
import {
	addOneUserService,
	deleteOneUserService,
	editOneUserService,
	findAllUsersService,
	findImageByFilenameService,
	findOneUserByIdService
} from "../services/userService";

import multer from "multer";
import express from 'express';
import { ObjectId } from "bson";
import fs from "fs";

const userRouter = express.Router()
const upload = multer({ dest: "/images" })

userRouter.post('/', upload.single("image"), (req: MulterRequest, res: Response) => {
	const user = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		birthday: req.body.birthday,
		country: req.body.country,
		role: req.body.role,
		image: req.file.filename
	}

	addOneUserService(user, req.file.path, req.file.filename)
		.then((response: any) => res.sendStatus(response).end())
		.catch((error: Error) => console.error(error))
})

userRouter.get('/get/:id?', ({ query }: Request, res: Response) => {
	typeof query.id === "string"
		? ObjectId.isValid(query.id)
		? findOneUserByIdService(query.id)
			.then((response: any) => response.length >= 1
				? res.send(response)
				: res.end(`Il n'existe aucun utilisateur avec l'id '${ query.id }'`)
			).catch((error: Error) => console.error(error))
		: res.end(`L'id '${ query.id }' n'est pas valide.`)
		: res.end(`L'id '${ query.id }' doit être de type 'string'.`)
})

userRouter.get('/image/:filename?', ({ query }: Request, res: Response) => {
	typeof query.filename === "string"
		? fs.readFile('./src/images/' + query.filename + '.png', (err, data) => {
			if (err) console.error(err)

			res.end(data)
		})
		: res.end(`Le nom du fichier doit être de type 'string'.`)
})

userRouter.get('/get-all', (req: Request, res: Response) => {
	findAllUsersService()
		.then((response: any) => res.send(response))
		.catch((error: Error) => console.error(error))
})

userRouter.put('/edit/:id?', (req: Request, res: Response) => {
	const user = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		birthday: req.body.birthday,
		country: req.body.country,
		role: req.body.role
	}

	typeof req.query.id === "string"
		? editOneUserService(req.query.id, user)
			.then((response: any) => res.sendStatus(response).end())
			.catch((error: Error) => console.error(error))
		: res.end(`L'id '${ req.query.id }' doit être de type 'string'.`)
})

userRouter.delete('/delete/:id?', ({ query }: Request, res: Response) => {
	typeof query.id === "string"
		? deleteOneUserService(query.id)
			.then((response: any) => res.sendStatus(response).end())
			.catch((error: Error) => console.error(error))
		: res.end(`L'id '${ query.id }' doit être de type 'string'.`)
})

module.exports = userRouter
