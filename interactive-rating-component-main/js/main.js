const liElements = document.querySelectorAll("li");
const modal = document.querySelector(".modal");
const modalSpan = document.querySelector(".modal p:nth-of-type(1) span");
const btn = document.querySelector("button");
let number;

liElements.forEach((li) =>
    li.addEventListener("click", (e) => {
        liElements.forEach((item) => item.classList.remove("selected"));
        e.target.classList.add("selected");
        number = e.target.textContent;
    })
);

btn.addEventListener("click", () => {
    if (number) {
        modalSpan.textContent = number;
        modal.style.display = "grid";
    }
});
