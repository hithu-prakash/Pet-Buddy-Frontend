// import { useState } from 'react';
// import axios from '../../config/axios';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function CareTakerForm() {
//     const navigate = useNavigate();
//     const [form, setForm] = useState({
//         businessName: '',
//         address: '',
//         bio: '',
//         serviceCharges: [], // Initialize serviceCharges as an empty array
//         photo: null,
//         proof: null,
//         serverErrors: null,
//         clientErrors: {}
//     });

//     const [specialityName, setSpecialityName] = useState('');
//     const [amount, setAmount] = useState('');
//     const [time, setTime] = useState('');
//     const [errors, setErrors] = useState({});

//     const runValidation = () => {
//         const tempErrors = {};
//         if (form.businessName.trim().length === 0) {
//             tempErrors.businessName = 'Care-Taker Business Name is required';
//         }
//         if (!form.photo) {
//             tempErrors.photo = 'Profile Photo is required';
//         }
//         if (!form.proof) {
//             tempErrors.proof = 'Government Proof is required';
//         }
//         if (form.address.trim().length === 0) {
//             tempErrors.address = 'Address is required';
//         }
//         if (form.bio.trim().length === 0) {
//             tempErrors.bio = 'Bio is required';
//         }
//         if (form.serviceCharges.length === 0) {
//             tempErrors.serviceCharges = 'At least one service charge is required';
//         }
//         setErrors(tempErrors);
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm(prevForm => ({ ...prevForm, [name]: value }));
//     };

//     const handleFileChange = (e) => {
//         const { name, files } = e.target;
//         setForm(prevForm => ({ ...prevForm, [name]: files[0] }));
//     };

//     const handleAddServiceCharge = () => {
//         if (specialityName && amount && time) {
//             setForm(prevForm => ({
//                 ...prevForm,
//                 serviceCharges: [...prevForm.serviceCharges, { specialityName, amount, time }]
//             }));
//             setSpecialityName('');
//             setAmount('');
//             setTime('');
//         } else {
//             // Optionally, you can add validation feedback here
//             console.error('Speciality Name, Amount, and Time are required');
//         }
//     };

//     const handleServiceChargeChange = (index, e) => {
//         const { name, value } = e.target;
//         const updatedServiceCharges = form.serviceCharges.map((charge, i) => 
//             i === index ? { ...charge, [name]: value } : charge
//         );
//         setForm(prevForm => ({ ...prevForm, serviceCharges: updatedServiceCharges }));
//     };

//     const handleRemoveServiceCharge = (index) => {
//         const updatedServiceCharges = form.serviceCharges.filter((_, i) => i !== index);
//         setForm(prevForm => ({ ...prevForm, serviceCharges: updatedServiceCharges }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         runValidation();
//         if (Object.keys(errors).length === 0) {
//             try {
//                 const formData = new FormData();
//                 formData.append('businessName', form.businessName);
//                 formData.append('address', form.address);
//                 formData.append('bio', form.bio);
//                 formData.append('photo', form.photo);
//                 formData.append('proof', form.proof);
    
//                 // Convert serviceCharges to JSON and append
//                 const serviceChargesJson = JSON.stringify(form.serviceCharges);
//                 formData.append('serviceCharges', serviceChargesJson);
    
//                 // Log FormData content for debugging
//                 for (let [key, value] of formData.entries()) {
//                     console.log(key, value);
//                 }
    
//                 const response = await axios.post('/caretaker/create', formData, {
//                     headers: {
//                         Authorization: localStorage.getItem('token'),
//                         'Content-Type': 'multipart/form-data',
//                     }
//                 });
    
//                 console.log(response.data);
//                 toast.success('CareTaker created successfully!');
//                 navigate('/'); // Redirect after successful creation
    
//             } catch (err) {
//                 console.log(err.message);
//                 const serverErrors = err.response && err.response.data ? err.response.data.errors : 'An unexpected error occurred';
//                 setForm(prevForm => ({ ...prevForm, serverErrors }));
//             }
//         } else {
//             setForm(prevForm => ({ ...prevForm, clientErrors: errors }));
//         }
//     };
    
//     const displayErrors = () => {
//         if (form.serverErrors) {
//             if (Array.isArray(form.serverErrors)) {
//                 return (
//                     <div>
//                         <h3>These errors prohibited the form from being saved:</h3>
//                         <ul>
//                             {form.serverErrors.map((ele, i) => (
//                                                            <li key={i}>{ele.msg}</li>
//                                                         ))}
//                                                         </ul>
//                                                     </div>
//                                                 );
//                                             } else if (typeof form.serverErrors === 'string') {
//                                                 return <p>{form.serverErrors}</p>;
//                                             }
//                                         }
//                                         return null;
//                                     };
                                
//                                     return (
//                                         <div>
//                                             <h2>Create CareTaker Form</h2>
//                                             <form onSubmit={handleSubmit}>
//                                                 <label htmlFor='businessName'>Enter Business Name</label><br/>
//                                                 <input 
//                                                     type='text' 
//                                                     value={form.businessName} 
//                                                     onChange={handleChange} 
//                                                     name='businessName' 
//                                                     id='businessName'
//                                                 /><br/>
//                                                 {errors.businessName && <span>{errors.businessName}</span>}<br/>
                                
