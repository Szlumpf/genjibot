const formater = require('./formater.js');
//const fs = require('fs');
const comparator = require('./comparator.js')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var hoes = [];
var fileMenagement = process.env.fileMenagement;

exports.setup = function ()
{
  /*fs.readFile('./hoes.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }*/
  readHoesFromJson();
}

function readHoes()
{
  httpGetAsync(fileMenagement+"&content=hoes&type=read", function (resp) {
    try
    {
      console.log("Recived:"+resp);
      var hz = formater.argsFromMessage(resp, " ");
      if (hz.length>2)
      {
        var now = new Date();
        for (var i=0; i<hz.length/3; i++)
        {
          var date = formater.argsFromMessage(hz[i+2], "-");
          var hoePickDate = new Date (date[0], date[1], date[2]);
          if (comparator.compareDates(now, hoePickDate) == 0 )
          {
            hoes[hz[i]]=[];
            hoes[hz[i]].id=hz[i+1];
            hoes[hz[i]].date=hz[i+2];
            console.log("Added:" + hz[i] + "+" + hz[i+1] + "+" + hz[i+2]);
          }
        }
      }
    }catch (err)
    {
      console.log(err);
      hoes=[];
    }

  });
}

function readHoesFromJson()
{
  httpGetAsync(fileMenagement+"&content=hoes&type=read", function (resp) {
    try
    {
      console.log("Recived:"+resp);
      var hz = JSON.parse(resp);
      var now = new Date();
      for (var i=0; i<hz.length; i++)
      {
        var date = hz[i].date;
        date = formater.argsFromMessage(hz[i].date, "-");
        var hoePickDate = new Date (date[0], date[1], date[2]);
        if (comparator.compareDates(now, hoePickDate) == 0 )
        {
          hoes[hz[i].channel]=[];
          hoes[hz[i].channel].id=hz[i].hoe;
          hoes[hz[i].channel].date=hz[i].date;
          console.log("Added:" + hz[i].channel + "+" + hz[i].hoe + "+" + hz[i].date);
        }
      }
    }catch (err)
    {
      console.log(err);
      hoes=[];
    }

  });
}

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

function saveHoes (hoes)
{
  var hoesFileContents = "";
  var delimiter = "+";
  for (var hoe in hoes) {
    hoesFileContents += hoe + delimiter;
    hoesFileContents += hoes[hoe].id   + delimiter;
    hoesFileContents += hoes[hoe].date + delimiter;
  }
  hoesFileContents = hoesFileContents.slice(0, -1);
  /*
  fs.writeFile("./hoes.txt", hoesFileContents, function(err) {
  if(err) {
      return console.log(err);
  }
  console.log("The file was saved!");
  });*/
  console.log("Sending:"+hoesFileContents);
  httpGetAsync(fileMenagement+"&content=hoes&type=write&data="+hoesFileContents, function (resp) {
    try
    {

    }catch (err)
    {
      console.log(err);
    }

  });
}

function saveHoesAsJson (hoes)
{
  var hoesFileContents = "[";
  var delimiter = "+";
  for (var hoe in hoes) {
    hoesFileContents += "{";
    hoesFileContents += "\"channel\":" + "\"" + hoe + "\",";
    hoesFileContents += "\"hoe\":" + "\"" + hoes[hoe].id + "\",";
    hoesFileContents += "\"date\":" + "\"" + hoes[hoe].date + "\"";
    hoesFileContents += "},";
  }
  hoesFileContents = hoesFileContents.slice(0, -1);
  hoesFileContents += "]";
  /*
  fs.writeFile("./hoes.txt", hoesFileContents, function(err) {
  if(err) {
      return console.log(err);
  }
  console.log("The file was saved!");
  });*/
  console.log("Sending:"+hoesFileContents);
  httpGetAsync(fileMenagement+"&content=hoes&type=write&data="+hoesFileContents, function (resp) {
    try
    {

    }catch (err)
    {
      console.log(err);
    }

  });
}

function pickHoe(message)
{
  var guildMembers = message.guild.members.array();
  var rand = Math.floor(Math.random()*(guildMembers.length ));
  //console.log(guildMembers[rand].user.id);
  //console.log(guildMembers[rand].user.tag);
  //console.log(rand);
  /*for (var i = 0 ; i < 100 ; i++)
  {
    console.log(Math.floor(Math.random()*(guildMembers.length)));
  }*/
  var hoe = guildMembers[rand].user;
  var msgDate = message.createdAt;
  var asd = [];
  /*asd.date = msgDate.getFullYear() + "-" + msgDate.getMonth() + "-"  + msgDate.getDate();
  asd.id = hoe.id;
  hoes[message.guild.id] = asd;*/
  hoes[message.guild.id] = [];
  hoes[message.guild.id].id = hoe.id;
  hoes[message.guild.id].date = msgDate.getFullYear() + "-" + msgDate.getMonth() + "-"  + msgDate.getDate();
  saveHoesAsJson(hoes);
}

exports.hoeoftheday = function (message)
{
  var newHoePicked = false;
  if(typeof hoes[message.guild.id] === 'undefined')
  {
    pickHoe(message);
    newHoePicked = true;
  }
  else
  {
    var date = hoes[message.guild.id].date;
    date = formater.argsFromMessage(date, "-");
    var hoePickDate = new Date (date[0], date[1], date[2]);
    var now = message.createdAt;
    if(comparator.compareDates(now, hoePickDate) == 1)
    {
      pickHoe(message);
      newHoePicked = true;
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
        message.channel.send("<@" + hoes[message.guild.id].id + ">");
      }, 1000);
    }, 1000);

  }
  else
  {
    message.channel.send("Toodays hoe is : <@" + hoes[message.guild.id].id + ">");
  }
}
