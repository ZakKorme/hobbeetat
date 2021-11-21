import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const Menu = (props) => {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "block" },
        maxWidth: 350,
        minWidth: 350,
        maxHeight: 310,
      }}
    >
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Group Activity
          </ListSubheader>
        }
      >
        {[
          {
            img: "http://www.fillmurray.com/200/300",
            message: "John Smith has just joined your group",
          },
          {
            img: "http://www.fillmurray.com/200/300",
            message: "John Smith has just joined your group",
          },
          {
            img: "https://www.fillmurray.com/500/900",
            message: "John Smith has just joined your group",
          },
        ].map((obj, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar src={obj.img} />
              </ListItemAvatar>
              <Typography> {obj.message}</Typography>
              {/* <ListItemText id={index} primary={obj.message} noWrap /> */}
            </ListItemButton>
          </ListItem>
        ))}
        <ListItemButton style={{ color: "#0645AD" }}>See All</ListItemButton>
      </List>
    </Box>
  );
};

export default Menu;
