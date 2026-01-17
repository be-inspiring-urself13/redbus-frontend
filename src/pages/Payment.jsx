//frontend/src/pages/Payment.jsx
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { createOrder, verifyPayment } from "../api/payment.Api";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import { useState } from "react";
import bg from "../assets/bg.jpeg";
import payImg from "../assets/paynow.jpg";


export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // SAFETY
  if (!state) {
    return <p>Invalid payment data</p>;
  }

  const { busId, busName, travelDate, selected, totalAmount } = state;

  const handlePayment = async () => {
    try {
      // 🔥 SEND RUPEES ONLY
      const { data: order } = await createOrder(totalAmount);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount, // paise (backend already converted)
        currency: "INR",
        name: "RedBus Clone",
        description: "Bus Ticket Booking",
        order_id: order.id,

        handler: async (response) => {

          setLoading(true); // Show loader

          try {
            await verifyPayment(response);

            const bookingRes = await api.post("/bookings", {
              busId,
              seats: selected,
              travelDate,
              totalAmount,
              paymentId: response.razorpay_payment_id,
            });

            navigate("/booking-success", {
              state: {
                busName,
                travelDate,
                seats: selected,
                totalAmount,
              },
            });
          } catch (err) {
            console.error("BOOKING FAILED 👉", err.response?.data);
            alert("Booking failed. Please try again.");
          }
        }
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  if (loading) {
    return <Loader />
  }

  return (

    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* PAYMENT CARD */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 text-center">

        {/* IMAGE */}
        <img
          src={payImg}
          alt="payment"
          className="w-3/4 mx-auto mb-4"
        />

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-red-600">
          Payment
        </h2>

        {/* QUOTE */}
        <p className="text-sm text-gray-600 mt-1 mb-6">
          Please complete your payment to confirm your booking
        </p>

        {/* DETAILS */}
        <div className="text-left space-y-2 text-">
          <p><b>Bus:</b> {busName}</p>
          <p><b>Passenger:</b> {user?.name}</p>
          <p><b>Date:</b> {travelDate}</p>
          <p><b>Seats:</b> {selected.join(", ")}</p>

          <div className="mt-4 text-lg font-bold text-center text-green-600">
            Total: ₹{totalAmount}
          </div>
        </div>

        {/* PAY BUTTON */}
        <button
          onClick={handlePayment}
          className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}