var { DataTypes} = require("sequelize")



module.exports = (s) => {
  s.define("ubicaciones",{
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    calle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    departamento: {
      type: DataTypes.ENUM(
        "Burruyacú",
        "Capital",
        "Cruz Alta",
        "La Cocha",
        "Chicligasta",
        "Famaillá",
        "Graneros",
        "Juan Bautista Alberdi",
        "Leales",
        "Lules",
        "Monteros",
        "Río Chico",
        "Simoca",
        "Tafí del Valle",
        "Tafí Viejo",
        "Trancas",
        "Yerba Buena",
      ),
      allowNull: false
    },
    lat: {
      type: DataTypes.STRING,
      allowNull: false
    },
    long: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}