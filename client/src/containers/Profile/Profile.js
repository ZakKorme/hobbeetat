import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import authSlice from "../../store/slices/auth";

import Navbar from "../../components/Navbar/Navbar";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
    history.push("/login");
  };
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // mainContent.current.scrollTop = 0;
  }, [location]);

  return (
    <>
      <Navbar />
    </>
  );
};

export default Profile;
