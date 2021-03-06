import { addOneUser, deleteOneUser, editOneUser, findAllUsers, findOneUserById } from "../repositories/userRepository";
import * as fs from "fs";
import path from "path";

const findOneUserByIdService = async (id: string) => {
	return await findOneUserById(id)
		.then((response: Array<any>) => response)
		.catch((error: Error) => console.error(error))
}

const findImageByFilenameService = async (filename: string) => {
	fs.readFile('./src/images/' + filename + '.png', (err, data) => {
		if (err) console.error(err)

		console.log(data)
		return data
	})
}

const findAllUsersService = async () => {
	return await findAllUsers()
		.then((response: any) => response)
		.catch((error: Error) => console.error(error))
}

const addOneUserService = async (user: Object, filepath: string, filename: string) => {
	const tempPath = filepath;
	const targetPath = path.join(__dirname, "../../src/images/" + filename + ".png")

	fs.rename(tempPath, targetPath, (err) => {
		if (err) console.error(err)

		console.log("File saved")
	})

	return await addOneUser(user)
		.then((response: number) => response)
		.catch((error: Error) => console.error(error))
}

const editOneUserService = async (id: string, user: Object) => {
	return await editOneUser(id, user)
		.then((response: number) => response)
		.catch((error: Error) => console.error(error))
}

const deleteOneUserService = async (id: string) => {
	return await deleteOneUser(id)
		.then((response: number) => response)
		.catch((error: Error) => console.error(error))
}

export {
	findOneUserByIdService,
	findImageByFilenameService,
	findAllUsersService,
	addOneUserService,
	editOneUserService,
	deleteOneUserService
}
