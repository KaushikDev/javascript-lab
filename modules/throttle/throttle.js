import { wrapInDivAndAddLabel } from "./../../utils/helpers.js";

export function setupThrottleIP(interactivePanelPlayArea) {
  let rawClicks = 0;
  let throttledClicks = 0;
  let throttleTimer = 1000;
  let isThrottling = false;
  let throttleTimeout;
  //setup the parent container
  const parentDiv = document.createElement("div");
  parentDiv.classList.add("ip__throttle-container");
  interactivePanelPlayArea.appendChild(parentDiv);

  const inputRawClicks = document.createElement("button");
  inputRawClicks.classList.add("throttle__button");
  Object.assign(inputRawClicks, { textContent: "Click frequently" });
  const clicksLabel = wrapInDivAndAddLabel(
    "throttle",
    parentDiv,
    inputRawClicks,
    `Raw Clicks - ${rawClicks}`,
  );

  const inputThrottleTime = document.createElement("input");
  inputThrottleTime.classList.add("throttle__time");
  Object.assign(inputThrottleTime, {
    type: "range",
    min: 0,
    max: 2000,
    step: 500,
    value: 1000,
  });

  const throttleTimerLabel = wrapInDivAndAddLabel(
    "throttle",
    parentDiv,
    inputThrottleTime,
    `Set Throttle Time(${inputThrottleTime.value}ms)`,
  );

  const outputThrottleText = document.createElement("p");
  outputThrottleText.classList.add("throttle__output");
  wrapInDivAndAddLabel(
    "throttle",
    parentDiv,
    outputThrottleText,
    "Throttled Clicks",
  );

  inputThrottleTime.addEventListener("input", () => {
    clearTimeout(throttleTimeout);
    isThrottling = false;
    throttleTimer = Number(inputThrottleTime.value);
    throttledClicks = 0;
    rawClicks = 0;
    throttleTimerLabel.textContent = `Set Throttle Time(${throttleTimer}ms)`;
    clicksLabel.textContent = `Raw Clicks - ${rawClicks}`;
    outputThrottleText.textContent = `Clicks - ${throttledClicks}`;
  });

  inputRawClicks.addEventListener("click", (e) => {
    rawClicks += 1;
    clicksLabel.textContent = `Raw Clicks - ${rawClicks}`;
    if (isThrottling) return;
    isThrottling = true;
    throttledClicks += 1;

    outputThrottleText.textContent = `Clicks - ${throttledClicks}`;

    throttleTimeout = setTimeout(() => {
      isThrottling = false;
    }, throttleTimer);
  });
}
