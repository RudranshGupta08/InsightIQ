import { motion } from "framer-motion";

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-black flex">
      
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 border-r border-zinc-900">
        
        <div>
          <h1 className="text-3xl font-bold">
            InsightIQ
          </h1>

          <p className="text-zinc-500 mt-2">
            Business Intelligence Platform
          </p>
        </div>

        <div>
          <h2 className="text-5xl font-semibold leading-tight max-w-xl">
            Transform business data into
            actionable insights.
          </h2>

          <p className="text-zinc-500 mt-6 max-w-lg">
            Manage multiple businesses,
            uncover trends, track growth,
            and make data-driven decisions.
          </p>
        </div>

      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="flex-1 flex items-center justify-center p-6"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default AuthLayout;