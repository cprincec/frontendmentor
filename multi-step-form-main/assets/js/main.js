const forms = document.querySelectorAll("form");
const navigatorsLis = document.querySelectorAll("li");
const navigators = document.querySelectorAll(".circle");
const activeCircle = document.querySelector(".circle.active");
const personalFormFields = document.querySelectorAll(".personal-info input");

/*********************** EVENT LISTENERS STARTS ************************/

//// Buttons ////
const allNextBtns = document.querySelectorAll(".next");
const allPreviousBtns = document.querySelectorAll(".previous");
const personalFormNextBtn = allNextBtns[0];
const plansBtn = allNextBtns[1];
const addOnsNextBtn = allNextBtns[2];
const confirmBtn = document.querySelector(".confirm");

///// Listeners ///////

// Personal info form 'next-step' button listener
personalFormNextBtn.addEventListener("click", handlePersonalFormSubmission);

// Select plan 'next-step' button listener
plansBtn.addEventListener("click", handlePlansFormSubmission);

// Pick add ons 'next-step' button listener
addOnsNextBtn.addEventListener("click", handleAddOnsFormSubmission);

// Finishing up 'next-step' button listener
confirmBtn.addEventListener("click", handleFinishingUpPageSubmission);

// Listen for selecting plan
function addPlansListener() {
    // Handle selection of plan
    const plansDivs = document.querySelectorAll(".plan-selection .form-box");
    plansDivs.forEach((div) => {
        div.addEventListener("click", () => {
            plansDivs.forEach((planDiv) =>
                planDiv.classList.remove("selected")
            );
            div.classList.add("selected");
        });
    });
}

// Lister for picking add ons
function addAddOnsListener() {
    const addOnsFormBoxes = document.querySelectorAll(
        ".pick-add-ons .form-box"
    );
    const addOnsInputs = document.querySelectorAll(".pick-add-ons input");
    addOnsFormBoxes.forEach((div, index) => {
        div.addEventListener("click", () => {
            div.classList.toggle("selected");
            addOnsInputs[index].checked
                ? (addOnsInputs[index].checked = false)
                : (addOnsInputs[index].checked = true);
        });
    });
}

// Navigate to precious page listener
allPreviousBtns.forEach((btn, index) =>
    btn.addEventListener("click", () => changeActiveForm(index))
);

/*********************** EVENT LISTNERS ENDS ************************/

/*********************** FORMS FUNCTION DEFINITIONS STARTS ************************/
function handlePersonalFormSubmission(e) {
    e.preventDefault();
    const errorFields = document.querySelectorAll(".invalid");

    let pageNum = 0;
    let invalidCount = 0;
    personalFormFields.forEach((field, index) => {
        if (!field.checkValidity()) {
            if (!field.validity.valueMissing) {
                errorFields[index].textContent = field.validationMessage;
            }
            invalidCount++;
            errorFields[index].classList.add("display");
            field.classList.add("invalid");
        } else {
            errorFields[index].classList.remove("display");
            field.classList.remove("invalid");
        }
    });

    if (!invalidCount) {
        extractPersonalData();
        !localStorage.getItem("loaded") ? populatePlan() : null;
        changeActiveForm(pageNum, true);
    }
}

function handlePlansFormSubmission(e) {
    e.preventDefault();
    const plansDivs = document.querySelectorAll(".plan-selection .form-box");
    let pageNum = 1;
    let selected = false;
    let selectedPlanIndex;
    plansDivs.forEach((div, index) => {
        if (div.classList.contains("selected")) {
            selectedPlanIndex = index;
            selected = true;
        }
    });
    if (selected) {
        extractPlansData(selectedPlanIndex);
        populateAddOns();
        changeActiveForm(pageNum, true);
    }
}

function handleAddOnsFormSubmission(e) {
    e.preventDefault();
    const selectedAddOns = document.querySelectorAll(".pick-add-ons .selected");
    let pageNum = 2;

    if (selectedAddOns.length > 0) {
        extractAddOnsData();
        populateFinishingUp();
        changeActiveForm(pageNum, true);
    } else {
        delete formData.addOns;
        populateFinishingUp();
        changeActiveForm(pageNum, true);
    }

    // Navigate to plan selection page if user clicks the change button on the finishing up page
    const changePlanBtn = document.querySelector("#change");
    changePlanBtn.addEventListener("click", () => {
        changeActiveForm(1);
    });
}

function handleFinishingUpPageSubmission() {
    changeActiveForm(3, true);
}
/*********************** FORMS FUNCTION DEFINITIONS ENDS ************************/

/*********************** POPULATING FORMS STARTS ************************/

