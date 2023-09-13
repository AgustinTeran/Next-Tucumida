require('dotenv').config()
var {Sequelize,Op} = require("sequelize")



// var {DB_USER, DB_HOST, DB_PASSWORD, DB_DATABASE}  = process.env
// var sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_DATABASE}`,{logging:false})


var {POSTGRES_USER, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_DATABASE}  = process.env
var sequelize = new Sequelize({
    database: `${POSTGRES_DATABASE}`,
    dialect: "postgres",
    host: `${POSTGRES_HOST || "localhost"}`,
    port: "5432",
    username: `${POSTGRES_USER}`,
    password: `${POSTGRES_PASSWORD}`,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      keepAlive: true,
    },
    ssl: true,
  })


  // Inicializo los modelos
  require("./models/usuarios")(sequelize)
  require("./models/restaurantes")(sequelize)
  require("./models/categorias")(sequelize)
  require("./models/imagenes")(sequelize)
  require("./models/ubicaciones")(sequelize)
  require("./models/reseñas")(sequelize)




  // Relacion de los modelos
  sequelize.models.usuarios.hasMany(sequelize.models.restaurantes)
  sequelize.models.restaurantes.belongsTo(sequelize.models.usuarios)

  sequelize.models.usuarios.belongsToMany(sequelize.models.restaurantes,{through: sequelize.models.reseñas})
  sequelize.models.restaurantes.belongsToMany(sequelize.models.usuarios,{through: sequelize.models.reseñas})


  sequelize.models.restaurantes.belongsTo(sequelize.models.usuarios)
  sequelize.models.restaurantes.belongsTo(sequelize.models.usuarios)


  sequelize.models.ubicaciones.hasOne(sequelize.models.restaurantes)
  sequelize.models.restaurantes.belongsTo(sequelize.models.ubicaciones)

  sequelize.models.categorias.belongsToMany(sequelize.models.restaurantes,{through:"restaurantes_categorias"})
  sequelize.models.restaurantes.belongsToMany(sequelize.models.categorias,{through:"restaurantes_categorias"})

  
  


module.exports = {sequelize,Op}