import axios from "axios";

const loadGroup = async (hobby, group, token) => {
  let formattedGroup = group.includes(" ") ? group.replace(" ", "+") : group;
  let formattedHobby = hobby.includes(" ") ? hobby.replace(" ", "+") : hobby;
  let groupPictures;
  let groupVideos;
  let groupDocuments;
  let groupPosts;
  let groupEvents;
  let groupLinks;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  };

  try {
    groupPictures = await axios
      .get(
        `${process.env
          .REACT_APP_API_URL}/auth/pictures/groups/?hobby=${formattedHobby}&group=${formattedGroup}`,
        config
      )
      .then(res => res.data);
    groupVideos = await axios
      .get(
        `${process.env
          .REACT_APP_API_URL}/auth/videos/groups/?hobby=${formattedHobby}&group=${formattedGroup}`,
        config
      )
      .then(res => res.data);
    groupDocuments = await axios
      .get(
        `${process.env
          .REACT_APP_API_URL}/auth/documents/groups/?hobby=${formattedHobby}&group=${formattedGroup}`,
        config
      )
      .then(res => res.data);
    groupPosts = await axios
      .get(
        `${process.env
          .REACT_APP_API_URL}/auth/posts/groups/?hobby=${formattedHobby}&group=${formattedGroup}`,
        config
      )
      .then(res => res.data);
    groupEvents = await axios
      .get(
        `${process.env
          .REACT_APP_API_URL}/auth/events/groups/?hobby=${formattedHobby}&group=${formattedGroup}`,
        config
      )
      .then(res => res.data);
    groupLinks = await axios
      .get(
        `${process.env
          .REACT_APP_API_URL}/auth/links/groups/?hobby=${formattedHobby}&group=${formattedGroup}`,
        config
      )
      .then(res => res.data);
  } catch (err) {
    console.log(err);
  }
  return {
    groupPictures,
    groupVideos,
    groupDocuments,
    groupPosts,
    groupEvents,
    groupLinks
  };
};

export default loadGroup;
