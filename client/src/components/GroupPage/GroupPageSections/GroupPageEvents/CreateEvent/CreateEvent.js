import { useState } from "react";
import { Card } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import groupSlice from "../../../../../store/slices/group";
import axios from "axios";

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

const CreateEvent = props => {
  const [date, setDate] = useState(null);
  const [title, setTitle] = useState(null);
  const [file, setFile] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [description, setDescription] = useState(null);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zip, setZip] = useState(null);
  const [price, setPrice] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [link, setLink] = useState(null);

  const authState = useSelector(state => state.auth);
  const hobbyState = useSelector(state => state.hobby);
  const groupState = useSelector(state => state.group);

  const dispatch = useDispatch();

  const handleCreateEvent = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authState.token}`
      }
    };
    const hobby = hobbyState.currentHobby;
    const group = groupState.info.name;
    const eventCreator = authState.account.id;

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth/events/groups/`,
        {
          title,
          description,
          date,
          startTime,
          endTime,
          address,
          city,
          state,
          zip,
          hobby,
          group,
          eventCreator,
          price,
          isOnline,
          img: file,
          link
        },
        config
      )
      .then(res => res.data)
      .catch(err => console.log(err));
    let formattedGroup = group.includes(" ") ? group.replace(" ", "+") : group;
    let formattedHobby = hobby.includes(" ") ? hobby.replace(" ", "+") : hobby;

    // Get New list of events
    await axios
      .get(
        `${process.env
          .REACT_APP_API_URL}/auth/events/groups?hobby=${formattedHobby}&group=${formattedGroup}`,
        config
      )
      .then(res => {
        dispatch(groupSlice.actions.setGroupEvent({ events: res.data }));
      })
      .catch(err => console.log(err));
    props.handleClose();
  };

  const handleTitle = event => {
    setTitle(event.target.value);
  };
  const handleFile = event => {
    setFile(event.target.value);
  };
  const handleDate = event => {
    setDate(event.target.value);
  };

  const handleStartTime = event => {
    setStartTime(event.target.value);
  };

  const handleEndTime = event => {
    setEndTime(event.target.value);
  };

  const handleDescription = event => {
    setDescription(event.target.value);
  };

  const handleAddress = event => {
    setAddress(event.target.value);
  };

  const handleCity = event => {
    setCity(event.target.value);
  };

  const handleState = event => {
    setState(event.target.value);
  };

  const handleZip = event => {
    setZip(event.target.value);
  };

  const handlePrice = event => {
    setPrice(event.target.value);
  };
  return (
    <Card sx={style}>
      <div class="py-10 border px-2">
        <div class="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
          <div class="md:flex">
            <div class="w-full">
              <div class="flex justify-between p-4 border-b-2">
                <span class="text-lg font-bold text-gray-600">
                  Create Event
                </span>
                <div />
                <div>
                  <CloseIcon
                    className="hover:pointer"
                    onClick={props.handleClose}
                  />
                </div>
              </div>
              <div class="p-3">
                {/* <div class="mb-2">
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
                  
                </div> */}
                <div className="inline-flex">
                  <div class="mb-2">
                    <span class="text-sm">Title</span>
                    <input
                      type="text"
                      value={title}
                      onChange={handleTitle}
                      class="h-10 px-3 w-full border-gray-200 border rounded focus:outline-none focus:border-gray-300"
                    />
                  </div>
                  <div class="mb-2 ml-4">
                    <span class="text-sm">Price</span>
                    <input
                      type="number"
                      min="1"
                      step="any"
                      name="price"
                      placeholder="$"
                      className="h-10 block border border-grey-light w-3/4 p-3 rounded mb-4"
                      value={price}
                      onChange={handlePrice}
                    />
                  </div>
                </div>
                <div className="inline-flex">
                  <div>
                    <span class="text-sm">Date</span>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      placeholder="Date"
                      className="h-10 block border border-grey-light w-full p-3 rounded mb-4"
                      value={date}
                      onChange={handleDate}
                    />
                  </div>
                  <div className="ml-4">
                    <span class="text-sm">Start Time</span>
                    <input
                      type="time"
                      id="startTime"
                      name="Start Time"
                      placeholder="Start Time"
                      className="h-10 block border border-grey-light w-full p-3 rounded mb-4"
                      value={startTime}
                      onChange={handleStartTime}
                    />
                  </div>
                  <div>
                    <span class="text-sm">End Time</span>
                    <input
                      type="time"
                      id="endTime"
                      name="End Time"
                      placeholder="End Time"
                      className="h-10 block border border-grey-light w-full p-3 rounded mb-4"
                      value={endTime}
                      onChange={handleEndTime}
                    />
                  </div>
                </div>
                <div class="mb-2">
                  <span class="text-sm">Description</span>
                  <textarea
                    value={description}
                    onChange={handleDescription}
                    class="h-12 px-3 w-full border-gray-200 border rounded focus:outline-none focus:border-gray-300"
                  />
                </div>
                <div class="mb-2">
                  <span class="text-sm">Address</span>
                  <input
                    type="text"
                    value={address}
                    onChange={handleAddress}
                    class="h-10 px-3 w-full border-gray-200 border rounded focus:outline-none focus:border-gray-300"
                  />
                </div>
                <div className="inline-flex">
                  <div>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="City"
                      className="h-10 block border border-grey-light w-9/10 p-3 rounded mb-4"
                      value={city}
                      onChange={handleCity}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      id="state"
                      name="State"
                      placeholder="State"
                      className="h-10 block border border-grey-light w-full p-3 rounded mb-4"
                      value={state}
                      onChange={handleState}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      id="zip"
                      name="Zip"
                      placeholder="Zip"
                      className="h-10 block border border-grey-light w-full p-3 rounded mb-4"
                      value={zip}
                      onChange={handleZip}
                    />
                  </div>
                </div>

                <div class="mb-2">
                  <span>Event Image</span>
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
                    class="w-full h-12 text-lg w-32 bg-blue-600 rounded text-white hover:bg-blue-700"
                    onClick={handleCreateEvent}
                  >
                    Create Event
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

export default CreateEvent;
