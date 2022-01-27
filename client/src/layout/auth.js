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
import noteSlice from "../store/slices/notes";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Notifications from "../containers/Notifications/Notifications";
import { toast, Toaster } from "react-hot-toast";
import notificationSlice from "../store/slices/notifications";

const Auth = props => {
  const hobbyState = useSelector(state => state.hobby);
  const authState = useSelector(state => state.auth);
  const notificationState = useSelector(state => state.notification);
  const currentHobby = hobbyState.currentHobby;
  const dispatch = useDispatch();

  const unreadNotifications = notificationState
    ? notificationState.unread
    : null;

  useEffect(() => {
    //Websocket for Notification
    let notificationClient = new WebSocket(
      `${process.env.REACT_APP_WEBSOCKET_NOTIFICATION_URL}`
    );

    notificationClient.onmessage = e => {
      const data = JSON.parse(e.data);
      if (data.notification) {
        // Notify users beside the creator
        if (
          data.notification.creator.id !== authState.account.id &&
          data.notification.is_seen !== true
        ) {
          let updatedUnReadNotifications = [
            data.notification,
            ...unreadNotifications
          ];
          dispatch(
            notificationSlice.actions.setUnreadNotifications({
              unread: updatedUnReadNotifications
            })
          );

          toast.success(
            `${data.notification.creator["first_name"]} ${data.notification
              .notification}`
          );
        }
      }
    };

    notificationClient.onclose = e => {
      console.error("Web Socket Closed Unexpectedly");
    };
    return () => {
      notificationClient.close();
    };
  }, []);

  useEffect(
    () => {
      const config = {
        headers: {
          Authorization: `Bearer ${authState.token}`
        }
      };
      // Get Posts
      axios
        .get(
          `http://127.0.0.1:8000/api/v1/auth/posts/hobby?hobby=${currentHobby}`,
          config
        )
        .then(res => {
          dispatch(
            hobbySlice.actions.setHobbyPosts({
              posts: res.data
            })
          );
        })
        .catch(err => console.error(err));
      // Get Groups
      axios
        .get(`http://127.0.0.1:8000/api/v1/auth/groups/${currentHobby}`, config)
        .then(res => {
          dispatch(
            hobbySlice.actions.setHobbyGroups({
              groups: res.data
            })
          );
        })
        .catch(err => console.error(err));
      // Get Events
      axios
        .get(
          `http://127.0.0.1:8000/api/v1/auth/events/hobby?hobby=${currentHobby}`,
          config
        )
        .then(res => {
          dispatch(
            hobbySlice.actions.setHobbyEvents({
              events: res.data
            })
          );
        })
        .catch(err => console.error(err));
      // Get Notes
      axios
        .get(
          `http://127.0.0.1:8000/api/v1/auth/notes?hobby=${currentHobby}&user=${authState
            .account.id}`,
          config
        )
        .then(res => {
          dispatch(
            noteSlice.actions.setNotes({
              notes: res.data
            })
          );
        })
        .catch(err => console.error(err));
    },
    [dispatch, authState, currentHobby]
  );
  return (
    <div>
      <Navbar />
      <Box>
        <Switch>
          <ProtectedRoute
            exact
            path="/home/notifications"
            component={Notifications}
          />
          <ProtectedRoute
            exact
            path="/home/groups/page"
            component={GroupPage}
          />
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
        <div>
          <Toaster position="bottom-right" reverseOrder={true} />
        </div>
      </Box>
    </div>
  );
};

export default Auth;
