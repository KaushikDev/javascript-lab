import { wrapInDivAndAddLabel } from "./../../utils/helpers.js";

export function setupDebounceIP(interactivePanelPlayArea) {
  let debounceTimer = 1000;
  let debounceTimeout;
  //setup the parent container
  const parentDiv = document.createElement("div");
  parentDiv.classList.add("ip__debounce-container");
  interactivePanelPlayArea.appendChild(parentDiv);

  const inputRawText = document.createElement("input");
  inputRawText.classList.add("debounce__input");
  Object.assign(inputRawText, { placeholder: "Enter your text here..." });
  wrapInDivAndAddLabel(
    "debounce",
    parentDiv,
    inputRawText,
    "Type as fast as you can",
  );

  const inputDebounceTime = document.createElement("input");
  inputDebounceTime.classList.add("debounce__time");
  Object.assign(inputDebounceTime, {
    type: "range",
    min: 0,
    max: 2000,
    step: 500,
    value: 1000,
  });

  const debounceTimerLabel = wrapInDivAndAddLabel(
    "debounce",
    parentDiv,
    inputDebounceTime,
    `Set Debounce Time(${inputDebounceTime.value}ms)`,
  );

  const outputActualText = document.createElement("p");
  outputActualText.classList.add("debounce__output");
  wrapInDivAndAddLabel("debounce", parentDiv, outputActualText, "Actual Text");

  const outputDebounceText = document.createElement("p");
  outputDebounceText.classList.add("debounce__output");
  wrapInDivAndAddLabel(
    "debounce",
    parentDiv,
    outputDebounceText,
    "Debounced Text",
  );

  inputDebounceTime.addEventListener("input", () => {
    debounceTimer = Number(inputDebounceTime.value);
    debounceTimerLabel.textContent = `Set Debounce Time(${debounceTimer}ms)`;
  });

  inputRawText.addEventListener("input", (e) => {
    clearTimeout(debounceTimeout);
    outputActualText.innerText = e.target.value;
    debounceTimeout = setTimeout(() => {
      outputDebounceText.innerText = e.target.value;
    }, debounceTimer);
  });
}