//                                                 <label htmlFor='address'>Enter Address</label><br/>
//                                                 <input 
//                                                     type='text' 
//                                                     value={form.address} 
//                                                     onChange={handleChange} 
//                                                     name='address' 
//                                                     id='address'
//                                                 /><br/>
//                                                 {errors.address && <span>{errors.address}</span>}<br/>
                                
//                                                 <label htmlFor='bio'>Enter Bio</label><br/>
//                                                 <input 
//                                                     type='text' 
//                                                     value={form.bio} 
//                                                     onChange={handleChange} 
//                                                     name='bio' 
//                                                     id='bio'
//                                                 /><br/>
//                                                 {errors.bio && <span>{errors.bio}</span>}<br/>
                                
//                                                 <label>Enter Service Charges</label><br/>
//                                                 {form.serviceCharges.map((charge, index) => (
//                                                     <div key={index}>
//                                                         <input 
//                                                             type='text' 
//                                                             value={charge.specialityName} 
//                                                             onChange={(e) => handleServiceChargeChange(index, e)} 
//                                                             name='specialityName' 
//                                                             placeholder='Service Name'
//                                                         /><br/>
//                                                         <input 
//                                                             type='number' 
//                                                             value={charge.amount} 
//                                                             onChange={(e) => handleServiceChargeChange(index, e)} 
//                                                             name='amount' 
//                                                             placeholder='Amount'
//                                                         /><br/>
//                                                         <input 
//                                                             type='text' 
//                                                             value={charge.time} 
//                                                             onChange={(e) => handleServiceChargeChange(index, e)} 
//                                                             name='time' 
//                                                             placeholder='Time'
//                                                         /><br/>
//                                                         <button type='button' onClick={() => handleRemoveServiceCharge(index)}>Remove</button>
//                                                     </div>
//                                                 ))} 
//                                                 <input 
//                                                     type='text' 
//                                                     value={specialityName} 
//                                                     onChange={(e) => setSpecialityName(e.target.value)} 
//                                                     placeholder='Service Name'
//                                                 /><br/>
//                                                 <input 
//                                                     type='number' 
//                                                     value={amount} 
//                                                     onChange={(e) => setAmount(e.target.value)} 
//                                                     placeholder='Amount'
//                                                 /><br/>
//                                                 <input 
//                                                     type='text' 
//                                                     value={time} 
//                                                     onChange={(e) => setTime(e.target.value)} 
//                                                     placeholder='Time'
//                                                 /><br/>
//                                                 <button type='button' onClick={handleAddServiceCharge}>Add Service Charge</button><br/>
                                
//                                                 <label htmlFor='photo'>Provide Profile Photo</label><br/>
//                                                 <input 
//                                                     type='file' 
//                                                     onChange={handleFileChange} 
//                                                     name='photo' 
//                                                     id='photo'
//                                                 /><br/>
//                                                 {errors.photo && <span>{errors.photo}</span>}<br/>
                                
//                                                 <label htmlFor='proof'>Provide Government Proof (Aadhaar)</label><br/>
//                                                 <input 
//                                                     type='file' 
//                                                     onChange={handleFileChange} 
//                                                     name='proof' 
//                                                     id='proof'
//                                                 /><br/>
//                                                 {errors.proof && <span>{errors.proof}</span>}<br/>
//                                                 <input type="submit"/>           
//                                             </form>
//                                             {form.serverErrors && displayErrors()}
//                                             <ToastContainer />
//                                         </div>
//                                     );
//                                 }

