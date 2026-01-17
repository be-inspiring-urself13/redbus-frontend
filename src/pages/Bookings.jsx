//frontend/src/pages/Bookings.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import book from "../assets/tickets.jpg";
import bg from "../assets/bg.jpeg";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH USER BOOKINGS FROM BACKEND
  useEffect(() => {
    api
      .get("/bookings/my")
      .then(res => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to load bookings");
        setLoading(false);
      });
  }, []);

  // ⏳ LOADING STATE
  if (loading) {
    return <Loader />
     
  }

  // ❌ NO BOOKINGS
  if (bookings.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-white text-center">

          <img src={book} alt="no bookings" className="w-1/2 mb-4" />

          <h2 className="text-2xl font-semibold">No bookings yet</h2>
          <p className="mt-2">
            Looks like you haven’t booked any trips
          </p>

          <button
            onClick={() => window.location.href = "/"}
            className="text-xl mt-4 bg-white text-black px-6 py-3 hover:bg-green-500 hover:text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            Book Your First Ticket
          </button>
        </div>
      </div>
    );
  }

  // ✅ BOOKINGS FOUND
  return (
    <div
      className="min-h-screen bg-cover bg-center pt-10 pb-5"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-white">
          My Bookings
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {bookings.map(booking => (
            <div
              key={booking._id}
              className="border rounded-xl p-4 shadow-sm bg-white"
            >

              <h2 className="font-semibold text-lg text-red-600">
                {booking.bus
                  ? `${booking.bus.from} → ${booking.bus.to}`
                  : "Route unavailable"}
              </h2>

              <p className="text-sm mt-1">
                Bus: <b>{booking.bus?.name || "Bus info unavailable"}</b>
              </p>

              <p className="text-sm">
                Departure: {booking.bus?.departure || "N/A"}
              </p>

              <p className="text-sm">
                Arrival: {booking.bus?.arrival || "N/A"}
              </p>

              <p className="text-sm">
                Date: {booking.travelDate}
              </p>

              <div className="mt-3 font-bold">
                ₹ {booking.totalAmount}
              </div>

              <p className="mt-2 text-green-600 font-semibold">
                Booking Confirmed
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}