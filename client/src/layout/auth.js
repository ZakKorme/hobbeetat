import Navbar from "../components/Navbar/Navbar";
import ProtectedRoute from "../routes/ProtectedRoute";
import { Route, Switch, Redirect } from "react-router-dom";
import Box from "@mui/material/Box";

import Groups from "../containers/Groups/Groups";
import Members from "../containers/Members/Members";
import MessageBoard from "../containers/MessageBoard/MessageBoard";
import Profile from "../containers/Profile/Profile";

const auth = (props) => {
  return (
    <>
      <Navbar />
      <Box>
        <Switch>
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

export default auth;
