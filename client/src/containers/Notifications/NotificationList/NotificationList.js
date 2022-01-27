import {
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Box
} from "@mui/material";
import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { DateTime, Duration } from "luxon";

const typeMap = {
  1: "created a post",
  2: "liked a post",
  3: "shared a post"
};

const NotificationList = ({ notification, unread }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleNotificationOptions = () => {
    setAnchorEl(true);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const units = ["year", "month", "week", "day", "hour", "minute", "second"];

  const timeAgo = date => {
    let dateTime = DateTime.fromISO(date);
    const diff = dateTime.diffNow().shiftTo(...units);
    const unit = units.find(unit => diff.get(unit) !== 0) || "second";

    const relativeFormatter = new Intl.RelativeTimeFormat("en", {
      numeric: "auto"
    });
    return relativeFormatter.format(Math.trunc(diff.as(unit)), unit);
  };
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={"menu"}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MenuItem onClick={handleMenuClose}>Delete Notification</MenuItem>
      <MenuItem onClick={handleMenuClose}>Turn Off</MenuItem>
    </Menu>
  );
  return (
    <Box>
      <ListItem
        style={{
          backgroundColor: unread ? "#70b5f933" : "white"
        }}
        secondaryAction={
          <div>
            <ListItemText
              secondary={timeAgo(notification.created_on).split("ago")[0]}
              secondaryTypographyProps={{
                paddingRight: "5%",
                fontSize: "13px",
                display: "inline-flex",
                whiteSpace: "nowrap"
              }}
            />
            <MoreHorizIcon
              fontSize={"medium"}
              onClick={handleNotificationOptions}
            />
            {renderMenu}
          </div>
        }
      >
        <ListItemAvatar>
          <Avatar alt="user profile" src="https://www.fillmurray.com/500/900" />
        </ListItemAvatar>
        <ListItemText
          primary={`${notification.creator["first_name"]} ${typeMap[
            notification.type
          ]}`}
        />
      </ListItem>
    </Box>
  );
};

export default NotificationList;
