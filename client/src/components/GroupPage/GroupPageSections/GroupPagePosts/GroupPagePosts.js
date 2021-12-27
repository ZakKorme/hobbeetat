import { useSelector } from "react-redux";
import Post from "../../../Post/Post";
import Feed from "../../../Feed/Feed";
import { Divider } from "@mui/material";


const GroupPagePosts = () => {
  const groupState = useSelector(state => state.group)
  const groupPosts = groupState.posts
  return (
    <>
      <Post />
      <Divider style={{ marginTop: "3%", marginBottom: "3%" }} />
      <Feed groupPosts={groupPosts}/>
    </>
  );
};

export default GroupPagePosts;
