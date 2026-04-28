async function excluirProduto(id) {
  const confirmar = confirm("Deseja excluir este produto?");

  if (!confirmar) {
    return;
  }

  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    alert("Produto excluído!");

    buscarProdutos();
  } catch (erro) {
    console.log("Erro ao excluir:", erro);
  }
}

<button onClick={() => excluirProduto(produto.id)}>
  Excluir
</button>
