import { useEffect, useState } from "react";
import API_URL from "../services/api";
import styles from "./listagem.module.css";

function Listagem() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [categoria, setCategoria] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [buscaTipo, setBuscaTipo] = useState("nome");
  const [buscaValor, setBuscaValor] = useState("");
  const [loading, setLoading] = useState(false);

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

  async function salvarProduto(e) {
    e.preventDefault();
    if (!nome || !preco) return alert("Preencha os campos obrigatórios");

    const dados = { 
      nome, 
      preco: Number(preco) || 0, 
      estoque: Number(estoque) || 0, 
      categoria 
    };

    try {
      const method = editandoId ? "PUT" : "POST";
      const url = editandoId ? `${API_URL}/${editandoId}` : API_URL;

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      limparFormulario();
      carregarProdutos();
    } catch (err) {
      alert("Erro ao salvar produto");
    }
  }

  async function deletarProduto(id) {
    if (!confirm("Deseja realmente excluir este produto?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      carregarProdutos();
    } catch (err) {
      alert("Erro ao deletar");
    }
  }

  function editarProduto(produto) {
    setEditandoId(produto.id);
    setNome(produto.nome);
    setPreco(produto.preco);
    setEstoque(produto.estoque);
    setCategoria(produto.categoria);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function limparFormulario() {
    setEditandoId(null);
    setNome("");
    setPreco("");
    setEstoque("");
    setCategoria("");
  }

  async function buscarProdutos() {
    setLoading(true);
    try {
      const query = buscaValor ? `?${buscaTipo}=${encodeURIComponent(buscaValor)}` : "";
      const res = await fetch(`${API_URL}${query}`);
      let data = await res.json();
      setProdutos(Array.isArray(data) ? data : data ? [data] : []);
    } catch (err) {
      alert("Erro na busca");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      {/* SEÇÃO DE CADASTRO */}
      <section className={styles.formSection}>
        <div className={styles.headerTitle}>
          <h2>{editandoId ? "📝 Editar Produto" : " Novo Produto"}</h2>
          {editandoId && <small>ID: #{editandoId}</small>}
        </div>
        
        <form onSubmit={salvarProduto} className={styles.mainForm}>
          <div className={styles.inputGroup}>
            <input placeholder="Nome do Produto" value={nome} onChange={(e) => setNome(e.target.value)} required />
            <input placeholder="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
          </div>
          <div className={styles.inputGroup}>
            <input type="number" placeholder="Preço (R$)" value={preco} onChange={(e) => setPreco(e.target.value)} required />
            <input type="number" placeholder="Estoque" value={estoque} onChange={(e) => setEstoque(e.target.value)} />
          </div>

          <div className={styles.formActions}>
            <button className={styles.btnPrimary} type="submit">
              {editandoId ? "Atualizar Produto" : "Cadastrar Produto"}
            </button>
            <button className={styles.btnSecondary} type="button" onClick={limparFormulario}>
              Cancelar
            </button>
          </div>
        </form>
      </section>

      <hr className={styles.divider} />

      {/* SEÇÃO DE BUSCA E LISTAGEM */}
      <section className={styles.listSection}>
        <div className={styles.listHeader}>
          <h2> Estoque</h2>
          <div className={styles.searchBar}>
            <select value={buscaTipo} onChange={(e) => setBuscaTipo(e.target.value)}>
              <option value="nome">Nome</option>
              <option value="id">ID</option>
            </select>
            <input 
              placeholder="Pesquisar..." 
              value={buscaValor} 
              onChange={(e) => setBuscaValor(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && buscarProdutos()}
            />
            <button onClick={buscarProdutos} className={styles.btnIcon}>🔍</button>
          </div>
        </div>

        {loading ? (
          <div className={styles.loader}>Carregando produtos...</div>
        ) : (
          <div className={styles.gridCard}>
            {produtos.map((p) => (
              <div key={p.id} className={styles.produtoCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.badge}>{p.categoria || "Geral"}</span>
                  <span className={styles.idTag}>#{p.id}</span>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.nome}>{p.nome}</h3>
                  <div className={styles.priceTag}>R$ {Number(p.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                  <p className={styles.estoqueText}>
                    <span>📦 Estoque:</span> <strong>{p.estoque}</strong> unidades
                  </p>
                </div>

                <div className={styles.cardActions}>
                  <button className={styles.editBtn} onClick={() => editarProduto(p)}>Editar</button>
                  <button className={styles.deleteBtn} onClick={() => deletarProduto(p.id)}>Excluir</button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && produtos.length === 0 && (
          <div className={styles.emptyState}>Nenhum produto encontrado.</div>
        )}
      </section>
    </div>
  );
}

export default Listagem;
