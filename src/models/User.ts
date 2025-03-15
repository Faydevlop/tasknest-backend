import mongoose, { Document, Schema } from 'mongoose';

// Define the User interface
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'Manager' | 'Employee';
}

// Define the schema
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Manager', 'Employee'], default: 'Employee' },
});

// Export the model
export default mongoose.model<IUser>('User', userSchema);
