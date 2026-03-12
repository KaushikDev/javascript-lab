import { capitaliseFirstChar } from "./utils/helpers.js";
const interactivePanel = document.querySelector(".interactive-panel");

const panelCards = document.querySelectorAll("[data-panel]");
let selectedPanel;

panelCards.forEach((panelCard) => {
  panelCard.addEventListener("click", function () {
    selectedPanel = panelCard.dataset.panel;
    console.log(selectedPanel);
    interactivePanel.innerHTML = `<h2>Now showing ${capitaliseFirstChar(selectedPanel)} Explorer</h2>`;
    if (selectedPanel === "fetch") {
      createFetchFields();
    }
  });
});

function createFetchFields() {
  //creating the container that will hold all the fields and features for fetch
  const parentDiv = document.createElement("div");

  parentDiv.classList.add("ip__fetch-container");
  parentDiv.textContent = "hello I am inside Interactive Panel for Fetch!!";
  interactivePanel.appendChild(parentDiv);

  // creating the select field where type of api request could be selected
  const selectApiType = document.createElement("select");

  selectApiType.classList.add("fetch__selectType");
  parentDiv.appendChild(selectApiType);

  const optionElement1 = document.createElement("option");
  const optionElement2 = document.createElement("option");

  optionElement1.value = "GET";
  optionElement1.textContent = "GET";
  optionElement2.value = "POST";
  optionElement2.textContent = "POST";
  selectApiType.appendChild(optionElement1);
  selectApiType.appendChild(optionElement2);

  // creating the input field where api url could be entered
  const inputApi = document.createElement("input");
  inputApi.classList.add("fetch__inputApi");
  inputApi.placeholder = "enter an api url";
  inputApi.type = "text";
  inputApi.value = "https://pokeapi.co/api/v2/pokemon-species";
  parentDiv.appendChild(inputApi);

  // creating the button that will fetch the api
  const fetchBtn = document.createElement("button");
  fetchBtn.classList.add("fetch__btn");
  fetchBtn.innerText = "Call API";
  parentDiv.appendChild(fetchBtn);

  // creating the response section where api response will be displayed
  const responseDiv = document.createElement("div");
  responseDiv.classList.add("fetch__responseSection");

  const resMetrics = document.createElement("div");
  resMetrics.classList.add("res__details");

  const resStatus = document.createElement("span");
  resStatus.classList.add("details__status");

  const resTime = document.createElement("span");
  resTime.classList.add("details__time");

  const resData = document.createElement("pre");
  resData.classList.add("res__data");

  parentDiv.appendChild(responseDiv);
  responseDiv.appendChild(resMetrics);
  responseDiv.appendChild(resData);
  resMetrics.appendChild(resStatus);
  resMetrics.appendChild(resTime);

  //adding event listerner on the button

  fetchBtn.addEventListener("click", () => {
    let requestUrl = document.querySelector(".fetch__inputApi").value;
    let requestType = document.querySelector(".fetch__selectType").value;
    if (!requestUrl) {
      alert("Please enter a valid api to call!");
    }
    console.log(requestType, requestUrl);
    callFetchApi(requestType, requestUrl);
  });
}

async function callFetchApi(type, url) {
  let apiStatusField = document.querySelector(".details__status");
  let apiTimeField = document.querySelector(".details__time");
  let apiDataField = document.querySelector(".res__data");

  let beginTime = 0;
  let endTime = 0;
  let totalTimeTaken = 0;

  if (type === "GET") {
    try {
      performance.mark("api-call-begins");
      const response = await fetch(url);
      performance.mark("api-call-ends");

      const data = await response.json();
      totalTimeTaken = Math.round(
        performance.measure(
          "API-TimeMeasurement",
          "api-call-begins",
          "api-call-ends",
        ).duration,
      );

      apiStatusField.textContent = `Status : ${response.status} `;
      apiTimeField.textContent = `Time : ${totalTimeTaken} ms`;
      apiDataField.textContent = JSON.stringify(data?.results, null, 2);
    } catch (err) {
      apiDataField.textContent = `There was an error fetching the api : \n Error : ${err}`;
    } finally {
      performance.clearMarks();
      performance.clearMeasures();
    }
  }
}
