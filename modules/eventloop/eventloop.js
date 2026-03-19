export function setupEventloopIP(interactivePanelPlayArea) {
  interactivePanelPlayArea.innerHTML =
    "Rearrange tasks below and click Run Tasks button to see event loop in action.";

  const parentDiv = document.createElement("div");
  parentDiv.classList.add("ip__eventloop-container");
  interactivePanelPlayArea.appendChild(parentDiv);

  const tasksContainer = document.createElement("ul");
  tasksContainer.classList.add("el__tasks");
  parentDiv.appendChild(tasksContainer);

  let draggedItem = null;

  tasksContainer.addEventListener("dragover", (e) => {
    e.preventDefault();

    let hoveredItem = e.target;

    if (
      hoveredItem.classList.contains("el__task") &&
      draggedItem !== hoveredItem &&
      draggedItem !== null
    ) {
      let items = Array.from(tasksContainer.querySelectorAll(".el__task"));
      let draggedIndex = items.indexOf(draggedItem);
      let hoveredIndex = items.indexOf(hoveredItem);

      if (draggedIndex > hoveredIndex) {
        tasksContainer.insertBefore(draggedItem, hoveredItem);
      } else {
        hoveredItem.after(draggedItem);
      }
    }
  });

  const taskData = [
    { type: "sync", text: "console.log('1. Sync Task A')" },
    { type: "macro", text: "setTimeout('2. Macro Task A', 0)" },
    { type: "micro", text: "Promise.resolve('3. Micro Task A')" },
    { type: "sync", text: "console.log('4. Sync Task B')" },
    { type: "micro", text: "Promise.resolve('5. Micro Task B')" },
    { type: "macro", text: "setTimeout('6. Macro Task B', 0)" },
    { type: "sync", text: "console.log('7. Sync Task C')" },
    { type: "macro", text: "setTimeout('8. Macro Task C', 0)" },
    { type: "micro", text: "Promise.resolve('9. Micro Task C')" },
    { type: "sync", text: "console.log('10. Sync Task D')" },
  ];

  taskData.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("el__task");
    li.draggable = true;
    li.innerText = task.text;
    li.dataset.type = task.type;
    tasksContainer.appendChild(li);
    li.addEventListener("dragstart", () => {
      draggedItem = li;
      li.style.opacity = 0.5;
    });

    li.addEventListener("dragend", () => {
      draggedItem = null;
      li.style.opacity = 1;
    });
  });

  const controlsDiv = document.createElement("div");
  controlsDiv.classList.add("el__controls");
  parentDiv.appendChild(controlsDiv);

  const runTasksButton = document.createElement("button");
  runTasksButton.classList.add("el__button");
  runTasksButton.textContent = "Run Tasks";

  const resetButton = document.createElement("button");
  resetButton.classList.add("el__button");
  resetButton.textContent = "Reset Console";

  controlsDiv.appendChild(runTasksButton);
  controlsDiv.appendChild(resetButton);

  const consoleOutput = document.createElement("div");
  consoleOutput.classList.add("el__console");
  parentDiv.appendChild(consoleOutput);

  function logToScreen(msg) {
    const consoleMsg = document.createElement("p");
    consoleMsg.classList.add("console-msg");
    consoleMsg.textContent = msg;
    consoleOutput.appendChild(consoleMsg);
  }

  resetButton.addEventListener("click", () => {
    consoleOutput.innerHTML = "";
  });

  runTasksButton.addEventListener("click", () => {
    logToScreen("--- Execution of Tasks in EventLoop---");

    const currentTasks = tasksContainer.querySelectorAll(".el__task");

    currentTasks.forEach((taskLi) => {
      const type = taskLi.dataset.type;
      const name = taskLi.innerText;

      if (type === "sync") {
        logToScreen(`Sync task executed: ${name}`);
      } else if (type === "macro") {
        setTimeout(() => {
          logToScreen(`Macro task executed: ${name}`);
        }, 0);
      } else if (type === "micro") {
        Promise.resolve().then(() => {
          logToScreen(`Micro task executed: ${name}`);
        });
      }
    });
  });
}
