const Discord = require('discord.js');
const client = new Discord.Client();
const reminder = require('./reminder.js');
const yt = require('./youtube.js');
const formater = require('./formater.js');
const hotd = require('./hoeoftheday.js');

client.on('ready', () => {
  console.log('I am ready!');
  setTimeout(logg, logtime);
  reminder.setup();
  hotd.setup();
});

const botStart = new Date();

client.on('message', message => {
  if (message.content === '!uptime')
  {
    let milis = (new Date()).getTime()
    milis -= botStart.getTime()
    let mins = Math.round(milis/(1000*60))
    message.reply("Working for: " + formater.timeStringFromMins(mins));
  }
});

client.on('message', message => {
  if (message.content === '!menda')
  {
    message.channel.send("odpowiadam");
  }
});

var NumbersEnum = {
  0:":zero: ", 1:":one: ", 2:":two: ", 3:":three: ", 4:":four: ", 5:":five: ", 6:":six: ", 7:":seven: ", 8:":eight: ", 9:":nine: "
}

client.on('message', message => {
  if (message.content.substr(0,5) === '!sweg')
  {
    var toConvert, result;
    toConvert = message.content.substr(5);
    result = "";
    var currentChar,i;
    for (i = 0; i < toConvert.length; i++)
    {
        currentChar = toConvert.substr(i,1).toLowerCase();
        if (currentChar == '?')
            result = result + ":question: ";
        else if (currentChar == '!')
            result = result + ":exclamation: ";
        else if (currentChar >= '0' && currentChar <= '9')
            result = result + NumbersEnum[currentChar - '0'];
        else if (currentChar >= 'a' && currentChar <= 'z')
            result = result + ":regional_indicator_" + toConvert.substr(i,1).toLowerCase() + ": ";
        else if (currentChar == ' ')
            result = result + "   ";
        else
            result = result + currentChar + ' ';
    }
    message.channel.send(result);
  }
});

client.on('message', message => {
  if (message.content.startsWith("!remind"))
  {
    reminder.setReminder(message);
  }
});

client.on('message', message => {
  let command = "!nightcore";
  if (message.content.startsWith(command))
  {
    yt.findNightcore(message, message.content.slice(command.length+1, message.content.length));
  }
});

client.on('message', message => {
  let command = "!yt";
  if (message.content.startsWith(command))
  {
    yt.findVideo(message, message.content.slice(command.length+1, message.content.length));
  }
});

client.on('message', message => {
  let command = "!rand";
  if (message.content.startsWith(command))
  {
    let args = formater.argsFromMessage(message.content.slice(command.length + 1));
    let size = args.length;
    console.log("msg:"+message.content.slice(1 + command.length));
    let rand = Math.floor(Math.random()*size);
    //console.log("size:"+size);
    //console.log("rand:"+rand);
    message.reply("i choose " + args[rand]);
  }
});

client.on('message', message => {
  let command = "!hoeoftheday";
  if (message.content === command)
    hotd.hoeoftheday(message);
});

client.on('message', message => {
  let command = "!time";
  if (message.content === command)
  {
    var a = message.createdAt;
    message.reply(a.getHours() + ":" + a.getMinutes() + "\n" +
        a.getFullYear() + "-" + a.getMonth() + "-" + a.getDate());
  }
});

//client.on()

/*client.on('message', message => {
  if (message.content.substr(0,10).toLowerCase() === '!pickagame')
  {
    // asd "sdas sd" sdsd
    List<string> args = new List<string>();
    Console.WriteLine("!pickagame args:");
    foreach (string s in e.Args)
    {
        Console.WriteLine(s);
        args.Add(s);
    }
    string pickedGame = "Error";
    // good randomness guaranted, 100% scamfree
    for (int i = 0; i < 10; i++)
    {
        pickedGame = args[rand.Next(args.Count)];
    }
    await e.Channel.SendMessage(pickedGame);
  }
});*/

client.login(process.env.token);
