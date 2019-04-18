require("dotenv").config();
const VkBot = require("node-vk-bot-api");
import EventHandler from "./EventHandler";
import { Functions } from "./Classes";
import { CronJob } from "cron";

class Barsik {
  bot: any;
  eventHandler: EventHandler;
  functions: Functions;
  sended: boolean;

  constructor() {
    this.bot = new VkBot(process.env.VK_TOKEN);
    this.eventHandler = new EventHandler(this.bot);
    this.functions = new Functions(this.bot);
    this.sended = false;
  }

  public start() {
    this.eventHandler.listen();

    this.bot.startPolling(() => {
      console.log("Барсик запущен!");
    });

    new CronJob("0 * * * * *", () => {
      if (!this.sended) {
        this.bot.execute("users.get", {
          user_ids: [Number(process.env.VK_ID)],
          fields: ["online"]
        }, (data: any) => {
          if (data[0].online) {
            this.functions.sendMessage(Number(process.env.VK_ID), "Доброе утро! Я вижу ты уже проснулась 😌 Хозяин спит, поэтому запрограммировал меня пожелать тебе отличного дня 😇");
            this.functions.sendMessage(Number(process.env.VK_ID), "Мяу 😌");
            this.functions.sendCompliment();
            this.sended = true;
          }
        });
      }
    }, null, true, "Asia/Irkutsk");

    new CronJob("0 0 0 * * *", () => {
      this.sended = false;
    }, null, true, "Asia/Irkutsk");
  }
}

new Barsik().start();