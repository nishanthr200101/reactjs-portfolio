import { useEffect, useState } from "react";
import { api } from "../../utils/api";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get("/messages")
      .then(setMessages)
      .catch(() => setMessages([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await api.patch(`/messages/${id}/read`, {});
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, is_read: true } : m))
    );
  };

  const remove = async (id) => {
    if (!confirm("Delete this message?")) return;
    await api.delete(`/messages/${id}`);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  if (loading) return <p className="text-gray-400">Loading messages…</p>;

  return (
    <div>
      <h1 className="text-white text-2xl font-bold mb-6">Messages</h1>
      {messages.length === 0 ? (
        <p className="text-gray-500">No messages yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`bg-gray-900 rounded-xl p-5 border-l-4 ${
                m.is_read ? "border-gray-700" : "border-orange-500"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold">{m.name}</p>
                  <p className="text-gray-400 text-sm">{m.email}</p>
                  <p className="text-gray-300 mt-2 text-sm whitespace-pre-wrap">{m.message}</p>
                  <p className="text-gray-600 text-xs mt-2">
                    {new Date(m.submitted_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  {!m.is_read && (
                    <button
                      onClick={() => markRead(m.id)}
                      className="text-xs bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Mark read
                    </button>
                  )}
                  <button
                    onClick={() => remove(m.id)}
                    className="text-xs bg-red-700 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
