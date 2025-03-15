import mongoose, { Document, Schema } from 'mongoose';

// Define the User interface
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'Manager' | 'Employee';
  otp:string | undefined,
  avatar:string,
  isVerified:boolean
  otpExpires:Date | undefined
}

// Define the schema
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String, default: "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?semt=ais_hybrid" },
  password: { type: String, required: true },
  otp: { type: String }, 
  otpExpires: { type: Date }, 
  isVerified: { type: Boolean, default: false },
  role: { type: String, enum: ['Manager', 'Employee'], default: 'Employee' },
});

// Export the model
export default mongoose.model<IUser>('User', userSchema);
