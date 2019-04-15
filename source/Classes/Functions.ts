/**
 * @description Функции
 */

import { Main } from "./";
import { RandomInt } from "../Utils";

export default class Functions extends Main {
  bot: any;

  constructor(bot: any) {
    super();

    this.bot = bot;
  }

  /**
   * @description Отправка сообщения с рандомной задержкой
   */
  public sendMessage(user_id: number, text: string) {
    const read_timeout: number = RandomInt(1, 5) * 1000;
    const send_timeout: number = RandomInt(1, 5) * 1000;

    setTimeout(() => {
      this.bot.execute("messages.markAsRead", {
        peer_id: user_id
      }, () => {
        this.typing(user_id, send_timeout);

        setTimeout(() => {
          this.bot.sendMessage(user_id, text);
        }, send_timeout);
      });
    }, read_timeout)
  }

  /**
   * @description Имитация набора сообщения
   * @param {number} user_id - ID пользователя VK
   * @param {number} duration - длительность (мс)
   */
  public typing(user_id: number, duration: number) {
    const setActivity = () => {
      this.bot.execute("messages.setActivity", {
        user_id,
        type: "typing"
      });
    };

    const step: number = 10000;

    if (duration > step) {
      const cycles: number = Math.floor(duration / step) - 1;
      const modulo: number = duration - (step * cycles);
      let count: number = 1;

      setActivity();

      const timer: any = setInterval(() => {
        if (count < cycles) {
          setActivity();
          count++;
        } else {
          if (modulo > 0) {
            setActivity();
          }

          clearInterval(timer);
        }
      }, step);
    } else {
      setActivity();
    }
  }
}