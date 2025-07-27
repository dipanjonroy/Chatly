import { useSelector } from "react-redux";
import { RotateLoader } from "react-spinners";

function Loader({ force = false }) {
  const { isLoading } = useSelector((store) => store.loader);

  if (!isLoading && !force) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <RotateLoader size={10} color="black" />
    </div>
  );
}

export default Loader;
