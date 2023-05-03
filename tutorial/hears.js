const { Telegraf } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.hears("nodejs", (ctx) => {
  ctx.reply("node is runtime for JS");
});

bot.hears(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/, (ctx) => {
  ctx.reply("this is Email");
});

bot.hears(/(fuck|dick)/, (ctx) => {
  ctx.reply("WARNING!!!");
  ctx.deleteMessage();
});

bot.launch();
