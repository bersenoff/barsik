require("dotenv").config();
const VkBot = require("node-vk-bot-api");
import EventHandler from "./EventHandler";

class Barsik {
  bot: any;
  eventHandler: EventHandler;

  constructor() {
    this.bot = new VkBot(process.env.VK_TOKEN);
    this.eventHandler = new EventHandler(this.bot);
  }

  public start() {
    this.eventHandler.listen();

    this.bot.startPolling(() => {
      console.log("Барсик запущен!");
    });
  }
}

new Barsik().start();