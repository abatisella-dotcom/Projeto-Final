const express = require('express');
const router = express.Router();

const produtosControllers = require('../controllers/produtosControllers');

// ROTAS
router.get('/', produtosControllers.listarTodos);
router.get('/buscar/nome/:nome', produtosControllers.buscarPorNome);
router.get('/buscar/id/:id', produtosControllers.buscarPorId);
router.post('/', produtosControllers.criar);
router.put('/:id', produtosControllers.atualizar);
router.delete('/:id', produtosControllers.deletar);

module.exports = router;
