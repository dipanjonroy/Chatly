import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { PuffLoader } from "react-spinners";

function Loader({ force = false, message = "Loading..." }) {
  const { isLoading } = useSelector((store) => store.loader);

  if (!isLoading && !force) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <PuffLoader size={60} color="#38bdf8" />
        <motion.p
          className="mt-4 text-white text-lg font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {message}
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Loader;
