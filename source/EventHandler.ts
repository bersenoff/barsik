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