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
import PetParentUpdate from "./components/petParent/pet-Parent-Update"
import PetParentList from "./components/petParent/pet-Parent-All"

//'------------careTaker----------------------'
import CareTakerForm from "./components/careTaker/careTaker-Form"
import CareTakerAccount from "./components/careTaker/careTaker-Account";
import CareTakerUpdate from "./components/careTaker/careTaker-update"
import CareTakerAll from "./components/careTaker/careTaker-All"
import CareTakerShowOne from "./components/careTaker/careTaker-showone";


//'------------Pet----------------------'
import PetForm from "./components/Pet/pet-Form";
import PetAccount from "./components/Pet/Pet-Account";
import PetUpdate from "./components/Pet/Pet-Update";


//'------------Booking----------------------'
import BookingForm from "./components/booking/booking-form"
import BookingSingleDetails from "./components/booking/booking-single";
import AllBooking from "./components/booking/booking-history"



//'----------Review--------------------------'
import CreateReview from "./components/review/createReview"
import ReviewList from "./components/review/allReview"


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
  {/* |<Link to='/create-caretaker'>Create-Caretaker</Link>
  |<Link to='/create-petparent'>Create-PetParent</Link> */}
    |<Link to='/all-petparents'>PetParentList</Link>
  |<Link to='/petparent-account'>PetParentAccount</Link>
  |<Link to='/create-review/:id'>CreateReview</Link>
 
 
  |<Link to='/showcareTaker-one'>CareTakerAccount</Link>
  |<Link to='/caretaker-account/:id'>CareTakerDetails</Link>
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
  <Route path="/caretaker-account/:id" element={<CareTakerAccount/>}/>
  <Route path="/update-caretaker/:id" element={<CareTakerUpdate/>}/>
  <Route path="/caretaker-all" element={<CareTakerAll/>}/>
  <Route path="/showcareTaker-one" element={<CareTakerShowOne/>}/>

  <Route path="/create-petparent" element={<PetParentForm/>}/>
  <Route path="/petparent-account" element={<PetParentAccount/>}/>
  <Route path="/update-petParent/:id" element={<PetParentUpdate/>}/>
  <Route path="/all-petParents" element={<PetParentList/>} />


  <Route path="/create-pet" element={<PetForm/>}/>
  <Route path='/pet-account' element={<PetAccount/>} />
  <Route path="/update-pet/:id" element={<PetUpdate/>}/>

  <Route path="/create-booking/:id" element={<BookingForm/>} />
  <Route path="/booking-details/:id" element={<BookingSingleDetails/>}/>


  <Route path="/create-review/:id" element={<CreateReview/>}/>
  <Route path="/all-review" element={<ReviewList/>}/>
</Routes>
</div>
) 
}


export default App;
