const span = document.querySelector(".email-value");
const dismissBtn = document.querySelector("button");
span.textContent = localStorage.getItem("email") || "defaultemail@gmail.com";
dismissBtn.addEventListener("click", (e) => {
  window.location.href = "../newsletter-sign-up-with-success-message-main";
});
