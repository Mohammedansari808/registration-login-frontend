import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup';
import DashBoard from './Components/DashBoard';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<ProtRoute><DashBoard /></ProtRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dash" element={<DashBoard />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

function ProtRoute({ children }) {
  const navigate = useNavigate()
  const isAuth = localStorage.getItem("x-auth-token")


  if (isAuth) {
    return (
      children
    )
  } else {
    navigate("/login")
  }
}
export default App;
