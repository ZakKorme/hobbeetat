import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Grid } from "@mui/material";
import authSlice from "../../store/slices/auth";

import Navbar from "../../components/Navbar/Navbar";
import GroupMenu from "../../components/GroupMenu/GroupMenu";
import ActivitiesMenu from "../../components/ActivitiesMenu/ActivitesMenu";
import Post from "../../components/Post/Post";

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
    history.push("/login");
  };

  return (
    <div>
      <Navbar logout={handleLogout} />
      <Grid container spacing={3}>
        <Grid item xs></Grid>
        <Grid item xs={6}>
          <Post />
        </Grid>
        <Grid item xs style={{ paddingRight: "2%" }}>
          <GroupMenu title={"Group Acitivity"} />
          <ActivitiesMenu title={"Upcoming Events"} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
