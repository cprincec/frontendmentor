const form = document.querySelector("form");
const inputElement = document.querySelector("input");
const formBox = document.querySelector(".form-box");
const submitBtn = document.querySelector("button");

inputElement.addEventListener("input", validate);
form.addEventListener("submit", handleSubmission);

function validate() {
  if (!inputElement.checkValidity() && !inputElement.value == "") {
    formBox.classList.add("error");
  } else {
    formBox.classList.remove("error");
  }
}

function handleSubmission(e) {
  e.preventDefault();
  if (!inputElement.checkValidity()) {
    formBox.classList.add("error");
  } else {
    localStorage.setItem("email", inputElement.value);
    window.location.href = "./success.html";
  }
}
