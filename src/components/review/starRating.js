import { useState } from "react";

const StarRating = ({ onChange }) => {
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    onChange(value);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onClick={() => handleClick(value)}
          style={{
            cursor: "pointer",
            color: value <= rating ? "gold" : "gray",
            margin: "2px",
            fontSize: "30px",
          }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;

// import React, { useState, useEffect } from 'react';

// const StarRating = ({ rating = 0, onChange, editable = false }) => {
//   const [currentRating, setCurrentRating] = useState(rating);

//   useEffect(() => {
//     setCurrentRating(rating);
//   }, [rating]);

//   const handleClick = (value) => {
//     if (editable) {
//       setCurrentRating(value);
//       onChange(value);
//     }
//   };

//   return (
//     <div>
//       {[1, 2, 3, 4, 5].map((value) => (
//         <span
//           key={value}
//           onClick={() => handleClick(value)}
//           style={{
//             cursor: editable ? 'pointer' : 'default',
//             color: value <= currentRating ? 'gold' : 'gray',
//             margin: '2px',
//             fontSize: '30px',
//           }}
//         >
//           &#9733;
//         </span>
//       ))}
//     </div>
//   );
// };

// export default StarRating;
