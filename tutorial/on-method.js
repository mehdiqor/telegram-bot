const { Telegraf } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on("text", (ctx) => {
  ctx.reply("you sent text");
});
bot.on("audio", (ctx) => {
  ctx.reply("you sent audio");
});
bot.on("voice", (ctx) => {
  ctx.reply("you sent voice");
});
bot.on("video", (ctx) => {
  ctx.reply("you sent video");
});
bot.on("sticker", (ctx) => {
  ctx.reply("you sent sticker");
});
bot.on("photo", (ctx) => {
  ctx.reply("you sent photo");
});
bot.on("new_chat_members", (ctx) => {
  const name =
    ctx.message.new_chat_member.first_name ??
    ctx.message.new_chat_member.username;
  ctx.reply(`Welcome dear ${name}`);
});

bot.launch();
