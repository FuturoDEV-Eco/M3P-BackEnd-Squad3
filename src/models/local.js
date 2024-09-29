const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const Local = connection.define("locations", {
  nome: { type: DataTypes.STRING, allowNull: false },
  descricao: DataTypes.STRING,
  cep: { type: DataTypes.STRING, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  localidade: DataTypes.STRING,
  coordenadas: DataTypes.TEXT,
  googleMapsLink: DataTypes.STRING,
});

module.exports = Local;