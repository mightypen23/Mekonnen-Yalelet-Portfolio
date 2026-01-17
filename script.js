// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Navigation Toggle
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.querySelector(".site-nav ul");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent the click from bubbling to the document
            navMenu.classList.toggle("open");
            navToggle.classList.toggle("active");
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (navMenu.classList.contains("open") && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove("open");
                navToggle.classList.remove("active");
            }
        });

        // Close menu when a navigation link is clicked
        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                navToggle.classList.remove("active");
            });
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

    // --- BACKGROUND PARTICLE SYSTEM ---
    const canvas = document.getElementById('signature-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const toggleBtn = document.getElementById('theme-btn');
        
        let width, height;
        let particles = [];
        let animationId;

        // Settings for the "Icon" Feel
        const particleCount = 100; // Keep it low for minimalism
        const connectionDistance = 150;
        const particleSpeed = 0.5;

        // Current Colors (Updated by Theme)
        let particleColor = 'rgba(51, 51, 51, 0.5)';
        let lineColor = 'rgba(51, 51, 51, 0.1)';

        // --- RESIZE HANDLER ---
        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }

        // --- PARTICLE SYSTEM ---
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * particleSpeed;
                this.vy = (Math.random() - 0.5) * particleSpeed;
                this.size = Math.random() * 2 + 1; // Size between 1 and 3
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = particleColor;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        // --- ANIMATION LOOP ---
        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            // Draw Lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 1 - (distance / connectionDistance);
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw Particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationId = requestAnimationFrame(animate);
        }

        // --- THEME MANAGEMENT ---
        function updateThemeColors() {
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            if (isDark) {
                particleColor = 'rgba(240, 240, 240, 0.5)'; // Light particles for dark mode
                lineColor = 'rgba(240, 240, 240, 0.15)';   // Faint lines
            } else {
                particleColor = 'rgba(51, 51, 51, 0.5)';   // Dark grey particles
                lineColor = 'rgba(51, 51, 51, 0.1)';       // Faint black lines
            }
        }

        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const currentTheme = document.body.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                document.body.setAttribute('data-theme', newTheme);
                updateThemeColors();
            });
        }

        // --- INITIALIZATION ---
        window.addEventListener('resize', () => {
            resize();
            initParticles();
        });

        resize();
        initParticles();
        animate();
        updateThemeColors(); // Set initial colors
    }

    // --- COLLAPSIBLE SECTIONS ---
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
    
    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isCollapsed = header.classList.contains('collapsed');
            
            // Close all sections first
            collapsibleHeaders.forEach(h => {
                h.classList.add('collapsed');
                h.nextElementSibling.classList.remove('expanded');
            });
            
            if (isCollapsed) {
                // Expand the clicked one
                header.classList.remove('collapsed');
                content.classList.add('expanded');
            }
            // If it was already open, it stays closed now
        });
    });
});