import { NavLink, useNavigate } from "react-router-dom";

const links = [
  { to: "/admin/messages",    label: "Messages" },
  { to: "/admin/experiences", label: "Experiences" },
  { to: "/admin/resume",      label: "Resume" },
  { to: "/admin/settings",    label: "Settings" },
];

const AdminSidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin-token");
    navigate("/admin/login");
  };

  return (
    <aside className="w-52 min-h-screen bg-gray-900 flex flex-col py-8 px-4 gap-2 shrink-0">
      <h2 className="text-white font-bold text-lg mb-6 px-2">Admin Panel</h2>
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? "bg-orange-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`
          }
        >
          {l.label}
        </NavLink>
      ))}
      <button
        onClick={logout}
        className="mt-auto px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 text-left"
      >
        Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
