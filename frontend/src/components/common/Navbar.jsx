import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaBuilding,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const [activeWorkspace, setActiveWorkspace] =
    useState(null);

  const [selectedWorkspace, setSelectedWorkspace] =
    useState(null);

  const [workspaces, setWorkspaces] =
    useState([]);

  const [showDropdown, setShowDropdown] =
    useState(false);

  const [user, setUser] =
    useState(null);

  useEffect(() => {
    const workspace =
      JSON.parse(
        localStorage.getItem(
          "activeWorkspace"
        )
      );

    const userInfo =
      JSON.parse(
        localStorage.getItem(
          "userInfo"
        )
      );

    const allWorkspaces =
      JSON.parse(
        localStorage.getItem(
          "workspaceList"
        )
      ) || [];

    if (workspace) {
      setActiveWorkspace(workspace);
      setSelectedWorkspace(workspace);
    }

    if (userInfo) {
      setUser(userInfo);
    }

    setWorkspaces(allWorkspaces);
  }, []);

  const handleSwitchWorkspace = () => {
    if (!selectedWorkspace) return;

    localStorage.setItem(
      "activeWorkspace",
      JSON.stringify(selectedWorkspace)
    );

    setActiveWorkspace(selectedWorkspace);

    setShowDropdown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem(
      "activeWorkspace"
    );

    navigate("/");
  };

  return (
    <div
      className="
        flex
        items-center
        justify-between
        mb-8
        bg-zinc-950
        border
        border-zinc-800
        rounded-2xl
        px-6
        py-4
      "
    >
      <div>
        <h2 className="text-2xl font-bold">
          InsightIQ
        </h2>

        <p className="text-zinc-500 text-sm">
          Multi-Business Intelligence Platform
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="relative">

          <button
            onClick={() =>
              setShowDropdown(
                !showDropdown
              )
            }
            className="
              flex
              items-center
              gap-2
              bg-zinc-900
              px-4
              py-2
              rounded-xl
              border
              border-zinc-800
            "
          >
            <FaBuilding />

            <span>
              {activeWorkspace
                ? activeWorkspace.name
                : "Select Business"}
            </span>

            <FaChevronDown />
          </button>

          {showDropdown && (
            <div
              className="
                absolute
                right-0
                mt-3
                w-72
                bg-zinc-950
                border
                border-zinc-800
                rounded-2xl
                p-4
                shadow-2xl
                z-50
              "
            >
              <div className="space-y-2 mb-4">

                {workspaces.length === 0 ? (
                  <p className="text-zinc-500 text-sm">
                    No businesses found
                  </p>
                ) : (
                  workspaces.map(
                    (workspace) => (
                      <label
                        key={
                          workspace._id
                        }
                        className="
                          flex
                          items-center
                          gap-3
                          p-2
                          rounded-xl
                          hover:bg-zinc-900
                          cursor-pointer
                        "
                      >
                        <input
                          type="radio"
                          name="workspace"
                          checked={
                            selectedWorkspace?._id ===
                            workspace._id
                          }
                          onChange={() =>
                            setSelectedWorkspace(
                              workspace
                            )
                          }
                        />

                        <span>
                          {
                            workspace.name
                          }
                        </span>
                      </label>
                    )
                  )
                )}

              </div>

              <button
                onClick={
                  handleSwitchWorkspace
                }
                className="
                  w-full
                  bg-violet-700
                  hover:bg-violet-600
                  py-2
                  rounded-xl
                  transition
                "
              >
                Switch Business
              </button>
            </div>
          )}

        </div>

        <div
          className="
            flex
            items-center
            gap-2
            bg-zinc-900
            px-4
            py-2
            rounded-xl
            border
            border-zinc-800
          "
        >
          <FaUserCircle />

          <span>
            {user
              ? user.name
              : "Guest"}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="
            flex
            items-center
            gap-2
            px-4
            py-2
            bg-red-600
            hover:bg-red-500
            rounded-xl
            transition
          "
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>
    </div>
  );
}

export default Navbar;