"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: { type: Sequelize.STRING, allowNull: false },
      sexo: { type: Sequelize.STRING, allowNull: false },
      cpf: { type: Sequelize.STRING, unique: true, allowNull: false },
      email: { type: Sequelize.STRING, unique: true, allowNull: false },
      password_hash: { type: Sequelize.STRING, allowNull: false },
      dataNascimento: { type: Sequelize.DATE, allowNull: false },
      endereco:{type: Sequelize.STRING, allowNull: false},
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  },
};
