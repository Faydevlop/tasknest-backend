import mongoose, { Schema } from 'mongoose';
// Define the schema
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?semt=ais_hybrid" },
    password: { type: String, required: true },
    otp: { type: String },
    otpExpires: { type: Date },
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: ['Manager', 'Employee'], default: 'Employee' },
    managerId: { type: Schema.Types.ObjectId, ref: 'User', default: '67d5e8785016561d9db30d03' }
});
// Export the model
export default mongoose.model('User', userSchema);
