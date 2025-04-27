import express from "express"
import Task from "../Models/Task.js"
const router = express.Router()



// define the home page route
router.get('/', async(req, res) => {
    try{
        const task = await Task.find(); 
        res.json(task); // sending all products as JSON
      }catch(e){
        res.status(500).json({ message: e.message });
      }
})

router.post('/', async (req, res) => {
  let a = await Task.create({
    TaskName: req.body.taskName,
    TaskDetail: req.body.taskDescription,
    TaskStatus: req.body.status
  })
  a.save()
  res.send(req.body)
  console.log(req.body)
})
router.delete('/', (req, res) => {
    res.send('deleting user')
  })
  router.put('/', (req, res) => {
    res.send('updated')
  })

export default router