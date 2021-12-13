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
  CardActions
} from "@mui/material";
import { useSelector } from "react-redux";


const GroupPagePost = () => {
    const hobbyState = useSelector((state => state.hobby));
  const posts = hobbyState.posts
  return (
      <>
      <Card sx={{ marginTop: "2%"}}>
        <CardContent>
        <Typography variant="h6">Posts</Typography>
          <List>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="post-image" src="https://www.fillmurray.com/500/900"/>
                </ListItemAvatar>
                <ListItemText
                primary="This will be the post title"
                secondary={
                    <>
                    <Typography sx={{ display: "inline"}} component="span" variant="body2" color="text.primary">
                        Zak Korme
                    </Typography>
                    {" - This will be the truncated text..."}
                    </>
                }
                >

                </ListItemText>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="post-image" src="https://www.fillmurray.com/500/900"/>
                </ListItemAvatar>
                <ListItemText
                primary="This will be the post title"
                secondary={
                    <>
                    <Typography sx={{ display: "inline"}} component="span" variant="body2" color="text.primary">
                        Zak Korme
                    </Typography>
                    {" - This will be the truncated text..."}
                    </>
                }
                >

                </ListItemText>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="post-image" src="https://www.fillmurray.com/500/900"/>
                </ListItemAvatar>
                <ListItemText
                primary="This will be the post title"
                secondary={
                    <>
                    <Typography sx={{ display: "inline"}} component="span" variant="body2" color="text.primary">
                        Zak Korme
                    </Typography>
                    {" - This will be the truncated text..."}
                    </>
                }
                >

                </ListItemText>
            </ListItem>
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
