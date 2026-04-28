import { useEffect, useState } from "react";
import API_URL from "../services/api";

function Listagem() {
  const [produtos, setProdutos] = useState([]);

  async function buscarProdutos() {
    try {
      const resposta = await fetch(API_URL);
      const dados = await resposta.json();
      setProdutos(dados);
    } catch (erro) {
      console.log("Erro ao buscar produtos:", erro);
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <div>
      <h1>Lista de Produtos</h1>

      {produtos.map((produto) => (
        <div key={produto.id}>
          <h2>{produto.nome}</h2>
          <p>Preço: R$ {produto.preco}</p>
        </div>
      ))}
    </div>
  );
}

export default Listagem;
