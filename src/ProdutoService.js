import API_URL from "./api.js";

export async function getProdutos() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function criarProduto(produto) {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });
}

export async function atualizarProduto(id, produto) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });
}

export async function deletarProduto(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}