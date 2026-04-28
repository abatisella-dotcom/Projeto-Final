const [nome, setNome] = useState("");
const [preco, setPreco] = useState("");

async function cadastrarProduto(event) {
  event.preventDefault();

  const novoProduto = {
    nome: nome,
    preco: preco,
  };

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoProduto),
    });

    alert("Produto cadastrado com sucesso!");

    setNome("");
    setPreco("");

    buscarProdutos();
  } catch (erro) {
    console.log("Erro ao cadastrar:", erro);
  }
}

<form onSubmit={cadastrarProduto}>
  <input
    type="text"
    placeholder="Nome do produto"
    value={nome}
    onChange={(event) => setNome(event.target.value)}
  />

  <input
    type="number"
    placeholder="Preço"
    value={preco}
    onChange={(event) => setPreco(event.target.value)}
  />

  <button type="submit">Cadastrar</button>
</form>
