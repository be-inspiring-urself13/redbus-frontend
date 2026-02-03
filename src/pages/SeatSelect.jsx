//frontend/src/pages/SeatSelect.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import bg from "../assets/bg.jpeg";

// ===== SVGs =====
const SeatIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M7 18v-6.5a1.5 1.5 0 0 0-3 0V16a2 2 0 0 0 2 2z" />
    <path d="M20 16v-4.5a1.5 1.5 0 0 0-3 0V18h1a2 2 0 0 0 2-2" />
    <path d="M7 14h10v4H7z" />
    <path d="M9.5 22v-4h5v4" />
    <path d="M7 22h10" />
    <path d="M18.5 10V8c0-2.8 0-4.2-.9-5.1C16.7 2 15.3 2 12.5 2h-1c-2.8 0-4.2 0-5.1.9C5.5 3.8 5.5 5.2 5.5 8v2" />
  </svg>
);

// const SeatIcon = ({ className }) => (
//   <svg
//     viewBox="0 0 64 64"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     {/* Backrest */}
//     <rect x="18" y="6" width="28" height="28" rx="6" />

//     {/* Seat base */}
//     <rect x="14" y="34" width="36" height="14" rx="4" />

//     {/* Left arm */}
//     <rect x="8" y="22" width="6" height="20" rx="3" />

//     {/* Right arm */}
//     <rect x="50" y="22" width="6" height="20" rx="3" />

//     {/* Bottom stand */}
//     <rect x="22" y="50" width="20" height="6" rx="3" />
//   </svg>
// );


const SteeringIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M21.8 14a10 10 0 0 1-8.4 7.9v-2A8 8 0 0 0 19.7 14z" />
    <path d="M4.3 14A8 8 0 0 0 10.5 19.9v2A10 10 0 0 1 2.2 14z" />
    <path d="M18 11v2h-1a4 4 0 0 0-4 4v1h-2v-1a4 4 0 0 0-4-4H6v-2z" />
    <path d="M12 2c5.2 0 9.5 4 10 9h-2A8 8 0 0 0 4 11H2c.5-5 4.8-9 10-9" />
  </svg>
);

