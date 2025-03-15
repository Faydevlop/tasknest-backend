import User from "../models/User.ts";

const findByEmail = async (email: string) => {
    return User.findOne({ email });
  };

const createUser = async(userData:any)=>{
    return User.create(userData)
}


export { findByEmail,createUser };