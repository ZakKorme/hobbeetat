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
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import loadGroup from "../../../utils/loadGroup";

import groupSlice from "../../../store/slices/group";

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
  const hobbyState = useSelector(state => state.hobby);
  const userGroups = authState.groups ? authState.groups:null;
  const topThreeGroups = groups.slice(0,3);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleGroupSelection = (event) => {
    try {
      loadGroup(hobbyState.currentHobby, event.target.outerText, authState.token).then((res) => {
        dispatch(groupSlice.actions.setGroupResources({pictures: res.groupPictures, videos: res.groupVideos, documents: res.groupDocuments, posts: res.groupPosts, events: res.groupEvents}))
        // dispatch(groupSlice.actions.setGroup(res.group, res.groupVideos))
      })
      
    } catch (err) {
      console.log(err)
    }

    history.push("/home/groups/page")
  };


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
          {userGroups ? (userGroups.map((group,index) => {
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
                      {group.name[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemButton style={{ marginRight: "30%", paddingLeft: "1%"}}  alignItems={"center"} dense={true} onClick={handleGroupSelection}>
                  <ListItemText
                    primary={group.name}
                    
                  />
                  </ListItemButton>
                </ListItem>
                </Paper>
                {/* Do not return divider on the last item */}
                {(topThreeGroups.length - 1) === index ? null:<Divider/>}
                </>
            )
          })): <div>You have not joined a group.</div>}
          </List>
      </Box>
      <CardActions>
              <Button size="small">See All</Button>
          </CardActions>
      </Card>
  );
};

export default UserTable;
