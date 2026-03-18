export const capitaliseFirstChar = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const wrapInDivAndAddLabel = (
  identifier,
  parentDiv,
  elementToBeWrapped,
  label,
) => {
  const randomID = Math.round(Math.random(0, 1000) * 10000);
  const wrapperDiv = document.createElement("div");
  const fieldLabel = document.createElement("label");

  wrapperDiv.classList.add(`${identifier}__wrapperDiv`);
  fieldLabel.classList.add(`${identifier}__${randomID}`);

  Object.assign(wrapperDiv.style, { display: "flex", flexDirection: "column" });
  fieldLabel.innerText = label;

  wrapperDiv.appendChild(fieldLabel);
  wrapperDiv.appendChild(elementToBeWrapped);

  parentDiv.appendChild(wrapperDiv);

  return fieldLabel;
};
