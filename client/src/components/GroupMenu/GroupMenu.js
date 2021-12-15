import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const Menu = props => {
  return (
    <>
     <Box
          sx={{
            display: { xs: "none", md: "block" },
            maxWidth: 350,
            minWidth: 350
          }}
        >
    <Card sx={{ width: 330, marginTop: "6%"}}>
      <List
        sx={{}}
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
              message: "John Smith has just joined your group"
            },
            {
              img: "http://www.fillmurray.com/200/300",
              message: "John Smith has just joined your group"
            },
            {
              img: "https://www.fillmurray.com/500/900",
              message: "John Smith has just joined your group"
            }
          ].map((obj, index) =>
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar src={obj.img} />
                </ListItemAvatar>
                <Typography>
                  {obj.message}
                </Typography>
              </ListItemButton>
            </ListItem>
          )}
        
      </List>
      <CardActions>
        <Button>See All</Button>
      </CardActions>
      </Card>
      </Box>
</>
  );
};

export default Menu;
