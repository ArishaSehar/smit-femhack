import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    const history = useHistory();
    console.log(data); // show data in console
    const responsePost = await axios.post('http://localhost:5000/task', { ...data, status: 'in-progress' });
    console.log(responsePost);
    setSuccessMessage('Task Added Successfully! 🎉'); // set success msg
    reset(); // clear the form after submit
  };

  const handleAddTaskClick = () => {
    setShowForm(true); // show the form when "Add Task" is clicked
    setSuccessMessage(''); // clear old success message if any
  };

  // Handle "In Progress" button click
  const handleInProgressClick = async () => {
    setShowForm(false); // hide the form when "In Progress" is clicked
    setLoading(true); // start loading when fetching tasks
    try {
      const response = await axios.get('http://localhost:5000/task');
      setTasks(response.data); // set tasks from backend
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
    setLoading(false); // stop loading after tasks are fetched
  };
    // Handle "Done?" button click to update task status
    const handleDoneClick = async (taskId) => {
      try {
        const response = await axios.put(`http://localhost:5000/task/${taskId}`, { status: 'done' });
        if (response.status === 200) {
          // Update the local tasks state to reflect the status change
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === taskId ? { ...task, status: 'done' } : task
            )
          );
        }
      } catch (error) {
        console.error('Error updating task status:', error);
      }
    };
    const handleLogout = () => {
      // Remove the token from localStorage
      localStorage.removeItem('token'); 
  
      navigate('/login');
    };
  return (
    <main className=''>

      <h1 className='font-bold text-[30px] ps-4 border'>Task Manager</h1>
      <button className='border text-black cursor-pointer' onClick={handleLogout}>logout</button>
      <div className='grid grid-cols-12 py-5 px-5 h-screen'>
        {/* left side */}
        <div className='col-span-2 flex flex-col justify-start items-start gap-3 border-e'>
          <div className='border py-2 px-3 hover:bg-black hover:text-white hover:cursor-pointer' onClick={handleAddTaskClick}>
            <button className='font-bold'>Add Task</button>
          </div>
          <div className='border py-2 px-3 hover:bg-black hover:text-white hover:cursor-pointer' onClick={handleInProgressClick}>
            <button className='font-bold'>In Progress</button>
          </div>
          <div className='border py-2 px-3 hover:bg-black hover:text-white hover:cursor-pointer'>
            <button className='font-bold'>Done</button>
          </div>
        </div>

        {/* right side */}
        <div className='col-span-9'>
          {/* Form for adding tasks */}
          {showForm && (
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
              <input
                placeholder='Task Name'
                {...register('taskName', { required: 'Task Name is required' })}
                className='border p-2'
              />
              {errors.taskName && <div className='text-red-500'>{errors.taskName.message}</div>}

              <input
                placeholder='Task Description'
                {...register('taskDescription', { required: 'Description is required' })}
                className='border p-2'
              />
              {errors.taskDescription && <div className='text-red-500'>{errors.taskDescription.message}</div>}

              <input
                disabled={isSubmitting}
                type='submit'
                value='Add Task'
                className='bg-black text-white py-2 px-4 rounded hover:bg-gray-800 cursor-pointer'
              />
            </form>
          )}

          {/* Display success message */}
          {successMessage && (
            <div className='text-green-500 font-bold mt-4'>
              {successMessage}
            </div>
          )}

          {/* Loading and task list */}
          {loading && <div>Loading tasks...</div>}

          {/* Show tasks in progress */}
          <div className='mt-4'>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div key={task.id} className='border p-2 mb-2'>
                  <h3 className='font-bold'>{task.TaskName}</h3>
                  <p>{task.TaskDetail}</p>
                  <button onClick={() => handleDoneClick(task.id)} className='border hover:text-white hover:bg-black py-1 px-3 rounded-full'>Done?</button>
                </div>
              ))
            ) : (
              <div>No tasks in progress</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;