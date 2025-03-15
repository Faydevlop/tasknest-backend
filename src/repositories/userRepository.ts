import User from "../models/User.ts";

const findByEmail = async (email: string) => {
    return User.findOne({ email });
  };

export { findByEmail };