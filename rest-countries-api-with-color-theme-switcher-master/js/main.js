// import data from "../data.json" assert { type: "json" };
import populateCardDetails from "./country-details.js";
import { findCountryByName } from "./country-details.js";

const url = "https://restcountries.com/v3.1/all";

const container = document.querySelector("main .container");
const filter = document.querySelector("select");
const searchInput = document.querySelector(".search-container input");
const searchByCountryForm = document.querySelector(".search-container");
const suggestionsContainer = document.querySelector(".suggestion-container");
const paginationBox = document.querySelector(".pagination");

let countryCards;

let cardsPerPage = 8;
let currentPage = 1;

localStorage.removeItem("searchString");

let data;
async function getData() {
    let response = await fetch(url);
    if (response.ok) {
        data = await response.json();
        console.log(data);
        console.log(data[0].name);
        populateCountries(data);
    }
}
getData();

paginationBox.addEventListener("click", (e) => {
    if (e.target.classList.contains("page-number")) {
        currentPage = parseInt(e.target.id);
        populateCountries();
    }
});

// PAGINATION
function generatePaginationLinks(countryLength, searchString) {
    paginationBox.innerHTML = "";

    if (countryLength > cardsPerPage) {
        let numOfPages = Math.ceil(countryLength / cardsPerPage);
        let pageLinks = "";
        for (let i = 0; i < numOfPages; i++) {
            pageLinks += `<a  href="#" id="${i + 1}" class="page-number link-${
                i + 1
            }">${i + 1}</a>`;
        }
        paginationBox.innerHTML = pageLinks;
        // Pagination links
        let linkElements = document.querySelectorAll(".page-number");
        linkElements.forEach((link) => link.classList.remove("current-page"));
        linkElements[currentPage - 1].classList.add("current-page");
        document.querySelector(".page").style.display = "block";
    } else {
        document.querySelector(".page").style.display = "none";
    }
    let resultInfoHtml = document.querySelector(".results-count");
    // Display the number of results found
    if (localStorage.getItem("searchString")) {
        let searchString = localStorage.getItem("searchString");
        resultInfoHtml.innerHTML = `<span class="search-total">${
            countryLength > 0 ? countryLength : "No"
        }</span>
        result${countryLength > 1 ? "s" : ""} for
        <span class="search-string">"${searchString}":</span>
        `;
        resultInfoHtml.style.display = "block";
    } else {
        resultInfoHtml.style.display = "none";
    }
}

function populateCountries(countries) {
    let filteredCountriesHtml = "";
    let startIndex = (currentPage - 1) * cardsPerPage;
    let endIndex = startIndex + cardsPerPage;
    let count;
    let currentCountries =
        countries || JSON.parse(localStorage.getItem("countryList"));
    let pageCountries = currentCountries.filter(
        (country, index) => index >= startIndex && index < endIndex
    );

    if (pageCountries.length < cardsPerPage) count = pageCountries.length;
    else count = cardsPerPage;

    // Generate html for the values found
    for (let i = 0; i < count; i++) {
        let card = buildCountryCard(pageCountries[i]);
        filteredCountriesHtml += card;
    }

    // populate the page with the html
    container.innerHTML = filteredCountriesHtml;
    localStorage.setItem("countryList", JSON.stringify(currentCountries));
    generatePaginationLinks(currentCountries.length);

    countryCards = document.querySelectorAll(".country-card");
    countryCards.forEach((card, index) => {
        card.addEventListener("click", (e) => {
            let cardCountry = findCountryByName(card.id);
            console.log(cardCountry);
            populateCardDetails(cardCountry);

            document.querySelector(".country-details-main").style.display =
                "grid";
            container.style.display = "none";
            document.querySelector(".results-info").classList.add("hide");
            document.querySelector("nav").classList.add("hide");
            document.querySelector("body").id = "change";
        });
    });
}

function buildCountryCard(country) {
    return ` <div id="${country.name.common}" class="country-card">
            <picture><img src="${country.flags.svg}" alt="${
        country.name.common
    } flag" ></picture>
            <section class="card-info">
                <h2>${country.name.common}</h2>
                <div class="info-div">
                    <p><span class="info-bold">Population: </span><span>${country.population.toLocaleString()}</span></p>
                    <p><span class="info-bold">Region: </span><span>${
                        country.region
                    }</span></p>
                    <p><span class="info-bold">Capital: </span> <span>${
                        country.capital
                    }</span></p>
                </div>
            </section>
        </div>
        `;
}

filter.addEventListener("change", (e) => {
    let searchType = "region";
    let searchString = e.target.value.trim().toLowerCase();
    handleCountrySearchOrFilter(searchType, searchString);
});

searchByCountryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let searchType = "name";
    let searchString = searchInput.value.trim().toLowerCase();
    console.log(!searchString);
    !searchString
        ? populateCountries(data)
        : handleCountrySearchOrFilter(searchType, searchString);
});

searchInput.addEventListener("input", generateSearchSuggestions);

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("suggestion")) {
        searchInput.value = e.target.textContent;
        suggestionsContainer.classList.remove("show");
        handleCountrySearchOrFilter("name", searchInput.value);
    } else {
        suggestionsContainer.classList.remove("show");
    }
});

function handleCountrySearchOrFilter(searchType, searchString) {
    // Reset current page
    currentPage = 1;
    localStorage.removeItem("searchString");
    searchInput.value = "";

    let pattern = new RegExp(searchString, "i");

    // filter countries that match the search type and value
    let filteredCountries;

    if (searchType == "region") {
        filteredCountries = data.filter((country) =>
            country[searchType].toLowerCase().match(pattern)
        );
    } else {
        filteredCountries = data.filter((country) =>
            country[searchType].common.toLowerCase().match(pattern)
        );
    }

    if (searchType == "name") {
        localStorage.setItem("searchString", searchString);
    }
    populateCountries(filteredCountries);
}

function generateSearchSuggestions(e) {
    let suggestionHtml = "";
    let string = e.target.value.trim().toLowerCase();

    // Extract country names that match the value being typed
    let searchSuggestions = data
        .filter((country) => country.name.common.toLowerCase().includes(string))
        .map((country) => country.name.common);

    // Generate html for the extracted countries
    searchSuggestions.forEach(
        (country) => (suggestionHtml += buildSearchSuggestionHtml(country))
    );

    suggestionsContainer.classList.add("show");
    suggestionsContainer.innerHTML = suggestionHtml;
}

function buildSearchSuggestionHtml(country) {
    return `<a href="#" class="suggestion">${country}</a>`;
}
