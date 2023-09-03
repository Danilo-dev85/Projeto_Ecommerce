import { catalago, salvarlocalStorage, lerlocalStorage } from "./utilidades";

const idsprodutoCarrinhoComQuantidade = lerlocalStorage("carrinho") ?? {};

function abrirCarrinho() {
  document.getElementById("carrinho").classList.add("right-[0px]");
  document.getElementById("carrinho").classList.remove("right-[-360px]");
}

function fecharCarrinho() {
  document.getElementById("carrinho").classList.remove("right-[0px]");
  document.getElementById("carrinho").classList.add("right-[-360px]");
}

function irParaCheckout() {
  if (Object.keys(idsprodutoCarrinhoComQuantidade).length === 0) {
    return;
  }
  window.location.href =  "./checkout.html";
}

export function inicializarCarrinho() {
  const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
  const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
  const botaoIrParaCheckout = document.getElementById("finalizar-compra");

  botaoFecharCarrinho.addEventListener("click", fecharCarrinho);
  botaoAbrirCarrinho.addEventListener("click", abrirCarrinho);
  botaoIrParaCheckout.addEventListener("click", irParaCheckout);
}

function removerdoCarrinho(idProduto) {
  delete idsprodutoCarrinhoComQuantidade[idProduto];
  salvarlocalStorage("carrinho", idsprodutoCarrinhoComQuantidade);
  atualizarprecoCarrinho();
  renderizarProdutosCarrinho();
}

function incrementarQuantidadeProduto(idProduto) {
  idsprodutoCarrinhoComQuantidade[idProduto]++;
  salvarlocalStorage("carrinho", idsprodutoCarrinhoComQuantidade);
  atualizarprecoCarrinho();
  atualizarInformacaoQuantidade(idProduto);
}

function decrementarQuantidadeProduto(idProduto) {
  if (idsprodutoCarrinhoComQuantidade[idProduto] === 1) {
    removerdoCarrinho(idProduto);
    return;
  }
  idsprodutoCarrinhoComQuantidade[idProduto]--;
  salvarlocalStorage("carrinho", idsprodutoCarrinhoComQuantidade);
  atualizarprecoCarrinho();
  atualizarInformacaoQuantidade(idProduto);
}

function atualizarInformacaoQuantidade(idProduto) {
  document.getElementById(`quantidade-${idProduto}`).innerText =
    idsprodutoCarrinhoComQuantidade[idProduto];
}

function desenharProdutoNoCarrinho(idProduto) {
  const produto = catalago.find((p) => p.id === idProduto);
  const containerProdutosCarrinho =
    document.getElementById("produtos-carrinho");

  const elementoArticle = document.createElement("article");
  const articleClasses = [
    "flex",
    "bg-slate-100",
    "rounded-lg",
    "p-1",
    "relative",
  ];

  for (const articleClass of articleClasses) {
    elementoArticle.classList.add(articleClass);
  }

  const cartaoProdutoCarrinho = ` <button id="remover-item-${
    produto.id
  }" class="absolute top-0 right-2">
    <i class="fa-regular fa-circle-xmark text-slate-500 hover:text-slate-800"></i>
  </button>
  <img src="assets/img/${produto.imagem}" alt="carrinho:${
    produto.nome
  }" class="h-24  rounded-lg">
 <div class="p-2 flex flex-col justify-between">
    <p class="text-slate-900 text-sm">${produto.nome}</p>
    <p class="text-slate-400 text-xs">Tamanho: M</p>
    <p class="text-green-700 text-lg">R$${produto.preco}</p>
  </div>

  <div class="flex text-slate-950 items-end absolut bottom-0 right-2 text-lg">
  <button id="decrementar-produto-${produto.id}">-</button>
  <p id="quantidade-${produto.id}" class="ml-2">${
    idsprodutoCarrinhoComQuantidade[produto.id]
  }</p>
  <button class="ml-2" id="incrementar-produto-${produto.id}">+</button>
  </div>`;

  elementoArticle.innerHTML = cartaoProdutoCarrinho;

  containerProdutosCarrinho.appendChild(elementoArticle);

  document
    .getElementById(`decrementar-produto-${produto.id}`)
    .addEventListener("click", () => decrementarQuantidadeProduto(produto.id));

  document
    .getElementById(`incrementar-produto-${produto.id}`)
    .addEventListener("click", () => incrementarQuantidadeProduto(produto.id));

  document
    .getElementById(`remover-item-${produto.id}`)
    .addEventListener("click", () => removerdoCarrinho(produto.id));
}

export function renderizarProdutosCarrinho() {
  const containerProdutosCarrinho =
    document.getElementById("produtos-carrinho");
  containerProdutosCarrinho.innerHTML = "";
  for (const idProduto in idsprodutoCarrinhoComQuantidade) {
    desenharProdutoNoCarrinho(idProduto);
  }
}

export function adicionarAoCarrinho(idProduto) {
  if (idProduto in idsprodutoCarrinhoComQuantidade) {
    incrementarQuantidadeProduto(idProduto);
    return;
  }
  idsprodutoCarrinhoComQuantidade[idProduto] = 1;
  salvarlocalStorage("carrinho", idsprodutoCarrinhoComQuantidade);
  desenharProdutoNoCarrinho(idProduto);
  atualizarprecoCarrinho();
}

export function atualizarprecoCarrinho() {
  const precoCarrinho = document.getElementById("preco-total");
  let precoTotalCarrinho = 0;
  for (const idProdutoNoCarrinho in idsprodutoCarrinhoComQuantidade) {
    precoTotalCarrinho +=
      catalago.find((p) => p.id === idProdutoNoCarrinho).preco *
      idsprodutoCarrinhoComQuantidade[idProdutoNoCarrinho];
  }
  precoCarrinho.innerText = `Total: R$${precoTotalCarrinho}`;
}
