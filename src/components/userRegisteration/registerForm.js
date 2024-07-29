// import { useState } from 'react';

// import validator from "validator"
// import axios from '../../config/axios';
// import { toast } from 'react-toastify'
// import { useNavigate } from 'react-router-dom';
// import _ from 'lodash';

// export default function Register(){
//     const navigate = useNavigate();
//     const [form,setForm] = useState({
//         username:'',
//         email:'',
//         phoneNumber:'',
//         password:'',
//         role:'',
//         serverErrors:null,
//         clientErrors:{}
//     })
//     const [errors,setErrors] = useState({})
//     const runValidation = () =>{
//         const tempErrors = {}

//         if (form.username.trim().length === 0) {
//             tempErrors.username = 'Username is required';
//         }
    
//         if (form.email.trim().length === 0) {
//             tempErrors.email = 'Email is required';
//         } else if (!validator.isEmail(form.email)) {
//             tempErrors.email = 'Invalid email format';
//         }
//         if (form.phoneNumber.trim().length === 0) {
//             tempErrors.phoneNumber = 'PhoneNumber is required';
//         }
    
//         if (form.password.trim().length === 0) {
//             tempErrors.password = 'Password is required';
//         } else if (form.password.trim().length < 8 || form.password.trim().length > 128) {
//             tempErrors.password = 'Password should be between 8 - 128 characters';
//         }
    
//         if (form.role.trim().length === 0) {
//             tempErrors.bio = 'Role is required';
//         }

//         setErrors(tempErrors)
//     }

//     const handleChange = (e) =>{
//         const {name,value} = e.target
//         setForm({...form,[name]:value})
//     }
//     const handleSubmit = async(e) =>{
//         e.preventDefault();
//         const formData = _.pick(form,['username','email','phoneNumber','password','role'])
//         runValidation();
//         if(Object.keys(errors).length === 0){
//             try{
//                 const response = await axios.post('/user/register',formData);
//                 console.log(response.data);
//                 toast.success('Registration Success', {
//                     autoClose: 1000,
//                     onClose: () => {
//                         navigate('/verify-otp');
//                     }
//                 })
//                 navigate('/verify-otp')
//             }catch(err){
//                 console.log(err);
//                 const serverErrors = err.response && err.response.data ? err.response.data : 'An unexpected error occured'
//                 setForm({...form, serverErrors})
//             }
//         }else{
//             setForm({...form,clientErrors:errors})
            
//         }

//     }
//     const displayErrors = () =>{
//         if(form.serverErrors){
//             if (Array.isArray(form.serverErrors)) {
//                 return (
//                     <div>
//                         <h3>These errors prohibited the form from being saved:</h3>
//                         <ul>
//                             {form.serverErrors.map((ele, i) => (
//                                 <li key={i}>{ele.msg}</li>
//                             ))}
//                         </ul>
//                     </div>
//                 );
//             } else if (typeof form.serverErrors === 'string') {
//                 return <p>{form.serverErrors}</p>;
//             }
//         }
//         return null;
//     }
//     return(
//         <div>
//             <h1>Register With PetBuddy</h1>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor='username'>Enter User Name</label><br/>
//                 <input
//                     type='text'
//                     value={form.username}
//                     onChange={handleChange}
//                     name='username'
//                     id='username'
//                 />
//                 {errors.username && <span>{errors.username}</span>}<br/>
//                 <label htmlFor='email'>Enter Email</label><br/>
//                 <input
//                     type='text'
//                     value={form.email}
//                     onChange={handleChange}
//                     name='email'
//                     id='email'
//                 />
//                 {errors.email && <span>{errors.email}</span>}<br/>
//                 <label htmlFor='phoneNumber'>Enter Phone Number</label><br/>
//                 <input
//                     type='text'
//                     value={form.phoneNumber}
//                     onChange={handleChange}
//                     name='phoneNumber'
//                     id='phoneNumber'
//                 />
//                 {errors.phoneNumber && <span>{errors.phoneNumber}</span>}<br/>
//                 <label htmlFor='password'>Enter Password</label><br/>
//                 <input
//                     type='text'
//                     value={form.password}
//                     onChange={handleChange}
//                     name='password'
//                     id='password'
//                 />
//                 {errors.password && <span>{errors.password}</span>}<br/>
//                 <label>Select Role</label><br/>
//                 <input type='radio' value='admin' onChange={handleChange} name='role' id='role_admin' checked={form.role ==='admin'}/>
//                 <label htmlFor='role_admin'>Admin</label>
//                 <input type='radio' value='petParent' onChange={handleChange} name='role' id='role_petParent' checked={form.role === 'petParent'}/>
//                 <label htmlFor='role_petParent'>Pet Parent</label>
//                 <input type='radio' value='careTaker' onChange={handleChange} name='role' id='role_careTaker' checked={form.role === 'careTaker'}/>
//                 <label htmlFor='role_careTaker'>Care Taker</label>
//                 {errors.role && <span>{errors.role}</span>}<br/>
//                 <input type='submit'/>             
                
//             </form>
//             {form.serverErrors && displayErrors()}
//         </div>
//     )

// }


import { useState } from 'react';
import axios from '../../config/axios';
//import { useHistory } from 'react-router-dom';
import { Box, Grid, Button, TextField, Typography, Container, Avatar,FormControl,FormLabel, RadioGroup,FormControlLabel,Radio } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import p1 from "../../photos/p1.jpg"
import { useNavigate } from 'react-router-dom';
import validator from "validator"
import { toast } from 'react-toastify'
import _ from 'lodash';


