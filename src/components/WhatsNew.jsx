//frontend/src/components/WhatsNew.jsx
import { useRef } from "react";
import news from "../data/whatsNew";

export default function WhatsNew() {

    const ref = useRef(null);

    const left = () => ref.current.scrollBy({ left: -300, behavior: "smooth" });
    const right = () => ref.current.scrollBy({ left: 300, behavior: "smooth" });

    return (
        <section className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">What’s New</h2>
            </div>


            <div className="relative">
                <button onClick={left} className="hidden md:flex hover:text-white hover:bg-red-500 absolute -left-6 top-1/2 translate-y-16 z-10 bg-white shadow rounded-full w-9 h-9 items-center justify-center"
                >❮</button>
            </div>

            <div
                ref={ref}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            >
                {news.map((item, i) => (
                    <img
                        key={i}
                        src={item.image}
                        alt=""
                        className="w-full h-[160px] rounded-xl object-cover shadow-2xl"
                    />
                ))}
            </div>


            <div className="relative">
                <button onClick={right} className="hidden md:flex hover:text-white hover:bg-red-500 absolute 
                -right-6 top-1/2 -translate-y-24 z-10
                   bg-white shadow rounded-full w-9 h-9 items-center justify-center"
                >❯</button>
            </div>
        </section>
    );
}