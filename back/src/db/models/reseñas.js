var { DataTypes} = require("sequelize")



module.exports = (s) => {
  s.define("reseñas",{
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    estrellas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    oculta: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    } 
  })
}