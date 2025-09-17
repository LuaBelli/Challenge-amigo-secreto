// ===== Variáveis principais =====
const listaAmigos = [];

const input = document.getElementById("nomeAmigo");
const btnAdicionar = document.getElementById("btnAdicionar");
const btnSortear = document.getElementById("btnSortear");
const ul = document.getElementById("listaAmigos");
const resultadoDiv = document.getElementById("resultado");
const container = document.getElementById("appContainer");
const stage = document.getElementById("confettiStage");

// ===== Eventos =====
btnAdicionar.addEventListener("click", adicionarAmigo);
btnSortear.addEventListener("click", sortearAmigo);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") adicionarAmigo();
});
window.addEventListener("resize", syncStageSize);
window.addEventListener("load", syncStageSize);

// ===== Funções principais =====

// Adiciona amigo ao array e atualiza lista
function adicionarAmigo() {
  const nome = input.value.trim();

  if (nome === "") {
    alert("Por favor, digite um nome válido.");
    return;
  }

  listaAmigos.push(nome);
  atualizarLista(); // atualiza lista na tela
  input.value = "";
  input.focus();
}

// ===== Atualiza a lista de amigos na tela =====
function atualizarLista() {
  // 1. Seleciona o elemento <ul>
  const lista = document.getElementById("listaAmigos");

  // 2. Limpa a lista existente
  lista.innerHTML = "";

  // 3. Percorre o array listaAmigos
  for (let i = 0; i < listaAmigos.length; i++) {
    // 4. Cria um <li> para cada amigo
    const li = document.createElement("li");
    li.textContent = listaAmigos[i];

    // 5. Adiciona ao <ul>
    lista.appendChild(li);
  }
}

// Sorteia um amigo da lista
function sortearAmigo() {
  if (listaAmigos.length === 0) {
    alert("A lista está vazia! Adicione amigos antes de sortear.");
    return;
  }

  const indice = Math.floor(Math.random() * listaAmigos.length);
  const sorteado = listaAmigos[indice];

  resultadoDiv.textContent = `🎉 O amigo secreto sorteado foi: ${sorteado}`;
  resultadoDiv.style.display = "block";

  launchConfetti(); // dispara os confetes
}

// Ajusta tamanho do SVG de confete
function syncStageSize() {
  const rect = container.getBoundingClientRect();
  stage.setAttribute("viewBox", `0 0 ${Math.round(rect.width)} ${Math.round(rect.height)}`);
  stage.setAttribute("width", rect.width);
  stage.setAttribute("height", rect.height);
}

// Confete animado 🎉
function launchConfetti() {
  syncStageSize();
  clearConfetti();

  const rect = container.getBoundingClientRect();
  const width = Math.round(rect.width);
  const height = Math.round(rect.height);
  const centerX = width / 2;
  const startY = height * 0.25;

  const colors = ["#ff7675", "#55efc4", "#ffeaa7", "#74b9ff", "#a29bfe", "#fd79a8"];

  for (let i = 0; i < 30; i++) {
    const confetti = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    const size = Math.random() * 6 + 4;
    const tx = (Math.random() - 0.5) * 200;
    const ty = Math.random() * 200 + 100;
    const rot = Math.random() * 360;

    confetti.setAttribute("x", centerX);
    confetti.setAttribute("y", startY);
    confetti.setAttribute("width", size);
    confetti.setAttribute("height", size);
    confetti.setAttribute("fill", colors[Math.floor(Math.random() * colors.length)]);
    confetti.setAttribute("class", "confetti");
    confetti.style.setProperty("--tx", tx + "px");
    confetti.style.setProperty("--ty", ty + "px");
    confetti.style.setProperty("--rot", rot + "deg");
    confetti.style.setProperty("--dur", (Math.random() * 1.5 + 1) + "s");
    confetti.style.setProperty("--delay", (Math.random() * 0.3) + "s");

    stage.appendChild(confetti);
  }
}

// Remove confetes anteriores
function clearConfetti() {
  stage.innerHTML = "";
}