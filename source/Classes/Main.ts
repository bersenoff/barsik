/**
 * @description Базовый класс
 */

import { Sequelize as db } from "../Utils";
import { Sequelize } from "sequelize/types";

export default class Main {
  db: Sequelize;

  constructor() {
    this.db = db;
  }
}