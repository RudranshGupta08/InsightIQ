import {
  FaPalette,
  FaTextHeight,
  FaCompressArrowsAlt,
  FaChartLine,
  FaBell,
  FaUniversalAccess,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

function Settings() {
  const { user, logout } = useAuth();

  const [settings, setSettings] = useState(() => {
    const saved =
      localStorage.getItem("insightiqSettings");

    return saved
      ? JSON.parse(saved)
      : {
          theme: "dark",
          fontSize: "medium",
          density: "comfortable",
          dashboardPeriod: "30d",
          notifications: true,
          reduceMotion: false,
        };
  });

  useEffect(() => {
    localStorage.setItem(
      "insightiqSettings",
      JSON.stringify(settings)
    );

    applySettings(settings);
  }, [settings]);

  const applySettings = (currentSettings) => {
    const root = document.documentElement;

    root.setAttribute(
      "data-theme",
      currentSettings.theme
    );

    root.setAttribute(
      "data-font-size",
      currentSettings.fontSize
    );

    root.setAttribute(
      "data-density",
      currentSettings.density
    );

    root.setAttribute(
      "data-reduce-motion",
      currentSettings.reduceMotion
        ? "true"
        : "false"
    );
  };

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));

    toast.success("Setting updated");
  };

  const handleLogout = () => {
    logout();
    toast.success("Signed out successfully");
  };

  return (
    <div className="min-h-screen p-8">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="text-zinc-500 mt-2">
          Configure your InsightIQ workspace
          and application preferences.
        </p>

      </div>

      <div className="max-w-5xl space-y-6">

        {/* Appearance */}

        <section className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-violet-600/10 text-violet-400 flex items-center justify-center">
              <FaPalette />
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                Appearance
              </h2>

              <p className="text-sm text-zinc-500">
                Customize how InsightIQ looks.
              </p>
            </div>

          </div>

          <div className="space-y-5">

            {/* Theme */}

            <SettingRow
              icon={<FaPalette />}
              title="Theme"
              description="Choose your preferred interface theme."
            >

              <select
                value={settings.theme}
                onChange={(e) =>
                  updateSetting(
                    "theme",
                    e.target.value
                  )
                }
                className="setting-select"
              >

                <option value="dark">
                  Dark
                </option>

                <option value="light">
                  Light
                </option>

              </select>

            </SettingRow>

            {/* Font */}

            <SettingRow
              icon={<FaTextHeight />}
              title="Font Size"
              description="Adjust the readability of the interface."
            >

              <select
                value={settings.fontSize}
                onChange={(e) =>
                  updateSetting(
                    "fontSize",
                    e.target.value
                  )
                }
                className="setting-select"
              >

                <option value="small">
                  Small
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="large">
                  Large
                </option>

              </select>

            </SettingRow>

            {/* Density */}

            <SettingRow
              icon={<FaCompressArrowsAlt />}
              title="Interface Density"
              description="Control spacing across the application."
            >

              <select
                value={settings.density}
                onChange={(e) =>
                  updateSetting(
                    "density",
                    e.target.value
                  )
                }
                className="setting-select"
              >

                <option value="comfortable">
                  Comfortable
                </option>

                <option value="compact">
                  Compact
                </option>

              </select>

            </SettingRow>

          </div>

        </section>

        {/* Dashboard */}

        <section className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center">
              <FaChartLine />
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                Business Intelligence
              </h2>

              <p className="text-sm text-zinc-500">
                Configure your default analytics preferences.
              </p>
            </div>

          </div>

          <SettingRow
            icon={<FaChartLine />}
            title="Default Dashboard Period"
            description="Choose the time range shown by default."
          >

            <select
              value={settings.dashboardPeriod}
              onChange={(e) =>
                updateSetting(
                  "dashboardPeriod",
                  e.target.value
                )
              }
              className="setting-select"
            >

              <option value="7d">
                Last 7 Days
              </option>

              <option value="30d">
                Last 30 Days
              </option>

              <option value="90d">
                Last 90 Days
              </option>

              <option value="1y">
                Last 12 Months
              </option>

            </select>

          </SettingRow>

        </section>

        {/* Notifications & Accessibility */}

        <section className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center">
              <FaBell />
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                Notifications & Accessibility
              </h2>

              <p className="text-sm text-zinc-500">
                Control important alerts and interface behavior.
              </p>
            </div>

          </div>

          <div className="space-y-5">

            <ToggleRow
              icon={<FaBell />}
              title="Business Notifications"
              description="Receive important business alerts and system notifications."
              enabled={settings.notifications}
              onChange={() =>
                updateSetting(
                  "notifications",
                  !settings.notifications
                )
              }
            />

            <ToggleRow
              icon={<FaUniversalAccess />}
              title="Reduce Motion"
              description="Reduce animations for a more comfortable experience."
              enabled={settings.reduceMotion}
              onChange={() =>
                updateSetting(
                  "reduceMotion",
                  !settings.reduceMotion
                )
              }
            />

          </div>

        </section>

        {/* Account */}

        <section className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-zinc-800 text-zinc-300 flex items-center justify-center">
              <FaUser />
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                Account
              </h2>

              <p className="text-sm text-zinc-500">
                Your InsightIQ account information.
              </p>
            </div>

          </div>

          <div className="flex items-center justify-between gap-4">

            <div>

              <p className="font-medium">
                {user?.name || "InsightIQ User"}
              </p>

              <p className="text-sm text-zinc-500">
                {user?.email || "No email available"}
              </p>

            </div>

            <button
              onClick={handleLogout}
              className="
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-xl
                border
                border-red-900/50
                text-red-400
                hover:bg-red-950/40
                transition
              "
            >

              <FaSignOutAlt />

              Sign Out

            </button>

          </div>

        </section>

      </div>

    </div>
  );
}

/* -------------------------------- */
/* Setting Row */
/* -------------------------------- */

function SettingRow({
  icon,
  title,
  description,
  children,
}) {
  return (
    <div className="flex items-center justify-between gap-6">

      <div className="flex items-center gap-4">

        <div className="text-zinc-500">
          {icon}
        </div>

        <div>

          <p className="font-medium">
            {title}
          </p>

          <p className="text-sm text-zinc-500 mt-1">
            {description}
          </p>

        </div>

      </div>

      {children}

    </div>
  );
}

/* -------------------------------- */
/* Toggle Row */
/* -------------------------------- */

function ToggleRow({
  icon,
  title,
  description,
  enabled,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-6">

      <div className="flex items-center gap-4">

        <div className="text-zinc-500">
          {icon}
        </div>

        <div>

          <p className="font-medium">
            {title}
          </p>

          <p className="text-sm text-zinc-500 mt-1">
            {description}
          </p>

        </div>

      </div>

      <button
        onClick={onChange}
        className={`
          relative
          w-12
          h-6
          rounded-full
          transition
          ${
            enabled
              ? "bg-violet-600"
              : "bg-zinc-700"
          }
        `}
      >

        <span
          className={`
            absolute
            top-1
            w-4
            h-4
            bg-white
            rounded-full
            transition
            ${
              enabled
                ? "left-7"
                : "left-1"
            }
          `}
        />

      </button>

    </div>
  );
}

export default Settings;