//frontend/src/components/Filters.jsx
export default function Filters({ onChange }) {
  const update = (key, value) => {
    onChange(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4">
      {/* BUS TYPE */}
      <div>
        <h4 className="font-bold">Bus Type</h4>
        <label>
          <input type="checkbox" onChange={()=>update("type","AC")} /> AC
        </label><br/>
        <label>
          <input type="checkbox" onChange={()=>update("type","Non AC")} /> Non AC
        </label>
      </div>

      {/* CATEGORY */}
      <div>
        <h4 className="font-bold">Category</h4>
        <label>
          <input type="checkbox" onChange={()=>update("category","Seater")} /> Seater
        </label><br/>
        <label>
          <input type="checkbox" onChange={()=>update("category","Sleeper")} /> Sleeper
        </label>
      </div>

      {/* DEPARTURE */}
      <div>
        <h4 className="font-bold">Departure</h4>
        {["Morning","Mid Morning","Afternoon","Night"].map(t => (
          <label key={t} className="block">
            <input
              type="radio"
              name="departure"
              onChange={()=>update("departure",t)}
            /> {t}
          </label>
        ))}
      </div>
    </div>
  );
}
