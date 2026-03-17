let parentDiv;
let selectApiType;
let optionElement1;
let optionElement2;
let inputApi;
let inputApiBody;
let fetchBtn;
let responseDiv;
let resMetrics;
let resTime;
let resStatus;
let resData;

export function createFetchFields(interactivePanelPlayArea) {
  //creating the container that will hold all the fields and features for fetch
  parentDiv = document.createElement("div");

  parentDiv.classList.add("ip__fetch-container");
  parentDiv.textContent = "hello I am inside Interactive Panel for Fetch!!";
  interactivePanelPlayArea.appendChild(parentDiv);

  // creating the select field where type of api request could be selected
  selectApiType = document.createElement("select");

  selectApiType.classList.add("fetch__selectType");
  parentDiv.appendChild(selectApiType);

  optionElement1 = document.createElement("option");
  optionElement2 = document.createElement("option");

  optionElement1.value = "GET";
  optionElement1.textContent = "GET";
  optionElement2.value = "POST";
  optionElement2.textContent = "POST";
  selectApiType.appendChild(optionElement1);
  selectApiType.appendChild(optionElement2);

  // creating the input field where api url could be entered
  inputApi = document.createElement("input");
  inputApi.classList.add("fetch__inputApi");
  inputApi.placeholder = "Enter api url";
  inputApi.type = "text";
  inputApi.value = "https://dummyjson.com/products";
  parentDiv.appendChild(inputApi);

  // for entering POST api's body:
  inputApiBody = document.createElement("textarea");
  inputApiBody.classList.add("fetch__inputApiBody");
  inputApiBody.placeholder = "Enter request body...inside { }";
  Object.assign(inputApiBody, {
    rows: 5,
    columns: 20,
    placeholder: `Enter request body here in json format e.g. {"title": "JS Lab by Piyush Kaushik"}`,
  });

  parentDiv.appendChild(inputApiBody);
  inputApiBody.style.display = "none";

  // creating the button that will fetch the api
  fetchBtn = document.createElement("button");
  fetchBtn.classList.add("fetch__btn");
  fetchBtn.innerText = "Call API";
  parentDiv.appendChild(fetchBtn);

  // creating the response section where api response will be displayed
  responseDiv = document.createElement("div");
  responseDiv.classList.add("fetch__responseSection");

  resMetrics = document.createElement("div");
  resMetrics.classList.add("res__details");

  resStatus = document.createElement("span");
  resStatus.classList.add("details__status");

  resTime = document.createElement("span");
  resTime.classList.add("details__time");

  resData = document.createElement("pre");
  resData.classList.add("res__data");

  parentDiv.appendChild(responseDiv);
  responseDiv.appendChild(resMetrics);
  responseDiv.appendChild(resData);
  resMetrics.appendChild(resStatus);
  resMetrics.appendChild(resTime);

  //adding event listerner on the button

  selectApiType.addEventListener("change", () => {
    if (selectApiType.value === "POST") {
      inputApiBody.style.display = "block";
      inputApi.value = "https://dummyjson.com/products/add?delay=1500";
    } else {
      inputApiBody.style.display = "none";
      inputApi.value = "https://dummyjson.com/products?delay=1000";
    }
  });

  fetchBtn.addEventListener("click", () => {
    if (!inputApi.value) {
      alert("Please enter a valid api to call!");
      return;
    }
    console.log(selectApiType.value, inputApi.value);
    callFetchApi(selectApiType.value, inputApi.value);
  });
}

export async function callFetchApi(type, url) {
  let apiStatusField = document.querySelector(".details__status");
  let apiTimeField = document.querySelector(".details__time");
  let apiDataField = document.querySelector(".res__data");

  let totalTimeTaken = 0;
  Object.assign(fetchBtn, { disabled: true });
  apiDataField.textContent = "Loading...";

  try {
    let requestBody;
    if (type === "POST") {
      requestBody = inputApiBody.value.trim();
      if (!requestBody) {
        apiStatusField.textContent = `Status : Error `;
        apiTimeField.textContent = `Time : 0 ms`;
        apiDataField.textContent = "Error : Request body can't be blank.";
        Object.assign(fetchBtn, { disabled: false });
        return;
      }
      if (requestBody) {
        try {
          JSON.parse(requestBody);
        } catch (error) {
          apiStatusField.textContent = `Status : Error `;
          apiTimeField.textContent = `Time : 0 ms`;
          apiDataField.textContent = ` Error : ${error}`;
          Object.assign(fetchBtn, { disabled: false });
          return;
        }
      }
    }
    performance.mark("api-call-begins");
    const response =
      type === "POST"
        ? await fetch(`${url}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: requestBody,
          })
        : await fetch(`${url}`);
    performance.mark("api-call-ends");
    const contentTypeReturned = response.headers.get("content-type");
    const data =
      contentTypeReturned && contentTypeReturned.includes("application/json")
        ? await response.json()
        : await response.text();
    console.log("DATA : ", data);

    totalTimeTaken = Math.round(
      performance.measure(
        "API-TimeMeasurement",
        "api-call-begins",
        "api-call-ends",
      ).duration,
    );

    apiStatusField.textContent = `Status : ${response.status} `;
    apiTimeField.textContent = `Time : ${totalTimeTaken} ms`;
    apiDataField.textContent =
      typeof data === "object" ? JSON.stringify(data, null, 2) : data;
  } catch (err) {
    apiDataField.textContent = `There was an error fetching the api : \n Error : ${err}`;
  } finally {
    performance.clearMarks();
    performance.clearMeasures();
    Object.assign(fetchBtn, { disabled: false });
  }
}
