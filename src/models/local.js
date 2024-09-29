const { DataTypes } = require("sequelize");
const connection = require("../database/connection");



const Local = connection.define(
  "locations",
  {
    nome: { type: DataTypes.STRING, allowNull: false },
    descricao: DataTypes.STRING,
    cep: { type: DataTypes.STRING, allowNull: false },
    userId: { 
      type: DataTypes.INTEGER,
      references: {
        model: 'users', 
        key: 'id'
      },
    },
    bairro: DataTypes.STRING,
    logradouro: DataTypes.STRING,
    localidade: DataTypes.STRING,
    estado: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    coordenadas: DataTypes.TEXT,
    googleMapsLink: DataTypes.STRING,
  },
  {
    tableName: "locations",
  }
);

module.exports = Local;
