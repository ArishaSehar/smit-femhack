import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    TaskName: String,
    TaskDetail:String,
    TaskStatus:String
    
  });
  const Task = mongoose.model('taskData', taskSchema);
  export default Task