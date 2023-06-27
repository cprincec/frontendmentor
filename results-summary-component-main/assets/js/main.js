import data from "../../data.json" assert { type: "json" };
const categoriesHtml = document.querySelectorAll(".category");
const scoreHtml = document.querySelectorAll(".numerator");
const imgHtml = document.querySelectorAll("img");

categoriesHtml.forEach((element, index) => {
  element.textContent = data[index].category;
  scoreHtml[index].textContent = data[index].score;
  imgHtml[index].src = data[index].icon;
});
