import {
  FaChartLine,
  FaBuilding,
  FaExchangeAlt,
  FaCog,
  FaDatabase,
  FaChartPie,
  FaBookOpen
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-xl transition ${isActive
      ? "bg-violet-600 text-white"
      : "hover:bg-zinc-900 text-zinc-300"
    }`;

  return (
    <aside
      className="
        w-64
        bg-zinc-950
        border-r
        border-zinc-800
        min-h-screen
        p-6
      "
    >
      <h1 className="text-2xl font-bold mb-10">
        InsightIQ
      </h1>

      <nav className="space-y-3">

        <NavLink
          to="/dashboard"
          className={linkClass}
        >
          <FaChartLine />
          Dashboard
        </NavLink>

        <NavLink
          to="/analytics"
          className={linkClass}
        >
          <FaChartPie />
          Analytics
        </NavLink>

        <NavLink
          to="/workspaces"
          className={linkClass}
        >
          <FaBuilding />
          Businesses
        </NavLink>

        <NavLink
          to="/transactions"
          className={linkClass}
        >
          <FaExchangeAlt />
          Transactions
        </NavLink>

        <NavLink
          to="/datahub"
          className={linkClass}
        >
          <FaDatabase />
          Data Hub
        </NavLink>

        <NavLink
          to="/settings"
          className={linkClass}
        >
          <FaCog />
          Settings
        </NavLink>

        <NavLink
          to="/knowledge-center"
          className={linkClass}
        >
          <FaBookOpen />
          Knowledge Center
        </NavLink>

      </nav>
    </aside>
  );
}

export default Sidebar;