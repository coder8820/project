
// Contact form fake submit
const form = document.querySelector('form');
form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Message sent! Thank you 😊');
    form.reset();
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Animate hamburger bars
    hamburger.classList.toggle('toggle');
});


const roles = ["BSCS Student", "Web Developer", "Futuristic Designer"];
let roleIndex = 0;
let charIndex = 0;
const roleElement = document.querySelector(".typing .role");

function typeRole() {
    if (charIndex < roles[roleIndex].length) {
        roleElement.textContent += roles[roleIndex][charIndex];
        charIndex++;
        setTimeout(typeRole, 100);
    } else {
        setTimeout(deleteRole, 1500);
    }
}

function deleteRole() {
    if (charIndex > 0) {
        roleElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(deleteRole, 50);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, 500);
    }
}

typeRole();
