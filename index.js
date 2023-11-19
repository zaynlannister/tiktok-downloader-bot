const getTikTokMediaUrl = require("@sasmeee/tkdl");
const { Bot } = require("grammy");
const { isUrl, getUrlPlatform } = require("./helpers/url");
require("dotenv").config();

const bot = new Bot(process.env.BOT_TOKEN);

bot.api.setMyCommands([{ command: "start", description: "- запуск бота" }]);

bot.command("start", async (ctx) => {
  await ctx.reply(
    `${ctx.chat.first_name}, приветсвую! Это в бот для загрузки контента с Тик Тока. Отправь мне ссылку , а я загружу для тебя видео.`
  );
});

bot.on("message:text", async (ctx) => {
  const url = ctx.message.text;

  if (!isUrl(url)) {
    await ctx.replyWithChatAction("typing");
    return ctx.reply("Введите корректный url адрес!");
  }

  const platform = getUrlPlatform(ctx.message.text);

  if (platform.name === "unknown") {
    await ctx.replyWithChatAction("typing");
    return ctx.reply("По данному url адресу загрузка невозможна");
  }

  if (platform.name === "tiktok") {
    await ctx.replyWithChatAction("upload_video");
    const dataList = await getTikTokMediaUrl(platform.url.href);
    await ctx.replyWithVideo(dataList[0].sd);
  }
});

bot.start();