// Populate Select plan form page
function populatePlan() {
    const planSelectionDiv = document.querySelector(".plan-selection");
    const durationElement = document.querySelector(".plan-interval");
    let duration = durationElement.id;
    let Html = "";

    if (localStorage.getItem("loaded")) {
        let containers = document.querySelectorAll(
            ".plan-selection .flex-wrapper"
        );
        let descs = document.querySelectorAll(".plan-selection .desc");
        plans.forEach((plan, index) => {
            let className = plan.name.split("-")[0].toLowerCase();
            let amount = plan.durations[duration].amount;
            let displayText = plan.durations[duration].displayText;

            let newDesc = document.createElement("p");
            newDesc.setAttribute("class", `${className} desc`);
            newDesc.setAttribute("data-value", amount);
            newDesc.setAttribute("id", className);
            newDesc.textContent = displayText;
            containers[index].replaceChild(newDesc, descs[index]);
        });
    } else {
        let planHtml = "";
        plans.forEach((plan) => {
            let className = plan.name.split("-")[0].toLowerCase();
            let name = plan.name;
            let amount = plan.durations[duration].amount;
            let displayText = plan.durations[duration].displayText;
            planHtml += `
            <div class="form-box border">
            <picture><img src="./assets/images/icon-${className}.svg" alt="Arcade icon"></picture>
            <div class="flex-wrapper">
              <label for="${className}">${name}</label>
              <p id="${className}" class="${className} desc" data-value=${amount}>${displayText}</p>
              <p class="free-months">2 months free</p>
            </div>
          </div>
            `;
        });

        Html = planHtml;
        planSelectionDiv.innerHTML = Html;
        addPlansListener();
        localStorage.setItem("loaded", true);
    }
}

// Populate Pick add ons form page
function populateAddOns() {
    const addOnsDiv = document.querySelector(".pick-add-ons");
    let duration = formData.planDuration.toLowerCase();

    if (localStorage.getItem("loadedAddOns")) {
        let descs = document.querySelectorAll(".pick-add-ons .free-months");
        descs.forEach((desc, index) => {
            desc.dataset.value =
                addOns[index].durations[duration.toLowerCase()].amount;
            desc.textContent =
                addOns[index].durations[
                    duration.toLocaleLowerCase()
                ].displayText;
        });
    } else {
        let html = "";
        addOns.forEach((addOn, index) => {
            let splitName = addOn.name.toLowerCase().split(" ");
            let className = splitName[0] + "-" + splitName[1];
            html += `<div class="form-box border">
            <input type="checkbox" disabled id="${className}" name="${className}" class="${className}">
            <div>
              <label for="${className}">${addOn.name}</label>
              <p class="desc">${addOn.desc}</p>
            </div>
            <p class="free-months display" data-value="${
                addOn.durations[duration.toLowerCase()].amount
            }">${addOn.durations[duration.toLocaleLowerCase()].displayText}</p>
          </div>
            `;
        });
        addOnsDiv.innerHTML = html;
        addAddOnsListener();
        localStorage.setItem("loadedAddOns", true);
    }
}

// Populate Finishing up form page
function populateFinishingUp() {
    const container = document.querySelector(".form-summary");
    const totalContainer = document.querySelector(".total .amount");
    const totalDescContainer = document.querySelector(".total .desc");

    let html = "";
    let total = 0;
    let duration = formData.planDuration.split("ly")[0].toLowerCase();
    let durationShort = duration == "month" ? "mo" : "yr";
    html += `<div class="form-box">
    <div>
      <p class="arcade-final">${formData.planName} (${formData.planDuration})</p>
      <a href="#yealy-plan" id="change">Change</a>
    </div>
    <p class="free-months display final final-arcade">${formData.amountString}</p>
  </div>`;
    total += parseInt(formData.amount);
    if (formData.addOns) {
        html += `<hr>`;
        formData.addOns.forEach((addOn) => {
            html += ` <div class="form-box">
              <p class="add-on-final">${addOn.name}</p>
              <p class="free-months display final">${addOn.displayText}</p>
            </div>
        `;
            total += parseInt(addOn.amount);
        });
    }
    container.innerHTML = html;
    totalDescContainer.textContent = `Total (per ${duration})`;
    totalContainer.textContent = `$${total}/${durationShort}`;
}
/*********************** POPULATING FORMS ENDS ************************/

/*********************** EXTRACTING FORM DATA STARTS ************************/

// Validate and extract personl info form data
function extractPersonalData() {
    formData.name = personalFormFields[0].value;
    formData.email = personalFormFields[1].value;
    formData.phoneNumber = personalFormFields[2].value;
}

