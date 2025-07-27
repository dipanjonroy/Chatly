import { useSelector } from "react-redux";
import { RotateLoader } from "react-spinners";

function Loader({ force = false }) {
  const { isLoading } = useSelector((store) => store.loader);

  if (!isLoading && !force) return null;

  return (
    <div className="w-full h-screen bg-grey-500 bg-opacity-50 flex items-center justify-center">
      <RotateLoader size={10} color="black" loading={true} />
    </div>
  );
}

export default Loader;
