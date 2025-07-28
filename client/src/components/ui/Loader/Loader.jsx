import { useSelector } from "react-redux";

function Loader() {
  const { isLoading } = useSelector((store) => store.loader);
  if (!isLoading) return null;
  return (
    <div className="LoadingOverlay">
      <div className="Line-Progress">
        <div className="indeterminate"></div>
      </div>
    </div>
  );
}

export default Loader;
