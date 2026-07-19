/*
   Shagun Bansal Portfolio Application Logic
   Includes: Particle Background, Typewriter, KPI Counter, Theme Toggle, & Project Gallery Lightbox
*/

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // Theme Toggle
    // ----------------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }

    // ----------------------------------------------------
    // Mobile Menu Toggle
    // ----------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileIcon = mobileToggle.querySelector('i');

    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        const isOpen = mobileMenu.classList.contains('open');
        mobileIcon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    });

    // Close mobile menu on link click
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            mobileIcon.className = 'fas fa-bars';
        });
    });

    // ----------------------------------------------------
    // Typewriter Effect
    // ----------------------------------------------------
    const typewriterElement = document.getElementById('typewriter');
    const words = ["actionable insights.", "interactive dashboards.", "optimized reporting.", "automated workflows."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // delete faster
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // standard typing speed
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 1500; // Pause at the end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before starting new word
        }

        setTimeout(type, typingSpeed);
    }
    
    // Start typing
    setTimeout(type, 1000);

    // ----------------------------------------------------
    // KPI Metrics Counter Animation
    // ----------------------------------------------------
    const counterElements = document.querySelectorAll('.counter');
    const metricsSection = document.getElementById('about');
    let countersAnimated = false;

    const animateCounters = () => {
        counterElements.forEach(counter => {
            const parentCard = counter.closest('.metric-card');
            const targetValue = parseInt(parentCard.getAttribute('data-metric'), 10);
            const isRows = counter.id === 'rows-counter';
            let start = 0;
            
            // Adjust step rate based on target size
            let duration = 1500;
            let increment = Math.ceil(targetValue / (duration / 16));
            if (isRows) {
                // For rows (1,000,000) count to 10
                const targetRows = 10;
                let rowsStart = 0;
                const timer = setInterval(() => {
                    rowsStart += 0.5;
                    if (rowsStart >= targetRows) {
                        counter.textContent = targetRows;
                        clearInterval(timer);
                    } else {
                        counter.textContent = rowsStart.toFixed(1);
                    }
                }, 75);
                return;
            }

            const timer = setInterval(() => {
                start += increment;
                if (start >= targetValue) {
                    counter.textContent = targetValue;
                    clearInterval(timer);
                } else {
                    counter.textContent = start;
                }
            }, 16);
        });
    };

    // Intersection Observer to trigger when section enters viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                animateCounters();
                countersAnimated = true;
            }
        });
    }, { threshold: 0.2 });

    if (metricsSection) {
        observer.observe(metricsSection);
    }

    // ----------------------------------------------------
    // Project Gallery Lightbox
    // ----------------------------------------------------
    const projectsData = {
        hr: {
            title: "Workforce & Attrition Analysis",
            domain: "HR Analytics",
            tools: ["Power BI", "Excel", "DAX"],
            images: ["hr-dashboard-1.png", "hr-dashboard-2.png", "hr-dashboard-3.png"],
            captions: ["Executive Summary", "Workforce Insights", "Attrition Analysis"],
            description: "A centralized Power BI dashboard built for HR leadership to monitor workforce metrics and analyze employee attrition trends across departments and locations.",
            highlights: [
                "Tracks headcount growth, gender distribution, salary bands, and work mode (Onsite / Hybrid / Remote)",
                "Breaks attrition down by year, department, role level, gender, and experience band",
                "Highest exits are concentrated in IT, Marketing, and Finance, likely driven by competitive market demand and skill mobility",
                "Workforce shows a strong gender balance: 343 female vs. 322 male employees",
                "Over 60% of exits trace back to work pressure or better external opportunities, pointing to a need for compensation benchmarking, workload balancing, and stronger internal career mobility"
            ]
        },
        sales: {
            title: "Distributor Sales Analytics",
            domain: "Sales Intelligence",
            tools: ["Power BI", "DAX", "SQL Server", "Power Query"],
            images: ["sales-dashboard-1.png", "sales-dashboard-2.png"],
            captions: ["Territory Report", "Monthly Sales Report"],
            description: "An advanced Power BI solution built for Aspen Surgical to analyze distributor-level sales performance across the U.S. over a 12-month period, supporting strategic decision-making for stakeholders.",
            highlights: [
                "Tracks over $6M in extended cost across distributors, top items, and customer facilities",
                "Ranks top-performing distributors and highest revenue-generating items for demand forecasting",
                "Geographic map view surfaces state-level hotspots, with NY, FL, CA, and TX as leading revenue centers",
                "Monthly trend and invoice-day views expose seasonality, sales spikes, and billing-cycle patterns",
                "Dynamic slicers (vendor code, distributor, item code, invoice date) let stakeholders drill into custom views"
            ]
        },
        excel: {
            title: "Store Annual Sales Analysis",
            domain: "Retail Analytics",
            tools: ["Excel", "PivotTables", "Slicers"],
            images: ["excel-dashboard.png"],
            captions: ["Store Annual Sales Dashboard"],
            description: "An interactive Excel dashboard analyzing a full year of store sales, built after cleaning and standardizing inconsistent source data to ensure accuracy for analysis and visualization.",
            highlights: [
                "Replaced errors and formatting inconsistencies in the raw data before building any visuals",
                "PivotTables and slicers power monthly comparisons of order volume and sales value",
                "Segments purchasing behavior by gender and customer age group",
                "Surfaces top-performing states and best-selling product categories",
                "Tracks order status (delivered, cancelled, returned, refunded) alongside sales-channel performance"
            ]
        }
    };

    let currentProject = null;
    let currentImageIndex = 0;

    const lightbox = document.getElementById('project-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxThumbs = document.getElementById('lightbox-thumbs');
    const lightboxDetails = document.getElementById('lightbox-details');
    const lightboxCloseBtn = document.getElementById('lightbox-close');
    const lightboxPrevBtn = document.getElementById('lightbox-prev');
    const lightboxNextBtn = document.getElementById('lightbox-next');

    if (lightbox && lightboxImg) {
        function openLightbox(projectKey, imageIndex) {
            if (!projectsData[projectKey]) return;
            currentProject = projectKey;
            currentImageIndex = imageIndex || 0;
            renderLightbox();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        function renderLightbox() {
            const data = projectsData[currentProject];
            if (!data) return;

            lightboxImg.src = data.images[currentImageIndex];
            lightboxImg.alt = data.title + ' - ' + (data.captions[currentImageIndex] || '');
            lightboxCounter.textContent = (currentImageIndex + 1) + ' / ' + data.images.length;

            // Rebuild thumbnail strip
            lightboxThumbs.innerHTML = '';
            data.images.forEach((src, i) => {
                const thumb = document.createElement('img');
                thumb.src = src;
                thumb.alt = data.captions[i] || (data.title + ' image ' + (i + 1));
                thumb.className = 'lightbox-thumb-item' + (i === currentImageIndex ? ' active' : '');
                thumb.addEventListener('click', () => {
                    currentImageIndex = i;
                    renderLightbox();
                });
                lightboxThumbs.appendChild(thumb);
            });

            // Hide nav arrows and counter when the project has a single image
            const multiImage = data.images.length > 1;
            lightboxPrevBtn.style.display = multiImage ? 'flex' : 'none';
            lightboxNextBtn.style.display = multiImage ? 'flex' : 'none';
            lightboxCounter.style.display = multiImage ? 'block' : 'none';

            // Build details panel
            const toolsHtml = data.tools.map(t => '<span class="badge">' + t + '</span>').join('');
            const highlightsHtml = data.highlights.map(h => '<li>' + h + '</li>').join('');
            lightboxDetails.innerHTML =
                '<span class="lightbox-domain"><i class="fas fa-tag"></i> ' + data.domain + '</span>' +
                '<h3 class="lightbox-title">' + data.title + '</h3>' +
                '<p class="lightbox-desc">' + data.description + '</p>' +
                '<div class="lightbox-tools">' + toolsHtml + '</div>' +
                '<h4 class="lightbox-highlights-title">Key Highlights</h4>' +
                '<ul class="lightbox-highlights">' + highlightsHtml + '</ul>';
        }

        // Open lightbox from a thumbnail click
        document.querySelectorAll('.project-thumb').forEach(thumb => {
            thumb.addEventListener('click', () => {
                const projectKey = thumb.getAttribute('data-project');
                const imageIndex = parseInt(thumb.getAttribute('data-index'), 10) || 0;
                openLightbox(projectKey, imageIndex);
            });
        });

        // Open lightbox from the "View Full Project" button
        document.querySelectorAll('.btn-view-project').forEach(btn => {
            btn.addEventListener('click', () => {
                openLightbox(btn.getAttribute('data-project'), 0);
            });
        });

        lightboxCloseBtn.addEventListener('click', closeLightbox);

        // Close when clicking the dark backdrop (not the modal content itself)
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        lightboxPrevBtn.addEventListener('click', () => {
            const data = projectsData[currentProject];
            if (!data) return;
            currentImageIndex = (currentImageIndex - 1 + data.images.length) % data.images.length;
            renderLightbox();
        });

        lightboxNextBtn.addEventListener('click', () => {
            const data = projectsData[currentProject];
            if (!data) return;
            currentImageIndex = (currentImageIndex + 1) % data.images.length;
            renderLightbox();
        });

        // Keyboard controls: Escape to close, arrows to navigate
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') lightboxPrevBtn.click();
            if (e.key === 'ArrowRight') lightboxNextBtn.click();
        });
    }

    // ----------------------------------------------------
    // Canvas-Based Particles Background
    // ----------------------------------------------------
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const maxParticles = 60;

    // Resize canvas to window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
    
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // bounce off boundaries
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }

        draw() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            ctx.fillStyle = isDark ? 'rgba(0, 221, 255, 0.4)' : 'rgba(0, 180, 216, 0.3)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < maxParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function connectParticles() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const lineAlpha = isDark ? 0.05 : 0.03;
        
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.strokeStyle = isDark ? `rgba(0, 221, 255, ${lineAlpha})` : `rgba(0, 180, 216, ${lineAlpha})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        requestAnimationFrame(animate);
    }

    initParticles();
    animate();

});
