const desktop = document.getElementById("desktop");
const windows = [...document.querySelectorAll(".window")];
const openTriggers = [...document.querySelectorAll("[data-open]")];
const clock = document.getElementById("clock");

let zIndex = 2;

function bringToFront(win) {
  zIndex += 1;
  win.style.zIndex = String(zIndex);
}

function openWindow(id) {
  const win = document.getElementById(id);
  if (!win) return;
  win.style.display = "block";
  bringToFront(win);
}

function closeWindow(win) {
  if (win.id === "program-manager") return;
  win.style.display = "none";
}

openTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    openWindow(trigger.dataset.open);
  });
});

windows.forEach((win) => {
  bringToFront(win);
  win.addEventListener("mousedown", () => bringToFront(win));

  win.querySelectorAll("[data-action='close']").forEach((btn) => {
    btn.addEventListener("click", () => closeWindow(win));
  });

  win.querySelectorAll("[data-action='minimize']").forEach((btn) => {
    btn.addEventListener("click", () => {
      win.style.display = "none";
    });
  });
});

desktop.addEventListener("mousedown", (event) => {
  const handle = event.target.closest("[data-drag-handle]");
  if (!handle) return;

  const win = handle.closest(".window");
  if (!win) return;

  bringToFront(win);

  const startX = event.clientX;
  const startY = event.clientY;
  const startLeft = win.offsetLeft;
  const startTop = win.offsetTop;

  function onMove(moveEvent) {
    const nextLeft = startLeft + (moveEvent.clientX - startX);
    const nextTop = startTop + (moveEvent.clientY - startY);

    const maxLeft = desktop.clientWidth - win.offsetWidth;
    const maxTop = desktop.clientHeight - win.offsetHeight;

    win.style.left = `${Math.max(0, Math.min(nextLeft, maxLeft))}px`;
    win.style.top = `${Math.max(0, Math.min(nextTop, maxTop))}px`;
  }

  function onUp() {
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", onUp);
  }

  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onUp);
});

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString("cs-CZ", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

updateClock();
setInterval(updateClock, 1000);

const minesGrid = document.getElementById("mines-grid");
const difficultySelect = document.getElementById("difficulty");
const newGameBtn = document.getElementById("new-game-btn");
const mineCounter = document.getElementById("mine-counter");
const gameMessage = document.getElementById("game-message");
const timerDisplay = document.getElementById("timer");
const minesWindow = document.getElementById("minesweeper");

const difficultySettings = {
  easy: { rows: 9, cols: 9, mines: 10 },
  hard: { rows: 14, cols: 14, mines: 38 },
};

let board = [];
let config = difficultySettings.easy;
let revealedCount = 0;
let flagsPlaced = 0;
let gameOver = false;
let timer = 0;
let timerInterval = null;
let firstClick = true;

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer += 1;
    timerDisplay.textContent = `⏱️ ${timer}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function neighbors(row, col) {
  const result = [];
  for (let r = row - 1; r <= row + 1; r += 1) {
    for (let c = col - 1; c <= col + 1; c += 1) {
      if (r === row && c === col) continue;
      if (r >= 0 && r < config.rows && c >= 0 && c < config.cols) {
        result.push([r, c]);
      }
    }
  }
  return result;
}

function placeMines(safeRow, safeCol) {
  let placed = 0;
  while (placed < config.mines) {
    const row = Math.floor(Math.random() * config.rows);
    const col = Math.floor(Math.random() * config.cols);
    const cell = board[row][col];
    if (cell.mine || (row === safeRow && col === safeCol)) continue;
    cell.mine = true;
    placed += 1;
  }

  for (let row = 0; row < config.rows; row += 1) {
    for (let col = 0; col < config.cols; col += 1) {
      const cell = board[row][col];
      if (cell.mine) continue;
      cell.adjacent = neighbors(row, col).filter(([r, c]) => board[r][c].mine).length;
    }
  }
}

function renderCell(cell, button) {
  button.className = "cell";
  button.classList.toggle("revealed", cell.revealed);
  button.classList.toggle("is-mine", cell.mine);
  button.classList.toggle("flagged", cell.flagged);

  if (cell.revealed) {
    if (cell.mine) {
      button.textContent = "💣";
    } else if (cell.adjacent > 0) {
      button.textContent = String(cell.adjacent);
      button.classList.add(`n${cell.adjacent}`);
    } else {
      button.textContent = "";
    }
  } else if (cell.flagged) {
    button.textContent = "🚩";
  } else {
    button.textContent = "";
  }
}

function refreshBoard() {
  board.forEach((rowCells) => {
    rowCells.forEach((cell) => renderCell(cell, cell.el));
  });
  mineCounter.textContent = `💣 ${config.mines - flagsPlaced}`;
}

function revealMines() {
  board.forEach((rowCells) => {
    rowCells.forEach((cell) => {
      if (cell.mine) {
        cell.revealed = true;
      }
    });
  });
}

function floodReveal(startRow, startCol) {
  const queue = [[startRow, startCol]];
  while (queue.length) {
    const [row, col] = queue.shift();
    const cell = board[row][col];
    if (cell.revealed || cell.flagged) continue;
    cell.revealed = true;
    revealedCount += 1;

    if (cell.adjacent !== 0) continue;
    neighbors(row, col).forEach(([r, c]) => {
      const next = board[r][c];
      if (!next.revealed && !next.mine && !next.flagged) {
        queue.push([r, c]);
      }
    });
  }
}

function checkWin() {
  const safeCells = config.rows * config.cols - config.mines;
  if (revealedCount === safeCells && !gameOver) {
    gameOver = true;
    stopTimer();
    minesWindow.classList.add("game-won");
    gameMessage.textContent = "Výhra! Skvělá práce 🎉";
    board.forEach((rowCells) =>
      rowCells.forEach((cell) => {
        if (cell.mine) {
          cell.flagged = true;
        }
      }),
    );
    refreshBoard();
  }
}

function revealCell(row, col) {
  if (gameOver) return;
  const cell = board[row][col];
  if (cell.revealed || cell.flagged) return;

  if (firstClick) {
    placeMines(row, col);
    firstClick = false;
    startTimer();
  }

  if (cell.mine) {
    cell.revealed = true;
    gameOver = true;
    stopTimer();
    revealMines();
    gameMessage.textContent = "Boom! Prohrál/a jsi. Zkus to znovu.";
    refreshBoard();
    return;
  }

  floodReveal(row, col);
  refreshBoard();
  checkWin();
}

function toggleFlag(row, col) {
  if (gameOver) return;
  const cell = board[row][col];
  if (cell.revealed) return;

  cell.flagged = !cell.flagged;
  flagsPlaced += cell.flagged ? 1 : -1;
  refreshBoard();
}

function setupBoard() {
  config = difficultySettings[difficultySelect.value];
  board = [];
  revealedCount = 0;
  flagsPlaced = 0;
  gameOver = false;
  timer = 0;
  firstClick = true;
  stopTimer();
  timerDisplay.textContent = "⏱️ 0s";
  minesWindow.classList.remove("game-won");
  gameMessage.textContent = "Levé kliknutí odhalí pole, pravé položí vlaječku.";

  minesGrid.innerHTML = "";
  minesGrid.style.gridTemplateColumns = `repeat(${config.cols}, 26px)`;

  for (let row = 0; row < config.rows; row += 1) {
    const rowCells = [];
    for (let col = 0; col < config.cols; col += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "cell";
      button.setAttribute("role", "gridcell");
      button.setAttribute("aria-label", `Pole ${row + 1}-${col + 1}`);

      button.addEventListener("click", () => revealCell(row, col));
      button.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        toggleFlag(row, col);
      });

      minesGrid.append(button);
      rowCells.push({
        row,
        col,
        mine: false,
        adjacent: 0,
        revealed: false,
        flagged: false,
        el: button,
      });
    }
    board.push(rowCells);
  }

  refreshBoard();
}

difficultySelect.addEventListener("change", setupBoard);
newGameBtn.addEventListener("click", setupBoard);

setupBoard();