// Validate and extract plans form data
function extractPlansData(index) {
    const planLabels = document.querySelectorAll(".plan-selection label");
    const planAmountElement = document.querySelector(".plan-selection .desc");
    let selectedPlan;

    plans.forEach((plan) => {
        plan.name.toLocaleLowerCase() ==
        planLabels[index].textContent.toLowerCase()
            ? (selectedPlan = plan)
            : null;
    });

    let planDuration;
    planAmountElement.textContent.includes("mo")
        ? (planDuration = "Monthly")
        : (planDuration = "Yearly");
    // console.log(selectedPlan);
    formData.planName = selectedPlan.name;
    formData.planDuration = planDuration;
    formData.amount = selectedPlan.durations[planDuration.toLowerCase()].amount;
    formData.amountString =
        selectedPlan.durations[planDuration.toLowerCase()].displayText;
}

// Validate and extract add ons form data
function extractAddOnsData() {
    const addOnsLabels = document.querySelectorAll(
        ".pick-add-ons .selected label"
    );
    const addOnsAmounts = document.querySelectorAll(
        ".pick-add-ons .selected .free-months"
    );
    const addOnsArray = [];

    addOnsLabels.forEach((label, index) => {
        let info = {};
        info.name = label.textContent;
        info.amount = addOnsAmounts[index].dataset.value;
        info.displayText = addOnsAmounts[index].textContent;
        addOnsArray.push(info);
    });
    if (formData.addOns) delete formData.addOns;
    formData.addOns = addOnsArray;
}

/*********************** EXTRACTING FORM DATA ENDS ************************/

/*********************** UTILITY STARTS ************************/

// Elements
const toggleBarContainer = document.querySelector(".toggle");

// Reset the saved page info
localStorage.removeItem("loaded");
localStorage.removeItem("loadedAddOns");

// Change the current page
function changeActiveForm(index, next = false) {
    let x;
    if (index === 3) {
        const thanks = document.querySelector(".thank-you .form-main");
        forms.forEach((form) => form.classList.remove("active-form"));
        thanks.style.display = "grid";
        return;
    }

    next ? (x = 1) : (x = 0);
    forms.forEach((form) => form.classList.remove("active-form"));
    forms[index + x].classList.add("active-form");
    navigators.forEach((navigator) => navigator.classList.remove("active"));
    navigators[index + x].classList.add("active");
}

// Toggle between 'monthly' and 'yearly' on the plans page
toggleBarContainer.addEventListener("click", () => {
    const planSelectionDiv = document.querySelector(".plan-selection");
    const toggleBar = document.querySelector(".toggle-bar");
    const toggleMonth = document.querySelector(
        ".monthly-yearly .monthly-toggle"
    );
    const toggleyear = document.querySelector(".monthly-yearly .yearly-toggle");

    toggleBar.classList.toggle("yearly");
    toggleBar.classList.toggle("monthly");
    planSelectionDiv.classList.toggle("yearly-plan");
    toggleMonth.classList.toggle("plan-interval");
    toggleyear.classList.toggle("plan-interval");
    populatePlan();
});

// Object to store all collected form data
const formData = {};

// Available plans
const plans = [
    {
        name: "Arcade",
        durations: {
            monthly: {
                amount: 9,
                displayText: "$9/mo",
            },
            yearly: {
                amount: 90,
                displayText: "$90/yr",
            },
        },
    },
    {
        name: "Advanced",
        durations: {
            monthly: {
                amount: 12,
                displayText: "$12/mo",
            },
            yearly: {
                amount: 120,
                displayText: "$120/yr",
            },
        },
    },
    {
        name: "Pro",
        durations: {
            monthly: {
                amount: 15,
                displayText: "$15/mo",
            },
            yearly: {
                amount: 150,
                displayText: "$150/yr",
            },
        },
    },
];

// Available add ons
const addOns = [
    {
        name: "Online service",
        desc: "Access to multiplayer games",
        durations: {
            monthly: {
                amount: 1,
                displayText: "$1/mo",
            },
            yearly: {
                amount: 10,
                displayText: "$10/yr",
            },
        },
    },
    {
        name: "Larger storage",
        desc: "Extra 1TB of cloud save",
        durations: {
            monthly: {
                amount: 2,
                displayText: "$2/mo",
            },
            yearly: {
                amount: 20,
                displayText: "$20/yr",
            },
        },
    },
    {
        name: "Customizable profile",
        desc: "Custom theme on your profile",
        durations: {
            monthly: {
                amount: 2,
                displayText: "$2/mo",
            },
            yearly: {
                amount: 20,
                displayText: "$20/yr",
            },
        },
    },
];

/*********************** UTILITY ENDS ************************/
