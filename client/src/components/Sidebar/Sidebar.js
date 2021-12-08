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

import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import hobbySlice from "../../store/slices/hobby";
import axios from "axios";
import Icon from "@mui/material/Icon";

const drawerWidth = 230;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  paddingLeft: "10%",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start"
}));

const Sidebar = props => {
  const authState = useSelector(state => state.auth);
  const [openHobby, setOpenHobby] = useState(false);
  const last_accessed_hobby =
    authState.account["last_accessed_hobby"]["hobby_title"];
  const [selectedHobby, setSelectedHobby] = useState(
    last_accessed_hobby ? last_accessed_hobby : authState.hobbies[0]
  );

  const location = useLocation();
  const dispatch = useDispatch();

  const handleClick = event => {
    setOpenHobby(!openHobby);
  };

  const handleHobbySelection = event => {
    setOpenHobby(!openHobby);
    // Saves the last accessed hobby for the user and then sets the global hobby content
    const config = {
      headers: {
        Authorization: `Bearer ${authState.token}`,
        "Content-Type": "application/json"
      }
    };
    axios
      .put(
        `http://127.0.0.1:8000/api/v1/auth/users/${authState.account.id}/`,
        {
          last_accessed_hobby: event.target.textContent
        },
        config
      )
      .then(res => {
        setSelectedHobby(event.target.textContent);
        dispatch(
          hobbySlice.actions.setHobby({
            hobby: event.target.textContent
          })
        );
      })
      .catch(err => console.error(err));
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        display: {
          sm: "none",
          md: "none",
          lg: "block"
        },
        // paddingTop: "2%",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth
        }
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
        {["Hobby"].map((text, index) =>
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
        )}
        <Collapse
          in={openHobby}
          timeout="auto"
          unmountOnExit
          style={{ overflowY: "scroll" }}
        >
          <List component="div" disablePadding style={{ maxHeight: "150px" }}>
            {authState.hobbies.map(hobby => {
              return (
                <ListItemButton sx={{ pl: 4 }} onClick={handleHobbySelection}>
                  <ListItemIcon>
                    <AddIcon fontSize={"small"} />
                  </ListItemIcon>
                  <ListItemText secondary={`${hobby}`} />
                </ListItemButton>
              );
            })}
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
                {text === "Feed"
                  ? <Icon
                      baseClassName="far"
                      className="fa-newspaper"
                      fontSize="small"
                      sx={{ display: "inline-table" }}
                    />
                  : text === "Message Board"
                    ? <Icon
                        baseClassName="far"
                        className="fa-comment-dots"
                        fontSize="small"
                      />
                    : text === "Members"
                      ? <Icon
                          baseClassName="far"
                          className="fa-user-circle"
                          fontSize="small"
                        />
                      : text === "Groups"
                        ? <Icon
                            baseClassName="fas"
                            className="fa-users"
                            fontSize="small"
                            sx={{ display: "inline-table" }}
                          />
                        : null}
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
        {[
          "Events",
          "Fundraising",
          "Marketplace",
          "Showcase",
          "Resources"
        ].map((text, index) =>
          <ListItem button key={text} style={{ borderRadius: "16px" }}>
            <ListItemIcon style={{ minWidth: "40px" }}>
              {text === "Events"
                ? <Icon
                    baseClassName="far"
                    className="fa-calendar-alt"
                    fontSize="small"
                  />
                : text === "Fundraising"
                  ? <Icon
                      baseClassName="fas"
                      className="fa-hand-holding-usd"
                      fontSize="small"
                      sx={{ display: "inline-table" }}
                    />
                  : text === "Marketplace"
                    ? <Icon
                        baseClassName="fas"
                        className="fa-tags"
                        fontSize="small"
                        sx={{
                          display: "inline-table",
                          marginTop: "10px"
                        }}
                      />
                    : text === "Showcase"
                      ? <Icon
                          baseClassName="fas"
                          className="fa-award"
                          fontSize="small"
                          sx={{ display: "inline-table" }}
                        />
                      : <Icon
                          baseClassName="fas"
                          className="fa-tools"
                          fontSize="small"
                          sx={{ display: "inline-table" }}
                        />}
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
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
