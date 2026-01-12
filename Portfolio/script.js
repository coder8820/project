// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Contact form fake submit
const form = document.querySelector('form');
form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Message sent! Thank you 😊');
    form.reset();
});