export default function SeatSelect() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = useAuth();

  const travelDate = state?.travelDate;
  const [bus, setBus] = useState(null);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (!travelDate) {
      toast.error("Please select date from Home page");
      navigate("/");
    }
  }, [travelDate, navigate]);

  useEffect(() => {
    api.get(`/buses/${id}`)
      .then(res => setBus(res.data))
      .catch(() => toast.error("Bus not found"));
  }, [id]);

  useEffect(() => {
    console.log("bus data", bus);
  }, [bus])

  const toggleSeat = (seatNo, booked) => {
    if (booked) return;
    if (!user) return toast.error("Login required");

    setSelected(prev =>
      prev.includes(seatNo)
        ? prev.filter(s => s !== seatNo)
        : prev.length >= 5
          ? (toast.error("Maximun 5 seats only"), prev)
          : [...prev, seatNo]
    );
  };

  if (!bus) return null;


  /* ================= LOGIC ================= */

  // NORMAL ROWS (1–10)
  const normalB = bus.seats
    .filter(s => s.side === "B" && Number(s.seatNumber.slice(1)) <= 10)
    .sort((a, b) => Number(b.seatNumber.slice(1)) - Number(a.seatNumber.slice(1)));

  const normalA = bus.seats
    .filter(s => s.side === "A" && Number(s.seatNumber.slice(1)) <= 10)
    .sort((a, b) => Number(b.seatNumber.slice(1)) - Number(a.seatNumber.slice(1)));

  // LAST ROW (MERGED – EXACT ORDER)
  const lastRow = ["B11", "B12", "B13", "A11", "A12"]
    .map(num => bus.seats.find(s => s.seatNumber === num))
    .filter(Boolean);


  return (
    <div className="min-h-screen bg-cover bg-center pt-10 pb-5" style={{ backgroundImage: `url(${bg})` }}>
      <div className="max-w-xl mx-auto bg-white rounded-xl p-4 sm:p-6 shadow overflow-x-auto">

        {/* HEADER */}
        <h1 className="text-base sm:text-lg md:text-xl font-bold text-center mb-2">
          Click on available seats to reserve your seat
        </h1>
        <p className="text-center text-base sm:text-lg md:text-xl text-red-700 mb-6">
          {bus.name} • {travelDate}
        </p>

        <div className="border-2 border-red-600 rounded-3xl p-3">

          {/* SEATS */}
          <div className="space-y-4">

            {/* LAST ROW – NO AISLE */}
            <div className="flex justify-center gap-6 mt-4">
              {lastRow.map(seat => (
                <div key={seat.seatNumber} className="flex flex-col items-center"
                  onClick={() => toggleSeat(seat.seatNumber, seat.isBooked)}>
                  <SeatIcon className={`w-8 h-8
                  ${seat.isBooked ? "text-red-500"
                      : selected.includes(seat.seatNumber)
                        ? "text-green-600"
                        : "text-gray-400 hover:text-gray-600"}`} />
                  <span className="text-xs">{seat.seatNumber}</span>
                </div>
              ))}
            </div>

            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex justify-center items-center gap-6">

                {/* LEFT – B SIDE */}
                {[normalB[i * 2 + 1], normalB[i * 2]].map(seat => (
                  <div key={seat.seatNumber} className="flex flex-col items-center"
                    onClick={() => toggleSeat(seat.seatNumber, seat.isBooked)}>
                    <SeatIcon className={`w-8 h-8
                      ${seat.isBooked ? "text-red-500"
                        : selected.includes(seat.seatNumber)
                          ? "text-green-600"
                          : "text-gray-400 hover:text-gray-600"}`} />
                    <span className="text-xs">{seat.seatNumber}</span>
                  </div>
                ))}

                {/* AISLE */}
                <div className="w-8" />

                {/* RIGHT – A SIDE */}
                {[normalA[i * 2 + 1], normalA[i * 2]].map(seat => (
                  <div key={seat.seatNumber} className="flex flex-col items-center"
                    onClick={() => toggleSeat(seat.seatNumber, seat.isBooked)}>
                    <SeatIcon className={`w-8 h-8
                      ${seat.isBooked ? "text-red-500"
                        : selected.includes(seat.seatNumber)
                          ? "text-green-600"
                          : "text-gray-400 hover:text-gray-600"}`} />
                    <span className="text-xs">{seat.seatNumber}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="mb-6 mt-5 flex justify-center">
            <div className="w-3/4 border-t border-dashed border-red-600 opacity-60" />
          </div>


          {/* DRIVER – BOTTOM RIGHT */}
          <div className="flex justify-end mb-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border bg-gray-100 mr-10 sm:mr-16 md:mr-24">
              <SteeringIcon className="w-5 h-5 rotate-180 text-gray-700" />
              <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Driver</span>
            </div>
          </div>
        </div>

        {/* LEGEND */}
        <div className="flex justify-center gap-6 mt-10 text-sm">
          <div className="flex items-center gap-1">
            <SeatIcon className="w-5 h-5 text-gray-400" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1">
            <SeatIcon className="w-5 h-5 text-green-600" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-1">
            <SeatIcon className="w-5 h-5 text-red-500" />
            <span>Booked</span>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="mt-8 text-center">
          <p>Selected Seats: <b>{selected.join(", ") || "None"}</b></p>
          <p className="mt-2 text-lg font-semibold">
            Total price ₹{selected.length * bus.price}
          </p>

          <button
            onClick={() => {
              if (selected.length === 0) {
                toast.error("User must select at least one seat");
                return;
              }
              navigate("/payment", {
                state: {
                  busId: bus._id,
                  busName: bus.name,
                  selected,
                  travelDate,
                  totalAmount: selected.length * bus.price
                }
              });
            }}
            className="mt-4 bg-red-600 hover:bg-green-700 text-white px-6 py-2 rounded"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}