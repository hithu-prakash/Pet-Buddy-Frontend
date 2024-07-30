// // import React, { useState } from 'react';
// // import axios from '../../config/axios'; // Adjust the path as needed
// // import { useNavigate } from 'react-router-dom';

// // export default function PetForm() {
// //   const [formData, setFormData] = useState({
// //     petName: '',
// //     age: '',
// //     gender: '',
// //     categories: '',
// //     breed: '',
// //     petPhoto: '',
// //     weight: '',
// //     vaccinated: false,
// //     medication: {
// //       medicationName: '',
// //       description: '',
// //       dueDate: '',
// //       dose: ''
// //     },
// //     reminders: {
// //       date: '',
// //       title: '',
// //       note: ''
// //     },
// //   });
// //   const [error, setError] = useState(null);
// //   const [showMedicationDetails, setShowMedicationDetails] = useState(false);

// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     if (type === 'checkbox') {
// //       setFormData({ ...formData, [name]: checked });
// //     } else if (name.includes('.')) {
// //       const [address, street] = name.split('.');
// //       setFormData({
// //         ...formData,
// //         [address]: { ...formData[address], [street]: value },
// //       });
// //     } else {
// //       setFormData({ ...formData, [name]: value });
// //     }
// //   }

// //   const handleToggleMedicationDetails = () => {
// //     setShowMedicationDetails(!showMedicationDetails);
// //   }
  
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response= await axios.post('/pet/create', formData, {
// //         headers: {
// //           Authorization: localStorage.getItem('token'),
// //         }
// //       });
// //       console.log(response.data)
// //       navigate('/'); // Redirect to home or another page after successful submission
// //     } catch (err) {
// //       setError(err.response?.data?.message || 'An error occurred');
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>Enter Pet Details</h1>
// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label>Pet Name:</label>
// //           <input
// //             type="text"
// //             name="petName"
// //             value={formData.petName}
// //             onChange={handleChange}   /> <br />
// //         </div> <br />
// //         <div>
// //           <label>Age:</label>
// //           <input
// //             type="date"
// //             name="age"
// //             value={formData.age.split('T')[0]} // Format date for input
// //             onChange={handleChange}
// //           /> <br />
// //         </div> <br />
// //         <div>
// //           <label>Gender:</label>

// //             <input
// //               type="radio"
// //               name="gender"
// //               value="Male"
// //               checked={formData.gender === 'Male'}
// //               onChange={handleChange}
// //             /> 
// //             <label>Male</label>
          
         
// //             <input
// //               type="radio"
// //               name="gender"
// //               value="Female"
// //               checked={formData.gender === 'Female'}
// //               onChange={handleChange}
// //             />
// //             <label>Female</label>
          
// //         </div><br />
// //         <div>
// //   <label>Categories:</label>
  
// //     <input
// //       type="radio"
// //       name="categories"
// //       value="Cat"
// //       checked={formData.categories === 'Cat'}
// //       onChange={handleChange}
// //     />
// //     <label>Cat</label>
  
 
// //     <input
// //       type="radio"
// //       name="categories"
// //       value="Dog"
// //       checked={formData.categories === 'Dog'}
// //       onChange={handleChange}
// //     />
// //     <label>Dog</label>
 
// // </div> <br />
// //         <div>
// //           <label>Breed:</label>
// //           <input
// //             type="text"
// //             name="breed"
// //             value={formData.breed}
// //             onChange={handleChange}
// //           />
// //         </div><br />
// //         <div>
// //           <label>Pet Photo:</label>
// //           <input
// //             type="file"
// //             name="petPhoto"
// //             value={formData.petPhoto}
// //             onChange={handleChange}
// //           />
// //         </div><br />
// //         <div>
// //           <label>Weight:</label>
// //           <input
// //             type="text"
// //             name="weight"
// //             value={formData.weight}
// //             onChange={handleChange}
// //           />
// //         </div><br />
// //         <div>
// //   <label>Vaccinated:</label>
// //   <input
// //     type="radio"
// //     name="vaccinated"
// //     value="Yes"
// //     checked={formData.vaccinated === 'Yes'}
// //     onChange={handleChange}
// //   />
// //   <label>Yes</label>

// //   <input
// //     type="radio"
// //     name="vaccinated"
// //     value="No"
// //     checked={formData.vaccinated === 'No'}
// //     onChange={handleChange}
// //   />
// //   <label>No</label>
// // </div> <br />

// //         <input
// //             type="checkbox"
// //             name="medication"
// //             checked={showMedicationDetails}
// //             onChange={handleToggleMedicationDetails}
// //           /> 
// //           <div>
// //           <label>Categories:</label>
// //           {/* Add categories input field here */}
// //         </div>
// //         <br />
// //         <input
// //           type="checkbox"
// //           name="showMedicationDetails"
// //           checked={showMedicationDetails}
// //           onChange={handleToggleMedicationDetails}
// //         />
// //         <label>Show Medication Details</label>
// //         {showMedicationDetails && (
// //           <div>
// //               <label>Medication Name:</label>
// //               <input
// //                 type="text"
// //                 name="medication.medicationName"
// //                 value={formData.medication.medicationName}
// //                 onChange={handleChange}
// //               />
      
        
// //           <div>
// //             <label>Description:</label>
// //             <input
// //               type="text"
// //               name="medication.description"
// //               value={formData.medication.description}
// //               onChange={handleChange}
// //             />
// //           </div> <br />
// //           <div>
// //             <label>Due Date:</label>
// //             <input
// //               type="date"
// //               name="medication.dueDate"
// //               value={formData.medication.dueDate.split('T')[0]} // Format date for input
// //               onChange={handleChange}
// //             />
// //           </div> <br />
// //           <div>
// //             <label>Dose:</label>
// //             <input
// //               type="text"
// //               name="medication.dose"
// //               value={formData.medication.dose}
// //               onChange={handleChange}
// //             />
// //           </div> <br />
// //           <label> <h4>Remainders</h4></label>
       
// //          <div>
// //             <label>Date:</label>
// //             <input
// //               type="date"
// //               name="reminders.date"
// //               value={formData.reminders.date.split('T')[0]} // Format date for input
// //               onChange={handleChange}
// //             />
// //           </div> <br />
// //           <div>
// //             <label>Title:</label>
// //             <input
// //               type="text"
// //               name="reminders.title"
// //               value={formData.reminders.title}
// //               onChange={handleChange}
// //             />
// //           </div> <br />
// //           <div>
// //             <label>Note:</label>
// //             <textarea
// //               name="reminders.note"
// //               value={formData.reminders.note}
// //               onChange={handleChange}
// //             />
// //           </div> <br />
        
// //         <button type="submit">Submit</button>
// //       </form>
// //       {error && <div style={{ color: 'red' }}>{error}</div>}
// //     </div>
// //   );
// // }

// import React, { useState } from 'react';
// import axios from '../../config/axios'; // Adjust the path as needed
// import { useNavigate } from 'react-router-dom';

// export default function PetForm() {
//   const [formData, setFormData] = useState({
//     petName: '',
//     age: '',
//     gender: '',
//     categories: '',
//     breed: '',
//     petPhoto: '',
//     weight: '',
//     vaccinated: false,
//     medication: [{
//       medicationName: '',
//       description: '',
//       dueDate: '',
//       dose: '',
//     }],
//     reminders: [{
//       date: '',
//       title: '',
//       note: '',
//     }],
//   });
  
//   const [error, setError] = useState(null);
//   const [showMedicationDetails, setShowMedicationDetails] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === 'checkbox') {
//       setFormData((prev) => ({ ...prev, [name]: checked }));
//     } else if (name.includes('.')) {
//       const [address, field] = name.split('.');
//       setFormData((prev) => ({
//         ...prev,
//         [address]: { ...prev[address], [field]: value },
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleToggleMedicationDetails = () => {
//     setShowMedicationDetails((prev) => !prev);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Create a FormData instance
//     const formDataToSend = new FormData();
  
//     // Append form fields to FormData
//     for (const key in formData) {
//       if (Array.isArray(formData[key])) {
//         formData[key].forEach((item, index) => {
//           for (const subKey in item) {
//             formDataToSend.append(`${key}[${index}][${subKey}]`, item[subKey]);
//           }
//         });
//       } else {
//         formDataToSend.append(key, formData[key]);
//       }
//     }
  
//     try {
//       const response = await axios.post('/pet/create', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data', // Important for file uploads
//           Authorization: localStorage.getItem('token'),
//         },
//       });
//       console.log(response.data);
//       navigate('/'); // Redirect to home or another page after successful submission
//     } catch (err) {
//       setError(err.response?.data?.message || 'An error occurred');
//     }
//   };
  
  

//   return (
//     <div>
//       <h1>Enter Pet Details</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Pet Name:</label>
//           <input
//             type="text"
//             name="petName"
//             value={formData.petName}
//             onChange={handleChange}
//           />
//         </div>
//         <br />
//         <div>
//           <label>Age:</label>
//           <input
//             type="date"
//             name="age"
//             value={formData.age ? formData.age.split('T')[0] : ''} // Format date for input
//             onChange={handleChange}
//           />
//         </div>
//         <br />
//         <div>
//           <label>Gender:</label>
//           <input
//             type="radio"
//             name="gender"
//             value="Male"
//             checked={formData.gender === 'Male'}
//             onChange={handleChange}
//           />
//           <label>Male</label>
//           <input
//             type="radio"
//             name="gender"
//             value="Female"
//             checked={formData.gender === 'Female'}
//             onChange={handleChange}
//           />
//           <label>Female</label>
//         </div>
//         <br />
//         <div>
//         <label>Categories:</label>
  
//      <input
//          type="radio"
//          name="categories"
//          value="Cat"
//          checked={formData.categories === 'Cat'}
//          onChange={handleChange}
//        />
//        <label>Cat</label>
    
   
//        <input
//          type="radio"
//          name="categories"
//          value="Dog"
//          checked={formData.categories === 'Dog'}
//          onChange={handleChange}
//        />
//        <label>Dog</label>
   
//    </div> <br />
//            <div>
//              <label>Breed:</label>
//              <input
//                type="text"
//                name="breed"
//                value={formData.breed}
//                onChange={handleChange}
//              />
//            </div><br />
//            <div>
//            <label>Pet Photo:</label>
//            <input
//              type="file"
//              name="petPhoto"
//             value={formData.petPhoto}
//              onChange={handleChange}
//            />
//          </div><br />
//          <div>
//            <label>Weight:</label>
//            <input
//              type="number"
//              name="weight"
//              value={formData.weight}
//              onChange={handleChange}
//            />
//          </div><br />
//            <div>
//   <label>Vaccinated:</label>
//   <input
//     type="radio"
//     name="vaccinated"
//     value="Yes"
//     checked={formData.vaccinated === 'Yes'}
//     onChange={handleChange}
//   />
//   <label>Yes</label>
//   <input
//     type="radio"
//     name="vaccinated"
//     value="No"
//     checked={formData.vaccinated === 'No'}
//     onChange={handleChange}
//   />
//   <label>No</label>
// </div>
//         <br />
//         <div>
//           <input
//             type="checkbox"
//             checked={showMedicationDetails}
//             onChange={handleToggleMedicationDetails}
//           />
//           <label>Show Medication Details</label>
//         </div>
//         {showMedicationDetails && (
//           <div>
//             <h3>Medication Details</h3>
//             <div>
//               <label>Medication Name:</label>
//               <input
//                 type="text"
//                 name="medication.medicationName"
//                 value={formData.medication.medicationName}
//                 onChange={handleChange}
//               />
//             </div>
//             <br />
//             <div>
//               <label>Description:</label>
//               <input
//                 type="text"
//                 name="medication.description"
//                 value={formData.medication.description}
//                 onChange={handleChange}
//               />
//             </div>
//             <br />
//             <div>
//               <label>Due Date:</label>
//               <input
//                 type="date"
//                 name="medication.dueDate"
//                 value={formData.medication[0]?.dueDate ? formData.medication[0].dueDate.split('T')[0] : ''}
//                 onChange={handleChange}
//               />
//             </div>
//             <br />
//             <div>
//               <label>Dose:</label>
//               <input
//                 type="text"
//                 name="medication.dose"
//                 value={formData.medication.dose}
//                 onChange={handleChange}
//               />
//             </div>
//             <br />
//           </div>
//         )}
//         <div>
//           <h4>Reminders</h4>
//           <div>
//             <label>Date:</label>
//             <input
//               type="date"
//               name="reminders.date"
//               value={formData.reminders[0]?.date ? formData.reminders[0].date.split('T')[0] : ''} // Format date for input
//               onChange={handleChange}
//             />
//           </div>
//           <br />
//           <div>
//             <label>Title:</label>
//             <input
//               type="text"
//               name="reminders.title"
//               value={formData.reminders.title}
//               onChange={handleChange}
//             />
//           </div>
//           <br />
//           <div>
//             <label>Note:</label>
//             <textarea
//               name="reminders.note"
//               value={formData.reminders.note}
//               onChange={handleChange}
//             />
//           </div>
//           <br />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//       {error && <div style={{ color: 'red' }}>{error}</div>}
//     </div>
//   );
// }


import React, { useState } from 'react';
import axios from '../../config/axios'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';

export default function PetForm() {
  const [formData, setFormData] = useState({
    petName: '',
    age: '',
    gender: '',
    categories: '',
    breed: '',
    petPhoto: null, // Use null initially
    weight: '',
    vaccinated: false,
    medication: [{ medicationName: '', description: '', dueDate: '', dose: '' }],
    reminders: [{ date: '', title: '', note: '' }],
  });
  
  const [error, setError] = useState(null);
  const [showMedicationDetails, setShowMedicationDetails] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else if (name.includes('.')) {
      const [address, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [address]: prev[address].map((item, index) =>
          index === 0 ? { ...item, [field]: value } : item
        ),
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleToggleMedicationDetails = () => {
    setShowMedicationDetails(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
  
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item, index) => {
          for (const subKey in item) {
            formDataToSend.append(`${key}[${index}][${subKey}]`, item[subKey]);
          }
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }
  
    try {
      const response = await axios.post('/pet/create', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: localStorage.getItem('token'),
        },
      });
      console.log(response.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div>
      <h1>Enter Pet Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pet Name:</label>
          <input
            type="text"
            name="petName"
            value={formData.petName}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label>Age:</label>
          <input
            type="date"
            name="age"
            value={formData.age ? formData.age.split('T')[0] : ''}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label>Gender:</label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === 'Male'}
            onChange={handleChange}
          />
          <label>Male</label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === 'Female'}
            onChange={handleChange}
          />
          <label>Female</label>
        </div>
        <br />
        <div>
          <label>Categories:</label>
          <input
            type="radio"
            name="categories"
            value="Cat"
            checked={formData.categories === 'Cat'}
            onChange={handleChange}
          />
          <label>Cat</label>
          <input
            type="radio"
            name="categories"
            value="Dog"
            checked={formData.categories === 'Dog'}
            onChange={handleChange}
          />
          <label>Dog</label>
        </div>
        <br />
        <div>
          <label>Breed:</label>
          <input
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label>Pet Photo:</label>
          <input
            type="file"
            name="petPhoto"
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label>Weight:</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label>Vaccinated:</label>
          <input
            type="radio"
            name="vaccinated"
            value="Yes"
            checked={formData.vaccinated === 'Yes'}
            onChange={handleChange}
          />
          <label>Yes</label>
          <input
            type="radio"
            name="vaccinated"
            value="No"
            checked={formData.vaccinated === 'No'}
            onChange={handleChange}
          />
          <label>No</label>
        </div>
        <br />
        <div>
          <input
            type="checkbox"
            checked={showMedicationDetails}
            onChange={handleToggleMedicationDetails}
          />
          <label>Show Medication Details</label>
        </div>
        {showMedicationDetails && (
          <div>
            <h3>Medication Details</h3>
            <div>
              <label>Medication Name:</label>
              <input
                type="text"
                name="medication[0].medicationName"
                value={formData.medication[0].medicationName}
                onChange={handleChange}
              />
            </div>
            <br />
            <div>
              <label>Description:</label>
              <input
                type="text"
                name="medication[0].description"
                value={formData.medication[0].description}
                onChange={handleChange}
              />
            </div>
            <br />
            <div>
              <label>Due Date:</label>
              <input
                type="date"
                name="medication[0].dueDate"
                value={formData.medication[0]?.dueDate ? formData.medication[0].dueDate.split('T')[0] : ''}
                onChange={handleChange}
              />
            </div>
            <br />
            <div>
              <label>Dose:</label>
              <input
                type="text"
                name="medication[0].dose"
                value={formData.medication[0].dose}
                onChange={handleChange}
              />
            </div>
            <br />
          </div>
        )}
        <div>
          <h4>Reminders</h4>
          <div>
            <label>Date:</label>
            <input
              type="date"
              name="reminders[0].date"
              // value={formData.reminders[0]?.date ? formData.reminders[0].date.split('T')[0] : ''}
              onChange={handleChange}
            />
          </div>
          <br />
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="reminders[0].title"
              value={formData.reminders[0].title}
              onChange={handleChange}
            />
          </div>
          <br />
          <div>
            <label>Note:</label>
            <textarea
              name="reminders[0].note"
              value={formData.reminders[0].note}
              onChange={handleChange}
            />
          </div>
          <br />
        </div>
        <button type="submit">Submit</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}
