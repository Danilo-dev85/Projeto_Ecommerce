import {
  desenharProdutoCarrinhoSimples,
  lerlocalStorage,
  apagarDoLocalStorage,
  salvarlocalStorage,
} from "./src/utilidades";

function desenharProdutosCheckout() {
  const idsprodutoCarrinhoComQuantidade = lerlocalStorage("carrinho") ?? {};
  for (const idProduto in idsprodutoCarrinhoComQuantidade) {
    desenharProdutoCarrinhoSimples(
      idProduto,
      "container-produtos-checkout",
      idsprodutoCarrinhoComQuantidade[idProduto]
    );
  }
}

function finalizarCompra(evento) {
  evento.preventDefault();
  const idsprodutoCarrinhoComQuantidade = lerlocalStorage("carrinho") ?? {};
  if (Object.keys(idsprodutoCarrinhoComQuantidade).length === 0) {
    return;
  }
  const dataAtual = new Date();
  const pedidoFeito = {
    dataPedido: dataAtual,
    pedido: idsprodutoCarrinhoComQuantidade,
  };

  const historicoDePedidos = lerlocalStorage("historico") ?? [];
  const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];

  salvarlocalStorage("historico", historicoDePedidosAtualizado);
  apagarDoLocalStorage("carrinho");
  window.location.href = "./pedidos.html";
}

desenharProdutosCheckout();

document.addEventListener("submit", (evt) => finalizarCompra(evt));
