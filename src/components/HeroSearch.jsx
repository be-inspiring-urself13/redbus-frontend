//frontend/src/components/HeroSearch.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bannerDesktop from "../assets/HomeBanner.webp";
import bannerMobile from "../assets/HomeBanner.webp";
import womenImg from "../assets/female.jpeg";
import WomenModel from "./Womenmodel";
import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpeg";

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

  const [from, setFrom] = useState("Chennai");
  const [to, setTo] = useState("Ahmedabad");
  const [date, setDate] = useState("");
  const [womenOnly, setWomenOnly] = useState(false);

  const [toast, setToast] = useState("");
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
      const timer = setTimeout(() => setToast(""), 2500);
      return () => clearTimeout(timer);
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

 const searchBuses = () => {
  if (!date) {
    setToast("Please select travel date");
    return;
  }

  navigate(
    `/buses?from=${from}&to=${to}&date=${date}`,
    {
      state: {
        from,
        to,
        travelDate: date
      }
    }
  );
};

  const [showWomenModal, setShowWomenModal] = useState(false);

  const womenImages = [img1, img2, img3, img4];

  return (
    <div className="relative">

      {/* BANNER */}
      <img
        src={isMobile ? bannerMobile : bannerDesktop}
        className="w-full h-[40vh] object-cover"
        alt="banner"
      />

      {/* BANNER TEXT */}
      <div className="absolute inset-0 flex items-center bg-gradient-to-tr from-black/70 via-black/20 to-transparent">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 px-6">

          {/* LEFT TEXT */}
          <div className="text-white relative">
            <p className="mb-2 text-2xl font-bold">
              Welcome to RedBus Clone
            </p>
            <h1 className="mb-12 text-2xl md:text-4xl font-bold leading-tight">
              India’s No.1 online<br />bus ticket booking site
            </h1>
          </div>
        </div>
      </div>

      {/* SEARCH AREA */}
      <div className="absolute inset-x-0 top-[75%] px-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-7xl mx-auto p-4">

          {/* SINGLE LINE INPUT ROW */}
          <div className="grid md:grid-cols-6 gap-3 items-center">

            {/* FROM */}
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="border rounded-lg p-3"
            >
              {CITIES.map(city => (
                <option key={city}>{city}</option>
              ))}
            </select>

            {/* TO */}
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="border rounded-lg p-3"
            >
              {CITIES.map(city => (
                <option key={city}>{city}</option>
              ))}
            </select>

            {/* DATE */}
            <input
              type="date"
              className="border rounded-lg p-3"
              onChange={(e) => setDate(e.target.value)}
            />

            {/* TODAY (DISABLED) */}
            <button
              disabled
              className="px-4 py-2 rounded-full bg-gray-200 text-gray-500 cursor-not-allowed"
            >
              Today
            </button>

            {/* TOMORROW */}
            <button
              onClick={() => {
                const t = new Date();
                t.setDate(t.getDate() + 1);
                setDate(t.toISOString().split("T")[0]);
              }}
              className="px-4 py-2 rounded-full bg-red-100 text-red-600"
            >
              Tomorrow
            </button>

            {/* WOMEN TOGGLE */}
            <div className="flex items-center gap-3 border rounded-lg p-1">
              <img src={womenImg} className="w-10 h-10" />

              <div>
                <p className="text-sm font-semibold">Booking for women</p>
                <button
                  onClick={() => setShowWomenModal(true)}
                  className=" text-blue-600 underline"
                >
                  Know more
                </button>

                <button
                onClick={toggleWomen}
                className={`w-11 h-6 mt-2 ml-2 rounded-full  ${womenOnly ? "bg-red-600" : "bg-gray-300"
                  } relative`}
              >
                <span
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${womenOnly ? "right-0.5" : "left-0.5"
                    }`}
                />
              </button>
              </div>
            </div>

          </div>
        </div>

        {/* SEARCH BUTTON (OUTSIDE CARD) */}
        <div className=" max-w-xl mx-auto mt-2" >
          <button
            onClick={searchBuses}
            className="w-full bg-red-600 text-white py-4 rounded-full text-lg font-semibold"
          >
            Search buses
          </button>
        </div>
      </div>

      {/* TOAST */}
      {toast && (
        <div className="z-50 fixed bottom-10 md:left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-2 rounded-full animate-bounce">
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
