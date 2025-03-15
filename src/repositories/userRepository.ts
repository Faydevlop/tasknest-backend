import User from "../models/User.ts";

const findByEmail = async (email: string) => {
    console.log(email);
    
    const user = await User.findOne({ email });
    console.log('Found User:', user);
    return user;
  };
  
const createUser = async(userData:any)=>{
    return User.create(userData)
}


export { findByEmail,createUser };