// import React from 'react'
// import { useNavigate } from 'react-router-dom';



// const LogoutBtn = () => {
//     const navigate = useNavigate();
//     const handleLogout = () => {
//         localStorage.removeItem('token'); 
//         navigate('/login');
//       };
//   return (    
//     <div className='flex items-center'>
//     <button className='border bg-pink-500 text-white cursor-pointer font-bold py-1 px-2 rounded-full' onClick={handleLogout}>Logout</button>
//     </div>
    
//   )
// }

// export default LogoutBtn
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex items-center mb-4">
      <button
        className="bg-[#fdcb6e] text-white py-1 px-4 rounded-full font-bold hover:bg-[#ffeaa7] transition-all"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutBtn;
