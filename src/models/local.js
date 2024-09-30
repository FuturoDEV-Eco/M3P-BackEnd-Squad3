const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const Local = connection.define("locations", {
  nome: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.STRING },
  cep: { type: DataTypes.STRING, allowNull: false },
  userId: { 
    type: DataTypes.INTEGER,
    references: {
      model: 'users', 
      key: 'id'
    },
  },
  bairro: { type: DataTypes.STRING },
  logradouro: { type: DataTypes.STRING },
  localidade: { type: DataTypes.STRING },
  estado: { type: DataTypes.STRING },
  numero: { type: DataTypes.INTEGER },
  residuos_aceitos: { type: DataTypes.ARRAY(DataTypes.STRING) },
  coordenadas: { type: DataTypes.TEXT },
  googleMapsLink: { type: DataTypes.STRING },
}, {
  tableName: "locations",
});

module.exports = Local;




// formatação antiga salva por segurança, our por se da erro, apagar depois de testes:


// const { DataTypes } = require("sequelize");
// const connection = require("../database/connection");



// const Local = connection.define(
//   "locations",
//   {
//     nome: { type: DataTypes.STRING, allowNull: false },
//     descricao: DataTypes.STRING,
//     cep: { type: DataTypes.STRING, allowNull: false },
//     userId: { 
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'users', 
//         key: 'id'
//       },
//     },
//     bairro: DataTypes.STRING,
//     logradouro: DataTypes.STRING,
//     localidade: DataTypes.STRING,
//     estado: DataTypes.STRING,
//     numero: DataTypes.INTEGER,
//     residuos_aceitos: DataTypes.ARRAY(DataTypes.STRING),
//     coordenadas: DataTypes.TEXT,
//     googleMapsLink: DataTypes.STRING,
//   },
//   {
//     tableName: "locations",
//   }
// );

// module.exports = Local;
