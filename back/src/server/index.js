var express = require("express")
var server = express()

server.use(express.json())


const cors = require("cors")
server.use(cors({
  origin: ["http://localhost:3000","http://tucumida.com.ar","https://next-tucumida-kappa.vercel.app"],
  credentials: true
}))


const cookieParser = require('cookie-parser');
server.use(cookieParser())


server.use("/",require("./routes/router"))

module.exports = server