const vitrine = document.querySelector(".listaProduto");
const cardCarrinho = [];
const cardComprador = document.querySelector(".cardComprador");
const novosProdutos = document.querySelector(".caixaNovosProdutos");
const quantidadeProdutos = document.querySelector(".quantidadeTotal");
const valorProdutos = document.querySelector(".valorTotal");
const botaoTodos = document.querySelector("#Todos");
const botaoAcessorios = document.querySelector("#Acessórios");
const botaoCamisetas = document.querySelector("#Camisetas");
const botaoCalcados = document.querySelector("#Calçados");

botaoTodos.addEventListener("click", filtragem);
botaoAcessorios.addEventListener("click", filtragem);
botaoCamisetas.addEventListener("click", filtragem);
botaoCalcados.addEventListener("click", filtragem);

function montarVitrine(arr) {
  vitrine.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    criarCard(arr[i]);
  }
}

function filtragem(event) {
  const categoria = event.target.id;
  const novoArray = data.filter(
    (element) => element.tag[0] == categoria || categoria == "Todos"
  );
  montarVitrine(novoArray);
}

function criarCard(produto) {
  const card = document.createElement("li");
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const categoria = document.createElement("p");
  const titulo = document.createElement("p");
  const descricao = document.createElement("p");
  const valor = document.createElement("p");
  const button = document.createElement("button");

  card.classList.add("card");
  categoria.classList.add("tipos");
  titulo.classList.add("titulo");
  descricao.classList.add("descricao");
  valor.classList.add("valor");
  button.classList.add("adicionarCarrinho");
  button.id = produto.id;
  img.classList.add("foto");

  img.src = produto.img;
  categoria.innerText = produto.tag[0];
  titulo.innerText = produto.nameItem;
  descricao.innerText = produto.description;
  valor.innerText = `R$ ${produto.value.toFixed(2)}`;
  button.innerText = "Adicionar ao Carrinho";

  figure.append(img);
  card.append(figure, categoria, titulo, descricao, valor, button);
  vitrine.append(card);

  button.addEventListener("click", addCart);
}

montarVitrine(data);

function addCart(event) {
  console.log(event);
  const id = event.target.id;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      cardCarrinho.push(data[i]);
    }
  }
  montarCarrinho();
  atualizarValor();
}

function montarCarrinho() {
  const carrinhoVazio = document.querySelector(".carrinhoVazio");
  const adicioneItens = document.querySelector(".adicioneItens");

  if (cardCarrinho.length == 0) {
    carrinhoVazio.style.display = "block";
    adicioneItens.style.display = "block";
    cardComprador.style.display = "none";
    novosProdutos.style.display = "none";
  } else {
    carrinhoVazio.style.display = "none";
    adicioneItens.style.display = "none";
    cardComprador.style.display = "flex";
    novosProdutos.style.display = "flex";
    cardComprador.innerHTML = "";
    for (let i = 0; i < cardCarrinho.length; i++) {
      const li = document.createElement("li");
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const titulo = document.createElement("p");
      const valor = document.createElement("p");
      const button = document.createElement("button");
      const div = document.createElement("div");

      li.classList.add("listaCarrinho");
      img.classList.add("imgCarrinho");
      div.classList.add("listaProdutosCarrinho");
      titulo.classList.add("tituloCarrinho");
      valor.classList.add("valorCarrinho");
      button.classList.add("buttonCarrinho");
      button.id = i;

      img.src = cardCarrinho[i].img;
      titulo.innerText = cardCarrinho[i].nameItem;
      valor.innerText = `R$ ${cardCarrinho[i].value.toFixed(2)}`;
      button.innerText = "Remover Produto";

      figure.append(img);
      div.append(titulo, valor, button);
      li.append(figure, div);
      cardComprador.append(li);

      button.addEventListener("click", removeCart);
    }
  }
}

function removeCart(event) {
  const indice = event.target.id;
  cardCarrinho.splice(indice, 1);
  montarCarrinho();
  atualizarValor();
}

function atualizarValor() {
  let valorTotal = 0;
  let quantidadeTotal = cardCarrinho.length;
  for (let i = 0; i < cardCarrinho.length; i++) {
    valorTotal += cardCarrinho[i].value;
  }
  quantidadeProdutos.innerText = quantidadeTotal;
  valorProdutos.innerText = `R$ ${valorTotal.toFixed(2)}`;
}
