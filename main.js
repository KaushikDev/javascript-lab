const interactivePanel = document.querySelector(".interactive-panel");

const panelCards = document.querySelectorAll("[data-panel]");

panelCards.forEach((panelCard) => {
  panelCard.addEventListener("click", function () {
    interactivePanel.innerHTML = `<h2>Now showing ${capitaliseFirstChar(panelCard.dataset.panel)} Explorer</h2>`;
  });
});

function capitaliseFirstChar(str) {
  return str[0].toUpperCase() + str.slice(1);
}
