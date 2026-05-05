import { useEffect, useState } from "react";
import API_URL from "../services/api";
import styles from "./listagem.module.css";

function Listagem() {
  const [listaProdutos, setListaProdutos] = useState([]);
  const [produtoNome, setProdutoNome] = useState("");
  const [produtoPreco, setProdutoPreco] = useState("");
  const [produtoEstoque, setProdutoEstoque] = useState("");
  const [produtoCategoria, setProdutoCategoria] = useState("");
  const [idEmEdicao, setIdEmEdicao] = useState(null);
  const [filtroBusca, setFiltroBusca] = useState("nome");
  const [textoBusca, setTextoBusca] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function carregarProdutos() {
    setCarregando(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setListaProdutos(data);
    } catch {
      alert("Erro ao carregar produtos");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function salvarProduto(e) {
    e.preventDefault();
    if (!produtoNome || !produtoPreco) return alert("Preencha os campos obrigatórios");

    const dados = { 
      nome: produtoNome, 
      preco: Number(produtoPreco) || 0, 
      estoque: Number(produtoEstoque) || 0, 
      categoria: produtoCategoria 
    };

    try {
      const method = idEmEdicao ? "PUT" : "POST";
      const url = idEmEdicao ? `${API_URL}/${idEmEdicao}` : API_URL;

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      limparFormulario();
      carregarProdutos();
    } catch {
      alert("Erro ao salvar produto");
    }
  }

  async function deletarProduto(id) {
    if (!confirm("Deseja realmente excluir este produto?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      carregarProdutos();
    } catch {
      alert("Erro ao deletar");
    }
  }

  function editarProduto(produto) {
    setIdEmEdicao(produto.id);
    setProdutoNome(produto.nome);
    setProdutoPreco(produto.preco);
    setProdutoEstoque(produto.estoque);
    setProdutoCategoria(produto.categoria);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function limparFormulario() {
    setIdEmEdicao(null);
    setProdutoNome("");
    setProdutoPreco("");
    setProdutoEstoque("");
    setProdutoCategoria("");
  }

  async function buscarProdutos() {
  const texto = textoBusca.trim();
  if (!texto) {
    return carregarProdutos();
  }

  setCarregando(true);
  try {
    let res;
    if (filtroBusca === "id") {
      res = await fetch(`${API_URL}/buscar/id/${encodeURIComponent(texto)}`);
      if (res.status === 404) {
        setListaProdutos([]);
        return;
      }
      const data = await res.json();
      setListaProdutos(Array.isArray(data) ? data : data ? [data] : []);
    } else {
      res = await fetch(`${API_URL}/buscar/nome/${encodeURIComponent(texto)}`);
      const data = await res.json();
      setListaProdutos(Array.isArray(data) ? data : data ? [data] : []);
    }
  } catch (err) {
    console.error("Erro na busca:", err);
    alert("Erro na busca");
  } finally {
    setCarregando(false);
  }
}


  return (
    <div className={styles.pagina}>
      {/* SEÇÃO DE CADASTRO */}
      <section className={styles.blocoFormulario}>
        <div className={styles.headerTitle}>
          <h2>{idEmEdicao ? "📝 Editar Produto" : "Novo Produto"}</h2>
          {idEmEdicao && <small>ID: #{idEmEdicao}</small>}
        </div>
        
        <form onSubmit={salvarProduto} className={styles.formularioPrincipal}>
          <div className={styles.grupoCampos}>
            <input placeholder="Nome do Produto" value={produtoNome} onChange={(e) => setProdutoNome(e.target.value)} required />
            <input placeholder="Categoria" value={produtoCategoria} onChange={(e) => setProdutoCategoria(e.target.value)} />
          </div>
          <div className={styles.grupoCampos}>
            <input type="number" placeholder="Preço (R$)" value={produtoPreco} onChange={(e) => setProdutoPreco(e.target.value)} required />
            <input type="number" placeholder="Estoque" value={produtoEstoque} onChange={(e) => setProdutoEstoque(e.target.value)} />
          </div>

          <div className={styles.acoesFormulario}>
            <button className={styles.botaoPrincipal} type="submit">
              {idEmEdicao ? "Atualizar Produto" : "Cadastrar Produto"}
            </button>
            <button className={styles.botaoSecundario} type="button" onClick={limparFormulario}>
              Cancelar
            </button>
          </div>
        </form>
      </section>

      <hr className={styles.separador} />

      {/* SEÇÃO DE BUSCA E LISTAGEM */}
      <section className={styles.estoquesection} >
        <div className={styles.cabecalhoLista}>
          <h2>Estoque</h2>
          <div className={styles.barraPesquisa}>
            <select value={filtroBusca} onChange={(e) => setFiltroBusca(e.target.value)}>
              <option value="nome">Nome</option>
              <option value="id">ID</option>
            </select>
            <input 
              placeholder="Pesquisar..." 
              value={textoBusca} 
              onChange={(e) => setTextoBusca(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && buscarProdutos()}
            />
            <button onClick={buscarProdutos}>🔍</button>
          </div>
        </div>

        {carregando ? (
          <div className={styles.carregando}>Carregando produtos...</div>
        ) : (
          <div className={styles.gradeItens}>
            {listaProdutos.map((p) => (
              <div key={p.id} className={styles.cardProduto}>
                <div className={styles.cabecalhoCard}>
                  <span className={styles.etiqueta}>{p.categoria || "Geral"}</span>
                  <span className={styles.codigoId}>#{p.id}</span>
                </div>

                <div>
                  <h3 className={styles.tituloProduto}>{p.nome}</h3>
                  <div className={styles.precoProduto}>
                    R$ {Number(p.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <p className={styles.textoEstoque}>
                    Estoque: <strong>{p.estoque}</strong> unidades
                  </p>
                </div>

                <div className={styles.acoesCard}>
                  <button className={styles.botaoEditar} onClick={() => editarProduto(p)}>Editar</button>
                  <button className={styles.botaoExcluir} onClick={() => deletarProduto(p.id)}>Excluir</button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!carregando && listaProdutos.length === 0 && (
          <div className={styles.estadoVazio}>Nenhum produto encontrado.</div>
        )}
      </section>
    </div>
  );
}

export default Listagem;
