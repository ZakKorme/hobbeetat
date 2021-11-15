import { AiOutlineCalendar as CalendarIcon } from "react-icons/ai";
import { GoLocation as LocationIcon } from "react-icons/go";

const ActivitiesMenu = (props) => {
  return (
    <div data-theme="light">
      <ul class="menu py-3 shadow-lg bg-base-100 rounded-box">
        <li class="menu-title">
          <span>{props.title}</span>
        </li>
        <li>
          <a href="/">
            <CalendarIcon className="w-7 h-7 m-1" />
            <div>
              <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                {" "}
                Monthly Meetup
              </span>

              <span style={{ display: "flex" }}>
                <LocationIcon className="w-2.5 h-2.5 m-1" />
                &nbsp;Washington D.C.
              </span>
              <span
                style={{
                  fontSize: "10px",
                  paddingLeft: "5px",
                  color: "#00BFFF",
                }}
              >
                Details
              </span>
            </div>
          </a>
        </li>
        <li>
          <a href="/">
            <CalendarIcon className="w-7 h-7 m-1" />
            <div>
              <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                {" "}
                Monthly Meetup
              </span>

              <span style={{ display: "flex" }}>
                <LocationIcon className="w-2.5 h-2.5 m-1" />
                &nbsp;Washington D.C.
              </span>
              <span
                style={{
                  fontSize: "10px",
                  paddingLeft: "5px",
                  color: "#00BFFF",
                }}
              >
                Details
              </span>
            </div>
          </a>
        </li>
        <li>
          <a href="/">
            <CalendarIcon className="w-7 h-7 m-1" />
            <div>
              <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                {" "}
                Monthly Meetup
              </span>

              <span style={{ display: "flex" }}>
                <LocationIcon className="w-2.5 h-2.5 m-1" />
                &nbsp;Washington D.C.
              </span>
              <span
                style={{
                  fontSize: "10px",
                  paddingLeft: "5px",
                  color: "#00BFFF",
                }}
              >
                Details
              </span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ActivitiesMenu;