const center = {
    position: "relative",
    top: "30%",
    left: "37%",
  };
  

export default function Register(){

    const navigate = useNavigate();

    const [form,setForm] = useState({
                username:'',
                email:'',
                phoneNumber:'',
                password:'',
                role:'',
                serverErrors:null,
                clientErrors:{}
            })
            const [errors,setErrors] = useState({})
            const runValidation = () =>{
                const tempErrors = {}
        
                if (form.username.trim().length === 0) {
                    tempErrors.username = 'Username is required';
                }
            
                if (form.email.trim().length === 0) {
                    tempErrors.email = 'Email is required';
                } else if (!validator.isEmail(form.email)) {
                    tempErrors.email = 'Invalid email format';
                }
                if (form.phoneNumber.trim().length === 0) {
                    tempErrors.phoneNumber = 'PhoneNumber is required';
                }
            
                if (form.password.trim().length === 0) {
                    tempErrors.password = 'Password is required';
                } else if (form.password.trim().length < 8 || form.password.trim().length > 128) {
                    tempErrors.password = 'Password should be between 8 - 128 characters';
                }
            
                if (form.role.trim().length === 0) {
                    tempErrors.bio = 'Role is required';
                }
        
                setErrors(tempErrors)
            }
        
            const handleChange = (e) =>{
                        const {name,value} = e.target
                        setForm({...form,[name]:value})
                    }

    const handleSubmit = async(e) =>{
                e.preventDefault();
                const formData = _.pick(form,['username','email','phoneNumber','password','role'])
                runValidation();
                if(Object.keys(errors).length === 0){
                    try{
                        const response = await axios.post('/user/register',formData);
                        console.log(response.data);
                        toast.success('Registration Success', {
                            autoClose: 1000,
                            onClose: () => {
                                navigate('/verify-otp');
                            }
                        })
                        navigate('/verify-otp')
                    }catch(err){
                        console.log(err);
                        const serverErrors = err.response && err.response.data ? err.response.data : 'An unexpected error occured'
                        setForm({...form, serverErrors})
                    }
                }else{
                    setForm({...form,clientErrors:errors})
                    
                }
        
            }

            const displayErrors = () =>{
                        if(form.serverErrors){
                            if (Array.isArray(form.serverErrors)) {
                                return (
                                    <div>
                                        <h3>These errors prohibited the form from being saved:</h3>
                                        <ul>
                                            {form.serverErrors.map((ele, i) => (
                                                <li key={i}>{ele.msg}</li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            } else if (typeof form.serverErrors === 'string') {
                                return <p>{form.serverErrors}</p>;
                            }
                        }
                        return null;
                    }
    return(
        <>
        <div 
        style={{
            backgroundImage:`url(${p1})`,
            backgroundSize:"cover",
            height:"100vh",
            color:"#f5f5f5",
        }}>
            <form onSubmit={handleSubmit}>
            <Box >
                
          <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
              
            </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                    <Box
                        style={{
                         backgroundSize: "cover",
                         height: "100vh",
                        minHeight: "500px",
                        backgroundColor: "#bc8f8f"
                     }}
                    >
                <Container>
                <Box height={35} />
                    <Box sx={center}>
                      <Avatar
                        sx={{ ml: "45px", mb: "4px" }}
                      >
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h3" variant="h4">
                        Register
                      </Typography>
                    </Box>

                    <Grid container spacing={1}>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                        <TextField
                          required
                          fullWidth
                          id="username"
                          label="Username"
                          name="username"
                          value={form.username}
                          onChange={handleChange}
                          autoComplete="username"
                        />
                        </Grid><br/>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                        <TextField
                          required
                          fullWidth
                          id="email"
                          label="Email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          autoComplete="email"
                        />
                        </Grid><br/>

                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                        <TextField
                          required
                          fullWidth
                          id="phoneNumber"
                          label="Phone Number"
                          name="phoneNumber"
                          value={form.phoneNumber}
                          onChange={handleChange}
                          autoComplete="tel"
                        />
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                        <TextField
                          required
                          fullWidth
                          id="password"
                          label="Password"
                          name="password"
                          type="password"
                          value={form.password}
                          onChange={handleChange}
                          autoComplete="new-password"
                        />
                      </Grid>
                        <Grid><br/>
                        <FormControl item xs={12} sx={{ ml: "4em", mr: "4em" }}>
                        <FormLabel component="legend">Select Role</FormLabel>
                        <RadioGroup
                          row
                          aria-label="role"
                          name="role"
                          value={form.role}
                          onChange={handleChange}
                        >
                          <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
                          <FormControlLabel value="careTaker" control={<Radio />} label="Care Taker" />
                          <FormControlLabel value="petParent" control={<Radio />} label="Pet Parent" />
                        </RadioGroup>
                      </FormControl>
                           </Grid><br/>
                           <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                           <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          size="large"
                          sx={{
                            mt: "15px",
                            mr: "20px",
                            borderRadius: 28,
                            color: "#ffffff",
                            minWidth: "170px",
                            backgroundColor: "#FF9A01",
                          }}
                        >
                            Register
                          </Button>
                        </Grid>
                        </Grid>
                </Container>
                </Box>
                </Grid>
            </Grid>
            </Box>
           
            </form>
        </div>
            </>
    )
}

