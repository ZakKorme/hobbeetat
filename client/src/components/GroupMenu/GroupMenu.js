import { AiOutlineCalendar as CalendarIcon } from "react-icons/ai";

const Menu = (props) => {
  return (
    <div data-theme="light">
      <ul class="menu py-3 shadow-lg bg-base-100 rounded-box">
        <li class="menu-title">
          <span>{props.title}</span>
        </li>
        <li>
          <a href="/">
            <CalendarIcon className="w-5 h-5 m-1" />
            <span style={{ fontWeight: "bold" }}>New Event:&nbsp;</span>Monthly
            Meetup
          </a>
        </li>
        <li>
          <a href="/">
            <div class="flex-none">
              <div class="avatar">
                <div class="rounded-full w-6 h-6 m-1">
                  <img src="https://i.pravatar.cc/500?img=32" alt="avatar" />
                </div>
              </div>
            </div>
            <span style={{ fontWeight: "bold" }}>Jane Doe&nbsp;</span> commented
            on your post!
          </a>
        </li>
        <li>
          <a href="/">
            <div class="flex-none">
              <div class="avatar">
                <div class="rounded-full w-6 h-6 m-1">
                  <img src="https://i.pravatar.cc/500?img=32" alt="avatar" />
                </div>
              </div>
            </div>
            <span style={{ fontWeight: "bold" }}>Jane Doe&nbsp;</span> commented
            on your post!
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
