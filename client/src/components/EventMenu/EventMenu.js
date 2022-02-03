import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import CalendarIcon from "../CalendarIcon/CalendarIcon";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

import { useSelector } from "react-redux";

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
      <Card sx={{width: 330, marginTop: "6%"}}>
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
                    {`${event.city}, ${event.state}`}
                  </>
                }
              />
            </ListItemButton>
          </ListItem>
        )}): null
      }
      </List>
      <CardActions><Button>See All</Button></CardActions>
      </Card>
    </Box>
  );
};

export default EventMenu;
