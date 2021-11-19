import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";

import Icon from "@mui/material/Icon";
import { IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const drawerWidth = 230;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const Sidebar = (props) => {
  const theme = useTheme();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
      variant="persistent"
      anchor="left"
      open={props.open}
    >
      <DrawerHeader>
        <IconButton onClick={props.handleClose}>
          {theme.direction === "rtl" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {["Feed", "Message Board", "Members", "Groups"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {text === "Feed" ? (
                <Icon
                  baseClassName="far"
                  className="fa-newspaper"
                  fontSize="small"
                />
              ) : text === "Message Board" ? (
                <Icon
                  baseClassName="far"
                  className="fa-comment-dots"
                  fontSize="small"
                />
              ) : text === "Members" ? (
                <Icon
                  baseClassName="far"
                  className="fa-user-circle"
                  fontSize="small"
                />
              ) : text === "Groups" ? (
                <Icon
                  baseClassName="fas"
                  className="fa-users"
                  fontSize="small"
                />
              ) : null}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Events", "Fundraising"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? (
                <Icon
                  baseClassName="far"
                  className="fa-calendar-alt"
                  fontSize="small"
                />
              ) : (
                <Icon
                  baseClassName="far"
                  className="fa-money-bill-alt"
                  fontSize="small"
                />
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
