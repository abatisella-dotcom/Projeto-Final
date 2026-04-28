const produtosModel = require('../models/produtosModels');

// LISTAR
async function listarTodos(req, res) {
  try {
    const produtos = await produtosModel.listarTodos();
    res.status(200).json(produtos);
  } catch (erro) {
    res.status(500).json({ mensagem: erro.message });
  }
}

// BUSCAR POR ID
async function buscarPorId(req, res) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ mensagem: 'ID inválido' });
    }

    const produto = await produtosModel.buscarPorId(id);

    if (produto) {
      res.json(produto);
    } else {
      res.status(404).json({ mensagem: 'Não encontrado' });
    }
  } catch (erro) {
    res.status(500).json({ mensagem: erro.message });
  }
}

// BUSCAR POR NOME
async function buscarPorNome(req, res) {
  try {
    const { nome } = req.params;
    const produtos = await produtosModel.buscarPorNome(nome);
    res.json(produtos);
  } catch (erro) {
    res.status(500).json({ mensagem: erro.message });
  }
}

// CRIAR
async function criar(req, res) {
  try {
    const { nome, preco, estoque, categoria } = req.body;

    if (!nome || !preco || !estoque || !categoria) {
      return res.status(400).json({ mensagem: 'Campos obrigatórios' });
    }

    const novo = await produtosModel.criar({ nome, preco, estoque, categoria });
    res.status(201).json(novo);
  } catch (erro) {
    res.status(500).json({ mensagem: erro.message });
  }
}

// ATUALIZAR
async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { nome, preco, estoque, categoria } = req.body;

    const atualizado = await produtosModel.atualizar(id, {
      nome,
      preco,
      estoque,
      categoria
    });

    res.json(atualizado);
  } catch (erro) {
    res.status(500).json({ mensagem: erro.message });
  }
}

// DELETAR
async function deletar(req, res) {
  try {
    const id = parseInt(req.params.id);
    await produtosModel.deletar(id);
    res.json({ mensagem: 'Deletado com sucesso' });
  } catch (erro) {
    res.status(500).json({ mensagem: erro.message });
  }
}

module.exports = {
  listarTodos,
  buscarPorId,
  buscarPorNome,
  criar,
  atualizar,
  deletar
};
