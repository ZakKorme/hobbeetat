import axios from "axios";

export const uploadGroupResource = async (hobby, group, resource, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  };

  let form_data = new FormData();

  form_data.append("name", resource.title);
  form_data.append("file", resource.file);
  form_data.append("author", resource.author);
  form_data.append("hobby", hobby);
  form_data.append("is_group", group);

  try {
    axios
      .post(
        `${process.env
          .REACT_APP_API_URL}/auth/${resource.type.toLowerCase()}/groups/`,
        form_data,
        config
      )
      .then(res => {
        return res.status;
      });
  } catch (err) {
    console.log(err);
  }
};
