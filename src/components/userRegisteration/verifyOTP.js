import {useState} from "react"
import axios from "../../config/axios"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import _ from "lodash"

export default function VerifyOTP(){
    const navigate=useNavigate()
    const [form,setForm]=useState({
        email:'',
        otp:'',
    })
    const [errors,setErrors]=useState({})

    const handleChange = (e)=>{
        const {name,value}=e.target
        setForm({...form,[name]:value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const formData=_.pick(form,['email','otp'])
        try{
            const response = await axios.post('/user/verify',formData)
            console.log(response.data)
            toast.success('Verified Sucessfull', {
                autoClose: 1000,
                onClose: () => {
                    navigate('/login');
                }
            })
        } catch(err) {
            console.log(err)
        }
    }

    return(
        <div>
            <h1>Verify Your OTP</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Enter Email</label> <br/>
                <input
                    type='text'
                    value={form.email}
                    onChange={handleChange}
                    name='email'
                    id='email'
                /> <br/>
                 <label htmlFor="otp">Enter Otp</label><br/>
                 <input
                    type="text" 
                    value={form.otp} 
                    onChange={handleChange} 
                    name="otp" 
                    id="otp"
                     /> <br/>
                <input type="submit"/>
            </form>
        </div>

    )
}

