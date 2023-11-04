let idWithMarks = new Map();

const submitForm = (event) => {
  event.preventDefault();

  const data = new FormData(document.getElementById("addStudent"));
  const array = [];
  const updatedData = { name: "", phone: "", math: 0, science: 0, english: 0 };

  for (const [key, value] of data) {
    const errorId = `${key}Error`;
    const isFieldValid = requiredErrorMsg(key, value.trim(), errorId);
    if (isFieldValid) {
      updatedData[key] = value;
    }
    array.push(isFieldValid);
  }

  const isValidForm = array.every((val) => val === true);

  if (!isValidForm) {
    console.log("fix the error");
    return;
  }

  const tableRow = createTableRow(updatedData);
  addRowInTable(tableRow);

  document.forms["addStudent"].reset();
  document.getElementById("modalbuttonClose").click();
};

const addRowInTable = (element) => {
  const table = document.getElementById("studentData");
  const tableBody = table.getElementsByTagName("tbody")[0];
  tableBody.appendChild(element);
};

const createTableRow = (data) => {
  const { math, science, english } = data;
  const uniqueId = `${new Date().getTime()}`;

  const total = parseInt(math) + parseInt(science) + parseInt(english);

  const tr = document.createElement("tr");
  tr.setAttribute("id", uniqueId);
  idWithMarks.set(uniqueId, total);

  for (let key in data) {
    const td = document.createElement("td");
    td.innerText = data[key];
    tr.appendChild(td);
  }
  const trTotal = document.createElement("td");
  trTotal.innerText = total;

  tr.appendChild(trTotal);

  return tr;
};

const requiredErrorMsg = (key, value, errorId) => {
  const element = document.getElementById(errorId
