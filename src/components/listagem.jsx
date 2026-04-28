import { useEffect, useState } from "react";
import API_URL from "../services/api";

function Listagem() {
  // =========================
  // STATES
  // =========================
  const [produtos, setProdutos] = useState([]);

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [categoria, setCategoria] = useState("");

  const [editandoId, setEditandoId] = useState(null);

  const [buscaTipo, setBuscaTipo] = useState("nome");
  const [buscaValor, setBuscaValor] = useState("");

  const [loading, setLoading] = useState(false);

  // =========================
  // GET TODOS
  // =========================
  async function carregarProdutos() {
      setLoading(true);

      try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setProdutos(data);
          } catch (err) {
                alert("Erro ao carregar produtos");
              } finally {
                    setLoading(false);
                  }
      }

    useEffect(() => {
        carregarProdutos();
      }, []);

    // =========================
    // CREATE / UPDATE
    // =========================
    async function salvarProduto(e) {
        e.preventDefault();

        const dados = {
              nome,
              preco,
              estoque,
              categoria,
            };

          try {
                if (editandoId) {
                        await fetch(`${API_URL}/${editandoId}`, {
                                  method: "PUT",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify(dados),
                                });
                          alert("Produto atualizado!");
                        } else {
                                await fetch(API_URL, {
                                          method: "POST",
                                          headers: { "Content-Type": "application/json" },
                                          body: JSON.stringify(dados),
                                        });
                                  alert("Produto criado!");
                                }

                  limparFormulario();
                  carregarProdutos();
                } catch (err) {
                      alert("Erro ao salvar produto");
                    }
        }

    // =========================
    // DELETE
    // =========================
    async function deletarProduto(id) {
        if (!confirm("Deseja deletar este produto?")) return;

        try {
              await fetch(`${API_URL}/${id}`, {
                      method: "DELETE",
                    });

              carregarProdutos();
            } catch (err) {
                  alert("Erro ao deletar");
                }
        }

    // =========================
    // EDITAR
    // =========================
    function editarProduto(produto) {
        setEditandoId(produto.id);
        setNome(produto.nome);
        setPreco(produto.preco);
        setEstoque(produto.estoque);
        setCategoria(produto.categoria);
      }

    function limparFormulario() {
        setEditandoId(null);
        setNome("");
        setPreco("");
        setEstoque("");
        setCategoria("");
      }

    // =========================
    // BUSCA
    // =========================
    async function buscarProdutos() {
  if (!buscaValor) {
    carregarProdutos();
    return;
  }

  setLoading(true);

  try {
    let url;
    if (buscaTipo === "nome") {
      url = `${API_URL}?nome=${encodeURIComponent(buscaValor)}`;
    } else {
      url = `${API_URL}?id=${encodeURIComponent(buscaValor)}`;
    }

    const res = await fetch(url);
    let data = await res.json();

    if (!Array.isArray(data)) {
      data = data ? [data] : [];
    }

    setProdutos(data);
  } catch (err) {
    alert("Erro na busca");
  } finally {
    setLoading(false);
  }
}


    // =========================
    // RENDER
    // =========================
    return (
        <div>

          <h2>{editandoId ? `Editando Produto #${editandoId}` : "Adicionar Produto"}</h2>

          <form onSubmit={salvarProduto}>
            <input
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <input
              type="number"
              placeholder="Preço"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />

            <input
              type="number"
              placeholder="Estoque"
              value={estoque}
              onChange={(e) => setEstoque(e.target.value)}
            />

            <input
              placeholder="Categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />

            <button type="submit">
              {editandoId ? "Atualizar" : "Salvar"}
            </button>

            <button type="button" onClick={limparFormulario}>
              Limpar
            </button>
          </form>


          <h2>Lista de Produtos</h2>

          <button onClick={carregarProdutos}>
            🔄 Recarregar
          </button>

          {loading && <p>Carregando...</p>}

          {produtos.length === 0 && !loading && (
                  <p>Nenhum produto encontrado</p>
                )}

          {produtos.map((p) => (
                  <div key={p.id}>
                    <p>ID: {p.id}</p>
                    <p>Nome: {p.nome}</p>
                    <p>Preço: R$ {Number(p.preco).toFixed(2)}</p>
                    <p>Estoque: {p.estoque}</p>
                    <p>Categoria: {p.categoria}</p>

                    <button onClick={() => editarProduto(p)}>✏️</button>
                    <button onClick={() => deletarProduto(p.id)}>🗑️</button>
                  </div>
                ))}


          <h2>Buscar Produtos</h2>

          <select
            value={buscaTipo}
            onChange={(e) => setBuscaTipo(e.target.value)}
          >
            <option value="nome">Nome</option>
            <option value="id">ID</option>
          </select>

          <input
            placeholder="Digite a busca"
            value={buscaValor}
            onChange={(e) => setBuscaValor(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && buscarProdutos()}
          />

          <button onClick={buscarProdutos}>Buscar</button>
          <button onClick={carregarProdutos}>Mostrar todos</button>

        </div>
      );
}

export default Listagem;