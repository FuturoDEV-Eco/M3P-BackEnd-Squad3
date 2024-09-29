"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("locations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: { allowNull: false, type: Sequelize.STRING },
      descricao: { type: Sequelize.STRING },
      cep: { allowNull: false, type: Sequelize.STRING },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      cep: { type: Sequelize.STRING },
      bairro: { type: Sequelize.STRING },
      logradouro: { type: Sequelize.STRING }, // lembraça: lougradouro é rua
      localidade: { type: Sequelize.STRING },
      estado: { type: Sequelize.STRING },
      numero: { type: Sequelize.INTEGER },
      coordenadas: { type: Sequelize.TEXT },
      googleMapsLink: { type: Sequelize.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("locations");
  },
};
