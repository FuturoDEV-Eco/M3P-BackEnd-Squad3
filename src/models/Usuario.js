const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const {hashSync} = require('bcryptjs')

const Usuario = connection.define("users", {
  nome: { type: DataTypes.STRING, allowNull: false },
  sexo: DataTypes.STRING,
  cpf: { type: DataTypes.STRING, unique: true, allowNull: false },
  endereco: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password_hash: { type: DataTypes.STRING, allowNull: false },
  dataNascimento: DataTypes.DATE,
});

Usuario.beforeSave((users) => {
    users.password_hash = hashSync(users.password_hash, 10)
    return users
})

module.exports = Usuario;
