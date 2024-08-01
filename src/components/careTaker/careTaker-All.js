import React,{useEffect,useState} from 'react';
import axios from '../../config/axios';
import {Link} from 'react-router-dom'

export default function CareTakerAll(){
    const [careTakers,setCareTakers] = useState([]);
    const [loading,setLoading] = useState(true);
    const [errors,setErrors] = useState(null);
    useEffect(() =>{
        const fetchCareTakers = async () =>{
            try{
                const response = await axios.get('/caretaker/showallcareTaker',{
                    headers:{
                        Authorization:localStorage.getItem('token')
                    }
                });
                setCareTakers(response.data);
                setLoading(false);
            }catch(errors){
                console.log(errors.message)
                setErrors(errors);
                setLoading(false);
            }
        };
        fetchCareTakers();
    },[]);

    if(loading)return<div>Loading...</div>;
    if(errors)return<div>{errors}</div>

    return(
        <div>
            <h2>Verified Caretakers List</h2>
            {careTakers.map(careTaker =>(
                <div key={careTaker._id} className='care-taker-card'>
                    {careTaker.userId ?(
                        <>
                        <h2>{careTaker.userId.username}</h2>
                        <p>Email:{careTaker.userId.email}</p>
                        <p>Phone:{careTaker.userId.phoneNumber}</p>
                        </>
                    ):(
                        <p>User Information not available</p>
                    )}
                    <p>Care-Taker Business Name:{careTaker.careTakerBusinessName}</p>
                    <p>Address:{careTaker.address}</p>
                    <p>Bio:{careTaker.bio}</p>
                    <div>
                        <h3>Services:</h3>
                        {careTaker.serviceCharges.map((charge, index) => (
                            <div key={index}>
                                <p>Service Name: {charge.name}</p>
                                <p>Service Amount: {charge.amount}</p>
                                <p>Service Time: {charge.time}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h3>Profile Photo</h3>
                        <img src={careTaker.photo} alt='Profile' style={{maxWidth:'200px'}}/>
                    </div>
                    <div>
                        <h3>Proof Document</h3>
                        <img src={careTaker.proof} alt='Profile' style={{maxWidth:'200px'}}/>
                    </div>
                    <Link to={`/caretaker-account`}>View Details</Link>
                </div>
            ))}
        </div>
    )
}
