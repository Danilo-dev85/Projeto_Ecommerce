import { adicionarAoCarrinho } from "./menucarrinho";
import { catalago } from "./utilidades";

export function renderizarCatalogo() {
  for (const produtoCatalago of catalago) {
    const cartaoProduto = `<div class="border-solid  w-48 m-2 flex flex-col p-2 justify-between shadow-xl shadow-slate-400 rounded-lg group ${
      produtoCatalago.feminino ? "feminino" : "masculino"
    }" id="card-produto-${produtoCatalago.id}">
    <img
      src="assets/img/${produtoCatalago.imagem}"
      alt="Produto 1 do Ecommerce-Hashtag."
      class="group-hover:scale-110 duration-300 my-3 rounded-lg"
      
    />
    <p class="text-sm">${produtoCatalago.marca}</p>
    <p class="text-sm">${produtoCatalago.nome}</p>
    <p class="text-sm">R$ ${produtoCatalago.preco}</p>
    <button id="adicionar-${
      produtoCatalago.id
    }" class="bg-cyan-950 hover:bg-cyan-500 text-slate-200">
    <i class="fa-solid fa-cart-plus"></i></button>
    </div>`;

    document.getElementById("container-produto").innerHTML += cartaoProduto;
    document.getElementById(`adicionar-${produtoCatalago.id}`);
  }

  for (const produtoCatalago of catalago) {
    document
      .getElementById(`adicionar-${produtoCatalago.id}`)
      .addEventListener("click", () => adicionarAoCarrinho(produtoCatalago.id));
  }
}
