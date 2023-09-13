var router = require("express").Router()
var {sequelize, Op} = require("../../db")

var authMiddleware = require("../middlewares/auth")


router.get("/",async(req,res) => {
  try {
    var {offset,limit=20,order="DESC",search} = req.query

    if(search){
      var where = {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
        ]
      }
    }

    res.send(await sequelize.models.categorias.findAndCountAll({
      order: [["updatedAt", order]],
      offset: offset && Number(offset),
      limit: Number(limit),
      where
    }))
    // res.send(await sequelize.models.categorias.findAll())
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})

router.get("/:id",async(req,res) => {
  try {
    var {id} = req.params
    res.send(await sequelize.models.categorias.findByPk(id))
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})

router.put("/:id",authMiddleware,async(req,res) => {
  try {
    var userTokenID = await sequelize.models.users.findByPk(req.user.id)

    if(userTokenID.rol === "admin"){
      var {id} = req.params

      await sequelize.models.categorias.update(req.body,{where: {id}})
      res.send(await sequelize.models.categorias.findByPk(id))
    }else{
      res.status(401).send({message: "No autorizado",status:401})
    }
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})

router.post("/",authMiddleware,async(req,res) => {
  try {
    var userTokenID = await sequelize.models.usuarios.findByPk(req.user.id)

    if(userTokenID.rol === "admin"){
      res.send(await sequelize.models.categorias.create(req.body))
    }else{
      res.status(401).send({message: "No autorizado",status:401})
    }
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})

router.delete("/:id",authMiddleware,async(req,res) => {
  try {
    var userTokenID = await sequelize.models.users.findByPk(req.user.id)

    if(userTokenID.rol === "admin"){
      var {id} = req.params
      await sequelize.models.categorias.destroy({where: {id}})
      res.send({message: "deleted"})
    }else{
      res.status(401).send({message: "No autorizado",status:401})
    }
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})

module.exports = router