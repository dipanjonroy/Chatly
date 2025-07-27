import { RotateLoader } from "react-spinners";

function Loader() {
  return ( 
    <div className="w-full h-screen bg-grey-500 bg-opacity-50 flex items-center justify-center">
      <RotateLoader size={10} color="black" loading={true}/>
    </div>
   );
}

export default Loader;