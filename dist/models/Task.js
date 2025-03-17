import mongoose, { Schema } from 'mongoose';
const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    assignedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'Pending' },
}, {
    timestamps: true,
});
export default mongoose.model('Task', taskSchema);
