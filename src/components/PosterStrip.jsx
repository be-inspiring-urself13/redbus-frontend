//frontend/src/components/PosterStrip.jsx
import poster from "../assets/poster.png";

export default function PosterStrip() {
  return (
    <section className="w-full px-4">
      <div className="w-full ">
        <img
          src={poster}
          alt="People booked poster"
          className="w-full h-[75px] md:h-full object-cover"
        />
      </div>
    </section>
  );
}

