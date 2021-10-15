module.exports = {
  development: {
    username: "root",
    password: null,
    database: "api_node",
    host: "127.0.0.1",
    dialect: "mysql",
    user_env_variable: false,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    user_env_variable: false,
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    user_env_variable: false,
  },
};
