// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Navigation Toggle
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.querySelector(".site-nav ul");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("open");
            navToggle.classList.toggle("active");
        });
    }

    // Contact Form - Mailto Handler
    const contactForm = document.getElementById("contact-form");
    
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Get form values
            const fname = document.getElementById("fname").value.trim();
            const lname = document.getElementById("lname").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();
            
            // Build email body with form data
            const emailBody = `Hello,

${message}

---
From: ${fname} ${lname}
Email: ${email}`;
            
            // Build subject
            const subject = `Contact from ${fname} ${lname}`;
            
            // Encode the subject and body for URL
            const encodedSubject = encodeURIComponent(subject);
            const encodedBody = encodeURIComponent(emailBody);
            
            // Create mailto link
            const mailtoLink = `mailto:mekonenyalelet1179@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;
            
            // Open default email client
            window.location.href = mailtoLink;
        });
    }
});