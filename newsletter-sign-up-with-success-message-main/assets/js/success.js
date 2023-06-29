const span = document.querySelector(".email-value");
span.textContent = localStorage.getItem("email") || "defaultemail@gmail.com";
