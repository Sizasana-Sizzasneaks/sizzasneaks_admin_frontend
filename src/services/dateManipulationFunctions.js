const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
//date converted to string format
export const convertDateToString = (dateString) => {
  var date = new Date(dateString);

  return (
    //get date to be converted
    date.getDate() +
    " " +
    monthNames[date.getMonth()] +
    " " +
    date.getFullYear()
  );
};
//get current date
export const getCurrentDateAsString = () => {
  //create new date instance
  var date = new Date();

  //return the full date
  return (
    date.getDate() +
    " " +
    monthNames[date.getMonth()] +
    " " +
    date.getFullYear()
  );
};
