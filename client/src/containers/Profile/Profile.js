import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useHistory, useLocation } from "react-router-dom";
import authSlice from "../../store/slices/auth";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";

import Navbar from "../../components/Navbar/Navbar";
import GroupMenu from "../../components/GroupMenu/GroupMenu";
import EventsMenu from "../../components/EventMenu/EventMenu";
import Post from "../../components/Post/Post";
import Feed from "../../components/Feed/Feed";

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

  const hobbyState = useSelector((state => state.hobby));

  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
    history.push("/login");
  };
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "block" },
          backgroundColor: "#fafafa",
        }}
      >
        <Grid container >
          <Grid
            container
            item
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
        
          >
            <Grid item sx={{ marginLeft: "30%"}} xs={4}>
              <Container maxWidth="sm" >
                {hobbyState.currentHobby && hobbyState.posts ? (
                <>
                <Post/>
                <Divider style={{ marginTop: "3%", marginBottom: "3%" }} />
                <Feed />
                </>
                )
              :null}
              </Container>
            </Grid>
            <Grid
              item
              xs={2}
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <GroupMenu />              
              <EventsMenu />
            </Grid> 
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Profile;
