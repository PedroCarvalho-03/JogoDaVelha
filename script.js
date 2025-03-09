const currentPlayer = document.querySelector(".currentPlayer");

// Array para armazenar as jogadas
let selected;
let player = "X"; // Jogador inicial

// Combinações vencedoras
const positions = [
  [1, 2, 3], // Linhas
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7], // Colunas
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9], // Diagonais
  [3, 5, 7],
];

// Inicializa o jogo
function init() {
  selected = Array(9).fill(null); // Limpa as jogadas anteriores
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

  // Reinicia os botões do jogo
  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = "";
    item.addEventListener("click", newMove);
  });
}

// Inicia o jogo pela primeira vez
init();

// Função para processar uma nova jogada
function newMove(e) {
  const index = e.target.getAttribute("data-i");

  // Verifica se a posição já foi selecionada
  if (selected[index]) {
    alert("Posição já ocupada! Escolha outra.");
    return;
  }

  // Marca a jogada no tabuleiro
  e.target.innerHTML = player;
  selected[index] = player;

  // Verifica se há um vencedor ou empate
  check();

  // Alterna o jogador
  player = player === "X" ? "O" : "X";
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
}

// Função para verificar se há um vencedor ou empate
function check() {
  const playerLastMove = player === "X" ? "O" : "X"; // Jogador que fez a última jogada

  // Obtém as posições ocupadas pelo jogador atual
  const items = selected
    .map((item, i) => [item, i + 1]) // Mapeia as jogadas com suas posições (1 a 9)
    .filter((item) => item[0] === playerLastMove) // Filtra apenas as jogadas do jogador atual
    .map((item) => item[1]); // Obtém as posições

  // Verifica se alguma combinação vencedora foi alcançada
  for (const pos of positions) {
    if (pos.every((item) => items.includes(item))) {
      alert(`O JOGADOR '${playerLastMove}' GANHOU!`);
      init(); // Reinicia o jogo
      return;
    }
  }

  // Verifica se houve empate
  if (selected.every((item) => item !== null)) {
    alert("DEU EMPATE!");
    init(); // Reinicia o jogo
    return;
  }
}