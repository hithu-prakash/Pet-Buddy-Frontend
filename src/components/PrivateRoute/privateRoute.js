import { useAuth } from "../../context/authContext"
import { Navigate } from "react-router-dom";
export default function PrivateRoute({permittedRoles,children}) {
    const {user} = useAuth()
    
    if(!user.isLoggedIn && localStorage.getItem('token')) {
        return <p> Loading...</p>
    }

    if(!user.isLoggedIn) {
        return <Navigate to ="/Login" />
    }

    
    if(!permittedRoles.includes(user.account.role)) {
        return <Navigate to ="/unauthorized" />
    }

    return children

}