/**
 * Mekonnen Yalelet — Portfolio Script
 * Handles interactivity: animations, theme toggling, form submission, and collapsible sections.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. CONTACT FORM HANDLER (Mailto)
    // ==========================================
    const contactForm = document.getElementById("contact-form");
    
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Get form values using safe trimming
            const getVal = (id) => document.getElementById(id).value.trim();
            
            const fname = getVal("fname");
            const lname = getVal("lname");
            const email = getVal("email");
            const message = getVal("message");
            
            // Construct email content
            const subject = `Contact from ${fname} ${lname}`;
            const emailBody = `Hello,\n\n${message}\n\n---\nFrom: ${fname} ${lname}\nEmail: ${email}`;
            
            // Open default mail client
            const mailtoLink = `mailto:mekonenyalelet1179@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
            window.location.href = mailtoLink;
        });
    }

    // ==========================================
    // 2. BACKGROUND PARTICLE SYSTEM
    // ==========================================
    initBackgroundAnimation();

    // ==========================================
    // 3. COLLAPSIBLE SECTIONS
    // ==========================================
    initCollapsibleSections();
});

/**
 * Initializes the canvas particle animation and theme observer
 */
function initBackgroundAnimation() {
    const canvas = document.getElementById('signature-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const toggleBtn = document.getElementById('theme-btn');
    
    // Configuration
    const config = {
        particleCount: 250,
        connectionDistance: 150,
        speed: 0.5,
        colors: {
            dark: { particle: 'rgba(240, 240, 240, 0.5)', line: 'rgba(240, 240, 240, 0.15)' },
            light: { particle: 'rgba(51, 51, 51, 0.5)', line: 'rgba(51, 51, 51, 0.1)' }
        }
    };

    let width, height;
    let particles = [];
    let currentColor = config.colors.dark; // Default to dark theme initial state

    // --- Particle Class ---
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * config.speed;
            this.vy = (Math.random() - 0.5) * config.speed;
            this.size = Math.random() * 2 + 1;
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
            ctx.fillStyle = currentColor.particle;
            ctx.fill();
        }
    }

    // --- Core Functions ---
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    function initParticles() {
        particles = Array.from({ length: config.particleCount }, () => new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw Connections
        for (let i = 0; i < particles.length; i++) {
            const p1 = particles[i];
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = currentColor.line;
                    ctx.lineWidth = 1 - (distance / config.connectionDistance);
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }

        // Update & Draw Particles
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    function updateThemeColors() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        currentColor = isDark ? config.colors.dark : config.colors.light;
    }

    // --- Event Listeners ---
    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', newTheme);
            updateThemeColors();
        });
    }

    // --- Start ---
    resize();
    initParticles();
    updateThemeColors();
    animate();
}

/**
 * Initializes the collapsible sections logic
 */
function initCollapsibleSections() {
    const headers = document.querySelectorAll('.collapsible-header');
    
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isCollapsed = header.classList.contains('collapsed');
            
            // Close all other sections first (Accordian style)
            headers.forEach(h => {
                if (h !== header) {
                    h.classList.add('collapsed');
                    h.nextElementSibling.classList.remove('expanded');
                }
            });
            
            // Toggle clicked section
            if (isCollapsed) {
                header.classList.remove('collapsed');
                content.classList.add('expanded');
            } else {
                header.classList.add('collapsed');
                content.classList.remove('expanded');
            }
        });
    });
}
