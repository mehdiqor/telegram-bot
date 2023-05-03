const { Telegraf } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply("Welcome dude🤙🏾");
  ctx.telegram.sendMessage(ctx.chat.id, "Welcome2 dude🤙🏾");
});

bot.help((ctx) => {
  ctx.reply("help!");
});

bot.settings((ctx) => {
  ctx.reply("setting!");
});

bot.launch();
