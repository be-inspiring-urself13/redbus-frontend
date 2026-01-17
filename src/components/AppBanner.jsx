//frontend/src/components/AppBanner.jsx
import banner from "../assets/ad.webp";
import google from "../assets/ad1.jpeg";
import apple from "../assets/ad2.jpeg";
import qr from "../assets/ad4.jpeg";
import grab from "../assets/ad3.jpeg"

export default function AppBanner() {
    return (
        <section className="max-w-7xl md:mx-44 mx-auto  px-4">
            <div
                className="relative rounded-2xl overflow-hidden min-h-[180px] md:min-h-[340px] mb-10"
                style={{
                    backgroundImage: `url(${banner})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* CONTENT */}
                <div className="relative z-10 h-full grid md:grid-cols-2 gap-6 p-6 md:p-10 text-white font-bold">

                    {/* LEFT CONTENT */}
                    <div className="flex flex-col justify-center gap-2 md:gap-3 max-w-md">

                        {/* GRAB LOGO */}
                        <div className="flex items-center gap-2">
                            <img src={grab} alt="grab" className="w-9 h-9 md:w-11 md:h-11 rounded-md" />
                            <span className="text-xl">
                                Grab 10% off now
                            </span>
                        </div>

                        <p className="text-sm md:text-base opacity-90">
                            Download App to unlock offer!
                        </p>

                        <p className="text-sm">
                            Use Code: <span className="font-bold">APP10</span>
                        </p>

                        {/* <p className="mt-4 text-sm opacity-90">
                            Download redBus App on
                        </p> */}

                        {/* STORE BUTTONS */}
                        <div className="flex items-center gap-4 flex-wrap">
                            {/* <div>
                <img src={google} className="h-11 mb-1 rounded-xl" />
                <p className="text-xs opacity-80">⭐ 4.6 · 10 crore+ downloads</p>
              </div> */}

                            {/* <div>
                                <img src={apple} className="h-11 mb-1 rounded-xl" />
                                <p className="text-xs opacity-80">⭐ 4.7 · 15 crore+ downloads</p>
                            </div> */}
                        </div>
                    </div>

                    {/* RIGHT SIDE (BLUR + QR) */}
                    <div className="flex flex-row items-center justify-center md:justify-around mt-3 md:mt-0">
                        <div className="backdrop-blur-md bg-white/10 p-4 rounded-xl md:p-6 w-full md:w-[350px] text-center">
                           
                            <p className="mt-4 text-xl opacity-90 mb-5">
                                Download redBus App on
                            </p>
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <img src={google} className="md:h-11 h-9 rounded-xl " />
                                    <p className="md:text-base text-sm opacity-80">⭐ 4.6 · 10 crore+ downloads</p>
                                </div>
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <img src={apple} className="md:h-11 h-9 rounded-xl" />
                                    <p className="md:text-base text-sm opacity-80">⭐ 4.7 · 15 crore+ downloads</p>
                                </div>
                            
                            <div className="">
                                <img src={qr} alt="qr" className="inline-block w-28 h-28 bg-white p-2 rounded-md" />
                                <p className="text-xl mt-2 opacity-90">Scan to download</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

