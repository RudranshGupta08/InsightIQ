import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

function DashboardLayout({
  children,
}) {
  return (
    <div className="flex min-h-screen bg-black text-white">

      <Sidebar />

      <div className="flex-1 p-8">

        <Navbar />

        {children}

      </div>

    </div>
  );
}

export default DashboardLayout;