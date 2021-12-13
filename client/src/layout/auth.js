import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import ProtectedRoute from "../routes/ProtectedRoute";
import { Route, Switch, Redirect } from "react-router-dom";
import Box from "@mui/material/Box";

import Groups from "../containers/Groups/Groups";
import Members from "../containers/Members/Members";
import MessageBoard from "../containers/MessageBoard/MessageBoard";
import Profile from "../containers/Profile/Profile";
import GroupPage from "../containers/GroupPage/GroupPage";

import axios from "axios";
import hobbySlice from "../store/slices/hobby";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";



const Auth = (props) => {
  const hobbyState = useSelector((state) => state.hobby);
  const authState = useSelector((state) => state.auth);
  const currentHobby = hobbyState.currentHobby
  const dispatch = useDispatch()
 

  useEffect(() =>{
    const config = {
      headers: {
        'Authorization': `Bearer ${authState.token}`
      }
    }
    // Get Posts 
    axios.get(`http://127.0.0.1:8000/api/v1/auth/posts/${currentHobby}`, config).then((res) => {
      dispatch(hobbySlice.actions.setHobbyPosts({
        posts: res.data
      }));
    }).catch((err) => console.error(err))
    // Get Groups 
    axios.get(`http://127.0.0.1:8000/api/v1/auth/groups/${currentHobby}`, config).then((res) => {
      dispatch(hobbySlice.actions.setHobbyGroups({
        groups: res.data,
      }));
    }).catch((err) => console.error(err))
    // Get Events
    axios.get(`http://127.0.0.1:8000/api/v1/auth/events/${currentHobby}`, config).then((res) => {
      dispatch(hobbySlice.actions.setHobbyEvents({
        events: res.data,
      }));
    }).catch((err) => console.error(err))
  }, [dispatch, authState, currentHobby])
  return (
    <>
      <Navbar />
      <Box >
        <Switch>
          <ProtectedRoute exact path="/home/groups/page" component={GroupPage} />
          <ProtectedRoute exact path="/home/groups" component={Groups} />
          <ProtectedRoute exact path="/home/members" component={Members} />
          <ProtectedRoute
            exact
            path="/home/message-board"
            component={MessageBoard}
          />
          <ProtectedRoute exact path="/home" component={Profile} />
          <Redirect from="*" to="/home" />
          <Route />
        </Switch>
      </Box>
    </>
  );
};

export default Auth;
