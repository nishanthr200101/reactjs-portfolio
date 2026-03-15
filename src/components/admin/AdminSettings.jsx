import { useEffect, useState } from "react";
import { api } from "../../utils/api";

const THEMES = [
  { id: "orange", label: "Orange", color: "#b86704" },
  { id: "blue",   label: "Blue",   color: "#3b82f6" },
  { id: "purple", label: "Purple", color: "#8b5cf6" },
  { id: "green",  label: "Green",  color: "#22c55e" },
];

const AdminSettings = () => {
  const [currentTheme, setCurrentTheme] = useState("orange");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/settings/public")
      .then((data) => {
        if (data?.defaultTheme) setCurrentTheme(data.defaultTheme);
      })
      .catch(() => {});
  }, []);

  const save = async (theme) => {
    setSaving(true);
    setMessage("");
    try {
      await api.patch("/settings/theme", { defaultTheme: theme });
      setCurrentTheme(theme);
      setMessage("Default theme updated!");
    } catch {
      setMessage("Failed to update theme.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-white text-2xl font-bold mb-6">Site Settings</h1>

      <div className="bg-gray-900 rounded-xl p-6">
        <p className="text-gray-300 font-medium mb-4">Default Theme</p>
        <div className="flex gap-4 flex-wrap">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => save(t.id)}
              disabled={saving}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all ${
                currentTheme === t.id
                  ? "border-white text-white"
                  : "border-gray-700 text-gray-400 hover:border-gray-500"
              }`}
            >
              <span
                className="w-5 h-5 rounded-full shrink-0"
                style={{ backgroundColor: t.color }}
              />
              {t.label}
            </button>
          ))}
        </div>
        {message && (
          <p className={`text-sm mt-4 ${message.includes("updated") ? "text-green-400" : "text-red-400"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
