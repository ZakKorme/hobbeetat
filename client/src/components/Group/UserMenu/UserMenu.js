import {
  Card,
  CardHeader,
  Paper,
  Avatar,
  Badge,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Container,
  ListSubheader,
  Divider,
 ListItemButton,
 CardActions,
 Button
} from "@mui/material";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import IconButton from "@mui/material/IconButton";
import BellIcon from "@mui/icons-material/Notifications";
import FeedIcon from "@mui/icons-material/Feed";
import GroupsIcon from '@mui/icons-material/Groups';


const groups = [
  {
    groupName: "Takoma Riders",
    groupCredentials: "Admin"
  },
  {
    groupName: "Takoma Riders",
    groupCredentials: "Admin"
  },
  {
    groupName: "Takoma Riders",
    groupCredentials: "Admin"
  },
   {
    groupName: "Takoma Riders",
    groupCredentials: "Admin"
  },
  {
    groupName: "Takoma Riders",
    groupCredentials: "Admin"
  },
  {
    groupName: "Takoma Riders",
    groupCredentials: "Admin"
  }
];

const UserTable = props => {
  const authState = useSelector(state => state.auth);
  const topThreeGroups = groups.slice(0,3);
  const history = useHistory();

  return (
        <Card elevation={1} style={{
            width: "45%",
            marginLeft: "2.6%",  
            height: "50%"
        }}>
         <CardHeader
          title={`Your Groups`}
          style={{
            paddinLeft: "1.5rem",
            paddingRight: "1.5rem",
            borderTop: "0",
            paddingBottom: "0"
          }}
          avatar={<GroupsIcon/>}
          titleTypographyProps={{
            component: Box,
            fontSize: "17px",
            color: "#32325d"
          }}
        />
            <Box>
            <List dense
          style={{
              backgroundColor: "white",
              
          }}
          >
             <Container style={{ display: "inline-flex", justifyContent: "space-between", padding: "0px"}}>
                <ListSubheader>Group Name</ListSubheader>
                <div></div>
                <ListSubheader>Notifications</ListSubheader>
            </Container>
          {topThreeGroups.map((group,index) => {
            return (
                <>
                <Paper elevation={0}>
                <ListItem
                key={index}
                  secondaryAction={
                      <>
                    <IconButton aria-label="Messages" color="inherit">
                     <Badge badgeContent={2} color="primary">
                       <BellIcon />
                     </Badge>
                   </IconButton>
                   <IconButton aria-label="Feed" color="inherit">
                     <Badge badgeContent={8} color="primary">
                       <FeedIcon />
                     </Badge>
                   </IconButton>
                    </>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      {group.groupName[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemButton style={{ marginRight: "30%", paddingLeft: "1%"}}  alignItems={"center"} dense={true} onClick={() => history.push("/home/groups/page")}>
                  <ListItemText
                    primary={group.groupName}
                  />
                  </ListItemButton>
                </ListItem>
                </Paper>
                {/* Do not return divider on the last item */}
                {(topThreeGroups.length - 1) === index ? null:<Divider/>}
                </>
            )
          })}
          </List>
      </Box>
      <CardActions>
              <Button size="small">See All</Button>
          </CardActions>
      </Card>
  );
};

export default UserTable;
