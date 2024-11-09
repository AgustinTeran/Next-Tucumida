require("pg")
var server = require("./src/server")
var {sequelize} = require("./src/db");
const { backURL } = require("./src/config");


server.listen(3001,async() => {
  await sequelize.sync({alter: true})
  console.log(`Listening on ${backURL}`);
})