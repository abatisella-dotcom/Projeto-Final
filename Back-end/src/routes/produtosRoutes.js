import express from 'express';
import produtosControllers from '../controllers/produtosControllers.js';

const router = express.Router();

// ROTAS
router.get('/', produtosControllers.listarTodos);
router.get('/buscar/nome/:nome', produtosControllers.buscarPorNome);
router.get('/buscar/id/:id', produtosControllers.buscarPorId);
router.post('/', produtosControllers.criar);
router.put('/:id', produtosControllers.atualizar);
router.delete('/:id', produtosControllers.deletar);

export default router;
