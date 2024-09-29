const Usuario = require('./Usuario')
const Local = require('./local')

Local.belongsTo(Usuario, { foreignKey: 'userId' });
Usuario.hasMany(Local, { foreignKey: 'userId' });