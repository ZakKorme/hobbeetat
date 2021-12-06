import classes from "./CalendarIcon.module.css";

const monthList = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12
};

const CalendarIcon = props => {
  return (
    <div className={classes.cal}>
      <div className={classes.month}>
        {Object.keys(monthList).find(
          key => Number(props.month) === monthList[key]
        )}
      </div>
      <div className={classes.date}>
        {props.date}
      </div>
    </div>
  );
};

export default CalendarIcon;
