const formater = require('./formater.js');

exports.add = function(a,b)
{
  console.log("dziala");
  return a+b;
};

function remind(message, msg)
{
  message.reply(msg);
}

function argsFromMessage(msg)
{
  var n, i, char, arg="";
  var quote=false;
  var args = new Array();
  var goodChar=true;
  for(i=0, n=0;i<msg.length;i++)
  {
    char=msg.charAt(i);
    goodChar=(char!="\"");
    if (char == "\"")
    {
      quote=!quote;
    }
	if (goodChar && (char != " " || quote))
    {
      arg=arg+char;
    }
    if((char == " " && !quote)|| i+1==msg.length)
    {
      args[n]=arg;
      n++;
      arg="";
    }
  }
  return args;
}

exports.setReminder = function(message)
{
  var msg = message.content;
  var channel = message.channel;
  msg = msg.replace("!remind ","");
  var args = argsFromMessage(msg);
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
  if (args[0].length==5 && args[1].length > 0)
  {
    try
    {
      //12:30
      //0,1,2,3,4
      var subHours = parseInt(process.env.subhours);
      var hours = parseInt(args[0].substring(0,2));
      var mins = parseInt(args[0].substring(3,5));
      var time = hours*60+mins;
      var now = new Date();
      var time2 = now.getHours()*60 + now.getMinutes();
      var timeDiff = time - time2 - subHours*60;
      if (hours > 23 || hours < 0 || mins > 59 || mins < 0)
      {
        message.reply("Wrong time");
      }
      else if (timeDiff > 0)
      {
        var reminderMsg = msg.substring(6, msg.length);
        setTimeout(function() {remind(message, reminderMsg)}, 1000*60*timeDiff);
        message.reply("Reminder set at " + hours + ":" + mins + " ,which is " + formater.timeStringFromMins(timeDiff) + "from now, with message : " + reminderMsg);
      }
      else {
        message.reply("Wrong time, now is " + now.getHours() + ":" + now.getMinutes() + ", your time is " + hours +":"+mins);
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
