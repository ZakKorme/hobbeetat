import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import CalendarIcon from "../CalendarIcon/CalendarIcon";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const EventMenu = (props) => {
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
        {[
          {
            event: "Monthly Meetup",
            location: "Washington D.C.",
            month: "Jan",
            date: "19",
          },

          {
            event: "Monthly Meetup",
            location: "New York",
            month: "Jan",
            date: "21",
          },

          {
            event: "Monthly Meetup",
            location: "Toronto",
            month: "Feb",
            date: "2",
          },
        ].map((obj, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <CalendarIcon month={obj.month} date={obj.date} />
              </ListItemAvatar>
              <ListItemText
                id={index}
                primary={obj.event}
                secondary={
                  <>
                    <LocationOnIcon fontSize="4px" color="black" />
                    {obj.location}
                  </>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItemButton style={{ color: "#0645AD" }}>See All</ListItemButton>
      </List>
    </Box>
  );
};

export default EventMenu;
