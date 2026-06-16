const steps = document.querySelectorAll(".step");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
const progressBar = document.getElementById("progressBar");
const form = document.getElementById("multiStepForm");

let currentStep = 0;

// Load saved data from localStorage
window.addEventListener("load", () => {
    document.querySelectorAll("input").forEach(input => {
        const savedValue = localStorage.getItem(input.id);

        if (savedValue) {
            input.value = savedValue;
        }
    });

    showStep(currentStep);
});

// Autosave inputs
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
        localStorage.setItem(input.id, input.value);
    });
});

// Show current step
function showStep(index) {
    steps.forEach(step => {
        step.classList.remove("active");
    });

    steps[index].classList.add("active");

    const progress = ((index + 1) / steps.length) * 100;
    progressBar.style.width = progress + "%";

    if (index === 3) {
        showSummary();
    }
}

// Validate current step
function validateStep() {
    const inputs = steps[currentStep].querySelectorAll("input");

    for (let input of inputs) {
        if (input.value.trim() === "") {
            alert("Please fill all fields before continuing.");
            input.focus();
            return false;
        }
    }

    return true;
}

// Next buttons
nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        if (!validateStep()) {
            return;
        }

        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
        }
    });
});

// Previous buttons
prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
        }
    });
});

// Show summary
function showSummary() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const city = document.getElementById("city").value;
    const username = document.getElementById("username").value;

    document.getElementById("summary").innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Username:</strong> ${username}</p>
    `;
}

// Form submit
form.addEventListener("submit", (e) => {
    e.preventDefault();

    alert("Form Submitted Successfully!");

    // Clear localStorage
    document.querySelectorAll("input").forEach(input => {
        localStorage.removeItem(input.id);
    });

    form.reset();

    currentStep = 0;
    showStep(currentStep);
});