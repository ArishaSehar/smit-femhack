import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName: String,
    email:String,
    password:String,
    token:String
    
  });
  const SignupModal = mongoose.model('usersData', userSchema);
  export default userSchema