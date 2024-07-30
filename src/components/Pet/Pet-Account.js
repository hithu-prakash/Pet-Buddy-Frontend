// // import React, { useEffect, useState } from 'react';
// // import axios from '../../config/axios';

// // export default function PetAccount() {
// //     const [pet, setPet] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);

// //     useEffect(() => {
// //         const fetchPet = async () => {
// //           try {
// //             const response = await axios.get('/pet/singlePet', {
// //               headers: {
// //                 Authorization: localStorage.getItem('token'),
// //               },
// //             });
// //             console.log(response.data);
// //             setPet(response.data);
// //             setLoading(false);
// //           } catch (err) {
// //             console.error(err);
// //             setError(err.message);
// //             setLoading(false);
// //           }
// //         };
// //         fetchPet(); // Calling the function here
// //       }, []);
// //     if (loading) return <div>Loading...</div>;
// //     if (error) return <div>Error: {error}</div>;

// //     return (
// //         <div>
// //             <h2>Pet Details</h2>
// //             {pet ? (
// //                 <div>
// //                     <h3>Username: {pet.userId.username}</h3>
// //                     <p>Email: {pet.userId.email}</p>
// //                     <p>Phone: {pet.userId.phoneNumber}</p>
// //                     {/* <p>Address: {pet.address}</p> */}
// //                     <h3>Pet Name: {pet.petName}</h3>
// //                     <p>Age: {pet.age}</p>
// //                     <p>Gender: {pet.gender}</p>
// //                     <p>Categories: {pet.categories}</p>
// //                     <p>Breed: {pet.breed}</p>
// //                     <div>
// //                         <h3>Pet Photo</h3>
// //                         <img src={pet.petPhoto} alt='Profile' style={{ maxWidth: '200px' }} />
// //                     </div>
// //                     <p>Weight: {pet.weight}</p>
// //                     {pet.medication && (
// //                         <div>
// //                             <h3>Medications:</h3>
// //                             <ul>
// //                             {pet.medication.map((med, index) => (
// //                                 <li key={index}>
// //                                     <p>Medication Name: {med.medicationName}</p>
// //                                     <p>Description: {med.description}</p>
// //                                     <p>Due Date: {med.dueDate}</p>
// //                                     <p>Dose: {med.dose}</p>
// //                                 </li>
// //                             ))}
// //                         </ul>
// //                         </div>
// //                     )}
// //                     {pet.reminders && pet.reminders.length > 0 && (
// //                     <div>
// //                         <h3>Reminders:</h3>
// //                         <ul>
// //                             {pet.reminders.map((reminder, index) => (
// //                                 <li key={index}>
// //                                     <p>Date: {reminder.date}</p>
// //                                     <p>Title: {reminder.title}</p>
// //                                     <p>Note: {reminder.note}</p>
// //                                 </li>
// //                             ))}
// //                         </ul>
// //                     </div>
// //                 )}
// //                 </div>
// //             ) : (
// //                 <div>Pet not found</div>
// //             )}
// //         </div>
// //     );
// // }


// // import React, { useEffect, useState } from 'react';
// // import axios from '../../config/axios';

// // export default function PetAccount() {
// //     const [pet, setPet] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);
// //     const [isEditing, setIsEditing] = useState(false);
// //     const [formValues, setFormValues] = useState({
// //         petName: '',
// //         age: '',
// //         gender: '',
// //         categories: '',
// //         breed: '',
// //         petPhoto: '',
// //         weight: '',
// //         medication: [],
// //         reminders: []
// //     });
// //     const [selectedFile, setSelectedFile] = useState(null);

