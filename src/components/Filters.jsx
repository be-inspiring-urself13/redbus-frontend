//frontend/src/components/Filters.jsx
export default function Filters({ filters = {}, onChange }) {
  const update = (key, value) => {
    onChange(prev => ({
      ...prev,
      [key]: prev[key] === value ? "" : value
    }));
  };

  return (
    <div className="space-y-4">
      {/* BUS TYPE */}
      <div>
        <h4 className="font-bold mb-1">Bus Type</h4>
        <label>
          <input type="checkbox" className="cursor-pointer" onChange={() => update("type", "AC")} /> AC
        </label><br />
        <label>
          <input type="checkbox" className="cursor-pointer" onChange={() => update("type", "Non AC")} /> Non AC
        </label>
      </div>

      {/* CATEGORY */}
      <div>
        <h4 className="font-bold mb-1">Category</h4>
        <label>
          <input type="checkbox" className="cursor-pointer" onChange={() => update("category", "Seater")} /> Seater
        </label><br />
        <label>
          <input type="checkbox" className="cursor-pointer" onChange={() => update("category", "Sleeper")} /> Sleeper
        </label>
      </div>

      {/* DEPARTURE */}
      <div>
        <h4 className="font-bold mb-1">Departure</h4>

        {["Morning", "Mid Morning", "Afternoon", "Evening", "Night"].map(t => (
          <label key={t} className="flex items-center gap-2">
            <input
              type="radio"
              className="cursor-pointer"
              name="departure"
              value={t.toLowerCase()}
              checked={filters.departure === t.toLowerCase()}
              onChange={() => update("departure", t.toLowerCase())}
            />
            {t}
          </label>
        ))}
      </div>
    </div>
  );
}
