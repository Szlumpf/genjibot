const formater = require('./formater.js');
var hoes = [];

exports.setup = function ()
{

}

function pickHoe(message)
{
  var guildMembers = message.guild.members.array();
  var rand = Math.floor(Math.random()*(guildMembers.length ));
  console.log(guildMembers[rand].user.id);
  console.log(guildMembers[rand].user.tag);
  console.log(rand);
  /*for (var i = 0 ; i < 100 ; i++)
  {
    console.log(Math.floor(Math.random()*(guildMembers.length)));
  }*/
  var hoe = guildMembers[rand].user;
  var msgTime = message.createdAt;
  var asd = [];
  asd.time = msgTime.getFullYear() + "-" + msgTime.getMonth() + "-"  + msgTime.getDate();
  asd.hoe = hoe.id;
  hoes[message.guild.id] = asd;
}

exports.hoeoftheday = function (message)
{
  var newHoePicked = false;
  if(true || typeof hoes[message.guild.id] === 'undefined')
  {
    pickHoe(message);
    newHoePicked = true;
  }
  else
  {
    var time = hoes[message.guild.id].time;
    var time = formater.argsFromMessage(time, "-");
    var hoePickDate = new Date (time[0], time[1], time[2]);
    var now = message.createdAt;
    if(now.getFullYear() > hoePickDate.getFullYear())
    {
      if (now.getMonth() > hoePickDate.getMonth())
      {
        if (now.getDate() > hoePickDate.getDate())
        {
          pickHoe(message);
          newHoePicked = true;
        }
      }
    }
  }

  if (newHoePicked)
  {
    message.channel.send("And toodays hoe is :");
    setTimeout(function ()
    {
      message.channel.send(":drum:");
      setTimeout(function ()
      {
        message.channel.send("<@" + hoes[message.guild.id].hoe + ">");
      }, 1000);
    }, 1000);

  }
  else
  {
    message.channel.send("Toodays hoe is : <@" + hoes[message.guild.id].hoe + ">");
  }
}
