import { useState } from 'react';
import axios from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateCareForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        businessName: '',
        address: '',
        bio: '',
        serviceCharges: [{ specialityName: '', amount: '', time: '' }],
        photo: null,
        proof: null,
        serverErrors: null,
        clientErrors: {}
    });

    const [errors, setErrors] = useState({});

    const runValidation = () => {
        const tempErrors = {};
        if (form.businessName.trim().length === 0) {
            tempErrors.businessName = 'Business Name is required';
        }
        if (form.address.trim().length === 0) {
            tempErrors.address = 'Address is required';
        }
        if (form.bio.trim().length === 0) {
            tempErrors.bio = 'Bio is required';
        }
        if (!form.photo) {
            tempErrors.photo = 'Profile Photo is required';
        }
        if (!form.proof) {
            tempErrors.proof = 'Government Proof is required';
        }
        // if (!form.serviceCharges.every(charge => charge.specialityName.trim().length > 0)) {
        //     tempErrors.serviceCharges = 'All service charges must have a speciality name';
        // }
        setErrors(tempErrors);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleServiceChargeChange = (index, e) => {
        const { name, value } = e.target;
        const updatedServiceCharges = form.serviceCharges.map((charge, i) =>
            i === index ? { ...charge, [name]: value } : charge
        );
        setForm(prevForm => ({ ...prevForm, serviceCharges: updatedServiceCharges }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: files[0] }));
    };

    const handleAddServiceCharge = () => {
        setForm(prevForm => ({
            ...prevForm,
            serviceCharges: [...prevForm.serviceCharges, { specialityName: '', amount: '', time: '' }]
        }));
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
                const formData = new FormData();
                formData.append('businessName', form.businessName);
                formData.append('address', form.address);
                formData.append('bio', form.bio);
                if (form.photo) formData.append('photo', form.photo);
                if (form.proof) formData.append('proof', form.proof);
                formData.append('serviceCharges', JSON.stringify(form.serviceCharges));
            
                // Log FormData content for debugging
                for (let [key, value] of formData.entries()) {
                    console.log(`${key}: ${value}`);
                }
        
                const token = localStorage.getItem('token');
                const response = await axios.post('/caretaker/create', formData, {
                    headers: {
                        'Authorization': `${token}`,
                        'Content-Type': 'multipart/form-data',
                    }
                });
                console.log(response.data);
                const id=response.data._id
                console.log(id)
                toast.success('CareTaker created successfully!');
                navigate(`/caretaker-account/${id}`);
        
            } catch (err) {
                console.error('Submit Error:', err);
                const serverErrors = err.response?.data?.errors || 'An unexpected error occurred';
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
            <h2>New CareTaker Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='businessName'>Business Name</label><br />
                <input type='text' value={form.businessName} onChange={handleChange} name='businessName' id='businessName' /><br />
                {errors.businessName && <span>{errors.businessName}</span>}<br />

                <label htmlFor='address'>Enter Address</label><br />
                <input type='text' value={form.address} onChange={handleChange} name='address' id='address' /><br />
                {errors.address && <span>{errors.address}</span>}<br />

                <label htmlFor='bio'>Enter Bio</label><br />
                <input type='text' value={form.bio} onChange={handleChange} name='bio' id='bio' /><br />
                {errors.bio && <span>{errors.bio}</span>}<br />

                <label htmlFor='serviceCharges'>Enter Service Charges</label><br />
                {form.serviceCharges.map((charge, index) => (
                    <div key={index}>
                         <select
                            name='specialityName'
                            value={charge.specialityName}
                            onChange={(e) => handleServiceChargeChange(index, e)}
                        >
                            <option value=''>Select Service</option>
                            <option value='Pet-Boarding'>Pet-Boarding</option>
                            <option value='Pet-Sitting'>Pet-Sitting</option>
                            <option value='Pet-Walking'>Pet-Walking</option>
                            <option value='Pet-Grooming'>Pet-Grooming</option>
                            <option value='Pet-Taxi'>Pet-Taxi</option>
                            <option value='Pet-Training'>Pet-Training</option>
                            <option value='Vet-Consult'>Vet-Consult</option>
                            <option value='Others'>Others...</option>
                        </select> <br/>
                        {/* <input type='text' value={charge.specialityName} onChange={(e) => handleServiceChargeChange(index, e)} name='specialityName' placeholder='Service Name' /><br /> */}
                        <input type='text' value={charge.amount} onChange={(e) => handleServiceChargeChange(index, e)} name='amount' placeholder='Amount' /><br />
                        <input type='text' value={charge.time} onChange={(e) => handleServiceChargeChange(index, e)} name='time' placeholder='Time' /><br />
                        {index > 0 && <button type='button' onClick={() => handleRemoveServiceCharge(index)}>Remove</button>}
                    </div>
                ))}
                <button type='button' onClick={handleAddServiceCharge}>Add Service Charge</button><br />

                <label htmlFor='photo'>Provide Profile Photo</label><br />
                <input type='file' onChange={handleFileChange} name='photo' id='photo' /><br />
                {errors.photo && <span>{errors.photo}</span>}<br />

                <label htmlFor='proof'>Provide Government Proof (Aadhaar)</label><br />
                <input type='file' onChange={handleFileChange} name='proof' id='proof' /><br />
                {errors.proof && <span>{errors.proof}</span>}<br />
                <input type="submit" />
            </form>
            {form.serverErrors && displayErrors()}
            <ToastContainer />
        </div>
    );
}