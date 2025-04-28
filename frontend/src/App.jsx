import Dashboard from './Components/Dashboard.jsx';
import Login from './Components/Login.jsx';
import SignupForm from './Components/Signup.jsx'

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
function App() {


  return (
    <>

      <Router>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router> 

    </>
  )
}

export default App