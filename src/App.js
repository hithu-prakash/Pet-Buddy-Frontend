import {Link,Routes,Route} from "react-router-dom"
import { useEffect } from "react";
import axios from "./config/axios";
import { useAuth } from "./context/authContext";
import PrivateRoute from "./components/PrivateRoute/privateRoute";

// '----------user-----------------------------------'
import Register from "./components/userRegisteration/registerForm"
import Home from "./components/userRegisteration/Home"
import VerifyOTP from "./components/userRegisteration/verifyOTP"
import Login from "./components/userRegisteration/Login"
import Account from "./components/userRegisteration/account"
import ForgetPassword from "./components/userRegisteration/forgetPassword";
import ResetPassword from "./components/userRegisteration/resetPassword";

// '------------petParent----------------------'
import PetParentForm from "./components/petParent/petParent-Form";

//'------------careTaker----------------------'
import CareTakerForm from "./components/careTaker/careTaker-Form"

function App() {

  const {user,dispatch} = useAuth()


  const conditionalLinks=(path,roles) => {
    switch(path) {
      case '/create-careTaker' : {
        if(roles.includes(user.account.role)) {
          return <Link to={path}>Create CareTaker</Link>
        }
      }
      case '/create-petparent' : {
        if(roles.includes(user.account.role)) {
          return <Link to={path}>Create PetParent</Link> 
        }
      }
    }
  }

  useEffect(()=>{
    if(localStorage.getItem('token')){
      (async()=>{
        const response = await axios.get('/user/account',{
          headers:{
            Authorization: localStorage.getItem('token')
          }
        })
        dispatch({type:'LOGIN',payload:{account:response.data}})
      })()
    }
  },[])
  
  return(
    <div >
      <h1>PetBuddy</h1>
      <Link to='/'>Home</Link>
      {!user.isLoggedIn ?(
        <>
        |<Link to='/register'>Register</Link>|
        <Link to='/login'>Login</Link>
        </>
      ):(
        <>
        |<Link to='/account'>Account</Link>|
        { conditionalLinks('/create-careTaker', ['admin', 'careTaker'])} |
        { conditionalLinks('/create-petParent', ['admin', 'petParent'])} 

        
       
        <Link to='/' onClick={()=>{
          localStorage.removeItem('token')
          dispatch({type:'LOGOUT'})
        }}>Logout</Link>
        </>
      )}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/verify-OTP" element={<VerifyOTP/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/forget-password" element={<ForgetPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/Account" element={
            <PrivateRoute permittedRoles={['careTaker', 'petParent']}>
              <Account />
            </PrivateRoute>
          } />
 {/* CareTaker */}
        <Route path="/create-caretaker" element={
            <PrivateRoute permittedRoles={['careTaker']}>
              <CareTakerForm />
            </PrivateRoute>
          } />

        
        {/* PetParent */}
        <Route path="/create-petparent" element={
            <PrivateRoute permittedRoles={['petParent']}>
              <PetParentForm />
            </PrivateRoute>
          } />
      </Routes>
    </div>
  )
  
}


export default App;
