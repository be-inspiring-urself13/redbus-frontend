// frontend/src/pages/BookingSuccess.jsx
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import bg from "../assets/bg.jpeg";

export default function BookingSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>Invalid booking</p>;

  const isLoggedIn = !!localStorage.getItem("token");

  const {
    busName,
    travelDate,
    seats,
    passengers,
    totalAmount,
    from,
    to,
  } = state;

  const handleViewBookings = () => {
    if (!isLoggedIn) {
      toast.error("Please login to view your bookings");
      return; // stay on same page
    }
    navigate("/bookings");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-6 text-center">

        <h2 className="text-2xl font-bold text-green-600">
          Booking Confirmed ✅
        </h2>

        {/* DETAILS */}
        <div className="mt-4 text-sm text-gray-700 space-y-2 text-left">
          <p><b>Bus:</b> {busName}</p>
          <p className=""> <b>Passenger:</b>{" "} {passengers?.[0]?.name}</p>
           {/* <p><b>Route:</b>{from} → {to}</p> */}
          <p><b>Date:</b> {travelDate}</p>
          <p><b>Seats:</b> {seats.join(", ")}</p> 
          <p><b>Total Paid:</b> ₹{totalAmount}</p>
        </div>

        {/* VIEW MY BOOKINGS */}
        <button
          onClick={handleViewBookings}
          className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg font-semibold"
        >
          View My Bookings
        </button>

        {/* LOGIN PROMPT – ONLY IF NOT LOGGED IN */}
        {!isLoggedIn && (
          <div className="mt-6 border-t pt-4 text-sm text-gray-600">
            <p>
              📧 Only logged-in users can get booking details in their email
            </p>
            <button
              onClick={() => navigate("/login")}
              className="mt-2 underline text-red-600 font-semibold"
            >
              Login here
            </button>
          </div>
        )}
      </div>
    </div>
  );
}