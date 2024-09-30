"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "locations",
      [
        {
          "nome": "Recicla Fácil",
          "descricao": "Coleta de resíduos diversos",
          "localidade": "Rua Bocaiúva",
          "coordenadas": "-27.5864138, -48.5483920",
          "userId": 3,
          "cep": "88015-530",
          "googleMapsLink": "https://maps.app.goo.gl/JdCSm9fnhcfccaJc9",
          "bairro": "Centro",
          "logradouro": "Rua Bocaiúva",
          "estado": "Santa Catarina",
          "numero": 123,
          "residuos_aceitos": ["Metal", "Vidro", "Papel", "Plástico", "Orgânicos",],
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "nome": "EcoPonto Verde",
          "descricao": "Coleta de eletrônicos",
          "localidade": "Avenida Beira Mar Norte",
          "coordenadas": "-27.595377, -48.548049",
          "userId": 1,
          "cep": "88015-700",
          "googleMapsLink": "https://maps.app.goo.gl/TCFqKiDrheaSDgaBA",
          "bairro": "Centro",
          "logradouro": "Avenida Beira Mar Norte",
          "estado": "Santa Catarina",
          "numero": 456,
          "residuos_aceitos": ["Eletrônicos", "Baterias", "Eletrônicos"],
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "nome": "Ponto Sustentável",
          "descricao": "Coleta de plásticos",
          "localidade": "Rua Felipe Schmidt",
          "coordenadas": "-27.596903, -48.549454",
          "userId": 4,
          "cep": "88010-001",
          "googleMapsLink": "https://maps.app.goo.gl/J1cEjomc42uzS1u6A",
          "bairro": "Centro",
          "logradouro": "Rua Felipe Schmidt",
          "estado": "Santa Catarina",
          "numero": 789,
          "residuos_aceitos": ["Plástico", "Papelão", "Móveis"],
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "nome": "Reciclagem Total",
          "descricao": "Coleta de orgânicos",
          "localidade": "Rua Conselheiro Mafra",
          "coordenadas": "-27.597743, -48.550377",
          "userId": 2,
          "cep": "88010-100",
          "googleMapsLink": "https://maps.app.goo.gl/b95YDYpimBYVReF16",
          "bairro": "Centro",
          "logradouro": "Rua Conselheiro Mafra",
          "estado": "Santa Catarina",
          "numero": 101,
          "residuos_aceitos": ["Orgânicos", "Metal", "Papel", "Plástico"],
          "createdAt": new Date(),
          "updatedAt": new Date()
        },
        {
          "nome": "EcoAmigos",
          "descricao": "Coleta de vidros",
          "localidade": "Rua Tenente Silveira",
          "coordenadas": "-27.598583, -48.551301",
          "userId": 5,
          "cep": "88010-200",
          "googleMapsLink": "https://maps.app.goo.gl/k7HmkfCSB7BQQrK58",
          "bairro": "Centro",
          "logradouro": "Rua Tenente Silveira",
          "estado": "Santa Catarina",
          "numero": 202,
          "residuos_aceitos": ["Vidro"],
          "createdAt": new Date(),
          "updatedAt": new Date()
        }
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Locations", null, {});
  },
};

