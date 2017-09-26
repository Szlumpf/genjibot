const Discord = require('discord.js');
const client = new Discord.Client();

/*function login (){
  client.login('MzI3ODkxNjY0NzkyMTkwOTc2.DC7-1Q.EdC-HyVoCg-Ifrqvr5aLB1WK6WI');
}*/

client.on('ready', () => {
  console.log('I am ready!');
});

//var commands =

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

function login() {
  client.login('MzI3ODkxNjY0NzkyMTkwOTc2.DC7-1Q.EdC-HyVoCg-Ifrqvr5aLB1WK6WI');
}
