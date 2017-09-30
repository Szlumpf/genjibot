

exports.timeStringFromMins = function (minutes)
{
  let timeString = "";
  let mins = minutes % 60;
  let hours = ((minutes-mins)/60) % (24);
  let days = (minutes-hours*60-mins) / (60*24);
  console.log("mins:" + mins);
  console.log("hours:" + hours);
  console.log("days:" + days);
  if (days > 0)
  {
    timeString += days + " day";
    if (days != 1)
      timeString += "s";
    timeString += " ";
  }
  if (hours > 0)
  {
    timeString += hours + " hour";
    if (hours != 1)
      timeString += "s";
    timeString += " ";
  }
  if (mins > 0)
  {
    timeString += mins + " minute";
    if (mins != 1)
      timeString += "s";
    timeString += " ";
  }
  if (timeString=="")
    timeString="less than minute ";
  return timeString;
}
