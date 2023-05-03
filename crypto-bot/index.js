const { default: axios } = require("axios");
const { Telegraf } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const cryptoApi = new Telegraf(process.env.CRYPTO_API);

bot.command("crypto", (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, "Main menu", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "crypto price", callback_data: "pricing" }],
        [{ text: "Coin List", url: "https://www.cryptocompare.com/" }],
      ],
    },
  });
});

bot.action("pricing", (ctx) => {
  ctx.answerCBQuery();
  ctx.deleteMessage();
  bot.telegram.sendMessage(ctx.chat.id, "please select your coin", {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "BTC", callback_data: "BTC" },
          { text: "ETH", url: "ETH" },
        ],
        [
          { text: "BNB", callback_data: "BNB" },
          { text: "DOGE", callback_data: "DOGE" },
        ],
        [{ text: "Back to main menu", callback_data: "mainmenu" }],
      ],
    },
  });
});

bot.action(["BTC", "ETH", "BNB", "DOGE"], async (ctx) => {
  try {
    const urlApi = `https://min-api.cryptocompare.com/data/price?fsym=${ctx.match}&tsyms=USD,IRR&api_key=${cryptoApi}`;
    const data = await axios.get(urlApi).then((res) => res.data);

    console.log(data);
    ctx.replay(`
      ${ctx.match} to ${Object.keys(data)[0]}: ${Object.values(data)[0]} \n 
      ${ctx.match} to ${Object.keys(data)[1]}: ${Object.values(data)[1]}
    `);
    
  } catch (error) {
    ctx.replay(error.message);
  }

  ctx.answerCBQuery();
});

bot.action("mainmenu", (ctx) => {
  ctx.answerCBQuery();
  ctx.deleteMessage();
  bot.telegram.sendMessage(ctx.chat.id, "Main menu", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "crypto price", callback_data: "pricing" }],
        [{ text: "Coin List", url: "https://www.cryptocompare.com/" }],
      ],
    },
  });
});

bot.launch();
