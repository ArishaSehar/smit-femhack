import express from "express"
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import signupModal from '../Models/SignupModel.js'
const router = express.Router()
dotenv.config();




// define the home page route
router.get('/', async(req, res) => {

  try{
    const users = await signupModal.find(); 
    res.json(users); // sending all products as JSON
  }catch(e){
    res.status(500).json({ message: e.message });
  }
})
// define the about route
router.post('/', async (req, res) => {
  try{
    const existingUser = await signupModal.findOne({ email: req.body.email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists. Please log in." });
      }
      // token 
      const token = jwt.sign(
        { email: req.body.email },
        process.env.JWT_SECRET, 
        { expiresIn: "1h" }
      );
      
    let newUser = await signupModal.create({
      userName: req.body.username,
      email: req.body.email,
      password:req.body.password,
      token: token
      
    })

    console.log("Generated Token:", token);
    res.json({ newUser, token });
  }catch(e){
    console.log(e);
  res.status(500).json({ message: "Error occurred while creating user" });
  }

})
router.delete('/:id', async(req, res) => {
res.send("delete req")
  })

  router.put('/', (req, res) => {
    res.send('updated')
  })

export default router