import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['TODO', 'WIP', 'Done'],
      default: 'TODO',
    },
    time: Date,
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const todoModel = mongoose.model('Todo', todoSchema);

export default todoModel;
