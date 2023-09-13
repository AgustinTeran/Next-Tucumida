var jwt = require("jsonwebtoken")
var {SECRET} = process.env


module.exports = (req,res,next) => {
    var token = req.headers.token

    if(!token) return res.status(401).send("Acceso Denegado")


    try {
        var verficar = jwt.verify(token,SECRET) 
        req.user = verficar
        next()
    } catch (error) {
         res.status(401).send("Acceso Denegado")
    }
}