const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const Local = connection.define(
  "Local",
  {
    nome: { type: DataTypes.STRING, allowNull: false },
    descricao: DataTypes.STRING,
    cep: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    cep: DataTypes.STRING,
    bairro: DataTypes.STRING,
    logradouro: DataTypes.STRING,
    localidade: DataTypes.STRING,
    estado: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    coordenadas: DataTypes.TEXT,
    googleMapsLink: DataTypes.STRING,
  },
  {
    tableName: "Locations",
  }
);


module.exports = Local;
