const Local = require('./local')
const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const {hashSync} = require('bcryptjs')

const Usuario = connection.define("users", {
  
  nome: { type: DataTypes.STRING, allowNull: false },
  sexo: { type: DataTypes.STRING, allowNull: false },
  cpf: { type: DataTypes.STRING, unique: true, allowNull: false },
  endereco: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password_hash: { type: DataTypes.STRING, allowNull: false },
  dataNascimento: { type: DataTypes.DATE, allowNull: false }
});


Usuario.beforeSave((users) => {
    users.password_hash = hashSync(users.password_hash, 10)
    return users
})

module.exports = Usuario;
