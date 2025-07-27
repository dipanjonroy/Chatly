import image from "../../assets/5.jpg";
import { RxCross2 } from "react-icons/rx";

function UpdateProfileModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-inter">
      <div className="bg-white rounded-md shadow-lg px-6 py-5 w-full max-w-md max-h-[90vh] overflow-y-auto text-black relative">
        <h2 className="text-xl font-semibold">Update profile information</h2>

        <div className="mt-5 w-full">
          <label htmlFor="name" className="block text-sm text-black">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="block w-full border border-border rounded-none text-base text-background px-3 py-2 mt-1 focus:outline focus:outline-1 focus:outline-border focus:rounded-none"
          />
        </div>

        <div className="mt-4 w-full">
          <label htmlFor="email" className="block text-sm text-black">
            Email:
          </label>
          <input
            type="text"
            id="email"
            className="block w-full border border-border rounded-none text-base text-background px-3 py-2 mt-1 focus:outline focus:outline-1 focus:outline-border focus:rounded-none"
          />
        </div>

        <div>
          <div className="mt-4 w-full">
            <label htmlFor="file" className="block text-sm text-black">
              Upload image:
            </label>
            <input
              type="file"
              id="file"
              className="w-full border border-border rounded-none text-background px-3 py-2 mt-1 focus:outline focus:outline-1 focus:outline-border focus:rounded-none"
            />
          </div>

          <div className="w-30 mt-2">
            <img src={image} alt="" />
          </div>
        </div>

        <button className="bg-button text-white px-4 py-1 mt-5 cursor-pointer">
          Update
        </button>

        <button className="bg-button text-white p-2 cursor-pointer rounded-tr-md  absolute top-0 right-0">
          <RxCross2 size={15}/>
        </button>


      </div>
    </div>
  );
}

export default UpdateProfileModal;
