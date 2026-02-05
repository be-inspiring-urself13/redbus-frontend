// // frontend/src/pages/PassengerInfo.jsx
// import { useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import bg from "../assets/bg.jpeg";

// export default function PassengerInfo() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   if (!state) return <p>Invalid access</p>;

//   const { busId, busName, travelDate, selected, totalAmount, from, to } = state;

//   /* ================= CONTACT ================= */
//   const [contact, setContact] = useState({
//     phone: "",
//     email: "",
//     city: ""
//   });

//   /* ================= PASSENGER ================= */
//   const [passenger, setPassenger] = useState({
//     name: "",
//     age: "",
//     gender: ""
//   });

//   /* 🔥 AUTO-FILL FROM localStorage */
//   useEffect(() => {
//     const savedPassenger = JSON.parse(localStorage.getItem("passengerInfo"));
//     const savedContact = JSON.parse(localStorage.getItem("contactInfo"));

//     if (savedPassenger) setPassenger(savedPassenger);
//     if (savedContact) setContact(savedContact);
//   }, []);

//   const handleSubmit = () => {
//     if (!contact.phone || !contact.email) {
//       toast.error("Contact details required");
//       return;
//     }

//     if (!passenger.name || !passenger.age || !passenger.gender) {
//       toast.error("Passenger details required");
//       return;
//     }

//     // 🔐 SAVE FOR NEXT BOOKINGS
//     localStorage.setItem("passengerInfo", JSON.stringify(passenger));
//     localStorage.setItem("contactInfo", JSON.stringify(contact));

//     // 🔐 Save passenger email for auth flow
//     localStorage.setItem("passengerEmail", contact.email);

//     navigate("/payment", {
//       state: {
//         busId,
//         busName,
//         travelDate,
//         selected,
//         passenger,
//         contact,
//         totalAmount,
//         from,
//         to
//       }
//     });
//   };

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center py-10 px-4"
//       style={{ backgroundImage: `url(${bg})` }}
//     >
//       <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">

//         <h2 className="text-xl font-bold mb-6 text-center">
//           Passenger Information
//         </h2>

//         {/* ================= CONTACT DETAILS ================= */}
//         <h3 className="font-semibold mb-2">Contact Details</h3>

//         <input
//           placeholder="Phone number"
//           className="border p-2 w-full mb-3 rounded"
//           value={contact.phone}
//           onChange={e =>
//             setContact({ ...contact, phone: e.target.value })
//           }
//         />

//         <input
//           placeholder="Email ID"
//           className="border p-2 w-full mb-3 rounded"
//           value={contact.email}
//           onChange={e =>
//             setContact({ ...contact, email: e.target.value })
//           }
//         />

//         <input
//           placeholder="City (optional)"
//           className="border p-2 w-full mb-6 rounded"
//           value={contact.city}
//           onChange={e =>
//             setContact({ ...contact, city: e.target.value })
//           }
//         />

//         {/* ================= PASSENGER DETAILS ================= */}
//         <h3 className="font-semibold mb-2">Passenger Details</h3>

//         <div className="mb-4 text-sm text-gray-700">
//           <b>Seats:</b> {selected.join(", ")}
//         </div>

//         <input
//           placeholder="Passenger Name"
//           className="border p-2 w-full mb-3 rounded"
//           value={passenger.name}
//           onChange={e =>
//             setPassenger({ ...passenger, name: e.target.value })
//           }
//         />

//         <input
//           type="number"
//           placeholder="Age"
//           className="border p-2 w-full mb-3 rounded"
//           value={passenger.age}
//           onChange={e =>
//             setPassenger({ ...passenger, age: e.target.value })
//           }
//         />

//         <select
//           className="border p-2 w-full mb-6 rounded"
//           value={passenger.gender}
//           onChange={e =>
//             setPassenger({ ...passenger, gender: e.target.value })
//           }
//         >
//           <option value="">Gender</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>

//         <button
//           onClick={handleSubmit}
//           className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold"
//         >
//           Proceed to Payment
//         </button>
//       </div>
//     </div>
//   );
// }


// frontend/src/pages/PassengerInfo.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import bg from "../assets/bg.jpeg";

export default function PassengerInfo() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>Invalid access</p>;

  const { busId, busName, travelDate, selected, totalAmount, from, to } = state;

  /* ================= CONTACT ================= */
  const [contact, setContact] = useState({
    phone: "",
    email: "",
    city: ""
  });

  /* ================= PASSENGER ================= */
  const [passenger, setPassenger] = useState({
    name: "",
    age: "",
    gender: ""
  });

  /* =================================================
     AUTO-FILL ONLY IF USER IS LOGGED IN
  ================================================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return; // ❌ guest user → no autofill

    const savedPassenger = JSON.parse(localStorage.getItem("passengerInfo"));
    const savedContact = JSON.parse(localStorage.getItem("contactInfo"));

    if (savedPassenger) setPassenger(savedPassenger);
    if (savedContact) setContact(savedContact);
  }, []);

  /* ================= SUBMIT ================= */
  const handleSubmit = () => {
    if (!contact.phone || !contact.email) {
      toast.error("Contact details required");
      return;
    }

    if (!passenger.name || !passenger.age || !passenger.gender) {
      toast.error("Passenger details required");
      return;
    }

    const token = localStorage.getItem("token");

    // 🔐 SAVE ONLY FOR LOGGED-IN USERS
    if (token) {
      localStorage.setItem("passengerInfo", JSON.stringify(passenger));
      localStorage.setItem("contactInfo", JSON.stringify(contact));
    }

    // used for login validation flow
    localStorage.setItem("passengerEmail", contact.email);

    navigate("/payment", {
      state: {
        busId,
        busName,
        travelDate,
        selected,
        passenger,
        contact,
        totalAmount,
        from,
        to
      }
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-10 px-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-xl font-bold mb-6 text-center">
          Passenger Information
        </h2>

        {/* ================= CONTACT DETAILS ================= */}
        <h3 className="font-semibold mb-2">Contact Details</h3>

        <input
          value={contact.phone}
          placeholder="Phone number"
          className="border p-2 w-full mb-3 rounded"
          onChange={e => setContact({ ...contact, phone: e.target.value })}
        />

        <input
          value={contact.email}
          placeholder="Email ID"
          className="border p-2 w-full mb-3 rounded"
          onChange={e => setContact({ ...contact, email: e.target.value })}
        />

        <input
          value={contact.city}
          placeholder="City (optional)"
          className="border p-2 w-full mb-6 rounded"
          onChange={e => setContact({ ...contact, city: e.target.value })}
        />

        {/* ================= PASSENGER DETAILS ================= */}
        <h3 className="font-semibold mb-2">Passenger Details</h3>

        <div className="mb-4 text-sm text-gray-700">
          <b>Seats:</b> {selected.join(", ")}
        </div>

        <input
          value={passenger.name}
          placeholder="Passenger Name"
          className="border p-2 w-full mb-3 rounded"
          onChange={e => setPassenger({ ...passenger, name: e.target.value })}
        />

        <input
          type="number"
          value={passenger.age}
          placeholder="Age"
          className="border p-2 w-full mb-3 rounded"
          onChange={e => setPassenger({ ...passenger, age: e.target.value })}
        />

        <select
          value={passenger.gender}
          className="border p-2 w-full mb-6 rounded"
          onChange={e => setPassenger({ ...passenger, gender: e.target.value })}
        >
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <button
          onClick={handleSubmit}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}