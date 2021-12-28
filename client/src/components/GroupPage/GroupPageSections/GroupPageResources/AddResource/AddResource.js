import { useState } from "react";
import { Card } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useSelector } from "react-redux";
import { uploadGroupResource } from "../../../../../utils/uploadGroupResource";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 500,
  minHeight: 300,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  borderRadius: 5,
  p: 4
};

const AddResource = props => {
  const [type, setType] = useState("Pictures");
  const [title, setTitle] = useState(null);
  const [file, setFile] = useState(null);

  const authState = useSelector(state => state.auth);
  const hobbyState = useSelector(state => state.hobby);
  const groupState = useSelector(state => state.group);

  const handleResourceUpload = () => {
    let author = authState.account.id;
    let token = authState.token;
    let hobby = hobbyState.currentHobby;
    let is_group = groupState.info.name;
    let upload = {
      type,
      title,
      file,
      author
    };
    uploadGroupResource(hobby, is_group, upload, token);
    props.handleClose();
  };

  const handleType = event => {
    setType(event.target.value);
  };
  const handleTitle = event => {
    setTitle(event.target.value);
  };
  const handleFile = event => {
    setFile(event.target.value);
  };
  return (
    // TODO: IMPLEMENT FORMIK AND YULP VALIDATION ON UPLOAD
    <Card sx={style}>
      <div class="py-10 border px-2">
        <div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
          <div class="md:flex">
            <div class="w-full">
              <div class="flex justify-between p-4 border-b-2">
                <span class="text-lg font-bold text-gray-600">
                  Add documents
                </span>
                <div />
                <div>
                  <CloseIcon onClick={props.handleClose} />
                </div>
              </div>
              <div class="p-3">
                <div class="mb-2">
                  <span class="text-sm">Type</span>
                  <select
                    name="Type"
                    value={type}
                    onChange={handleType}
                    id="type"
                    className="h-12 px-3 w-full border-gray-200 border rounded focus:outline-none focus:border-gray-300"
                  >
                    <option value="Pictures">Pictures</option>
                    <option value="Videos">Videos</option>
                    <option value="Documents">Documents</option>
                    <option value="Link">Link</option>
                  </select>
                </div>
                <div class="mb-2">
                  <span class="text-sm">Title</span>
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitle}
                    class="h-12 px-3 w-full border-gray-200 border rounded focus:outline-none focus:border-gray-300"
                  />
                </div>
                <div class="mb-2">
                  <span>Attachments</span>
                  <div class="relative h-40 rounded-lg border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer">
                    <div class="absolute">
                      <div class="flex flex-col items-center ">
                        <i class="fa fa-cloud-upload fa-3x text-gray-200" />
                        <span class="block text-gray-400 font-normal">
                          Attach you files here
                        </span>
                        <span class="block text-gray-400 font-normal">or</span>
                        <span class="block text-blue-400 font-normal">
                          Browse files
                        </span>
                      </div>
                    </div>
                    <input
                      type="file"
                      class="h-full w-full opacity-0"
                      name=""
                      value={file}
                      onChange={handleFile}
                    />
                  </div>
                  <div class="flex justify-between items-center text-gray-400">
                    <span>Accepted file type:.doc .pdf .jpeg .png</span>
                    <span class="flex items-center ">
                      <i class="fa fa-lock mr-1" /> secure
                    </span>
                  </div>
                </div>
                <div class="mt-3 text-center pb-3">
                  <button
                    onClick={handleResourceUpload}
                    class="w-full h-12 text-lg w-32 bg-blue-600 rounded text-white hover:bg-blue-700"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AddResource;
