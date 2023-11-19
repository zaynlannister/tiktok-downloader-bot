const tiktokDl = require("@sasmeee/tkdl");
const { Bot } = require("grammy");
require("dotenv").config();

const bot = new Bot(process.env.BOT_TOKEN);

bot.on("message:text", async (ctx) => {
  const url = ctx.message.text;

  await ctx.replyWithChatAction("upload_video");
  const dataList = await tiktokDl(url);

  await ctx.replyWithVideo(dataList[0].sd);
});

bot.start();
