var { DataTypes} = require("sequelize")



module.exports = (s) => {
  s.define("imagenes",{
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    imagen: {
      type: DataTypes.BLOB(),
      allowNull: false
    },
    tipo: {
      type: DataTypes.ENUM(
        "png",
        "jpg",
        "jpeg",
        "svg"
      ),
      allowNull: false
    }
  })
}