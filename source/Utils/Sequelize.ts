/**
 * @description Для работы с MySQL
 */

import { Sequelize as sequelize } from "sequelize";

export default new sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  dialect: "mysql",
  timezone: "+08:00",
  logging: false
});