// //     useEffect(() => {
// //         const fetchPet = async () => {
// //             try {
// //                 const response = await axios.get('/pet/singlePet', {
// //                     headers: {
// //                         Authorization: localStorage.getItem('token'),
// //                     },
// //                 });
// //                 console.log(response.data)
// //                 setPet(response.data);
// //                 setFormValues({
// //                     petName: response.data.petName,
// //                     age: response.data.age,
// //                     gender: response.data.gender,
// //                     categories: response.data.categories,
// //                     breed: response.data.breed,
// //                     petPhoto: response.data.petPhoto,
// //                     weight: response.data.weight,
// //                     medication: response.data.medication,
// //                     reminders: response.data.reminders
// //                 });
// //                 setLoading(false);
// //             } catch (err) {
// //                 setError(err.message);
// //                 setLoading(false);
// //             }
// //         };
// //         fetchPet();
// //     }, []);

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormValues(prevValues => ({
// //             ...prevValues,
// //             [name]: value
// //         }));
// //     };

// //     const handleFileChange = (e) => {
// //         const file = e.target.files[0];
// //         setSelectedFile(file);
// //         setFormValues(prevValues => ({
// //             ...prevValues,
// //             petPhoto: file ? URL.createObjectURL(file) : ''
// //         }));
// //     };

// //     const handleMedicationChange = (index, e) => {
// //         const { name, value } = e.target;
// //         const newMedication = [...formValues.medication];
// //         newMedication[index] = {
// //             ...newMedication[index],
// //             [name]: value
// //         };
// //         setFormValues(prevValues => ({
// //             ...prevValues,
// //             medication: newMedication
// //         }));
// //     };

// //     const handleReminderChange = (index, e) => {
// //         const { name, value } = e.target;
// //         const newReminders = [...formValues.reminders];
// //         newReminders[index] = {
// //             ...newReminders[index],
// //             [name]: value
// //         };
// //         setFormValues(prevValues => ({
// //             ...prevValues,
// //             reminders: newReminders
// //         }));
// //     };

// //     const handleUpdate = async () => {
// //         try {
// //             const formData = new FormData();
// //             formData.append('petName', formValues.petName);
// //             formData.append('age', formValues.age);
// //             formData.append('gender', formValues.gender);
// //             formData.append('categories', formValues.categories);
// //             formData.append('breed', formValues.breed);
// //             formData.append('weight', formValues.weight);
// //             formData.append('medication', JSON.stringify(formValues.medication));
// //             formData.append('reminders', JSON.stringify(formValues.reminders));

// //             if (selectedFile) {
// //                 formData.append('petPhoto', selectedFile);
// //             }

// //             const response = await axios.put(`/pet/update/${pet._id}`, formData, {
// //                 headers: {
// //                     'Content-Type': 'multipart/form-data',
// //                     Authorization: localStorage.getItem('token'),
// //                 },
// //             });

// //             setPet(response.data);
// //             setIsEditing(false);
// //         } catch (error) {
// //             setError(error.message);
// //         }
// //     };

// //     if (loading) return <div>Loading...</div>;
// //     if (error) return <div>Error: {error}</div>;

// //     return (
// //         <div>
// //             <h2>Pet Details</h2>
// //             {pet ? (
// //                 <div className='pet-card'>
// //                     {pet.userId ? (
// //                         <>
// //                             <h3>Username: {pet.userId.username}</h3>
// //                             <p>Email: {pet.userId.email}</p>
// //                             <p>Phone: {pet.userId.phoneNumber}</p>
// //                         </>
// //                     ) : (
// //                         <p>User Information not available</p>
// //                     )}
// //                     {isEditing ? (
// //                         <div>
// //                             <label>Pet Name:</label><br/>
// //                             <input name="petName" value={formValues.petName} onChange={handleChange} /><br/>
// //                             <label>Age:</label><br/>
// //                             <input name="age" value={formValues.age} onChange={handleChange} /><br/>
// //                             <label>Gender:</label><br/>
// //                             <input name="gender" value={formValues.gender} onChange={handleChange} /><br/>
// //                             <label>Categories:</label><br/>
// //                             <input name="categories" value={formValues.categories} onChange={handleChange} /><br/>
// //                             <label>Breed:</label><br/>
// //                             <input name="breed" value={formValues.breed} onChange={handleChange} /><br/>
// //                             <label>Pet Photo:</label><br/>
// //                             <input type="file" name="petPhoto" onChange={handleFileChange} /><br/>
// //                             <label>Weight:</label><br/>
// //                             <input name="weight" value={formValues.weight} onChange={handleChange} /><br/>
                            
// //                             <h3>Medications:</h3>
// //                             {formValues.medication.map((med, index) => (
// //                                 <div key={index}>
// //                                     <label>Medication Name:</label><br/>
// //                                     <input name="medicationName" value={med.medicationName} onChange={(e) => handleMedicationChange(index, e)} /><br/>
// //                                     <label>Description:</label><br/>
// //                                     <input name="description" value={med.description} onChange={(e) => handleMedicationChange(index, e)} /><br/>
// //                                     <label>Due Date:</label><br/>
// //                                     <input name="dueDate" type="date" value={med.dueDate} onChange={(e) => handleMedicationChange(index, e)} /><br/>
// //                                     <label>Dose:</label><br/>
// //                                     <input name="dose" value={med.dose} onChange={(e) => handleMedicationChange(index, e)} /><br/>
// //                                 </div>
// //                             ))}
                            
// //                             <h3>Reminders:</h3>
// //                             {formValues.reminders.map((reminder, index) => (
// //                                 <div key={index}>
// //                                     <label>Date:</label><br/>
// //                                     <input name="date" type="date" value={reminder.date} onChange={(e) => handleReminderChange(index, e)} /><br/>
// //                                     <label>Title:</label><br/>
// //                                     <input name="title" value={reminder.title} onChange={(e) => handleReminderChange(index, e)} /><br/>
// //                                     <label>Note:</label><br/>
// //                                     <input name="note" value={reminder.note} onChange={(e) => handleReminderChange(index, e)} /><br/>
// //                                 </div>
// //                             ))}
                            
// //                             <button onClick={handleUpdate}>Update</button>
// //                             <button onClick={() => setIsEditing(false)}>Cancel</button>
// //                         </div>
// //                     ) : (
// //                         <div>
// //                             <h3>Pet Name: {pet.petName}</h3>
// //                             <p>Age: {pet.age}</p>
// //                             <p>Gender: {pet.gender}</p>
// //                             <p>Categories: {pet.categories}</p>
// //                             <p>Breed: {pet.breed}</p>
// //                             <div>
// //                                 <h3>Pet Photo</h3>
// //                                 <img src={pet.petPhoto} alt='Pet' style={{ maxWidth: '200px' }} />
// //                             </div>
// //                             <p>Weight: {pet.weight}</p>
// //                             {pet.medication && (
// //                                 <div>
// //                                     <h3>Medications:</h3>
// //                                     <ul>
// //                                         {pet.medication.map((med, index) => (
// //                                             <li key={index}>
// //                                                 <p>Medication Name: {med.medicationName}</p>
// //                                                 <p>Description: {med.description}</p>
// //                                                 <p>Due Date: {med.dueDate}</p>
// //                                                 <p>Dose: {med.dose}</p>
// //                                             </li>
// //                                         ))}
// //                                     </ul>
// //                                 </div>
// //                             )}
// //                             {pet.reminders && pet.reminders.length > 0 && (
// //                                 <div>
// //                                     <h3>Reminders:</h3>
// //                                     <ul>
// //                                         {pet.reminders.map((reminder, index) => (
// //                                             <li key={index}>
// //                                                 <p>Date: {reminder.date}</p>
// //                                                 <p>Title: {reminder.title}</p>
// //                                                 <p>Note: {reminder.note}</p>
// //                                             </li>
// //                                         ))}
// //                                     </ul>
// //                                 </div>
// //                             )}
// //                             <button onClick={() => setIsEditing(true)}>Update</button>
// //                         </div>
// //                     )}
// //                 </div>
// //             ) : (
// //                 <div>Pet not found</div>
// //             )}
// //         </div>
// //     );
// // }
// import React, { useEffect, useState } from 'react';
// import axios from '../../config/axios';

// export default function PetAccount() {
//   const [pet, setPet] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formValues, setFormValues] = useState({
//     petName: '',
//     age: '',
//     gender: '',
//     categories: '',
//     breed: '',
//     petPhoto: '',
//     weight: '',
//     medication: [],
//     reminders: []
//   });
//   const [selectedFile, setSelectedFile] = useState(null);

//   useEffect(() => {
//     const fetchPet = async () => {
//       try {
//         const response = await axios.get('/pet/singlePet', {
//           headers: {
//             Authorization: localStorage.getItem('token'),
//           },
//         });
//         setPet(response.data);
//         setFormValues({
//           petName: response.data.petName,
//           age: response.data.age,
//           gender: response.data.gender,
//           categories: response.data.categories,
//           breed: response.data.breed,
//           petPhoto: response.data.petPhoto,
//           weight: response.data.weight,
//           medication: response.data.medication,
//           reminders: response.data.reminders
//         });
//         console.log(response.data)
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };
//     fetchPet();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues(prevValues => ({
//       ...prevValues,
//       [name]: value
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedFile(file);
//     setFormValues(prevValues => ({
//       ...prevValues,
//       petPhoto: file ? URL.createObjectURL(file) : ''
//     }));
//   };

//   const handleMedicationChange = (index, e) => {
//     const { name, value } = e.target;
//     const newMedication = [...formValues.medication];
//     newMedication[index] = {
//       ...newMedication[index],
//       [name]: value
//     };
//     setFormValues(prevValues => ({
//       ...prevValues,
//       medication: newMedication
//     }));
//   };

//   const handleReminderChange = (index, e) => {
//     const { name, value } = e.target;
//     const newReminders = [...formValues.reminders];
//     newReminders[index] = {
//       ...newReminders[index],
//       [name]: value
//     };
//     setFormValues(prevValues => ({
//       ...prevValues,
//       reminders: newReminders
//     }));
//   };
  
//   const handleUpdate = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('petName', formValues.petName);
//       formData.append('age', formValues.age);
//       formData.append('gender', formValues.gender);
//       formData.append('categories', formValues.categories);
//       formData.append('breed', formValues.breed);
//       formData.append('weight', formValues.weight);
//       formData.append('medication', JSON.stringify(formValues.medication));
//       formData.append('reminders', JSON.stringify(formValues.reminders));
  
//       if (selectedFile) {
//         formData.append('petPhoto', selectedFile);
//       }
  
//       const response = await axios.put(`/pet/update/${pet._id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: localStorage.getItem('token'),
//         },
//       });
  
//       setPet(response.data);
//       setFormValues({
//         petName: response.data.petName,
//         age: response.data.age,
//         gender: response.data.gender,
//         categories: response.data.categories,
//         breed: response.data.breed,
//         petPhoto: response.data.petPhoto,
//         weight: response.data.weight,
//         medication: response.data.medication,
//         reminders: response.data.reminders
//       });
//       setIsEditing(false);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
  
//   return (
//     <div>
//       <h2>Pet Details</h2>
//       {pet ? (
//         <div className='pet-card'>
//           {pet.userId ? (
//             <>
//               <h3>Username: {pet.userId.username}</h3>
//               <p>Email: {pet.userId.email}</p>
//               <p>Phone: {pet.userId.phoneNumber}</p>
//             </>
//           ) : (
//             <p>User Information not available</p>
//           )}
          
//           {isEditing ? (
//             <div>
//               <label>Pet Name:</label><br/>
//               <input name="petName" value={formValues.petName} onChange={handleChange} /><br/>
//               <label>Age:</label><br/>
//               <input name="age" value={formValues.age} onChange={handleChange} /><br/>
//               <label>Gender:</label><br/>
//               <input name="gender" value={formValues.gender} onChange={handleChange} /><br/>
//               <label>Categories:</label><br/>
//               <input name="categories" value={formValues.categories} onChange={handleChange} /><br/>
//               <label>Breed:</label><br/>
//               <input name="breed" value={formValues.breed} onChange={handleChange} /><br/>
//               <label>Pet Photo:</label><br/>
//               <input type="file" name="petPhoto" onChange={handleFileChange} /><br/>
//               <label>Weight:</label><br/>
//               <input name="weight" value={formValues.weight} onChange={handleChange} /><br/>
              
//               <h3>Medications:</h3>
//               {formValues.medication.map((med, index) => (
//                 <div key={index}>
//                   <label>Medication Name:</label><br/>
//                   <input name="medicationName" value={med.medicationName} onChange={(e) => handleMedicationChange(index, e)} /><br/>
//                   <label>Description:</label><br/>
//                   <input name="description" value={med.description} onChange={(e) => handleMedicationChange(index, e)} /><br/>
//                   <label>Due Date:</label><br/>
//                   <input name="dueDate" type="date" value={med.dueDate} onChange={(e) => handleMedicationChange(index, e)} /><br/>
//                   <label>Dose:</label><br/>
//                   <input name="dose" value={med.dose} onChange={(e) => handleMedicationChange(index, e)} /><br/>
//                 </div>
//               ))}
              
//               <h3>Reminders:</h3>
//               {formValues.reminders.map((reminder, index) => (
//                 <div key={index}>
//                   <label>Date:</label><br/>
//                   <input name="date" type="date" value={reminder.date} onChange={(e) => handleReminderChange(index, e)} /><br/>
//                   <label>Title:</label><br/>
//                   <input name="title" value={reminder.title} onChange={(e) => handleReminderChange(index, e)} /><br/>
//                   <label>Note:</label><br/>
//                   <input name="note" value={reminder.note} onChange={(e) => handleReminderChange(index, e)} /><br/>
//                 </div>
//               ))}
              
//               <button onClick={handleUpdate}>Update</button>
//               <button onClick={() => setIsEditing(false)}>Cancel</button>
//             </div>
//           ) : (
//             <div>
//               <h3>Pet Name: {pet.petName}</h3>
//               <p>Age: {pet.age}</p>
//               <p>Gender: {pet.gender}</p>
//               <p>Categories: {pet.categories}</p>
//               <p>Breed: {pet.breed}</p>
//               <div>
//                 <h3>Pet Photo</h3>
//                 <img src={pet.petPhoto} alt='Pet' style={{ maxWidth: '200px' }} />
//               </div>
//               <p>Weight: {pet.weight}</p>
//               {pet.medication && (
//                 <div>
//                   <h3>Medications:</h3>
//                   <ul>
//                     {pet.medication.map((med, index) => (
//                       <li key={index}>
//                         <p>Medication Name: {med.medicationName}</p>
//                         <p>Description: {med.description}</p>
//                         <p>Due Date: {med.dueDate}</p>
//                         <p>Dose: {med.dose}</p>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//               {pet.reminders && pet.reminders.length > 0 && (
//                 <div>
//                   <h3>Reminders:</h3>
//                   <ul>
//                     {pet.reminders.map((reminder, index) => (
//                       <li key={index}>
//                         <p>Date: {reminder.date}</p>
//                         <p>Title: {reminder.title}</p>
//                         <p>Note: {reminder.note}</p>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//               <button onClick={() => setIsEditing(true)}>Update</button>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div>Pet not found</div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import axios from '../../config/axios';

export default function PetAccount() {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    petName: '',
    age: '',
    gender: '',
    categories: '',
    breed: '',
    petPhoto: '',
    weight: '',
    medication: [],
    reminders: []
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get('/pet/singlePet', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setPet(response.data);
        setFormValues({
          petName: response.data.petName,
          age: response.data.age,
          gender: response.data.gender,
          categories: response.data.categories,
          breed: response.data.breed,
          petPhoto: response.data.petPhoto,
          weight: response.data.weight,
          medication: response.data.medication,
          reminders: response.data.reminders
        });
        console.log(response.data)
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPet();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFormValues(prevValues => ({
      ...prevValues,
      petPhoto: file ? URL.createObjectURL(file) : ''
    }));
  };

  const handleMedicationChange = (index, e) => {
    const { name, value } = e.target;
    const newMedication = [...formValues.medication];
    newMedication[index] = {
      ...newMedication[index],
      [name]: value
    };
    setFormValues(prevValues => ({
      ...prevValues,
      medication: newMedication
    }));
  };

  const handleReminderChange = (index, e) => {
    const { name, value } = e.target;
    const newReminders = [...formValues.reminders];
    newReminders[index] = {
      ...newReminders[index],
      [name]: value
    };
    setFormValues(prevValues => ({
      ...prevValues,
      reminders: newReminders
    }));
  };
  
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('petName', formValues.petName);
      formData.append('age', formValues.age);
      formData.append('gender', formValues.gender);
      formData.append('categories', formValues.categories);
      formData.append('breed', formValues.breed);
      formData.append('weight', formValues.weight);
      formData.append('medication', JSON.stringify(formValues.medication));
      formData.append('reminders', JSON.stringify(formValues.reminders));
  
      if (selectedFile) {
        formData.append('petPhoto', selectedFile);
      }
  
      const response = await axios.put(`/pet/update/${pet._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('token'),
        },
      });
  
      setPet(response.data);
      setFormValues({
        petName: response.data.petName,
        age: response.data.age,
        gender: response.data.gender,
        categories: response.data.categories,
        breed: response.data.breed,
        petPhoto: response.data.petPhoto,
        weight: response.data.weight,
        medication: response.data.medication,
        reminders: response.data.reminders
      });
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      try {
        await axios.delete(`/pet/delete/${pet._id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        window.location.href = '/pets';
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h2>Pet Details</h2>
      {pet ? (
        <div className='pet-card'>          
        {pet.userId ? (
            <>
              <h3>Username: {pet.userId.username}</h3>
              <p>Email: {pet.userId.email}</p>
              <p>Phone: {pet.userId.phoneNumber}</p>
            </>
          ) : (
            <p>User Information not available</p>
          )}
          
          {isEditing ? (
            <div>
              <label>Pet Name:</label><br/>
              <input name="petName" value={formValues.petName} onChange={handleChange} /><br/>
              <label>Age:</label><br/>
              <input name="age" value={formValues.age} onChange={handleChange} /><br/>
              <label>Gender:</label><br/>
              <input name="gender" value={formValues.gender} onChange={handleChange} /><br/>
              <label>Categories:</label><br/>
              <input name="categories" value={formValues.categories} onChange={handleChange} /><br/>
              <label>Breed:</label><br/>
              <input name="breed" value={formValues.breed} onChange={handleChange} /><br/>
              <label>Pet Photo:</label><br/>
              <input type="file" name="petPhoto" onChange={handleFileChange} /><br/>
              <label>Weight:</label><br/>
              <input name="weight" value={formValues.weight} onChange={handleChange} /><br/>
              
              <h3>Medications:</h3>
              {formValues.medication.map((med, index) => (
                <div key={index}>
                  <label>Medication Name:</label><br/>
                  <input name="medicationName" value={med.medicationName} onChange={(e) => handleMedicationChange(index, e)} /><br/>
                  <label>Description:</label><br/>
                  <input name="description" value={med.description} onChange={(e) => handleMedicationChange(index, e)} /><br/>
                  <label>Due Date:</label><br/>
                  <input name="dueDate" type="date" value={med.dueDate} onChange={(e) => handleMedicationChange(index, e)} /><br/>
                  <label>Dose:</label><br/>
                  <input name="dose" value={med.dose} onChange={(e) => handleMedicationChange(index, e)} /><br/>
                </div>
              ))}
              
              <h3>Reminders:</h3>
              {formValues.reminders.map((reminder, index) => (
                <div key={index}>
                  <label>Date:</label><br/>
                  <input name="date" type="date" value={reminder.date} onChange={(e) => handleReminderChange(index, e)} /><br/>
                  <label>Title:</label><br/>
                  <input name="title" value={reminder.title} onChange={(e) => handleReminderChange(index, e)} /><br/>
                  <label>Note:</label><br/>
                  <input name="note" value={reminder.note} onChange={(e) => handleReminderChange(index, e)} /><br/>
                </div>
              ))}
              
              <button onClick={handleUpdate}>Update</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <div>
              <h3>Pet Name: {pet.petName}</h3>
              <p>Age: {pet.age}</p>
              <p>Gender: {pet.gender}</p>
              <p>Categories: {pet.categories}</p>
              <p>Breed: {pet.breed}</p>
              <div>
                <h3>Pet Photo</h3>
                <img src={pet.petPhoto} alt='Pet' style={{ maxWidth: '200px' }} />
              </div>
              <p>Weight: {pet.weight}</p>
              {pet.medication && (
                <div>
                  <h3>Medications:</h3>
                  <ul>
                    {pet.medication.map((med, index) => (
                      <li key={index}>
                        <p>Medication Name: {med.medicationName}</p>
                        <p>Description: {med.description}</p>
                        <p>Due Date: {med.dueDate}</p>
                        <p>Dose: {med.dose}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {pet.reminders && pet.reminders.length > 0 && (
                <div>
                  <h3>Reminders:</h3>
                  <ul>
                    {pet.reminders.map((reminder, index) => (
                      <li key={index}>
                        <p>Date: {reminder.date}</p>
                        <p>Title: {reminder.title}</p>
                        <p>Note: {reminder.note}</p>
                        </li>
                    ))}
                  </ul>
                </div>
              )}
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      ) : (
        <p>Pet not found</p>
      )}
    </div>
  );
}

