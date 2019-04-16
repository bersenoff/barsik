/**
 * @description Обработчик событий
 */

import { Main, Functions } from "./Classes";
import { RandomInt } from "./Utils";
import moment from "moment";

export default class EventHandler extends Main {
  bot: any;
  functions: Functions;

  constructor(bot: any) {
    super();

    this.bot = bot;
    this.functions = new Functions(bot);
  }

  /**
   * @description Прослушка событий
   */
  public listen() {
    this.bot.event("message_new", async (ctx: any) => {
      let answer: string;

      switch(ctx.message.text.toLowerCase()) {
        case "начать":
          this.bot.execute("users.get", {
            user_ids: ctx.message.from_id
          }, (data: any) => {
            answer = `Привет, ${data[0].first_name}! `;
            answer += "Меня зовут Барсик и я могу помочь тебе в принятии трудных решений 😊 ";
            answer += "Просто напиши мне вопрос, требующий ответа \"да\" или \"нет\", и я отвечу 🤗";
            this.functions.sendMessage(ctx.message.from_id, answer);

            if (ctx.message.from_id === Number(process.env.VK_ID) || (data[0].first_name === "Настя" && data[0].last_name === "Литвиненко")) {
              setTimeout(() => {
                this.functions.sendMessage(ctx.message.from_id, "Хочешь узнать в чем мой маленький секрет? Только тсс... никому 😊");
                setTimeout(() => {
                  this.functions.sendMessage(ctx.message.from_id, "Я буду регулярно писать комплименты, но только тебе 😊 Я запрограммирован делать это бесконечно через равные промежутки времени 😊");
                  setTimeout(() => {
                    this.functions.sendMessage(ctx.message.from_id, "Это лучшее, чем может заниматься пушистый электронный котик вроде меня 😇");
                    setTimeout(() => {
                      this.functions.sendMessage(ctx.message.from_id, "Очень рад знакомству 😊");
                      setTimeout(() => {
                        this.functions.sendMessage(ctx.message.from_id, "Мяу, ты такая красивая, что мои лапки сами это пишут 😌");

                        let x: number = 1;
                        let timer1_run: boolean = true;

                        const timer1 = setInterval(() => {
                          if (x > 5) {
                            this.functions.sendMessage(Number(process.env.VK_ID), "Мяу, чтобы не надоедать, я буду писать 1 раз в час 😊");
                            timer1_run = false;
                            clearInterval(timer1);
                          } else if (moment().isAfter("2019-04-16 18:20:00")) {
                            this.functions.sendMessage(Number(process.env.VK_ID), "Мяу, у тебя скорее всего закончилась пара, поэтому чтобы не отвлекать, я буду писать 1 раз в час 😊");
                            timer1_run = false;
                            clearInterval(timer1);
                          } else {
                            this.functions.sendCompliment();
                            x++;
                          }
                        }, 300000);

                        const timer2 = setInterval(() => {
                          if (!timer1_run) {
                            this.functions.sendCompliment();
                          }
                        }, 3600000);

                      }, 10000)
                    }, 10000);
                  }, 10000);
                }, 10000);
              }, 10000);
            }
          });
          break;
        default:
          if (ctx.message.text.indexOf("?") !== -1) {
            // Нужно ответить на вопрос
            const answers = require("../include/answers.json");
            answer = answers[RandomInt(1, Object.keys(answers).length)];
          } else {
            // Рандомная фраза
            const phrases = require("../include/phrases.json");  
            answer = phrases[RandomInt(1, Object.keys(phrases).length)];
          }
          this.functions.sendMessage(ctx.message.from_id, answer);
          break;
      }
    });
  }
}