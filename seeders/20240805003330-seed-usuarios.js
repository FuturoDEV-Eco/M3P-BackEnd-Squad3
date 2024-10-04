"use strict";
const { hashSync } = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword1 = hashSync("password1", 10);
    const hashedPassword2 = hashSync("password2", 10);
    const hashedPassword3 = hashSync("password3", 10);
    const hashedPassword4 = hashSync("password4", 10);
    const hashedPassword5 = hashSync("password5", 10);

    await queryInterface.bulkInsert(
      "users",
      [
        {
          nome: "Ana Silva",
          sexo: "Feminino",
          cpf: "12345678901",
          endereco: "Rua das Flores, 123, Bairro Jardim, São Paulo, SP, Brasil",
          email: "anasilva@example.com",
          password_hash: hashedPassword1,
          dataNascimento: new Date(1990, 0, 1),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Carlos Pereira",
          sexo: "Masculino",
          cpf: "23456789012",
          endereco: "Avenida Central, 456, Centro, Rio de Janeiro, RJ, Brasil",
          email: "carlospereira@example.com",
          password_hash: hashedPassword2,
          dataNascimento: new Date(1991, 1, 2),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Beatriz Souza",
          sexo: "Feminino",
          cpf: "34567890123",
          endereco:
            " Rua das Palmeiras, 789, Bairro Bela Vista, Porto Alegre, RS, Brasil",
          email: "beatrizsouza@example.com",
          password_hash: hashedPassword3,
          dataNascimento: new Date(1992, 2, 3),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Mariana Costa",
          sexo: "Feminino",
          cpf: "45678901234",
          endereco: "Rua do Sol, 101, Bairro Luz, Belo Horizonte, MG, Brasil",
          email: "marianacosta@example.com",
          password_hash: hashedPassword4,
          dataNascimento: new Date(1993, 3, 4),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "João Oliveira",
          sexo: "Masculino",
          cpf: "56789012345",
          endereco:
            "Avenida das Nações, 202, Bairro Internacional, Brasília, DF, Brasil",
          email: "joaooliveira@example.com",
          password_hash: hashedPassword5,
          dataNascimento: new Date(1994, 4, 5),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
