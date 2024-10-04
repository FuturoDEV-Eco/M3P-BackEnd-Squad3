// dashboard.routes.js

const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const LocalController = require('../controllers/LocalController');

router.get('/dashboard', async (req, res) => {
  try {
    const usuarios = await UsuarioController.searchAllForDashboard();
    const locais = await LocalController.searchAllForDashboard();

    // 1. Total de usuários
    const totalUsuarios = usuarios.length;

    // 2. Total de locais
    const totalLocais = locais.length;

    // 3. Determinar o usuário com mais locais cadastrados
    const userLocaisCount = {};
    locais.forEach(local => {
      const userId = local.userId;
      userLocaisCount[userId] = (userLocaisCount[userId] || 0) + 1;
    });

    const userIdMaisLocais = Object.keys(userLocaisCount).reduce((a, b) => 
      userLocaisCount[a] > userLocaisCount[b] ? a : b
    );

    const usuarioComMaisLocaisCadastrados = usuarios.find(usuario => usuario.id == userIdMaisLocais)?.nome;

    // 4. Determinar o local com mais resíduos aceitos
    const localComMaisResiduosAceitos = locais.reduce((prev, current) => 
      (prev.residuos_aceitos.length > current.residuos_aceitos.length) ? prev : current
    );

    const localComMaisResiduosAceitosNome = localComMaisResiduosAceitos.nome;

    res.status(200).json({
      totalUsuarios,
      totalLocais,
      usuarioComMaisLocaisCadastrados,
      localComMaisResiduosAceitos: localComMaisResiduosAceitosNome,
      usuarios,
      locais,
    });
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
});

module.exports = router;
