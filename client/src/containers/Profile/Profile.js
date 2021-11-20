import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useHistory, useLocation } from "react-router-dom";
import authSlice from "../../store/slices/auth";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Navbar from "../../components/Navbar/Navbar";
import GroupMenu from "../../components/GroupMenu/GroupMenu";
import EventsMenu from "../../components/EventMenu/EventMenu";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  marginTop: theme.spacing(4),
  marginRight: theme.spacing(2),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));
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
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "block" },
        }}
      >
        <Grid
          container
          spacing={1}
          direction="column"
          alignItems="flex-end"
          wrap="nowrap"
        >
          <Grid item xs="auto" zeroMinWidth>
            <Item>
              <GroupMenu />
            </Item>
          </Grid>
          <Grid item xs>
            <Item>
              <EventsMenu />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Profile;
