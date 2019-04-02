import {
  getMethod,
  postMethod,
  putMethod,
  patchMethod,
  deleteMethod
} from "./methods.mjs";

const createHtmlTag = config => {
  const tagName = config.tagName !== undefined ? config.tagName : "div";
  const tag = document.createElement(tagName);

  if (config.text !== undefined) {
    const text = document.createTextNode(config.text);
    tag.appendChild(text);
  }

  if (config.classNames !== undefined) {
    config.classNames.forEach(className => tag.classList.add(className));
  }

  if (config.event !== undefined) {
    tag.addEventListener(config.event.type, config.event.cb);
  }

  if (config.id !== undefined) {
    tag.id = config.id;
  }

  return tag;
};

const showResults = (results, responseBoxTag) => {
  console.log(results);
  responseBoxTag.innerHTML = JSON.stringify(results, null, 2);
};

const handleMethodsChange = (bodyRows, methodSelectTag) => {
  if (methodSelectTag.value === "get" || methodSelectTag.value === "delete") {
    bodyRows.classList.add("hide");
  } else {
    bodyRows.classList.remove("hide");
  }
};

const handleButtonRow = event => {
  const row = event.target.parentElement;
  addRow(row);

  event.target.removeEventListener("click", handleButtonRow);
  event.target.addEventListener("click", () => {
    removeRow(row);
  });
  event.target.innerText = "Remove line";
};

const removeRow = row => {
  row.remove();
};
const addRow = row => {
  row.parentElement.appendChild(createBodyRowHtml());
};

const serializeData = bodyRows => {
  const inputsArr = [...bodyRows.querySelectorAll("input")];
  const inputsVal = inputsArr.map(input => input.value);

  const data = {};

  inputsVal.forEach((input, idx, arr) => {
    if (idx % 2 === 0) {
      data[input] = arr[idx + 1];
    }
  });

  return JSON.stringify(data);
};

const sendRequest = (methodSelectTag, inputTag, responseBoxTag, bodyRows) => {
  if (inputTag.value === "") {
    return false;
  }

  switch (methodSelectTag.value) {
    case "get":
      getMethod(inputTag.value).then(response =>
        showResults(response, responseBoxTag)
      );
      break;
    case "post":
      const dataPost = serializeData(bodyRows);
      postMethod(inputTag.value, dataPost).then(response =>
        showResults(response, responseBoxTag)
      );
      break;
    case "put":
      const dataPut = serializeData(bodyRows);
      putMethod(inputTag.value, dataPut).then(response =>
        showResults(response, responseBoxTag)
      );
      break;
    case "patch":
      const dataPatch = serializeData(bodyRows);
      patchMethod(inputTag.value, dataPatch).then(response =>
        showResults(response, responseBoxTag)
      );
      break;
    case "delete":
      deleteMethod(inputTag.value).then(response =>
        showResults(response, responseBoxTag)
      );
      break;
  }
};

const createBodyRowHtml = () => {
  const rowTag = createHtmlTag({ classNames: ["post-container"] });
  const keyInputTag = createHtmlTag({ tagName: "input", classNames: ["post"] });
  const valueInputTag = createHtmlTag({
    tagName: "input",
    classNames: ["post"]
  });

  const button = createHtmlTag({
    tagName: "button",
    classNames: ["btn-helper"],
    text: "Add next row",
    event: {
      type: "click",
      cb: handleButtonRow
    }
  });

  rowTag.appendChild(keyInputTag);
  rowTag.appendChild(valueInputTag);
  rowTag.appendChild(button);

  return rowTag;
};

export const createPostmanAppGui = config => {
  const wrapperTag = createHtmlTag({ tagName: "main" });

  const bodyRows = createHtmlTag({ classNames: ["hide"] });
  const formTag = createHtmlTag({
    tagName: "section",
    classNames: ["box-form"]
  });
  const methodSelectTag = createHtmlTag({
    tagName: "select",
    classNames: ["user-select"],
    event: {
      type: "change",
      cb: () => {
        handleMethodsChange(bodyRows, methodSelectTag);
      }
    }
  });
  config.methods.forEach(method => {
    const methodTag = createHtmlTag({
      tagName: "option",
      classNames: ["user-option"],
      text: method,
      value: method
    });
    methodSelectTag.appendChild(methodTag);
  });
  formTag.appendChild(methodSelectTag);

  const inputTag = createHtmlTag({ tagName: "input", id: "source" });
  formTag.appendChild(inputTag);

  const responseBoxTag = createHtmlTag({
    tagName: "pre",
    classNames: ["box-response"]
  });

  const buttonSendTag = createHtmlTag({
    tagName: "button",
    classNames: ["btn-send"],
    text: "Send Request",
    event: {
      type: "click",
      cb: () => {
        sendRequest(methodSelectTag, inputTag, responseBoxTag, bodyRows);
      }
    }
  });
  formTag.appendChild(buttonSendTag);
  wrapperTag.appendChild(formTag);

  const rowTag = createBodyRowHtml({});
  bodyRows.appendChild(rowTag);
  wrapperTag.appendChild(bodyRows);

  wrapperTag.appendChild(responseBoxTag);

  return wrapperTag;
};
