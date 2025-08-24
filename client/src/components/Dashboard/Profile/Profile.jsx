import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsEditProfile,
  setShowProfile,
} from "../../../features/profile/profileSlice";
import IconButton from "../../ui/IconButton";
import ProfileImage from "../../ui/ProfileImage";
import profileImg from "../../../assets/avatar.png";
import { useRef } from "react";
import EditProfile from "./EditProfile";
import { getUserDetails } from "../../../features/users/userDetailsSlice";
import { IoCameraOutline } from "react-icons/io5";
import {
  deleteProfileImage,
  uploadProfileImage,
} from "../../../features/profile/profileImageSlice";

function Profile() {
  const dispatch = useDispatch();

  const { isEditProfile } = useSelector((store) => store.profile);
 const { user } = useSelector((store) => store.checkAuth);

 console.log(user)

  const fileInputRef = useRef();


  const handleImgClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(deleteProfileImage());
    }

    const formData = new FormData();
    formData.append("profileImage", file);

    dispatch(uploadProfileImage(formData))
      .unwrap()
      .then(() => {
        dispatch(getUserDetails());
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-w-[300px] h-full bg-primary rounded-xl p-2 font-inter">
      <div className="flex items-end justify-end">
        <IconButton onClick={() => dispatch(setShowProfile(false))}>
          <RxCross2 size={20} />
        </IconButton>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-22 h-22 rounded-full overflow-hidden group cursor-pointer">
            <ProfileImage
              src={user?.profileImage?.url || profileImg}
              width="w-22"
              height="h-22"
            />
            {isEditProfile && (
              <div
                className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                onClick={handleImgClick}
              >
                <IoCameraOutline size={20} />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            )}
          </div>
          <h2 className="mt-4 font-semibold">
            {user?.name?.firstName + " " + user?.name?.lastName}
          </h2>
          <p className="text-[13px] opacity-50">{user?.email}</p>
        </div>

        {isEditProfile && (
          <div className="mt-5">
            <EditProfile />
          </div>
        )}

        {!isEditProfile && (
          <button
            className="bg-secondary text-sm px-5 py-1 rounded-sm mt-5 hover:bg-hover cursor-pointer"
            onClick={() => dispatch(setIsEditProfile(true))}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
