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
