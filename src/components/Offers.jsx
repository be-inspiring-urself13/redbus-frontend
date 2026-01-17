//frontend/src/components/Offers.jsx
import offers from "../data/offers";
import { useRef } from "react";
import { FaTag } from "react-icons/fa";

export default function Offers() {
  const scrollRef = useRef(null);

  // LEFT ARROW 
  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  // RIGHT ARROW 
  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="max-w-6xl w-full overflow-visible mx-auto px-4 mt-96 md:mt-28">
      {/* TITLE */}
      <h2 className="text-xl font-semibold mb-4">Offers for you</h2>


      {/* DESKTOP ARROWS */}
      <div className="relative">
        <button
          onClick={scrollLeft}
          className="hidden md:flex absolute hover:text-white hover:bg-red-500 -left-8 top-1/2 -translate-y-1/2 z-10
           bg-white shadow rounded-full w-10 h-10 items-center justify-center"
        >
          ❮
        </button>

        <button
          onClick={scrollRight}
          className="hidden md:flex absolute hover:text-white hover:bg-red-500 -right-8 top-1/2 -translate-y-1/2 z-10
           bg-white shadow rounded-full w-10 h-10 items-center justify-center"
        >
          ❯
        </button>


        {/* SCROLL CONTAINER */}
        <div
          ref={scrollRef}
          className="
          flex gap-4
          overflow-x-auto
          scroll-smooth
          snap-x snap-mandatory
          no-scrollbar
          
        "
        >
          {offers.map((offer, index) => (
            <div
              key={index}
              className="
              snap-start
              flex-shrink-0
              min-w-[260px] sm:min-w-[320px]
              h-[170px]
              rounded-xl
              overflow-hidden
              relative
            "
            >

              {/* IMAGE */}
              <img
                src={offer.image}
                alt="offer"
                className="w-full h-full object-cover"
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-black/10"></div>

              {/* CONTENT */}
              <div className="absolute inset-0 p-4 cursor-pointer flex flex-col justify-between text-white">
                {/* TOP TAG */}
                <span className="bg-gray-500 text-xs px-2 py-1 rounded-xl w-fit">
                  Bus
                </span>

                {/* TEXT */}
                <div>
                  <h3 className="md:text-xl font-semibold text-black leading-snug">
                    {offer.title}
                  </h3>
                  <p className="text-black text-xs mt-1">
                    {offer.valid}
                  </p>
                </div>

                {/* COUPON */}
                <div className="bg-white text-black px-3 py-1 rounded-full w-fit mt-2 font-semibold flex gap-2">
                  <FaTag />
                  {offer.code}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
