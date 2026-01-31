import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bannerDesktop from "../assets/HomeBanner.webp";
import bannerMobile from "../assets/HomeBanner.webp";
import womenImg from "../assets/female.svg";
import WomenModel from "./Womenmodel";
import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpeg";
import { Search } from "lucide-react";

const CITIES = [
  "Chennai",
  "Salem",
  "Coimbatore",
  "Ahmedabad",
  "Trichy",
  "Erode",
  "Bangalore",
];

export default function HeroSearch() {
  const navigate = useNavigate();

  // ✅ today default date
  const today = new Date().toISOString().split("T")[0];
  const [from, setFrom] = useState("Chennai");
  const [to, setTo] = useState("Ahmedabad");
  const [date, setDate] = useState(today);
  const [selectedDay, setSelectedDay] = useState("today");
  const [womenOnly, setWomenOnly] = useState(false);
  const [toast, setToast] = useState("");
  const [showWomenModal, setShowWomenModal] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // responsive detect
  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // toast auto hide
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 2500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const toggleWomen = () => {
    setWomenOnly(!womenOnly);
    setToast(
      !womenOnly
        ? "Booking for women enabled"
        : "Booking for women disabled"
    );
  };

  const swapCities = () => {
    setFrom(to);
    setTo(from);
  };

  const handleToday = () => {
    setDate(today);
    setSelectedDay("today");
  };

 const handleTomorrow = () => {
  const t = new Date();
  t.setDate(t.getDate() + 1);
  setSelectedDay("tomorrow");
  setDate(t.toISOString().split("T")[0]);
};

  const searchBuses = () => {
    navigate(`/buses?from=${from}&to=${to}&date=${date}`, {
      state: {
        from,
        to,
        travelDate: date,
      },
    });
  };

  const womenImages = [img1, img2, img3, img4];

  return (
    <div className="relative">

      {/* ================= BANNER ================= */}
      <img
        src={isMobile ? bannerMobile : bannerDesktop}
        className="w-full h-[35vh] md:h-[45vh] object-cover"
        alt="banner"
      />

      {/* ================= BANNER TEXT ================= */}
      <div className="absolute inset-0 flex items-center bg-gradient-to-tr from-black/70 via-black/20 to-transparent">
        <div className="max-w-6xl mb-7 mx-auto w-full px-6 text-white">
          <p className="mb-2 text-2xl font-bold">Welcome to RedBus Clone</p>
          <h1 className="text-2xl md:text-4xl font-bold leading-tight">
            India’s No.1 online<br />bus ticket booking site
          </h1>
        </div>
      </div>

      {/* ================= SEARCH AREA ================= */}
      <div className="absolute inset-x-0 top-[75%] px-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-7xl mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* ===== FROM & TO (MOBILE) ===== */}
            <div className="flex flex-col gap-3 md:hidden">

              <div className="flex items-center bg-gray-50 border rounded-xl px-4 py-3">
                <div className="flex flex-col flex-1">
                  <span className="text-xs text-gray-500">From</span>
                  <select
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="bg-transparent font-semibold outline-none cursor-pointer"
                  >
                    {CITIES.map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={swapCities}
                className="absolute right-16  top-16 z-20 bg-red-500 text-white shadow cursor-pointer rounded-full w-9 h-9"
              >
                ↕
              </button>

              <div className="relative flex items-center bg-gray-50 border rounded-xl px-4 py-3">
                <div className="flex flex-col flex-1">
                  <span className="text-xs text-gray-500">To</span>
                  <select
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="bg-transparent cursor-pointer font-semibold outline-none"
                  >
                    {CITIES.map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

              </div>
            </div>

            {/* ===== FROM & TO (DESKTOP) ===== */}
            <div className="hidden md:flex items-center bg-gray-50 border rounded-xl px-4 min-h-[72px] gap-4">
              <div className="flex-1">
                <span className="text-xs text-gray-500">From</span>
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="bg-transparent cursor-pointer font-semibold outline-none w-full"
                >
                  {CITIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <button
                onClick={swapCities}
                className="bg-red-500 cursor-pointer text-white w-9 h-9 rounded-full"
              >
                ↔
              </button>

              <div className="flex-1">
                <span className="text-xs text-gray-500">To</span>
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="bg-transparent cursor-pointer font-semibold outline-none w-full"
                >
                  {CITIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* ===== DATE ===== */}
            <div className="bg-gray-50 border rounded-xl px-4 py-1">
              <span className="text-xs text-gray-500">Date of Journey</span>
              <div className="flex items-center gap-3 mt-1">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-transparent cursor-pointer font-semibold outline-none w-3/5"
                />

                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  <button
                    onClick={handleToday}
                    disabled={selectedDay === "today"}
                    className={`px-4 py-2 rounded-full whitespace-nowrap
                      ${selectedDay === "today"
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-red-100 text-red-600"}`}
                  >
                    Today
                  </button>

                  {/* TOMORROW */}
                  <button
                    onClick={handleTomorrow}
                    disabled={selectedDay === "tomorrow"}
                    className={`px-4 py-2 rounded-full whitespace-nowrap
                      ${selectedDay === "tomorrow"
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-red-100 text-red-600"}`}
                  >
                    Tomorrow
                  </button>
                </div>
              </div>
            </div>

            {/* ===== WOMEN BOOKING ===== */}
            <div className="flex items-center justify-between bg-gray-50 border rounded-xl px-4 py-3">
              <div className="flex items-center gap-3">
                <img src={womenImg} className="w-9 h-9" />
                <div>
                  <p className="text-sm font-semibold">Booking for women</p>
                  <button
                    onClick={() => setShowWomenModal(true)}
                    className="text-xs text-blue-600 underline"
                  >
                    Know more
                  </button>
                </div>
              </div>

              <button
                onClick={toggleWomen}
                className={`w-11 h-6 rounded-full relative ${womenOnly ? "bg-red-600" : "bg-gray-300"
                  }`}
              >
                <span
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${womenOnly ? "right-0.5" : "left-0.5"
                    }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* ===== SEARCH BUTTON ===== */}
        <div className="max-w-xs mx-auto mt-4">
          <button
            onClick={searchBuses}
            className="w-full bg-red-600 text-white py-4 rounded-full text-lg font-semibold flex items-center justify-center gap-2"
          >
            <Search size={20} />
            Search buses
          </button>
        </div>
      </div>

      {/* ===== TOAST ===== */}
      {toast && (
        <div className="z-50 fixed bottom-24 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-2 rounded-full animate-bounce">
          {toast}
        </div>
      )}

      {showWomenModal && (
        <WomenModel
          images={womenImages}
          onClose={() => setShowWomenModal(false)}
        />
      )}
    </div>
  );
}
