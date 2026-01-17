//frontend/src/components/GovBus.jsx
import { useRef } from "react";
import buses from "../data/govBus";
import redbusLogo from "../assets/Logo.png";

export default function GovBus() {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    return (
        <section className="max-w-6xl w-full overflow-visible px-4 mx-auto relative">

            {/* TITLE */}
            <h2 className="text-2xl font-semibold mb-2">
                Government Buses
            </h2>

            {/* LEFT ARROW */}
            <button
                onClick={scrollLeft}
                className=" hover:text-white hover:bg-red-500 hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10
                   bg-white shadow rounded-full w-9 h-9 items-center justify-center"
            >
                ❮
            </button>

            {/* SCROLL CONTAINER */}
            <div
                ref={scrollRef}
                className="flex mx-2 gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
            >
                {buses.map((bus, index) => (
                    <div
                        key={index}
                        className="min-w-[260px] bg-white rounded-xl shadow-2xl p-4 space-y-3"
                    >


                        {/* 2️⃣ NAME + RATING */}
                        <div className="flex items-center gap-2">

                            {/* 1️⃣ LOGO */}
                            <img
                                src={bus.logo}
                                alt={bus.name}
                                className="w-12 h-12"
                            />
                            <h3 className="font-semibold text-sm">
                                {bus.name}
                            </h3>

                            <span className="flex items-center gap-1 bg-green-800 text-white text-xs font-bold px-2 py-[2px] rounded">
                                ★ {bus.rating}
                            </span>
                        </div>

                        {/* 3️⃣ LANGUAGE */}
                        <p className="text-xs text-gray-500">
                            {bus.language}
                        </p>

                        {/* 4️⃣ DESCRIPTION */}
                        <p className="text-sm text-gray-700">
                            {bus.description}
                        </p>

                        {/* 5️⃣ REDBUS LOGO + SERVICE */}
                        <div className="flex items-center gap-2">
                            <img
                                src={redbusLogo}
                                alt="redbus"
                                className="w-8 h-8"
                            />
                            <span className="text-xs text-gray-600">
                                {bus.services}
                            </span>
                        </div>

                        {/* 6️⃣ CUSTOMER SERVICE */}
                        <p className="bg-red-50 rounded-lg px-3 py-2 text-xs text-red-600 font-medium">
                            24×7 customer service (Call or chat)
                        </p>
                    </div>
                ))}
            </div>

            {/* RIGHT ARROW */}
            <button
                onClick={scrollRight}
                className=" hover:text-white hover:bg-red-500 hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10
                   bg-white shadow rounded-full w-9 h-9 items-center justify-center"
            >
                ❯
            </button>
        </section>
    );
}
