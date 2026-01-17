//frontend/src/pages/Help.jsx
import helpBg from "../assets/bg.jpeg";          // background image
import supportImg from "../assets/Help.jpg";     // 24/7 support image
import tripImg from "../assets/dog.svg";        // dog / trip image
import langImg from "../assets/hindi.gif";            // english tamil image


export default function Help() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${helpBg})` }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* content */}
      <div className="relative max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-8">

          {/* LEFT – HELP CARD */}
          <div className="bg-white rounded-xl shadow-lg p-6 max-h-[85vh] overflow-y-auto">

            {/* header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Help</h2>
              <img src={langImg} alt="language" className="h-8" />
            </div>

            {/* Need help */}
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold">Need help with this trip?</p>
              <span className="text-blue-600 text-sm cursor-pointer">
                View all
              </span>
            </div>

            <div className="flex flex-col items-center text-center mb-6">
              <img src={tripImg} alt="trip" className="h-28 mb-2" />
              <p className="text-gray-500 text-sm">No recent trips</p>
            </div>

            {/* Recent issues */}
            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold">Recent issues</p>
              <span className="text-blue-600 text-sm cursor-pointer">
                View all
              </span>
            </div>

            <div className="flex flex-col items-center text-center mb-6">
              <img
                src="https://cdn-icons-png.flaticon.com/512/716/716784.png"
                alt="issues"
                className="h-20 mb-2 opacity-70"
              />
              <p className="text-gray-500 text-sm">No recent issues</p>
            </div>
          </div>

          {/* RIGHT – CUSTOMER SUPPORT */}
          <div className="mt-8 md:flex flex-col justify-center text-center text-white">
            <img src={supportImg} alt="support" className="md:w-full mb-4"/>
            <h2 className="text-2xl font-bold mb-2">
              24/7 Customer Support
            </h2>
            <p className="text-sm opacity-90 ">
              Call or chat with our support team anytime for booking,
              cancellation and payment help.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}