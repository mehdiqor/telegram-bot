const { Telegraf } = require("telegraf");
require("dotenv").config();
const path = require("path");
const { createReadStream } = require("fs");

const bot = new Telegraf(process.env.BOT_TOKEN);

const helpMessage = `
Hello I'm print bot, here is commands:
/start - start the bot
/help - help refrense
/print - print your message
/cities - list of some cities
`;

bot.start((ctx) => {
  ctx.sendChatAction("typing");
  ctx.reply(helpMessage);
});

bot.help((ctx) => {
  ctx.sendChatAction("typing");
  ctx.reply(helpMessage);
});

bot.command("print", (ctx) => {
  const msg = ctx.message.text;
  const msgArray = msg.split(" ");
  let message = "";

  if (msgArray.length == 1) {
    message = "you said print!";
  } else {
    message = msgArray.slice(1).join(" ");
  }

  ctx.sendChatAction("typing");
  ctx.reply(message);
});

bot.command("cities", (ctx) => {
  ctx.sendChatAction("typing");
  const cityMessage = `
    List of cities:
    /tehran - Iran
    /Newyork - USA
    /Munchen - Deutchland
    /Dubai - UAE
    `;

  ctx.reply(cityMessage);
});

bot.command("Tehran", (ctx) => {
  ctx.sendChatAction("upload_photo");
  ctx.sendPhoto(
    {
      source: createReadStream(
        path.join(__dirname, "city-photos", "tehran.jpeg")
      ),
    },
    {
      reply_to_message_id: ctx.message.message_id,
    }
  );
});

bot.command("Newyork", (ctx) => {
  ctx.sendChatAction("upload_photo");
  ctx.sendPhoto(
    {
      source: createReadStream(
        path.join(__dirname, "city-photos", "newyork.avif")
      ),
    },
    {
      reply_to_message_id: ctx.message.message_id,
    }
  );
});

bot.command("Munchen", (ctx) => {
  ctx.sendChatAction("upload_photo");
  ctx.sendPhoto(
    {
      source: createReadStream(
        path.join(__dirname, "city-photos", "munich.jpg")
      ),
    },
    {
      reply_to_message_id: ctx.message.message_id,
    }
  );
});

bot.command("Dubai", (ctx) => {
  ctx.sendChatAction("upload_photo");
  ctx.sendPhoto(
    {
      source: createReadStream(
        path.join(__dirname, "city-photos", "dubai.jpg")
      ),
    },
    {
      reply_to_message_id: ctx.message.message_id,
    }
  );
});

bot.command("media", (ctx) => {
  bot.telegram.sendChatAction(ctx.chat.id, "upload_photo");
  ctx.sendPhoto();
  ctx.sendDocument({});
  ctx.sendAudio({});
  ctx.sendVideo({});
  ctx.sendAnimation({});
  ctx.sendSticker({});
  ctx.sendLocation({});
  ctx.sendPoll({});
  ctx.sendQuiz({});
});

bot.launch();
