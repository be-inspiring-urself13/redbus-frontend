//frontend/src/components/Testimonials.jsx
const testimonials = [
  {
    name: "Ravikumar C",
    text: "Bus was clean and the journey was smooth",
    since: "redBus customer since 2019",
  },
  {
    name: "Sriharan",
    text: "Clean buses. Courteous staff",
    since: "redBus customer since 2017",
  },
  {
    name: "Krishna M",
    text: "Awesome bus maintenance",
    since: "redBus customer since 2018",
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-6xl mx-auto px-4">
      <h2 className="text-xl font-semibold mb-2">Testimonials</h2>
      <p className="text-sm text-gray-500 mb-6">
        Hear from our satisfied customers in their own words
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="border rounded-xl p-4 bg-white shadow-sm"
          >
            <p className="text-sm text-gray-700 mb-4">{t.text}</p>
            <p className="font-semibold text-sm">{t.name}</p>
            <p className="text-xs text-gray-500">{t.since}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
