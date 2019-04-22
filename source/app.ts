require("dotenv").config();
const VkBot = require("node-vk-bot-api");
const Markup = require("node-vk-bot-api/lib/markup");
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

    new CronJob("0 * 6-12 * * *", () => {
      if (!this.sended) {
        this.bot.execute("users.get", {
          user_ids: [Number(process.env.VK_ID)],
          fields: ["online"]
        }, (data: any) => {
          if (data[0].online) {
            setTimeout(() => {
              this.bot.sendMessage(Number(process.env.VK_ID), "Доброе утро, красотка 😇 Как твое настроение?", null, Markup.keyboard([
                [
                  Markup.button("Хорошее 😌", "positive")
                ],
                [
                  Markup.button("Нормальное 😊", "primary")
                ],
                [
                  Markup.button("Плохое 😐", "negative")
                ]
              ]).oneTime());
            }, 15000);

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