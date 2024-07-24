import {useState} from "react"
import axios from "../../config/axios"
import {useFormik} from "formik"
import * as yup from "yup"
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify'
import {useAuth} from "../../context/authContext"


const loginValidationsSchema= yup.object({
    email: yup.string().required("Email is required").email("Invalid Email Format"),
    password: yup.string().required("Password is required").min(8,"Password must be 8 Characters").max(16,"Password must be 16 Characters")
})

export default function Login(){

    const {dispatch}=useAuth()
    const navigate=useNavigate()

    const formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validationOnChange : false,
        validationSchema: loginValidationsSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('/user/login', values);
                localStorage.setItem('token', response.data.token);
               
                console.log(response.data);
                
                const userResponse = await axios.get('/user/account', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                
                console.log('userResponse', userResponse.data);
                dispatch({ type: "LOGIN", payload: { account: userResponse.data } });
                toast.success('Login Success', {
                    autoClose: 1000,
                    onClose: () => {
                        navigate('/account');
                    }
                })
            } catch (err) {
                console.log(err);
                
            }
        }
    });

    

    return(
        <div>
            <h1>Login </h1>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Enter Email</label> <br/>
                    <input 
                        type="text"
                        value={formik.values.email}
                        name="email"
                        onChange={formik.handleChange}
                        id="email"
                    /> <br />
                     <label htmlFor="password">Enter Password</label><br/>
                    <input 
                        type="password"
                        value={formik.values.password}
                        name="password"
                        onChange={formik.handleChange}
                        id="password"
                    /><br/ >
                    <input type="submit" />
                    
               
            </form>
        </div>
    )
}