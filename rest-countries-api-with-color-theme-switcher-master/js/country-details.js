// import data from "../data.json" assert { type: "json" };
const url = "https://restcountries.com/v3.1/all";
let data;
async function getData() {
    let response = await fetch(url);
    if (response.ok) {
        data = await response.json();
    }
}
getData();

function populateCardDetails(country) {
    const container = document.querySelector(".country-details-main");
    const container1 = document.querySelector(".container");
    container.innerHTML = createDetailsCard(country);

    let backbtn = document.querySelector(".back");
    let borderButtons = document.querySelectorAll(".border-country");

    backbtn.addEventListener("click", () => {
        container.style.display = "none";
        container1.style.display = "grid";
        document.querySelector(".results-info").classList.remove("hide");
        document.querySelector("nav").classList.remove("hide");
        document.querySelector("body").id = "";
    });

    // add event listeners
    borderButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            let countryAbbr = btn.id;
            let country = findCountryByAbbr(countryAbbr);
            populateCardDetails(country);
        });
    });
}

function findCountryByName(name) {
    // find a counrty by its name
    let result = data.filter((country) => {
        return country.name.common == name;
    });
    return result[0];
}

function findCountryByAbbr(abbr) {
    // find a counrty by its abbreviation
    let result = data.filter((country) => {
        return country.cca3 == abbr;
    });
    return result[0];
}

// Create the html needed for the country details page
function createDetailsCard(country) {
    // Extract currencies, languages and borders from country
    let currencies = [];
    if (country.currencies) {
        for (const code in country.currencies) {
            currencies.push(country.currencies[code].name);
        }
    } else {
        languages.push("Unknown");
    }
    currencies = currencies.join(", ");

    let languages = [];
    if (country.languages) {
        for (const language in country.languages) {
            languages.push(country.languages[language]);
        }
    } else {
        languages.push("Unknown");
    }
    languages = languages.join(", ");
localSto
    let borderCountries = [];
    if (country.borders) {
        country.borders.forEach((border) => {
            let result = findCountryByAbbr(border);
            borderCountries.push(
                // remove the letters in parenthesis in country name
                `<button id=${result.cca3} class="border-country">${result.name.common}</button>`
            );
        });
    }
    borderCountries = borderCountries.join("");

    return ` 
    <button class="back"><span>←</span> Back</button>
    <div class="country-details">
        <picture><img src="${country.flags.svg}" alt="${
        country.name.common
    } flag"></picture>
        <section class="card-info">
            <h2>${country.name.common}</h2>
            <div class="info-div">
                <div class="first-info">
                    <p><span class="info-bold">Native Name: </span><span>${
                        Object.entries(country.name.nativeName)[0][1].official
                    }</span></p>
                    <p><span class="info-bold">Population: </span><span>${country.population.toLocaleString()}</span></p>
                    <p><span class="info-bold">Region: </span><span>${
                        country.region
                    }</span></p>
                    <p><span class="info-bold">Sub Region: </span><span>${
                        country.subregion
                    }</span></p>
                    <p><span class="info-bold">Capital: </span> <span>${
                        country.capital
                    }</span></p>
                </div>
                <div class="second-info">
                    <p><span class="info-bold">Top Level Domain: </span><span>${country.tld.join(
                        ", "
                    )}</span>
                    </p>
                    <p><span class="info-bold">Currencies: </span><span>${currencies}</span></p>
                    <p><span class="info-bold">Languages: </span> <span>${languages}</span></p>
                </div>
                <div class="border-info">
                <h3>Border Countries:</h3>
                    ${borderCountries}
                </div>
            </div>
        </section>
    </div>
    `;
}

export default populateCardDetails;
export { findCountryByName };
