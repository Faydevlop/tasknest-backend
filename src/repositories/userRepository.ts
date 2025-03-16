import User from "../models/User.ts";

const findByEmail = async (email: string) => {
    const user = await User.findOne({ email });
    return user;
  };
  
const createUser = async(userData:any)=>{
    return User.create(userData)
}

const findAllUsers = async()=>{
  const users = await User.find({ isVerified: true })
  return users
}


export { findByEmail,createUser,findAllUsers };