//frontend/src/pages/SeatSelect.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import bg from "../assets/bg.jpeg"

export default function SeatSelect() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = useAuth();

  const travelDate = state?.travelDate; // ✅ DATE FROM HOME

  const [bus, setBus] = useState(null);
  const [selected, setSelected] = useState([]);

  // Block direct access (No date)
  useEffect(() => {
    if (!travelDate) {
      toast.error("Please select date from Home page");
      navigate("/");
    }
  }, [travelDate, navigate]);

  //Fetch bus data
  useEffect(() => {
    api.get(`/buses/${id}`).then(res => setBus(res.data)).catch(() => toast.error("Bus not found"));
  }, [id]);

  const toggleSeat = (seatNo) => {
    if (!user) {
      toast.error("Please login to book seats");
      return;
    }

    if (selected.includes(seatNo)) {
      setSelected(selected.filter(s => s !== seatNo));
    } else {
      if (selected.length >= 5) {
        toast.error("Maximum 5 seats only");
        return;
      }
      setSelected([...selected, seatNo]);
    }
  };

  const proceed = () => {
    if (!user) {
      toast.error("Login required");
      return;
    }
    if (selected.length === 0) {
      toast.error("Select at least one seat");
      return;
    }

    navigate("/payment", {
      state: {
        busId: bus._id,
        busName: bus.name,
        travelDate,
        selected: selected,
        totalAmount: selected.length * bus.price
      }
    });
  };

  if (!bus) return null;

  return (
    <div
      className="min-h-screen bg-cover bg-center pt-10 pb-5 px-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-2xl mx-auto bg-white/90 rounded-xl p-6 shadow">
        {/* HEADER */}
        <h1 className="text-2xl font-bold text-center mb-2">
          Select Your Seats
        </h1>
        <p className="text-center text-red-700 mb-6">
          {bus.name} • {travelDate}
        </p>

        {/* DRIVER */}
        <div className="flex justify-center mb-6">
          <span className="px-4 py-2 bg-black text-white rounded-full text-sm">
            Driver
          </span>
        </div>

        {/* SEAT GRID */}
        <div className="grid grid-cols-4 gap-3 justify-items-center">
          {bus.seats.map(seat => {
            const isSelected = selected.includes(seat.seatNumber);
            const isBooked = seat.isBooked;

            return (
              <button
                key={seat.seatNumber}
                disabled={seat.isBooked}
                onClick={() => toggleSeat(seat.seatNumber)}
                className={`
    border w-14 h-14 rounded font-semibold
    ${seat.isBooked
                    ? "bg-red-500 text-white cursor-not-allowed"
                    : selected.includes(seat.seatNumber)
                      ? "bg-green-500 text-white"
                      : "bg-white text-gray-800 hover:bg-gray-100"
                  }
  `}
              >
                {seat.seatNumber}
              </button>
            );
          })}
        </div>

        {/* SUMMARY */}
        <div className="mt-6 text-center">
          <p className="font-medium">
            Selected Seats:{" "}
            <span className="font-bold">
              {selected.length ? selected.join(", ") : "None"}
            </span>
          </p>

          <p className="mt-2 text-lg font-semibold">
            Total Price: ₹{selected.length * bus.price}
          </p>

          <button
            onClick={proceed}
            className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}