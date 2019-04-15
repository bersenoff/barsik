/**
 * @description Генерация случайного числа из диапазона
 */

export default (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}