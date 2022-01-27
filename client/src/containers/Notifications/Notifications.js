import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Menu,
  List,
  Grid,
  MenuItem,
  Container,
  Box
} from "@mui/material";
import { useSelector } from "react-redux";
import NotificationList from "./NotificationList/NotificationList";

const Notifications = props => {
  const notificationState = useSelector(state => state.notification);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleNotificationOptions = () => {
    setAnchorEl(true);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={"basic-button"}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      //transformOrigin={{vertical: 'top', horizontal: 'center'}}
    >
      <MenuItem onClick={handleMenuClose}>Delete Notification</MenuItem>
      <MenuItem onClick={handleMenuClose}>Turn Off</MenuItem>
    </Menu>
  );
  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "block" },
          backgroundColor: "#fafafa"
        }}
      >
        <Grid container>
          <Grid
            container
            item
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
          >
            <Grid item xs={8}>
              <Container maxWidth="sm" style={{ paddingTop: "2%" }}>
                <Card variant="outlined">
                  <CardHeader subheader={"Notifications"} />
                  <List>
                    {notificationState.unread
                      ? notificationState.unread.map((notification, index) => {
                          return (
                            <NotificationList
                              key={index}
                              notification={notification}
                              unread={true}
                            />
                          );
                        })
                      : null}

                    {notificationState.read
                      ? notificationState.read.map((notification, index) => {
                          return (
                            <NotificationList
                              key={index}
                              notification={notification}
                              unread={false}
                            />
                          );
                        })
                      : null}
                  </List>
                </Card>
              </Container>
            </Grid>
            <Grid
              item
              xs={2}
              direction="column"
              justifyContent="flex-end"
              alignItems="flex-start"
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Notifications;
