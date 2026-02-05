import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import bg from "../assets/bg.jpeg";

export default function PassengerInfo() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>Invalid access</p>;

  const { busId, busName, travelDate, selected, totalAmount, from, to } = state;

  const isLoggedIn = !!localStorage.getItem("token");

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

  /* ================= AUTO FILL (ONLY IF LOGGED IN) ================= */
  useEffect(() => {
    if (!isLoggedIn) return;

    try {
      const savedPassenger = localStorage.getItem("passengerInfo");
      const savedContact = localStorage.getItem("contactInfo");

      if (savedPassenger) {
        setPassenger(JSON.parse(savedPassenger)); // ✅ ONLY ONCE
      }

      if (savedContact) {
        setContact(JSON.parse(savedContact)); // ✅ ONLY ONCE
      }
    } catch (err) {
      console.error("Passenger autofill error", err);

      // safety cleanup
      localStorage.removeItem("passengerInfo");
      localStorage.removeItem("contactInfo");
    }
  }, [isLoggedIn]);

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

    // 🔐 TEMP SAVE (IMPORTANT)
    localStorage.setItem("passengerInfo_temp", JSON.stringify(passenger));
    localStorage.setItem("contactInfo_temp", JSON.stringify(contact));

    // for login validation
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

        {/* CONTACT */}
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

        {/* PASSENGER */}
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