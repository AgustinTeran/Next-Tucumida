var router = require("express").Router()
var {sequelize,Op} = require("../../db")
var authMiddleware = require("../middlewares/auth")
var bcrypt = require("bcrypt")

var jwt = require("jsonwebtoken")

router.get("/",async(req,res) => {
  try {
    var {offset,limit=20,order="DESC",search} = req.query

    if(search){
      var where = {
        [Op.or]: [
          { nombre: { [Op.iLike]: `%${search}%` } },
        ]
      }
    }

    res.send(await sequelize.models.usuarios.findAndCountAll({
      order: [["updatedAt", order]],
      offset: offset && Number(offset),
      limit: Number(limit),
      where
    }))
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})

router.get("/profile",authMiddleware,async(req,res) => {
  try {
    var {id} = req.user

    res.send(await sequelize.models.usuarios.findByPk(id,{
      attributes: ["id","nombre","email","rol"]
    }))
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})

router.get("/:id",async(req,res) => {
  try {
    var {id} = req.params
    res.send(await sequelize.models.usuarios.findByPk(id))
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})

router.put("/:id",authMiddleware,async(req,res) => {
  try {
    var userTokenID = await sequelize.models.usuarios.findByPk(req.user.id)
    var {id} = req.params

    if(userTokenID.role === "admin" || req.user.id === id){
      var {contraseña} = req.body

      if(userTokenID.role !== "admin") req.body.role = "user";


      if(contraseña){
        req.body.contraseña = await bcrypt.hash(contraseña,9)
      }
      await sequelize.models.usuarios.update(req.body,{where: {id}})
      res.send(await sequelize.models.usuarios.findByPk(id,{attributes: ["id","nombre","email","role"]}))
    }else{
      res.status(401).send({message: "No autorizado",status:401})
    }
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})


router.delete("/:id",authMiddleware,async(req,res) => {
  try {
    var {id} = req.params

    if(req.user.id === id){
      await sequelize.models.usuarios.destroy({where: {id}})
      return res.send({message: "deleted"})
    }
    
    var userTokenID = await sequelize.models.usuarios.findByPk(req.user.id)

    if(userTokenID.role === "admin"){
      await sequelize.models.usuarios.destroy({where: {id}})
      return res.send({message: "deleted"})
    }

    res.status(401).send({message: "No autorizado",status:401})
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})


// AUTENTICACION

router.post("/",async(req,res) => {
  try {
    var {nombre,email,contraseña} = req.body

    if(await sequelize.models.usuarios.findOne({where: {nombre}})){
      return res.status(400).send({message: "Nombre de usuario en uso",status: 400})
    }

    if(await sequelize.models.usuarios.findOne({where: {email}})){
      return res.status(400).send({message: "Email en uso",status: 400})
    }

    contraseña = await bcrypt.hash(contraseña,9)
    var newUser = await sequelize.models.usuarios.create({nombre,email,contraseña})


    res.send(jwt.sign({id: newUser.id,nombre,email},process.env.SECRET))
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})

router.post("/auth",async(req,res) => {
  try {
    var {email,contraseña} = req.body

    var user = await sequelize.models.usuarios.findOne({where: {email}})

    
    if(user){
      if(await bcrypt.compare(contraseña,user.contraseña)){
        var token = jwt.sign({id: user.id,nombre: user.nombre,email},process.env.SECRET)
        res.send(token)
      }else{
        res.status(401).send({message: "Email o contraseña incorrectos",status: 401})
      }
    }else{
      res.status(401).send({message: "Email o contraseña incorrectos",status: 401})
    }

  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})



module.exports = router