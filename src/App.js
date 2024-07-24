import {Link,Routes,Route} from "react-router-dom"
import Register from "./components/userRegisteration/registerForm"
import Home from "./components/userRegisteration/Home"
import VerifyOTP from "./components/userRegisteration/verifyOTP"
import Login from "./components/userRegisteration/Login"

function App() {
  return(
    <div>
      <h1>PetBuddy</h1>
      <Link to="/">Home</Link>|
      <Link to="/register">Register</Link>|
      <Link to="/login">Login</Link>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/verify-OTP" element={<VerifyOTP/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  )
  
}

export default App;
