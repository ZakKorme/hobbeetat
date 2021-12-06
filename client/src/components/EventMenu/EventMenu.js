import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import CalendarIcon from "../CalendarIcon/CalendarIcon";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { useSelector } from "react-redux";
import { capitalize } from "../../utils/index";

const EventMenu = (props) => {
  const hobbyState = useSelector((state => state.hobby));
  const events = hobbyState.events
  return (
    <Box
      sx={{
        display: { xs: "none", md: "block" },
        maxWidth: 350,
        maxHeight: 310,
        minWidth: 350,
      }}
    >
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Upcoming Events
          </ListSubheader>
        }
      >
        {
        // [
        //   {
        //     event: "Monthly Meetup",
        //     location: "Washington D.C.",
        //     month: "Jan",
        //     date: "19",
        //   },

        //   {
        //     event: "Monthly Meetup",
        //     location: "New York",
        //     month: "Jan",
        //     date: "21",
        //   },

        //   {
        //     event: "Monthly Meetup",
        //     location: "Toronto",
        //     month: "Feb",
        //     date: "2",
        //   },
        // ]
        events ? events
        .map((event, index) => {
          const month = event.date.split("-")[1];
          const date = event.date.split("-")[2];
          
          return (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <CalendarIcon month={month} date={date} />
              </ListItemAvatar>
              <ListItemText
                id={index}
                primary={event.title}
                secondary={
                  <>
                    <LocationOnIcon fontSize="4px" color="black" />
                    {event.location}
                  </>
                }
              />
            </ListItemButton>
          </ListItem>
        )}): null
      }
        <ListItemButton style={{ color: "#0645AD" }}>See All</ListItemButton>
      </List>
    </Box>
  );
};

export default EventMenu;
