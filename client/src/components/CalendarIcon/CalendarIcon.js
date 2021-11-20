import classes from "./CalendarIcon.module.css";

const CalendarIcon = (props) => {
  return (
    <div className={classes.cal}>
      <div className={classes.month}>{props.month}</div>
      <div className={classes.date}>{props.date}</div>
    </div>
  );
};

export default CalendarIcon;
