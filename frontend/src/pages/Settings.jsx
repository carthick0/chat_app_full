import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";
import { Send } from "lucide-react";

const Settings = () => {
  const { theme, setTheme } = useThemeStore(); // 🔹 Using Zustand store

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <h2 className="text-lg font-semibold">Theme Settings</h2>
      <p className="text-sm text-base-content/70">Choose a theme for your chat interface:</p>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mt-4">
        {THEMES.map((t) => (
          <button
            key={t}
            className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
              ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
            `}
            onClick={() => setTheme(t)}
          >
            <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
              <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                <div className="rounded bg-primary"></div>
                <div className="rounded bg-secondary"></div>
                <div className="rounded bg-accent"></div>
                <div className="rounded bg-neutral"></div>
              </div>
            </div>
            <span className="text-[11px] font-medium truncate w-full text-center">{t}</span>
          </button>
        ))}
      </div>

      {/* Preview Chat UI */}
      <h3 className="text-lg font-semibold mt-6">Preview</h3>
      <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
        <div className="p-4 bg-base-200">
          <div className="max-w-lg mx-auto">
            <div className="bg-base-100 rounded-xl shadow-sm">
              <div className="p-4 border-b border-base-300 bg-base-100">
                <h3 className="font-medium text-sm">John Doe</h3>
                <p className="text-xs text-base-content/70">Online</p>
              </div>
              <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                <p className="bg-primary text-primary-content p-3 rounded-xl text-sm">Hey there!</p>
                <p className="bg-base-200 p-3 rounded-xl text-sm">Hello!</p>
              </div>
              <div className="p-4 border-t border-base-300 bg-base-100 flex gap-2">
                <input type="text" className="input input-bordered flex-1 text-sm" placeholder="Type a message..." readOnly />
                <button className="btn btn-primary">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
