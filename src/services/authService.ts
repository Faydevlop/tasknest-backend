import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findByEmail } from '../repositories/userRepository.js';

const SECRET_KEY = process.env.JWT_SECRET || 'secretKey';

export const loginUser = async(email:string,password:string)=>{
    const user = await findByEmail(email);

    if(!user) throw new Error('User not found , Please Sign in')

    const isMatch = await bcrypt.compare(password,user.password)
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({id:user._id,role:user.role},SECRET_KEY, { expiresIn: '1h' })

    return { user, token };
}