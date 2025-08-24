import FormLabel from "../../ui/FormLabel";
import FormInput from "../../ui/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { setIsEditProfile } from "../../../features/profile/profileSlice";
import { useState } from "react";
import { isEmpty } from "../../../helper/formHelper";
import toast from "react-hot-toast";
import { MdDoDisturbAlt } from "react-icons/md";
import { updateUser } from "../../../features/users/updateProfileSlice";
import { getUserDetails } from "../../../features/users/userDetailsSlice";

function EditProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.checkAuth);

  const [updatedInfo, setUpdatedInfo] = useState({
    firstName: user.name?.firstName,
    lastName: user.name?.lastName,
  });

  const handleUpdateProfile = () => {
    if (isEmpty(updatedInfo?.firstName)) {
      toast.error("Firstname can't be empty.");
      return;
    } else if (isEmpty(updatedInfo?.lastName)) {
      toast.error("Lastname can't be empty.");
      return;
    }

    dispatch(updateUser(updatedInfo))
      .unwrap()
      .then(() => {
        dispatch(getUserDetails());
        dispatch(setIsEditProfile(false));
      });
  };

  return (
    <div>
      <div>
        <FormLabel name="Firstname" />
        <FormInput
          value={updatedInfo?.firstName}
          color="white"
          outline="none"
          background="secondary"
          onChange={(e) =>
            setUpdatedInfo({ ...updatedInfo, firstName: e.target.value })
          }
        />
      </div>

      <div className="mt-3">
        <FormLabel name="Lastname" />
        <FormInput
          value={updatedInfo?.lastName}
          color="white"
          outline="none"
          background="secondary"
          onChange={(e) =>
            setUpdatedInfo({ ...updatedInfo, lastName: e.target.value })
          }
        />
      </div>

      <div className="mt-3">
        <FormLabel name="Email" />
        <FormInput
          value={user.email}
          color="white"
          outline="none"
          background="secondary"
          disabled={true}
        />
      </div>

      <div className="flex gap-3">
        <button
          className="bg-secondary text-sm px-6 py-2 rounded-sm mt-5 hover:bg-hover cursor-pointer"
          onClick={handleUpdateProfile}
        >
          Update
        </button>

        <button
          className="bg-secondary text-sm px-6 py-2 rounded-sm mt-5 hover:bg-hover cursor-pointer"
          onClick={() => dispatch(setIsEditProfile(false))}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
