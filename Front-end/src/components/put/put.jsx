const [idEditando, setIdEditando] = useState(null);
const [nomeEditado, setNomeEditado] = useState("");
const [precoEditado, setPrecoEditado] = useState("");

function prepararEdicao(produto) {
  setIdEditando(produto.id);
  setNomeEditado(produto.nome);
  setPrecoEditado(produto.preco);
}

async function salvarEdicao(event) {
  event.preventDefault();

  const produtoAtualizado = {
    nome: nomeEditado,
    preco: precoEditado,
  };

  try {
    await fetch(`${API_URL}/${idEditando}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produtoAtualizado),
    });

    alert("Produto atualizado!");

    setIdEditando(null);
    setNomeEditado("");
    setPrecoEditado("");

    buscarProdutos();
  } catch (erro) {
    console.log("Erro ao editar:", erro);
  }
}

<button onClick={() => prepararEdicao(produto)}>
  Editar
</button>

{idEditando && (
  <form onSubmit={salvarEdicao}>
    <input
      type="text"
      value={nomeEditado}
      onChange={(event) => setNomeEditado(event.target.value)}
    />

    <input
      type="number"
      value={precoEditado}
      onChange={(event) => setPrecoEditado(event.target.value)}
    />

    <button type="submit">Salvar edição</button>
  </form>
)}
