var DHTC = require('discord.htc'), fs = require('fs')
var bot = new DHTC(" ")

var prefix = ("!")
 
bot.on("botReady", () => {
    console.log("Ready!")
});
 
bot.on("createdMessage", (message) => {
	if (message.content.startsWith(`${prefix}docslist`)) {
		var args = fs.readdirSync("./docs")
		bot.makeMessage(message.channel_id, `${"```"}
MAKE SURE TO EXCLUDE THE .json PART!

${args}
${"```"}`)
	}
    if (message.content.startsWith(`${prefix}docs `)) {
        var args = message.content.split(`${prefix}docs `).join("");
        try { 
        	var requireArgs = require(`./docs/${args}.json`);
        	bot.makeMessage(message.channel_id, `
**Function**: __${requireArgs.functionName}__
**Arguments**: ${requireArgs.functionArguments}
**Usage**: bot.${requireArgs.functionName}(${requireArgs.functionArguments})
**Description**: ${requireArgs.functionDescription}
`)
        } catch (e) { bot.makeMessage(message.channel_id, "That document doesnt exist or doesnt correctly influence the documentation template!") && console.log(e) }
    }
});
 
bot.connect();
