const { Sequelize } = require("sequelize");

// db name, username, password
const sequelize = new Sequelize("postgres", "postgres", "mysecretpassword", {
  host: "localhost",
  dialect: "postgres",
});

sequelize.sync();

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to Postgres");
  } catch (err) {
    console.log(err);
  }
})();

module.exports = sequelize;
