var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var key = process.env.ytkey;
var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&key="+key + "&q=";

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

ytLink = "https://www.youtube.com/watch?v=";
ytLink2 = "https://youtu.be/";

exports.findNightcore = function (message, link)
{
  //var link = message.content;
  if (link.startsWith(ytLink))
    link = link.substring(ytLink.length, link.length);
  if (link.startsWith(ytLink2))
    link = link.substring(ytLink2.length, link.length);
  //console.log(link);
  httpGetAsync(url+link, function (resp) {
    var vidName = JSON.parse(resp)["items"][0]["snippet"]["title"];
    vidName = vidName + " nightcore";
    httpGetAsync(url+vidName, function (resp) {
      var nightcoreLink = JSON.parse(resp)["items"][0]["id"]["videoId"];
      nightcoreLink = ytLink + nightcoreLink;
      //console.log(nightcoreLink);
      //return nightcoreLink;
      message.channel.send(nightcoreLink);
    });
  });
}
//findNightcore("https://www.youtube.com/watch?v=1ekZEVeXwek");
