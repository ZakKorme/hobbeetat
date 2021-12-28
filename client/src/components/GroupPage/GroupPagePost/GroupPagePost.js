import {
  Card,
  Button,
  Typography,
  Avatar,
  List,
  ListItemText,
  ListItem, 
  ListItemAvatar,
  CardContent,
  Divider,
  CardActions,
  ListItemButton
} from "@mui/material";
import { useSelector } from "react-redux";


const GroupPagePost = () => {
    const groupState = useSelector(state => state.group);
    const posts = groupState.posts
    const topThreePosts = posts ? posts.slice(0,3): null
    
    return (
      <>
      <Card sx={{ marginTop: "2%"}}>
        <CardContent>
        <Typography variant="h6">Posts</Typography>
          <List>
      {topThreePosts ? topThreePosts.map((post, index) => {
          return(
          <>
            <ListItemButton alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="post-image" src="https://www.fillmurray.com/500/900"/>
                </ListItemAvatar>
                <ListItemText
                primary={post.title}
                secondary={
                    <>
                    <Typography sx={{ display: "inline"}} component="span" variant="body2" color="text.primary">
                        {`${post.author['first_name']} ${post.author['last_name']}`}
                    </Typography>
                    {` - ${post.content.slice(0,40)}...`}
                    </>
                }
                >
                </ListItemText>
            </ListItemButton>
            {index === topThreePosts - 1 ? null:<Divider variant="inset" component="li" />}
            </>
            
            )
      }): null}
      </List>
          </CardContent>
          <CardActions>
              <Button size="small">See All</Button>
          </CardActions>
      </Card>
      </>
  );
};

export default GroupPagePost;
