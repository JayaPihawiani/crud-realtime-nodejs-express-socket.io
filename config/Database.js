import { Sequelize } from "sequelize";

const db = new Sequelize("realtime_crud", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
