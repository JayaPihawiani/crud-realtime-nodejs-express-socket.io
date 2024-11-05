import db from "../config/Database.js";
import { DataTypes } from "sequelize";

const Product = db.define(
  "products",
  {
    name: DataTypes.STRING(50),
    desc: DataTypes.STRING(50),
    price: DataTypes.INTEGER,
  },
  { freezeTableName: true }
);

export default Product;
