// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import TaskCard from './TaskCard';
// import LogoutBtn from './LogoutButton';

// function Dashboard() {
//   const apiUrl = import.meta.env.VITE_API_BASE_URL;
//   const [user,setUser] = useState()
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState({
//     title: '',
//     description: '',
//     assignedTo: '' // assuming you will select user ID later
//   });

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const res = await axios.get(`https://backend-of-femhack-production.up.railway.app/api/task`);
//       console.log(res.data);  // Log the response to check data
//       setTasks(res.data);
//     } catch (err) {
//       console.error("Error fetching tasks:", err);
//     }
//   };

//   const addTask = async () => {
//     if (newTask.title.trim() === '' || newTask.description.trim() === '') return;
//     console.log(newTask)
//     const userId = localStorage.getItem("token");
//   let response = await axios.get(`https://backend-of-femhack-production.up.railway.app/api/signup`)
//   console.log(response.data[0].token)
//   if (response.data){
//     const user = response.data.find((user) => user.token === userId);
    
//     if (user) {
//       console.log(user.email)
//       try {
//         const response = await axios.post(`https://backend-of-femhack-production.up.railway.app/api/task`, {
//           title: newTask.title,
//           description: newTask.description,
//           status: 'To Do',
//           assignedTo: user.email
//         });
//         console.log("Task created:", response.data);
//         setNewTask({ title: '', description: '', assignedTo: '' });
//         fetchTasks();
//       } catch (error) {
//         console.error("Error creating task:", error.response ? error.response.data : error.message);
//       }
//       console.log("User found:", user);
//       setUser(user); 
      
//     } else {
//       console.log("User with matching token not found.");
//     }
//   } else {
//     console.log("No data received from the server.");
//   }

//     if (!userId) {
//       console.log("User not logged in");
//       return;
//     }
  

//   };

//   const changeStatus = async (id, newStatus) => {
//     console.log(`Changing task ${id} status to ${newStatus}`);  // Log the task update
//     await axios.put(`https://backend-of-femhack-production.up.railway.app/api/task/${id}`, { status: newStatus });
//     fetchTasks();  // Refetch the tasks after status change
//   };

//   const deleteTask = async (id) => {
//     await axios.delete(`https://backend-of-femhack-production.up.railway.app/api/task/${id}`);
//     fetchTasks();
//   };

//   return (
//     <div className="p-8 bg-pink-50 min-h-screen flex flex-col items-center">
//       <LogoutBtn/> 
//       <h1 className="text-4xl text-pink-500 font-bold mb-8">Task Board</h1>

//   {/* add task  */}
//       <div className="flex flex-col gap-2 mb-8 w-96">
//         <input
//           type="text"
//           value={newTask.title}
//           onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
//           placeholder="Enter task title"
//           className="p-2 rounded border border-pink-300"
//         />
//         <textarea
//           value={newTask.description}
//           onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
//           placeholder="Enter task description"
//           className="p-2 rounded border border-pink-300"
//         />

//         <button
//           onClick={addTask}
//           className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 mt-2"
//         >
//           Add Task
//         </button>
//       </div>

//       {/* Task column where my task appear */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
//         {['To Do', 'In Progress', 'Done'].map((stage) => (
//           <div key={stage} className="bg-white p-4 rounded-lg shadow-md">
//             <h2 className="text-xl font-bold text-center mb-4">{stage}</h2>
//             {tasks.filter((task) => task.status === stage).map((task) => (
//   <TaskCard key={task._id} task={task} changeStatus={changeStatus} deleteTask={deleteTask} />
// ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard';
import LogoutBtn from './LogoutButton';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function Dashboard() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [user, setUser] = useState();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: ''
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`https://backend-of-femhack-production.up.railway.app/api/task`);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const addTask = async () => {
    if (newTask.title.trim() === '' || newTask.description.trim() === '') return;
    const userId = localStorage.getItem("token");
    let response = await axios.get(`https://backend-of-femhack-production.up.railway.app/api/signup`);
    if (response.data) {
      const user = response.data.find((user) => user.token === userId);
      if (user) {
        try {
          const response = await axios.post(`https://backend-of-femhack-production.up.railway.app/api/task`, {
            title: newTask.title,
            description: newTask.description,
            status: 'To Do',
            assignedTo: user.email
          });
          setNewTask({ title: '', description: '', assignedTo: '' });
          fetchTasks();
        } catch (error) {
          console.error("Error creating task:", error.response ? error.response.data : error.message);
        }
        setUser(user);
      }
    }
  };

  const changeStatus = async (id, newStatus) => {
    await axios.put(`https://backend-of-femhack-production.up.railway.app/api/task/${id}`, { status: newStatus });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`https://backend-of-femhack-production.up.railway.app/api/task/${id}`);
    fetchTasks();
  };

  return (
    <div className="p-8 bg-gradient-to-br from-[#ffeaa7] via-[#fdcb6e] to-[#ffeaa7] min-h-screen flex flex-col items-center">
      <LogoutBtn />
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Task Board</h1>

      {/* Add task */}
      <div className="flex flex-col gap-2 mb-8 w-96 bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          placeholder="Enter task title"
          className="p-2 rounded-lg border border-[#fdcb6e] focus:ring-2 focus:ring-[#fdcb6e]"
        />
        <textarea
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="Enter task description"
          className="p-2 rounded-lg border border-[#fdcb6e] focus:ring-2 focus:ring-[#fdcb6e]"
        />
        <button
          onClick={addTask}
          className="bg-[#fdcb6e] text-white px-6 py-2 rounded-full hover:bg-[#ffeaa7] transition-all duration-300"
        >
          Add Task
        </button>
      </div>

      {/* Task columns with drag-and-drop */}
      <DragDropContext onDragEnd={() => {}}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {['To Do', 'In Progress', 'Done'].map((stage) => (
            <Droppable key={stage} droppableId={stage}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <h2 className="text-xl font-bold text-center mb-4">{stage}</h2>
                  {tasks
                    .filter((task) => task.status === stage)
                    .map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <TaskCard
                            key={task._id}
                            task={task}
                            changeStatus={changeStatus}
                            deleteTask={deleteTask}
                            provided={provided}
                          />
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Dashboard;
