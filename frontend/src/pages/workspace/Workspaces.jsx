import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../api/axios";

function Workspaces() {
  const [workspaces, setWorkspaces] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [activeWorkspace, setActiveWorkspace] =
    useState(
      JSON.parse(
        localStorage.getItem(
          "activeWorkspace"
        )
      )
    );

  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
      industry: "",
      currency: "INR",
    });

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces =
  async () => {
    try {
      const userInfo =
        JSON.parse(
          localStorage.getItem(
            "userInfo"
          )
        );

      const { data } =
        await API.get(
          "/workspaces",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

      setWorkspaces(data);

      localStorage.setItem(
        "workspaceList",
        JSON.stringify(data)
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

        const handleCreateWorkspace =
          async (e) => {
            e.preventDefault();

            try {
              const userInfo =
                JSON.parse(
                  localStorage.getItem(
                    "userInfo"
                  )
                );

              const { data } =
                await API.post(
                  "/workspaces",
                  formData,
                  {
                    headers: {
                      Authorization: `Bearer ${userInfo.token}`,
                    },
                  }
                );

              if (!activeWorkspace) {
                localStorage.setItem(
                  "activeWorkspace",
                  JSON.stringify(data)
                );

                setActiveWorkspace(data);
              }

              setShowModal(false);

              setFormData({
                name: "",
                description: "",
                industry: "",
                currency: "INR",
              });

              fetchWorkspaces();
            } catch (error) {
              console.error(error);
            }
          };

        const selectWorkspace =
          (workspace) => {
            localStorage.setItem(
              "activeWorkspace",
              JSON.stringify(workspace)
            );

            setActiveWorkspace(workspace);
          };

        return (
          <DashboardLayout>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold">
                  Businesses
                </h1>

                <p className="text-zinc-500 mt-2">
                  Manage all your businesses
                  from one place.
                </p>
              </div>

              <button
                onClick={() =>
                  setShowModal(true)
                }
                className="
            px-5
            py-3
            bg-violet-700
            hover:bg-violet-600
            rounded-xl
            font-medium
            transition
          "
              >
                + Add Business
              </button>
            </div>

            {loading ? (
              <div className="text-zinc-400">
                Loading businesses...
              </div>
            ) : workspaces.length === 0 ? (
              <div
                className="
            bg-zinc-950
            border
            border-zinc-800
            rounded-2xl
            p-10
            text-center
          "
              >
                <h2 className="text-2xl font-semibold">
                  No Businesses Found
                </h2>

                <p className="text-zinc-500 mt-2">
                  Create your first business
                  to start analyzing data.
                </p>
              </div>
            ) : (
              <div
                className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          "
              >
                {workspaces.map(
                  (workspace) => (
                    <div
                      key={workspace._id}
                      onClick={() =>
                        selectWorkspace(
                          workspace
                        )
                      }
                      className={`
                  rounded-2xl
                  p-6
                  cursor-pointer
                  transition
                  border
                  ${activeWorkspace?._id ===
                          workspace._id
                          ? "bg-violet-950 border-violet-500"
                          : "bg-zinc-950 border-zinc-800 hover:border-violet-500"
                        }
                `}
                    >
                      <div className="flex justify-between items-start">
                        <h2 className="text-2xl font-semibold">
                          {workspace.name}
                        </h2>

                        {activeWorkspace?._id ===
                          workspace._id && (
                            <span
                              className="
                        text-xs
                        bg-violet-600
                        px-3
                        py-1
                        rounded-full
                      "
                            >
                              Active
                            </span>
                          )}
                      </div>

                      <p className="text-zinc-500 mt-2">
                        {
                          workspace.description
                        }
                      </p>

                      <div className="mt-6 flex justify-between">
                        <div>
                          <p className="text-zinc-500 text-sm">
                            Industry
                          </p>

                          <p>
                            {
                              workspace.industry
                            }
                          </p>
                        </div>

                        <div>
                          <p className="text-zinc-500 text-sm">
                            Currency
                          </p>

                          <p>
                            {
                              workspace.currency
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            {showModal && (
              <div
                className="
            fixed
            inset-0
            bg-black/70
            backdrop-blur-sm
            flex
            items-center
            justify-center
            z-50
          "
              >
                <div
                  className="
              bg-zinc-950
              border
              border-zinc-800
              rounded-2xl
              p-8
              w-full
              max-w-lg
            "
                >
                  <h2 className="text-2xl font-bold mb-6">
                    Create Business
                  </h2>

                  <form
                    onSubmit={
                      handleCreateWorkspace
                    }
                    className="space-y-4"
                  >
                    <input
                      type="text"
                      placeholder="Business Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      required
                      className="
                  w-full
                  p-3
                  bg-zinc-900
                  rounded-xl
                  outline-none
                "
                    />

                    <input
                      type="text"
                      placeholder="Industry"
                      value={
                        formData.industry
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          industry:
                            e.target.value,
                        })
                      }
                      required
                      className="
                  w-full
                  p-3
                  bg-zinc-900
                  rounded-xl
                  outline-none
                "
                    />

                    <textarea
                      placeholder="Description"
                      value={
                        formData.description
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description:
                            e.target.value,
                        })
                      }
                      className="
                  w-full
                  p-3
                  bg-zinc-900
                  rounded-xl
                  outline-none
                "
                    />

                    <select
                      value={
                        formData.currency
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currency:
                            e.target.value,
                        })
                      }
                      className="
                  w-full
                  p-3
                  bg-zinc-900
                  rounded-xl
                  outline-none
                "
                    >
                      <option value="INR">
                        INR
                      </option>

                      <option value="USD">
                        USD
                      </option>

                      <option value="EUR">
                        EUR
                      </option>
                    </select>

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="
                    flex-1
                    bg-violet-700
                    hover:bg-violet-600
                    py-3
                    rounded-xl
                  "
                      >
                        Create
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setShowModal(false)
                        }
                        className="
                    flex-1
                    bg-zinc-800
                    hover:bg-zinc-700
                    py-3
                    rounded-xl
                  "
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </DashboardLayout>
        );
      }

export default Workspaces;