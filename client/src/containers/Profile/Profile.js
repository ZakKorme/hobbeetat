import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import authSlice from "../../store/slices/auth";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
    history.push("/login");
  };

  return (
    <div className="w-full h-screen">
      <div className="w-full p-6">
        <button
          className="rounded p-2 w-32 bg-red-700 text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="w-full h-full text-center items-center">
        <p className="self-center my-auto"></p>
      </div>
    </div>
  );
};

export default Profile;
