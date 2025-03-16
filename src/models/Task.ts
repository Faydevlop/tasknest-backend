import mongoose, { Document, Schema } from 'mongoose';

interface ITask extends Document {
  title: string;
  description: string;
  assignedTo: mongoose.Types.ObjectId;
  assignedBy: mongoose.Types.ObjectId;
  date: Date;
  status: 'Pending' | 'In Progress' | 'Completed';
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  assignedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'Pending' },
}, {
  timestamps: true, 
});


export default mongoose.model<ITask>('Task', taskSchema);
