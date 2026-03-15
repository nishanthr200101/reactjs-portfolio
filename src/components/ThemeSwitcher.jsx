import { useTheme } from "../context/ThemeContext";

const THEMES = [
  { id: "orange", color: "#b86704", label: "Orange" },
  { id: "blue",   color: "#3b82f6", label: "Blue" },
  { id: "purple", color: "#8b5cf6", label: "Purple" },
  { id: "green",  color: "#22c55e", label: "Green" },
];

const ThemeSwitcher = () => {
  const { theme, changeTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      {THEMES.map((t) => (
        <button
          key={t.id}
          title={t.label}
          onClick={() => changeTheme(t.id)}
          className="w-5 h-5 rounded-full transition-transform hover:scale-125 focus:outline-none"
          style={{
            backgroundColor: t.color,
            boxShadow: theme === t.id ? `0 0 0 2px white, 0 0 0 4px ${t.color}` : "none",
          }}
        />
      ))}
    </div>
  );
};

export default ThemeSwitcher;
