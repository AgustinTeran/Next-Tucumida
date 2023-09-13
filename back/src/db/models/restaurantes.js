var { DataTypes} = require("sequelize")



module.exports = (s) => {
  s.define("restaurantes",{
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: true
    },
    facebook_link: {
      type: DataTypes.STRING,
      allowNull: true
    },
    facebook_usuario: {
      type: DataTypes.STRING,
      allowNull: true
    },
  })
}