import { useState } from 'react';
import axios from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CareTakerForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        businessName: '',
        address: '',
        bio: '',
        serviceCharges: [], // Initialize serviceCharges as an empty array
        photo: null,
        proof: null,
        serverErrors: null,
        clientErrors: {}
    });

    const [specialityName, setSpecialityName] = useState('');
    const [amount, setAmount] = useState('');
    const [time, setTime] = useState('');
    const [errors, setErrors] = useState({});

    const runValidation = () => {
        const tempErrors = {};
        if (form.businessName.trim().length === 0) {
            tempErrors.businessName = 'Care-Taker Business Name is required';
        }
        if (!form.photo) {
            tempErrors.photo = 'Profile Photo is required';
        }
        if (!form.proof) {
            tempErrors.proof = 'Government Proof is required';
        }
        if (form.address.trim().length === 0) {
            tempErrors.address = 'Address is required';
        }
        if (form.bio.trim().length === 0) {
            tempErrors.bio = 'Bio is required';
        }
        // No need to validate serviceCharges separately if user has added any charges
        setErrors(tempErrors);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: files[0] }));
    };

    const handleAddServiceCharge = () => {
        if (specialityName && amount && time) {
            setForm(prevForm => ({
                ...prevForm,
                serviceCharges: [...prevForm.serviceCharges, { specialityName, amount, time }]
            }));
            setSpecialityName('');
            setAmount('');
            setTime('');
        } else {
            console.error('Speciality Name, Amount, and Time are required');
        }
    };

    const handleServiceChargeChange = (index, e) => {
        const { name, value } = e.target;
        const updatedServiceCharges = form.serviceCharges.map((charge, i) => 
            i === index ? { ...charge, [name]: value } : charge
        );
        setForm(prevForm => ({ ...prevForm, serviceCharges: updatedServiceCharges }));
    };

    const handleRemoveServiceCharge = (index) => {
        const updatedServiceCharges = form.serviceCharges.filter((_, i) => i !== index);
        setForm(prevForm => ({ ...prevForm, serviceCharges: updatedServiceCharges }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        runValidation();
        if (Object.keys(errors).length === 0) {
            try {
                // Add the last service charge if any input is filled
                if (specialityName || amount || time) {
                    handleAddServiceCharge();
                }

                const formData = new FormData();
                formData.append('businessName', form.businessName);
                formData.append('address', form.address);
                formData.append('bio', form.bio);
                formData.append('photo', form.photo);
                formData.append('proof', form.proof);

                // Convert serviceCharges to JSON and append
                const serviceChargesJson = JSON.stringify(form.serviceCharges);
                formData.append('serviceCharges', serviceChargesJson);

                // Log FormData content for debugging
                for (let [key, value] of formData.entries()) {
                    console.log(key, value);
                }

                const response = await axios.post('/caretaker/create', formData, {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data',
                    }
                });

                console.log(response.data);
                toast.success('CareTaker created successfully!');
                navigate('/'); // Redirect after successful creation

            } catch (err) {
                console.log(err.message);
                const serverErrors = err.response && err.response.data ? err.response.data.errors : 'An unexpected error occurred';
                setForm(prevForm => ({ ...prevForm, serverErrors }));
            }
        } else {
            setForm(prevForm => ({ ...prevForm, clientErrors: errors }));
        }
    };

    const displayErrors = () => {
        if (form.serverErrors) {
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
    };

    return (
        <div>
            <h2>Create CareTaker Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='businessName'>Enter Business Name</label><br/>
                <input 
                    type='text' 
                    value={form.businessName} 
                    onChange={handleChange} 
                    name='businessName' 
                    id='businessName'
                /><br/>
                {errors.businessName && <span>{errors.businessName}</span>}<br/>

                <label htmlFor='address'>Enter Address</label><br/>
                <input 
                    type='text' 
                    value={form.address} 
                    onChange={handleChange} 
                    name='address' 
                    id='address'
                /><br/>
                {errors.address && <span>{errors.address}</span>}<br/>

                <label htmlFor='bio'>Enter Bio</label><br/>
                <input 
                    type='text' 
                    value={form.bio} 
                    onChange={handleChange} 
                    name='bio' 
                    id='bio'
                /><br/>
                {errors.bio && <span>{errors.bio}</span>}<br/>

                <label>Enter Service Charges</label><br/>
                {form.serviceCharges.map((charge, index) => (
                    <div key={index}>
                        <input 
                            type='text' 
                            value={charge.specialityName} 
                            onChange={(e) => handleServiceChargeChange(index, e)} 
                            name='specialityName' 
                            placeholder='Service Name'
                        /><br/>
                        <input 
                            type='number' 
                            value={charge.amount} 
                            onChange={(e) => handleServiceChargeChange(index, e)} 
                            name='amount' 
                            placeholder='Amount'
                        /><br/>
                        <input 
                            type='text' 
                            value={charge.time} 
                            onChange={(e) => handleServiceChargeChange(index, e)} 
                            name='time' 
                            placeholder='Time'
                        /><br/>
                        <button type='button' onClick={() => handleRemoveServiceCharge(index)}>Remove</button>
                    </div>
                ))} 
                <input 
                    type='text' 
                    value={specialityName} 
                    onChange={(e) => setSpecialityName(e.target.value)} 
                    placeholder='Service Name'
                /><br/>
                <input 
                    type='number' 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    placeholder='Amount'
                /><br/>
                <input 
                    type='text' 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)} 
                    placeholder='Time'
                /><br/>
                <button type='button' onClick={handleAddServiceCharge}>Add Service Charge</button><br/>

                <label htmlFor='photo'>Provide Profile Photo</label><br/>
                <input 
                    type='file' 
                    onChange={handleFileChange} 
                    name='photo' 
                    id='photo'
                /><br/>
                {errors.photo && <span>{errors.photo}</span>}<br/>

                <label htmlFor='proof'>Provide Government Proof (Aadhaar)</label><br/>
                <input 
                    type='file' 
                    onChange={handleFileChange} 
                    name='proof' 
                    id='proof'
                /><br/>
                {errors.proof && <span>{errors.proof}</span>}<br/>
                <input type="submit" value="Submit" />
            </form>
            {form.serverErrors && displayErrors()}
            <ToastContainer />
        </div>
    );
}
