/************** NAVIGATING ONE FORM TO ANOTHER ******************/
const forms = document.querySelectorAll("form");
const previousBtns = document.querySelectorAll(".previous");
const nextBtns = document.querySelectorAll(".next");
const navigatorsLis = document.querySelectorAll("li");
const navigators = document.querySelectorAll(".circle");
const activeCircle = document.querySelector(".circle.active");

if (localStorage.getItem("plansHTML")) localStorage.removeItem("plansHTML");
function changeActiveForm(index, next = false) {
    let x;
    next ? (x = 1) : (x = 0);
    forms.forEach((form) => form.classList.remove("active-form"));
    forms[index + x].classList.add("active-form");
    navigators.forEach((navigator) => navigator.classList.remove("active"));
    navigators[index + x].classList.add("active");
}

previousBtns.forEach((btn, index) =>
    btn.addEventListener("click", () => changeActiveForm(index))
);

navigatorsLis.forEach((li, index) => {
    li.addEventListener("click", () => {
        if (index == 1) populatePlan();
        changeActiveForm(index);
    });
});

/************** NAVIGATING ONE FORM TO ANOTHER ENDS ******************/

/************** TOGGLING MONTHLY OR YEARLY PLANS ******************/
const toggleBarContainer = document.querySelector(".toggle");

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

const addOns = [
    {
        name: "Online service",
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

/************** TOGGLING MONTHLY OR YEARLY PLANS ENDS ******************/

/*********************** SELECTING ADD-ONS ************************/
const addOnsDivs = document.querySelectorAll(".pick-add-ons input");
addOnsDivs.forEach((div) => {
    div.addEventListener("click", () => {
        div.parentElement.classList.toggle("selected");
    });
});

/*********************** SELECTING ADD-ONS ENDS ************************/

// Select second next-step button on the page
const plansBtn = nextBtns[1];

plansBtn.addEventListener("click", () => {
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
        changeActiveForm(pageNum, true);
    }
    console.log(formData);
});

function extractPlansData(index) {
    const planLabels = document.querySelectorAll(".plan-selection label");
    const planAmounts = document.querySelectorAll(".plan-selection .desc");
    let selectedPlan;

    plans.forEach((plan) => {
        plan.name.toLocaleLowerCase() ==
        planLabels[index].textContent.toLowerCase()
            ? (selectedPlan = plan)
            : null;
    });

    let planDuration;
    planAmounts.forEach((amount, index) => {
        amount.textContent.includes("mo")
            ? (planDuration = "Monthly")
            : (planDuration = "Yearly");
    });

    formData.planName = selectedPlan.name;
    formData.planDuration = planDuration;
    formData.amount = selectedPlan[planDuration.toLowerCase()];
    formData.amountString =
        selectedPlan[`${planDuration.toLowerCase()}InnerText`];
}

// Select second next-step button on the page
const addOnsBtn = nextBtns[2];

addOnsBtn.addEventListener("click", () => {
    const addOnsDivs = document.querySelectorAll(".pick-add-ons .form-box");
    let pageNum = 2;
    let selectedPlanIndexes = [];
    addOnsDivs.forEach((div, index) => {
        if (div.classList.contains("selected")) {
            selectedPlanIndexes.push(index);
        }
    });
    if (selectedPlanIndexes.length > 0) {
        extractAddOnsData(selectedPlanIndexes);
        changeActiveForm(pageNum, true);
    } else {
        changeActiveForm(pageNum, true);
    }
    console.log(formData);
});

function extractAddOnsData(indexesArray) {
    // const addOnsLabels = document.querySelectorAll(".pick-add-ons label");
    // const planAmounts = document.querySelectorAll(".pick-add-ons .free-months");
    let selectedAddOns = [];
    addOns.forEach((addOn, index) => {
        indexesArray.includes(index) ? selectedAddOns.push(addOn) : null;
    });
    formData.addOns = selectedAddOns;
}

/*********************** FORM VALIDATION ENDS ************************/
// function populateFinishingUp() {
//     const container = document.querySelector(".form-summary");
//     let addOnsHtml;

//     formData.addOns.forEach((addOn) => {
//         addOnsHtml += ` <div class="form-box">
//         <p class="addon-final">${addOn.addOnName}</p>
//         <p class="free-months display final">${addOn.}</p>
//         </div>
//         `;
//     });
// }
