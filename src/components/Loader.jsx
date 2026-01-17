import bus from "../assets/nobus.png"; // 🔁 unga bus image path

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="relative w-40 h-40 flex items-center justify-center">
        
        {/* 🔄 Green rotating ring */}
        <div className="absolute inset-0 rounded-full border-4 border-green-500 border-t-transparent animate-spin"></div>

        {/* 🚌 Bus image (center, fixed size) */}
        <img
          src={bus}
          alt="Loading"
          className="w-32 h-32 object-contain"
        />
      </div>
    </div>
  );
}