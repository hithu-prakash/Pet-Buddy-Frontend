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
import PetParentAccount from "./components/petParent/petParent-Account";

//'------------careTaker----------------------'
import CareTakerForm from "./components/careTaker/careTaker-Form"
import CareTakerAccount from "./components/careTaker/careTaker-Account";


//'------------Pet----------------------'
import PetForm from "./components/Pet/pet-Form";
import PetAccount from "./components/Pet/Pet-Account";


//'------------Booking----------------------'
import BookingForm from "./components/booking/booking-form"

function App() {

  const {user,dispatch} = useAuth()
  // const [isPetParentCreated, setIsPetParentCreated] = useState(false);


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
//     <div >
//       <h1>PetBuddy</h1>
//       <Link to='/'>Home</Link>
//       {!user.isLoggedIn ?(
//         <>
//         |<Link to='/register'>Register</Link>|
//         <Link to='/login'>Login</Link>
//         </>
//       ):(
//         <>
//         |<Link to='/account'>Account</Link>|
//         { conditionalLinks('/create-careTaker', ['admin', 'careTaker'])} 
//         { conditionalLinks('/create-petparent', ['admin', 'petParent'])} |
//         {/* { conditionalLinks('/create-pet',['admin','petParent'])} | */}

//         <Link to='/parent-account'>Account</Link>|
//         <Link to='/create-pet'>Create Pet</Link> |
       
//         <Link to='/' onClick={()=>{
//           localStorage.removeItem('token')
//           dispatch({type:'LOGOUT'})
//         }}>Logout</Link>
//         </>
//       )}
//       <Routes>
//         <Route path="/" element={<Home/>} />
//         <Route path="/register" element={<Register/>} />
//         <Route path="/verify-OTP" element={<VerifyOTP/>} />
//         <Route path="/login" element={<Login/>} />
//         <Route path="/forget-password" element={<ForgetPassword/>}/>
//         <Route path="/reset-password" element={<ResetPassword/>}/>
//         <Route path="/Account" element={
//             <PrivateRoute permittedRoles={['careTaker', 'petParent']}>
//               <Account />
//             </PrivateRoute>
//           } />
//  {/* CareTaker */}
//         <Route path="/create-caretaker" element={
//             <PrivateRoute permittedRoles={['careTaker']}>
//               <CareTakerForm />
//             </PrivateRoute>
//           } />

        
//         {/* PetParent */}
//         <Route path="/create-petparent" element={
//             <PrivateRoute permittedRoles={['petParent']}>
//               <PetParentForm />
//             </PrivateRoute>
//           } />

//         <Route path="/parent-account" element={
//             <PrivateRoute permittedRoles={['petParent']}>
//               <PetParentAccount />
//             </PrivateRoute>
//           } />

//            {/* Pet */}
//         <Route path="/create-pet" element={
//             <PrivateRoute permittedRoles={['petParent']}>
//               <PetForm />
//             </PrivateRoute>
//           } />
//       </Routes>
//     </div>
  

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
  |<Link to='/create-caretaker'>Create-Caretaker</Link>
  |<Link to='/create-petparent'>Create-PetParent</Link>
  |<Link to='/petparent-account'>PetParentAccount</Link>
  |<Link to='/create-pet'>CreatePet</Link>
  |<Link to='/create-booking'>CreateBooking</Link>
  |<Link to='/caretaker-account'>CareTakerAccount</Link>
  |<Link to='/pet-account'>PetAccount</Link>
  |<Link to='/' onClick={()=>{
    localStorage.removeItem('token')
    dispatch({type:'LOGOUT'})
  }}>Logout</Link>
  </>
)}


<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/register" element={<Register/>}/>
  <Route path="/verify-otp" element={<VerifyOTP/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/forget-password" element={<ForgetPassword/>}/>
  <Route path="/reset-password" element={<ResetPassword/>}/>
  <Route path="/account" element={<Account/>}/>

  <Route path="/create-caretaker" element={<CareTakerForm/>}/>
  <Route path="/caretaker-account" element={<CareTakerAccount/>}/>

  <Route path="/create-petparent" element={<PetParentForm/>}/>
  <Route path="/petparent-account" element={<PetParentAccount/>}/>

  <Route path="/create-pet" element={<PetForm/>}/>
  <Route path='/pet-account' element={<PetAccount/>} />

  <Route path="create-booking" element={<BookingForm/>} />
</Routes>
</div>
) 
}


export default App;
