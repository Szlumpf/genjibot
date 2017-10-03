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
      if (!isNaN(parseInt(hourr[0])) && !isNaN(parseInt(hourr[1]))))
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

exports.setReminder = function(message)
{
  var msg = message.content;
  var channel = message.channel;
  //msg = msg.replace("!remind ","");
  msg = msg.substring("!remind".length + 1, msg.length);
  var args = formater.argsFromMessage(msg);
  //------------
  /*
  channel.send("<<args:");
  var index, len;
  for (index = 0, len = args.length; index < len; ++index) {
      channel.send(args[index]);
  }
  channel.send("<<argsEnd");
  */
  //------------
  if (isDate(args[0]))
  {
    if (isHour(args[1]))
    {
      let reminderMsg = msg.substring(args[0].length + 1, msg.length);
      let now = message.createdAt;
      let userTime = args[1].split(":");
      let hours = parseInt(userTime[0]);
      let mins = parseInt(userTime[1]);
      let time1 = hours*60 + mins;
      let time2 = now.getHours()*60 + now.getMinutes();
      let timeDiff = time1 - time2;// - subHours*60;

      var timeDiff = Math.abs(new Date(parseInt(args[0]), parseInt(args[1]), parseInt(args[2])).getTime() - now.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (diffDays > 0)
      {

      }
      else
      {

      }

      if (timeDiff > 0)
      {
        setTimeout(function() {remind(message, reminderMsg)}, 1000*60*timeDiff);
        if ((hours + "").length == 1)
          hours = "0" + hours;
        if ((mins + "").length == 1)
          mins = "0" + mins;
        message.reply("Reminder set at " + hours + ":" + mins + " ,which is " + formater.timeStringFromMins(timeDiff) + "from now, with message : " + reminderMsg);
      }
      else
      {
        setTimeout(function() {remind(message, reminderMsg)}, ((24*60)-(timeDiff))*1000*60);
        if ((hours + "").length == 1)
          hours = "0" + hours;
        if ((mins + "").length == 1)
          mins = "0" + mins;
        message.reply("Reminder set at " + hours + ":" + mins + " tomorrow ,which is " + formater.timeStringFromMins((24*60)-timeDiff) + "from now, with message : " + reminderMsg);
      }
      //save reminder
      //httpGetAsync(fileMenagement + "content=reminder")
    }
    else
    {
      // wrong hour
    }
  }
  else if (isHour(args[0]))
  {
    let reminderMsg = msg.substring(args[0].length + 1, msg.length);
    let now = message.createdAt;
    let userTime = args[0].split(":");
    let hours = parseInt(userTime[0]);
    let mins = parseInt(userTime[1]);
    let time1 = hours*60 + mins;
    let time2 = now.getHours()*60 + now.getMinutes();
    let timeDiff = time1 - time2;// - subHours*60;
    if (hours > 23 || hours < 0 || mins > 59 || mins < 0)
    {
      message.reply("Wrong time");
    }
    else ()
    {
      if (timeDiff > 0)
      {
        setTimeout(function() {remind(message, reminderMsg)}, 1000*60*timeDiff);
        if ((hours + "").length == 1)
          hours = "0" + hours;
        if ((mins + "").length == 1)
          mins = "0" + mins;
        message.reply("Reminder set at " + hours + ":" + mins + " ,which is " + formater.timeStringFromMins(timeDiff) + "from now, with message : " + reminderMsg);
      }
      else
      {
        setTimeout(function() {remind(message, reminderMsg)}, ((24*60)-(timeDiff))*1000*60);
        if ((hours + "").length == 1)
          hours = "0" + hours;
        if ((mins + "").length == 1)
          mins = "0" + mins;
        message.reply("Reminder set at " + hours + ":" + mins + " tomorrow ,which is " + formater.timeStringFromMins((24*60)-timeDiff) + "from now, with message : " + reminderMsg);
      }
    }
  }
  else
  {
    // no time specified or time is wrong
    message.reply("Write !remind yyyy-mm-dd hh:mm message or !remind hh:mm message");
  }
  if (args[0].length==5 && args[1].length > 0)
  {
    try
    {
      //12:30
      //0,1,2,3,4
      //var subHours = parseInt(process.env.subhours);
      var hours = parseInt(args[0].substring(0,2));
      var mins = parseInt(args[0].substring(3,5));
      var time = hours*60+mins;
      var now = message.createdAt;
      var time2 = now.getHours()*60 + now.getMinutes();
      var timeDiff = time - time2;// - subHours*60;
      if (hours > 23 || hours < 0 || mins > 59 || mins < 0)
      {
        message.reply("Wrong time");
      }
      else if (timeDiff > 0)
      {
        var reminderMsg = msg.substring(6, msg.length);
        setTimeout(function() {remind(message, reminderMsg)}, 1000*60*timeDiff);
        if ((hours + "").length == 1)
          hours = "0" + hours;
        if ((mins + "").length == 1)
          mins = "0" + mins;
        message.reply("Reminder set at " + hours + ":" + mins + " ,which is " + formater.timeStringFromMins(timeDiff) + "from now, with message : " + reminderMsg);
      }
      else {
        message.reply("Wrong time, now is " + (now.getHours()/*+subHours*/) + ":" + now.getMinutes() + ", your time is " + hours +":"+mins);
      }
    } catch (err)
    {
      message.reply("This hour is invalid");
      console.log(err);
    }
  }
  else {
    message.reply("Error write !remind hh:mm message");
    message.reply(msg);
  }

};
