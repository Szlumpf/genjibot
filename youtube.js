var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var key = process.env.ytkey;
var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&key="+key + "&q=";

const formater = require('./formater.js');

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

var ytLink = "https://www.youtube.com/watch?v=";
var ytLink2 = "https://youtu.be/";

exports.findNightcore = function (message, link)
{
  //var link = message.content;
  isLink = false;
  if (link.startsWith(ytLink))
  {
    link = link.substring(ytLink.length, link.length);
    isLink = true;
  }
  if (link.startsWith(ytLink2))
  {
    link = link.substring(ytLink2.length, link.length);
    isLink = true;
  }
  if (isLink)
  {
    httpGetAsync(url+link, function (resp)
    {
      try
      {
        var vidName = JSON.parse(resp)["items"][0]["snippet"]["title"];
        vidName = vidName + " nightcore";
      } catch (err)
      {
          console.log(err);
          message.channel.send("No video found");
      }
      httpGetAsync(url+vidName, function (resp)
      {
        var nightcoreLink = JSON.parse(resp)["items"][0]["id"]["videoId"];
        nightcoreLink = ytLink + nightcoreLink;
        //console.log(nightcoreLink);
        //return nightcoreLink;
        message.channel.send(nightcoreLink);
      });
    });
  }
  else
  {

  }
}
//findNightcore("https://www.youtube.com/watch?v=1ekZEVeXwek");
