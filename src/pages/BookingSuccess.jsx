//frontend/src/pages/BookingSuccess.jsx
import { useLocation, useNavigate } from "react-router-dom";

export default function BookingSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>No booking data</p>;

  return (
    <div className="p-6 mt-16 text-center">
      <h2 className="text-2xl font-bold text-green-600">
        Booking Confirmed ✅
      </h2>

      <div className="mt-4">
        <p><b>Bus:</b> {state.busName}</p>
        <p><b>Date:</b> {state.travelDate}</p>
        <p><b>Seats:</b> {state.seats.join(", ")}</p>
        <p><b>Total Paid:</b> ₹{state.totalAmount}</p>
      </div>

      <button
        onClick={() => navigate("/bookings")}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded"
      >
        View My Bookings
      </button>
    </div>
  );
}