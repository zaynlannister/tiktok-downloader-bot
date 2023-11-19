const { Bot } = require("grammy");
require("dotenv").config();

const bot = new Bot(process.env.BOT_TOKEN);

// Reply to any message with "Hi there!".
bot.on("message", (ctx) => ctx.reply("Hi there!"));

bot.start();
