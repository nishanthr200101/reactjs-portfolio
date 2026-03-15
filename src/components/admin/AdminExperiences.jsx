import { useEffect, useState } from "react";
import { api } from "../../utils/api";

const ICON_KEYS = ["amphisoft", "hrlytics", "studio_diseno"];

const emptyForm = {
  title: "",
  company_name: "",
  icon_key: "amphisoft",
  icon_bg: "#383E56",
  date: "",
  points: "",
  sort_order: 0,
};

const AdminExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const load = () => {
    setLoading(true);
    api.get("/experiences")
      .then(setExperiences)
      .catch(() => setExperiences([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const payload = {
      ...form,
      sort_order: parseInt(form.sort_order) || 0,
      points: form.points.split("\n").map((p) => p.trim()).filter(Boolean),
    };
    try {
      if (editId) {
        await api.patch(`/experiences/${editId}`, payload);
        setMessage("Updated!");
      } else {
        await api.post("/experiences", payload);
        setMessage("Added!");
      }
      setForm(emptyForm);
      setEditId(null);
      load();
    } catch {
      setMessage("Error saving experience.");
    }
  };

  const startEdit = (exp) => {
    setEditId(exp.id);
    setForm({
      title: exp.title,
      company_name: exp.company_name,
      icon_key: exp.icon_key,
      icon_bg: exp.icon_bg,
      date: exp.date,
      points: exp.points.join("\n"),
      sort_order: exp.sort_order,
    });
    setMessage("");
  };

  const remove = async (id) => {
    if (!confirm("Delete this experience?")) return;
    await api.delete(`/experiences/${id}`);
    load();
  };

  if (loading) return <p className="text-gray-400">Loading…</p>;

  return (
    <div>
      <h1 className="text-white text-2xl font-bold mb-6">Experiences</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-gray-900 rounded-xl p-5 mb-8 flex flex-col gap-4">
        <h2 className="text-white font-semibold">{editId ? "Edit Experience" : "Add Experience"}</h2>
        <div className="grid grid-cols-2 gap-4">
          <input required placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none text-sm" />
          <input required placeholder="Company" value={form.company_name} onChange={e => setForm({ ...form, company_name: e.target.value })}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none text-sm" />
          <select value={form.icon_key} onChange={e => setForm({ ...form, icon_key: e.target.value })}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none text-sm">
            {ICON_KEYS.map(k => <option key={k}>{k}</option>)}
          </select>
          <input placeholder="Icon BG (#hex)" value={form.icon_bg} onChange={e => setForm({ ...form, icon_bg: e.target.value })}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none text-sm" />
          <input required placeholder="Date range (e.g. Jan 2022 - Dec 2023)" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none text-sm col-span-2" />
          <input type="number" placeholder="Sort order" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: e.target.value })}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none text-sm" />
        </div>
        <textarea required rows={5} placeholder="Points (one per line)" value={form.points} onChange={e => setForm({ ...form, points: e.target.value })}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none text-sm" />
        <div className="flex gap-3">
          <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg text-sm font-medium">
            {editId ? "Update" : "Add"}
          </button>
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setForm(emptyForm); }}
              className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-lg text-sm font-medium">
              Cancel
            </button>
          )}
        </div>
        {message && <p className="text-green-400 text-sm">{message}</p>}
      </form>

      {/* List */}
      <div className="flex flex-col gap-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-gray-900 rounded-xl p-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-white font-semibold">{exp.title}</p>
              <p className="text-gray-400 text-sm">{exp.company_name} · {exp.date}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(exp)} className="text-xs bg-blue-700 hover:bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => remove(exp.id)} className="text-xs bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminExperiences;
