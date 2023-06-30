const dayElement = document.querySelector("#day");
const monthElement = document.querySelector("#month");
const yearElement = document.querySelector("#year");
const inputElements = document.querySelectorAll("input");
const errorSpans = document.querySelectorAll(".form-box span.error-message");
const submitTrigger = document.querySelector("picture");
const form = document.querySelector("form");

const area = document.querySelector(".output-area");

inputElements.forEach((element) => {
    element.addEventListener("input", limitInputDigits);
    element.addEventListener("blur", prefixZero);
});
submitTrigger.addEventListener("click", (e) => {
    handleSubmission(e);
    area.addEventListener("animationend", () => {
        area.classList.remove("flyin"); // Remove the 'flyin' class after the animation completes
    });
});
submitTrigger.addEventListener("touchend", (e) => {
    submitTrigger.style.background = "hsl(0, 100%, 67%)";
    setTimeout((e) => {
        submitTrigger.style.background = "hsl(259, 100%, 65%) ";
    }, 200);
});

function animateCounter(finalNumber, element) {
    let count = 0;
    const duration = 10; // Animation duration in seconds
    const increment = Math.ceil(finalNumber / duration);

    // console.log(element);
    const interval = setInterval(() => {
        // console.log(increment);
        count += increment;
        if (count >= finalNumber) {
            count = finalNumber;
            clearInterval(interval);
        }
        element.textContent = count;
    }, 100);
}

function handleSubmission(e) {
    let invalidFields = validateForm();
    if (!invalidFields.length) {
        clearErrorMessages();
        populateDateData();
    } else {
        clearErrorMessages();
        showErrors(invalidFields);
        clearResults();
    }
}

function clearResults() {
    document.querySelectorAll("p span").forEach((element) => {
        element.textContent = " - - ";
    });
}

function clearErrorMessages() {
    form.classList.remove("error");
    errorSpans.forEach((span) => span.classList.remove("visible"));
}

function limitInputDigits(e) {
    let numOfDigits = 2;
    if (e.target.id == "year") numOfDigits = 4;
    e.target.value = e.target.value.slice(0, numOfDigits);
}

function prefixZero(e) {
    if (e.target.value.length === 1) e.target.value = `0${e.target.value}`;
}

function computeDate() {
    // collect day, month and year entered by user
    const day = dayElement.value;
    const month = monthElement.value;
    const year = yearElement.value;

    // create a date object from it
    const date = new Date(year, month - 1, day);
    const currentDate = new Date();

    // Calculate the difference in milliseconds between the two dates
    const timeDiff = currentDate.getTime() - date.getTime();

    // Calculate the number of milliseconds in a year, month, and day
    const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25; // Account for leap years
    const millisecondsPerMonth = millisecondsPerYear / 12;
    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const years = Math.floor(timeDiff / millisecondsPerYear);
    const months = Math.floor(
        (timeDiff % millisecondsPerYear) / millisecondsPerMonth
    );
    const days = Math.floor(
        (timeDiff % millisecondsPerMonth) / millisecondsPerDay
    );

    return [years, months, days];
}

function populateDateData() {
    area.classList.add("flyin");
    const spans = document.querySelectorAll(".output-area span");
    const dateInfo = computeDate(); // Replace 100 with your desired final number
    spans.forEach((span, index) => {
        animateCounter(dateInfo[index], span);
    });
    console.log(area);
}

function validateForm() {
    const currentYear = new Date().getFullYear();
    const invalidFields = [];
    const monthsWith30Days = [4, 6, 9, 11];

    inputElements.forEach((element) => {
        let value = parseInt(element.value);
        let dayInput = parseFloat(dayElement.value);
        // Check if any of the validation rules in the element tag failed
        if (!element.checkValidity()) {
            invalidFields.push(element);
        }

        // check if the day entered matches the month
        // e.g when April is entered as month, 31 entered as day becomes invalid
        // because April has 30 days
        if (element.id == "month" && monthsWith30Days.includes(value)) {
            if (dayInput > 30) invalidFields.push(dayElement);
        }

        if (element.id == "month" && value == 2) {
            let isLeapYear = checkLeapYear(parseInt(yearElement.value));
            let maxDays = 28;
            if (isLeapYear) maxDays = 29;
            if (dayInput > maxDays) invalidFields.push(dayElement);
        }

        if (element.id == "year" && value > currentYear) {
            invalidFields.push(element);
        }
    });
    return invalidFields;
}

function showErrors(invalidFields) {
    form.classList.add("error");
    invalidFields.forEach((element) => {
        let errorMessage = getErrorMessage(element);
        if (errorMessage) {
            element.nextElementSibling.classList.add("visible");
            element.nextElementSibling.textContent = errorMessage;
        } else {
            element.nextElementSibling.classList.remove("visible"); // Hide the error message
        }
    });
}

function getErrorMessage(element) {
    let error;
    if (element.validity.valueMissing) {
        error = "This field is required";
    } else if (
        element.validity.rangeOverflow ||
        element.validity.rangeUnderflow
    ) {
        let firstLetter = element.id.charAt(0);
        let capitalized = firstLetter.toUpperCase() + element.id.substring(1);
        error = `Must be a valid ${capitalized}`;
    } else if (element.id == "year") {
        error = "Must be in the past";
    } else {
        let firstLetter = element.id.charAt(0);
        let capitalized = firstLetter.toUpperCase() + element.id.substring(1);
        error = `Must be a valid ${capitalized}`;
    }

    return error;
}

function checkLeapYear(year) {
    let isLeapYear = false;

    if (year % 4 == 0 && year % 100 == 0 && year % 400 == 0) {
        isLeapYear = true;
    }

    return isLeapYear;
}
