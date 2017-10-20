const formater = require('./formater.js');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fileMenagement = process.env.fileMenagement;

exports.setup = function(a,b)
{
  // get reminders
};

function httpGetAsync(theUrl, callback)
{
  //console.log(theUrl);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

function remind(message, msg)
{
  message.reply(msg);
}

function isDate(date)
{
  try
  {
    if (date.length >= 8 && date.length <= 10)
    {
      var datee = formater.argsFromMessage(date, "-");
      /*if (!isNaN(parseInt(datee[0])) && !isNaN(parseInt(datee[1])) && !isNaN(parseInt(datee[2])))
        return true;
      else return false;*/
      var date = new Date(datee[0], datee[1], datee[2]);
      return ((date != "Invalid Date"));
    }
    else return false;
  } catch (err)
  {
    console.log(err);
    return false;
  }
}

function isHour(hour)
{
  try
  {
    if (hour.length >= 4 && hour.length <= 5)
    {
      var hourr = formater.argsFromMessage(date, ":");
      if (!isNaN(parseInt(hourr[0])) && !isNaN(parseInt(hourr[1])))
        if (hours <= 23 && hours >= 0 && mins <= 59 && mins >= 0)
          return true;
        else return false;
      else return false;
    }
    else return false;
  } catch (err)
  {
    console.log(err);
    return false;
  }
}

function addReminder(dateString, hourString, responseChannel, reminderMsg)
{
  let now = responseChannel.createdAt;
  let userTime = hourString.split(":");
  let userDate = dateString.split("-");
  let hours = parseInt(userTime[0]);
  let mins = parseInt(userTime[1]);
  let time1 = hours*60 + mins;
  let time2 = now.getHours()*60 + now.getMinutes();
  let timeDiff = time1 - time2;// - subHours*60;
  timeDiff = timeDiff * 60 * 1000;
  let diffDays = 0;
  if (dateString != false)
  {
    timeDiff = Math.abs(new Date(parseInt(userDate[0]), parseInt(userDate[1])-1, parseInt(userDate[2]), hours, mins).getTime() - now.getTime());
    diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  if (timeDiff > 1)
  {
    setTimeout(function() {remind(message, reminderMsg)}, (timeDiff);
    if ((hours + "").length == 1)
      hours = "0" + hours;
    if ((mins + "").length == 1)
      mins = "0" + mins;
    message.reply("Reminder set at " + hours + ":" + mins + " on " + userDate + " ,which is " + formater.timeStringFromMins(Math.ceil(timeDiff)) + "from now, with message : " + reminderMsg);
  }
  else
  {
    // wrong time time
  }
}

exports.setReminder = function(message)
{
  var msg = message.content;
  var channel = message.channel;
  //msg = msg.replace("!remind ","");
  msg = msg.substring("!remind".length + 1, msg.length);
  var args = formater.argsFromMessage(msg);
  if (isDate(args[0]))
  {
    if (isHour(args[1]))
    {
      let reminderMsg = msg.substring(args[0].length + 1, msg.length);
      reminderMsg = reminderMsg.substring(args[1].length + 1, reminderMsg.length)
      addReminder(args[0], args[1], message, reminderMsg);
    }
    else
    {
      message.reply("Wrong hour, write !remind yyyy-mm-dd hh:mm message or !remind hh:mm message");
    }
  }
  else if (isHour(args[0]))
  {
    let reminderMsg = msg.substring(args[0].length + 1, msg.length);
    addReminder(false, args[0], message, reminderMsg);
  }
  else // no time specified or time is wrong
  {
    message.reply("Write !remind yyyy-mm-dd hh:mm message or !remind hh:mm message");
  }
};
