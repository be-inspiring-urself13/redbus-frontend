// frontend/src/pages/BusList.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import Filters from "../components/Filters";
import BusCard from "../components/BusCard";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import bg from "../assets/bg.jpeg";
import noBus from "../assets/nobus.png";

export default function BusList() {
  const location = useLocation();
  const navigate = useNavigate();

  const [buses, setBuses] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  const params = new URLSearchParams(location.search);
  const from = params.get("from");
  const to = params.get("to");
  const travelDate = params.get("date");

  // 🔒 Block direct access
  useEffect(() => {
    if (!from || !to || !travelDate) {
      toast.error("Please search buses from Home page");
      navigate("/");
    }
  }, [from, to, travelDate, navigate]);

  // 🚍 Fetch buses
  useEffect(() => {
    if (!from || !to) return;

    setLoading(true);

    api.get("/buses", {
      params: {
        from: from.toLowerCase(),
        to: to.toLowerCase(),
      },
    })
      .then(res => {
        setBuses(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to load buses");
        setLoading(false);
      });
  }, [from, to]);

  // ⏳ Loading


  // 🔍 Filters
  const filteredBuses = buses.filter(bus => {
    if (filters.type && !bus.type.join(" ").toLowerCase().includes(filters.type.toLowerCase()))
      return false;

    if (filters.category && !bus.type.join(" ").toLowerCase().includes(filters.category.toLowerCase()))
      return false;

    if (filters.departure && bus.departure !== filters.departure)
      return false;

    return true;
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center pt-10 pb-5 px-3 sm:px-6 mb-"
      style={{ backgroundImage: `url(${bg})` }}
    >

      {loading && <Loader />}

      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">

        {buses.length > 0 && (
          <>
            {/* LEFT FILTER */}
            < aside className="w-full lg:w-72 bg-white/90 rounded-xl p-4 h-fit">
              <h2 className="font-bold text-lg mb-4">Filters</h2>
              <Filters onChange={setFilters} />
            </aside>
          </>
        )};

        {/* RIGHT CONTENT */}
        <section className="flex-1">

          {!loading && filteredBuses.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-white h-[60vh] text-center">
              <img src={noBus} alt="No buses" className="sm:w-72 w-52 mb-6" />
              <h2 className="text-xl sm:text-2xl font-semibold">
                No buses available for this route
              </h2>
              <p className="mt-2 opacity-80">
                Try some other routes
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBuses.map(bus => (
                <BusCard
                  key={bus._id}
                  bus={bus}
                  travelDate={travelDate}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div >
  );
}