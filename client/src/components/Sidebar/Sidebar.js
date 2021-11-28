import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Collapse from "@mui/material/Collapse";
import ListSubheader from "@mui/material/ListSubheader";
import AddIcon from "@mui/icons-material/Add";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

import { styled, useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

import Icon from "@mui/material/Icon";

const drawerWidth = 230;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  paddingLeft: "10%",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const Sidebar = (props) => {
  const theme = useTheme();
  const [openHobby, setOpenHobby] = useState(false);
  const [selectedHobby, setSelectedHobby] = useState("Chess");

  const location = useLocation();

  const handleClick = (event) => {
    setOpenHobby(!openHobby);
  };

  const handleHobbySelection = (event) => {
    setOpenHobby(!openHobby);
    setSelectedHobby(event.target.textContent);
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        display: {
          sm: "none",
          md: "none",
          lg: "block",
        },
        // paddingTop: "2%",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
      variant="persistent"
      anchor="left"
      open
    >
      <DrawerHeader>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Hobbeetat
        </Typography>
      </DrawerHeader>

      <List
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            style={{ fontFamily: "Manrope" }}
          >
            User Context
          </ListSubheader>
        }
      >
        {["Hobby"].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={handleClick}
            style={{ borderRadius: "16px" }}
          >
            <ListItemIcon style={{ minWidth: "40px" }}>
              <Icon baseClassName="fas" className="fa-list" fontSize="small" />
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography style={{ fontFamily: "Manrope", fontSize: "14px" }}>
                  {`${text}: ${selectedHobby}`}
                </Typography>
              }
            />
            {openHobby ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        ))}
        <Collapse in={openHobby} timeout="auto" unmountOnExit>
          <List component="div" disablePadding style={{ maxHeight: "150px" }}>
            <ListItemButton sx={{ pl: 4 }} onClick={handleHobbySelection}>
              <ListItemIcon>
                <AddIcon fontSize={"small"} />
              </ListItemIcon>
              <ListItemText secondary="Cooking" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={handleHobbySelection}>
              <ListItemIcon>
                <AddIcon fontSize={"small"} />
              </ListItemIcon>
              <ListItemText
                secondary="Swimming"
                onClick={handleHobbySelection}
              />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <AddIcon fontSize={"small"} />
              </ListItemIcon>
              <ListItemText
                secondary="Hunting"
                onClick={handleHobbySelection}
              />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <List
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            style={{ fontFamily: "Manrope" }}
          >
            Navigation
          </ListSubheader>
        }
      >
        {["Feed", "Message Board", "Members", "Groups"].map((text, index) => {
          let linkPath = null;

          if (
            `/home/${text.replace(" ", "-").toLowerCase()}` === "/home/feed"
          ) {
            linkPath = "/home";
          } else {
            linkPath = `/home/${text.replace(" ", "-").toLowerCase()}`;
          }
          return (
            <ListItem
              button
              key={text}
              style={{ borderRadius: "16px" }}
              component={Link}
              to={linkPath}
              selected={location.pathname === linkPath}
            >
              <ListItemIcon style={{ minWidth: "40px", contentRight: "10px" }}>
                {text === "Feed" ? (
                  <Icon
                    baseClassName="far"
                    className="fa-newspaper"
                    fontSize="small"
                    sx={{ display: "inline-table" }}
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
                    sx={{ display: "inline-table" }}
                  />
                ) : null}
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    style={{ fontFamily: "Manrope", fontSize: "14px" }}
                  >
                    {text}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>
      <List
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            style={{ fontFamily: "Manrope" }}
          >
            Other
          </ListSubheader>
        }
      >
        {["Events", "Fundraising"].map((text, index) => (
          <ListItem button key={text} style={{ borderRadius: "16px" }}>
            <ListItemIcon style={{ minWidth: "40px" }}>
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
                  sx={{ display: "inline-table" }}
                />
              )}
            </ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography style={{ fontFamily: "Manrope", fontSize: "14px" }}>
                  {text}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
