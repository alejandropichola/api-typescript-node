import path from "path";
import { Sequelize } from "sequelize";
const env = process.env.NODE_ENV || "development";
import configuration from "../../config/config";

// @ts-ignore
const config = configuration[env];

let sequelize: Sequelize | null = null;

if (config.use_env_variable) {
  // @ts-ignore
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

export const SequelizeDb = sequelize;
