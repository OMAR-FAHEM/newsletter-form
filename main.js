const myEmail = document.getElementById("mail");
const submitButton = document.getElementById("submit");
const myForm = document.getElementById("my-form");
const errorMessage = document.createElement("span");
myForm.appendChild(errorMessage);
errorMessage.classList.add("error-msg");
const modal = document.querySelector(".success-modal");
const closeModal = document.querySelector(".close-modal");

myForm.addEventListener("submit", (event) => {
  if (!myEmail.validity.valid) {
    event.preventDefault();
    displayError();
  } else {
    event.preventDefault();
    sendData();
    showSuccess();
  }
});

myEmail.addEventListener("input", () => {
  if (myEmail.validity.valid) {
    errorMessage.innerHTML = "";
    myEmail.classList.remove("not-valid");
  } else {
    myEmail.classList.add("not-valid");
    displayError();
  }
});

closeModal.addEventListener("click", close);

function displayError() {
  if (myEmail.validity.valueMissing) {
    errorMessage.innerHTML = "Empty Input";
  } else if (myEmail.validity.typeMismatch) {
    errorMessage.innerHTML = "Valid email required";
  }
}

function showSuccess() {
  const userEmail = myEmail.value;
  const confirmMsg = document.querySelector(".success-modal p.confirm span");
  confirmMsg.innerHTML = userEmail;
  modal.classList.add("visible");
}
function close() {
  modal.classList.remove("visible");
}

// sending data to the server
function sendData() {
  const userEmail = myEmail.value;
  const data = new FormData();
  data.append("email", userEmail);
  const sendData = new XMLHttpRequest();
  sendData.open("POST", "server.php");
  sendData.send(data);
}
