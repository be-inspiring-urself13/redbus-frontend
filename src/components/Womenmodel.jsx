//frontend/src/components/Womenmodel.jsx
export default function Womenmodel ({onClose, images}) {

  return (
    // BACKDROP
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      {/* MODAL */}
      <div className="w-[90%] max-w-lg rounded-xl bg-white p-6">

        {/* TITLE */}
        <h2 className="text-center text-xl font-bold mb-1">
          Booking for women
        </h2>

        <p className="text-center text-sm text-gray-500 mb-5">
          Providing helpful details to smartly choose bus travel for women
        </p>

        {/* IMAGES GRID */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="women-info"
              className="w-full rounded-lg"
            />
          ))}
        </div>

        {/* GOT IT BUTTON */}
        <button
          onClick={onClose}
          className="w-full rounded-full bg-red-600 py-3 text-white font-semibold"
        >
          Got it
        </button>

      </div>
    </div>
  );
}