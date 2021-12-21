import Post from "../../../Post/Post";
import Feed from "../../../Feed/Feed";
import { Divider } from "@mui/material";

const GroupPagePosts = () => {
  return (
    <>
      <Post />
      <Divider style={{ marginTop: "3%", marginBottom: "3%" }} />
      <Feed />
    </>
  );
};

export default GroupPagePosts;
