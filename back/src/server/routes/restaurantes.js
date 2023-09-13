var router = require("express").Router()
var {sequelize, Op} = require("../../db")

var authMiddleware = require("../middlewares/auth")


router.get("/",async(req,res) => {
  try {
    var {offset,limit=20,order="DESC",search} = req.query

    if(search){
      var where = {
        [Op.or]: [
          { nombre: { [Op.iLike]: `%${search}%` } },
          sequelize.literal(`EXISTS (
            SELECT 1 FROM "restaurantes_categorias" AS "restaurantes_categorias"
            INNER JOIN "categorias" AS "categoria"
            ON "restaurantes_categorias"."categoriaId" = "categoria"."id"
            WHERE "restaurantes_categorias"."restauranteId" = "restaurantes"."id"
            AND "categoria"."nombre" ILIKE '%${search}%'
          )`),
        ]
      }
    }

    res.send(await sequelize.models.restaurantes.findAndCountAll({
      order: [["nombre", order]],
      offset: offset && Number(offset),
      limit: Number(limit),
      where,
      distinct: true,
      include: [{
        through: { attributes: [] },
        model: sequelize.models.categorias,
        attributes: ["nombre"],
      }]
    }))
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})

router.get("/misRestaurantes",authMiddleware,async(req,res) => {
  try {
    var {id} = req.user
    res.send(await sequelize.models.restaurantes.findAndCountAll({
      order: [["updatedAt", "DESC"]],
      where: {
        usuarioId: id
      },
      include: {
        through: { attributes: [] },
        model: sequelize.models.categorias,
        attributes: ["nombre"]
      }
    }))
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})

router.get("/:id",async(req,res) => {
  try {
    var {id} = req.params
    var restaurante = await sequelize.models.restaurantes.findByPk(id,{
      include: [
        sequelize.models.ubicaciones,
        {
          model: sequelize.models.categorias,
          through: { attributes: [] },
        } 
      ]})

    if(!restaurante){
      return res.status(400).send({message:"No se encontro un restaurante con dicho id",status:400})
    }

    // console.log(restaurante.ubicacione.toJSON());

    restaurante = {...restaurante.toJSON(),ubicacion: restaurante.toJSON().ubicacione}
    delete restaurante.ubicacione
    res.send(restaurante)
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})

router.put("/:id",authMiddleware,async(req,res) => {
  try {
    var idToken = req.user.id

    var restaurante = await sequelize.models.restaurantes.findByPk(req.params.id)

    if(!restaurante){
      res.status(400).send({status: 400,message: "No se encontro el restaurante"})
    }

    if(restaurante.usuarioId === idToken){
      var {nombre,imagen,numero,instagram,facebook_link,facebook_usuario,calle,departamento,lat,long,categorias} = req.body

      if (categorias && !categorias.length) {
        throw new Error("Agrega al menos 1 categoría");
      }
  
      await restaurante.update({
        nombre,
        imagen,
        numero,
        instagram,
        facebook_link,
        facebook_usuario
      })

      if(categorias){
        await restaurante.removeCategorias();
        await restaurante.setCategorias(categorias);
      }

      
    
      await sequelize.models.ubicaciones.update({nombre,calle,departamento,lat,long},{where: {id: restaurante.ubicacioneId}})

      return res.send(restaurante)
    }



    var userTokenID = await sequelize.models.usuarios.findByPk(idToken)
    if(userTokenID.rol === "admin"){
      var {nombre,imagen,numero,instagram,facebook_link,facebook_usuario,calle,departamento,lat,long,categorias} = req.body
  
      if (!categorias?.length) {
        throw new Error("Agrega al menos 1 categoría");
      }

      await restaurante.update({
        nombre,
        imagen,
        numero,
        instagram,
        facebook_link,
        facebook_usuario
      })

      await restaurante.removeCategorias();
      await restaurante.setCategorias(categorias);
    
      await sequelize.models.ubicaciones.update({nombre,calle,departamento,lat,long},{where: {id: restaurante.ubicacioneId}})

      
      return res.send(restaurante)
    }
    

    res.status(401).send({message: "No autorizado",status:401})
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})

router.post("/",authMiddleware,async(req,res) => {
  try {
    var owner = req.user.id

    var {nombre,imagen,numero,instagram,facebook_link,facebook_usuario,calle,departamento,lat,long,categorias} = req.body

    if(!categorias?.length){
       throw new Error("Agrega al menos 1 categoria")
    }

    var restaurante = await sequelize.models.restaurantes.create({
      nombre,
      imagen,
      numero,
      instagram,
      facebook_link,
      facebook_usuario
    })

    await restaurante.setCategorias(categorias)

    
    await restaurante.setUsuario(owner)
    
    var ubicacion = await sequelize.models.ubicaciones.create({nombre,calle,departamento,lat,long})
    await restaurante.setUbicacione(ubicacion.id)
    
    res.send(restaurante)
    
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})

router.delete("/:id",authMiddleware,async(req,res) => {
  try {
    var idToken = req.user.id

    var restaurante = await sequelize.models.restaurantes.findByPk(req.params.id)

    if(!restaurante){
      res.status(400).send({status: 400,message: "No se encontro el restaurante"})
    }

    if(restaurante.usuarioId === idToken){
      
      await sequelize.models.ubicaciones.destroy({where: {id: restaurante.ubicacioneId}})
      await restaurante.destroy()

      return res.send("Se elimino")
    }



    var userTokenID = await sequelize.models.usuarios.findByPk(idToken)
    if(userTokenID.rol === "admin"){
      
      await sequelize.models.ubicaciones.destroy({where: {id: restaurante.ubicacioneId}})
      await restaurante.destroy()
 
      return res.send("Se elimino como admin")
    }
    

    res.status(401).send({message: "No autorizado",status:401})
  } catch (error) {
    res.status(404).send({message: error.message,status:404})
  }
})

module.exports = router