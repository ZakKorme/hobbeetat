import axios from "axios";

export const uploadGroupResource = async (hobby, group, resource, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  try {
    console.log({
      name: resource.title,
      link: resource.file,
      author: resource.author,
      hobby: hobby,
      is_group: group
    });
    console.log(resource.type);
    axios
      .post(
        `${process.env
          .REACT_APP_API_URL}/auth/${resource.type.toLowerCase()}/groups/`,
        {
          name: resource.title,
          link: resource.file,
          author: resource.author,
          hobby: hobby,
          is_group: group
        },
        config
      )
      .then(res => {
        return res.status;
      });
  } catch (err) {
    console.log(err);
  }
};
