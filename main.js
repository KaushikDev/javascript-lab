import { setupCanvasIP } from "./modules/canvas/canvas.js";
import { setupFetchIP } from "./modules/fetch/fetch.js";
import { setupDebounceIP } from "./modules/debounce/debounce.js";
import { setupThrottleIP } from "./modules/throttle/throttle.js";
import { capitaliseFirstChar } from "./utils/helpers.js";

const labOptions = document.querySelector(".js-lab__options");
const interactivePanel = document.querySelector(".js-lab__interactive-panel");
let interactivePanelPlayArea;
let closeIpBtn;

const panelCards = document.querySelectorAll("[data-panel]");
let selectedPanel;

panelCards.forEach((panelCard) => {
  // For development purposes only :
  document.querySelector('[data-panel="throttle"]').click();
  // remove above after development please
  panelCard.addEventListener("click", function () {
    interactivePanel.style.display = "flex";
    labOptions.style.display = "none";
    selectedPanel = panelCard.dataset.panel;
    console.log(selectedPanel);
    interactivePanel.innerHTML = `<div class="ip__container"><h2>Now showing ${capitaliseFirstChar(selectedPanel)} Explorer</h2>
    <div class="ip__playarea"></div>
    <button class="ip__close">Close Panel</button></div>`;

    interactivePanelPlayArea = document.querySelector(".ip__playarea");
    closeIpBtn = document.querySelector(".ip__close");
    closeIpBtn.addEventListener("click", () => {
      interactivePanel.style.display = "none";
      labOptions.style.display = "flex";
    });
    if (selectedPanel === "fetch") {
      setupFetchIP(interactivePanelPlayArea);
    }
    if (selectedPanel === "debounce") {
      setupDebounceIP(interactivePanelPlayArea);
    }
    if (selectedPanel === "throttle") {
      setupThrottleIP(interactivePanelPlayArea);
    }
    if (selectedPanel === "eventloop") {
      interactivePanelPlayArea.textContent = "I am currently working on this!";
    }
    if (selectedPanel === "canvas") {
      setupCanvasIP(interactivePanelPlayArea);
    }
  });
});
