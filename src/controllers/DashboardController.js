const UsuarioController = require("./UsuarioController");
const LocalController = require("./LocalController");

const getDashboardData = async () => {
  const usuarios = await UsuarioController.searchAllForDashboard();
  const locais = await LocalController.searchAllForDashboard();

  const totalUsuarios = usuarios.length;
  const totalLocais = locais.length;

  const userLocaisCount = {};
  locais.forEach((local) => {
    const userId = local.userId;
    userLocaisCount[userId] = (userLocaisCount[userId] || 0) + 1;
  });

  const userIdMaisLocais = Object.keys(userLocaisCount).reduce((a, b) =>
    userLocaisCount[a] > userLocaisCount[b] ? a : b,
  );

  const usuarioComMaisLocaisCadastrados = usuarios.find(
    (usuario) => usuario.id == userIdMaisLocais,
  )?.nome;

  const localComMaisResiduosAceitos = locais.reduce((prev, current) =>
    prev.residuos_aceitos.length > current.residuos_aceitos.length
      ? prev
      : current,
  );

  const localComMaisResiduosAceitosNome = localComMaisResiduosAceitos.nome;

  return {
    totalUsuarios,
    totalLocais,
    usuarioComMaisLocaisCadastrados,
    localComMaisResiduosAceitos: localComMaisResiduosAceitosNome,
  };
};

module.exports = { getDashboardData };
