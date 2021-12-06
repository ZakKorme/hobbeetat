import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import CardMedia from "@mui/material/CardMedia";
import { Typography, IconButton } from "@mui/material";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";

import { useSelector } from "react-redux";
import { capitalize } from "../../utils/index";


// const posts = [
//   {
//     user: "John Smith",
//     time: "29min",
//     post: "I love this new book I've been reading!",
//     img: "",
//   },
//   {
//     user: "John Smith",
//     time: "2d",
//     post: "I love this new book I've been reading!",
//     img: "https://picsum.photos/200/200/",
//   },
//   {
//     user: "John Smith",
//     time: "15w",
//     post: "Join this new group I started!",
//     img: "",
//   },
//   {
//     user: "John Smith",
//     time: "29min",
//     post: "I love this new book I've been reading!",
//     img: "https://picsum.photos/200/200/",
//   },
//   {
//     user: "John Smith",
//     time: "2d",
//     post: "I love this new book I've been reading!",
//     img: "",
//   },
//   {
//     user: "John Smith",
//     time: "15w",
//     post: "Join this new group I started!",
//     img: "",
//   },
// ];

const Feed = (props) => {
  const hobbyState = useSelector((state => state.hobby));
  const posts = hobbyState.posts
  return (
    <>
      {posts.map((post, index) => {
        // Returns the details of the author
        return (
          <Card key={index} style={{ marginBottom: "2%" }}>
            <CardHeader
              avatar={
                <Avatar
                  alt="user profile"
                  src="https://www.fillmurray.com/500/900"
                />
              }
              title={`${capitalize(post.author['first_name'])} ${capitalize(post.author['last_name'])}`}
              subheader={post.author['created_on']}
            ></CardHeader>
            {post.img ? (
              <CardMedia
                component="img"
                height="200"
                image={post.img}
                alt="temp pic"
              />
            ) : null}
            <CardContent>
              <Typography>{post.content}</Typography>
            </CardContent>
            <CardActions>
              <IconButton>
                <ThumbUpIcon fontSize="small" />
                <Typography variant="body2" style={{ paddingLeft: "2px" }}>
                  Like
                </Typography>
              </IconButton>
              <IconButton>
                <CommentIcon fontSize="small" />
                <Typography variant="body2">Comment</Typography>
              </IconButton>
              <IconButton>
                <ShareIcon fontSize="small" />
                <Typography variant="body2">Share</Typography>
              </IconButton>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
};

export default Feed;
