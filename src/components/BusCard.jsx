// frontend/src/components/BusCard.jsx
import { useNavigate } from "react-router-dom";
import { Bus } from "lucide-react";

export default function BusCard({ bus, travelDate }) {
  const navigate = useNavigate();

  // ✅ REAL seat count
  const availableSeats =
    bus.seats?.filter(seat => !seat.isBooked).length || 0;

  // ✅ VIEW SEATS HANDLER
  const handleViewSeats = () => {
    navigate(`/seats/${bus._id}`, {
      state: {
        travelDate,
        busName: bus.name, // optional but useful
      },
    });
  };

  return (
 

    <div className="bg-white rounded-xl p-4 shadow flex justify-between items-center">
      {/* LEFT INFO */}
      <div>
        <h2 className="font-bold text-lg flex items-center gap-2">
          <Bus size={18} />
          {bus.name}
        </h2>

        <p className=" text-gray-600">
          {bus.from} → {bus.to}
        </p>

        <p className="text-sm mt-1">
          Type: {bus.type.join(", ")}
        </p>

        <p className="text-sm">
          Departure: {bus.departure} | Arrival: {bus.arrival}
        </p>

        <p className="text-sm mt-1 font-semibold">
          Seats Available: {availableSeats}
        </p>
      </div>

      {/* RIGHT ACTION */}
      <div className="text-right">
        <p className="text-xl font-bold text-red-600">
          ₹{bus.price}
        </p>

        <button
          onClick={handleViewSeats}
          className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          View Seats
        </button>
      </div>
    </div>
  );
}