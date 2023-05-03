const { Telegraf } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command("start", (ctx) => {
  ctx.reply("Welcome dude🤙🏾");
});

bot.command("help", (ctx) => {
  ctx.reply("help!");
});

bot.command(["setting", "Setting", "settings"], (ctx) => {
  ctx.reply(`
    1- username
    2- color
    3- profile
  `);
});

bot.command("ctx", (ctx) => {
  const { from, chat, message, botInfo } = ctx;
  console.log(from, chat, message, botInfo);
  ctx.reply(JSON.stringify(({ from } = ctx), null, 4));
});

bot.launch();
