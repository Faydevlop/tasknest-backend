import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findByEmail , createUser} from '../repositories/userRepository';
import sendVerificationEmail from '../config/nodemailer'

const SECRET_KEY = process.env.JWT_SECRET || 'secretKey';

export const loginUser = async(email:string,password:string)=>{
    const user = await findByEmail(email);

    if(!user) throw new Error('User not found , Please Sign in')

    const isMatch = await bcrypt.compare(password,user.password)
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({id:user._id,role:user.role},SECRET_KEY, { expiresIn: '7d' })

    return { user, token };
}

export const registerUser = async(name:string,email:string,password:string,)=>{
    const userExists = await findByEmail(email);

    if(userExists) throw new Error('a User already Exists in this email')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword:string = await bcrypt.hash(password,salt)

    const otp:number = Math.floor(100000 + Math.random() * 900000); 
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 5);

    await createUser({
        name,
        email,
        otp,
        password: hashedPassword,
        otpExpires: otpExpiry,
    })

    await sendVerificationEmail(email,otp)

    return {email};
    
}

export const verifyOTP = async(otp:string,tempEmail:string)=>{

    const user = await findByEmail(tempEmail);

    if (!user) {
        throw new Error('User not found');
    }


    if (user.otp !== otp || !user.otpExpires || user.otpExpires < new Date()) {
        throw new Error('Invalid or expired OTP');
    }

    user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    SECRET_KEY,
    { expiresIn: '7d' }
  );
    

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      isVerified: user.isVerified,
    },
    token,
  };


}