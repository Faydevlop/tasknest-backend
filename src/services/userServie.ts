import { findAllUsers } from "../repositories/userRepository.ts"

export const listUsers = async()=>{
    const users = await findAllUsers()
    if(!users) throw new Error('Users not found')
    return users

}