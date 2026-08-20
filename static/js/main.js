document.addEventListener("DOMContentLoaded", () => {
    // 1. Sticky Glass Navbar on Scroll
    const navbar = document.getElementById("navbar");
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const menuIcon = document.getElementById("menuIcon");

    const toggleNavbarState = () => {
        if (window.scrollY > 40) {
            navbar.classList.add("glass", "py-3", "shadow-sm");
            navbar.classList.remove("py-5");
        } else {
            navbar.classList.remove("glass", "py-3", "shadow-sm");
            navbar.classList.add("py-5");
        }
    };

    window.addEventListener("scroll", toggleNavbarState);
    toggleNavbarState(); // Initial run in case page starts scrolled

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            const isOpen = mobileMenu.style.maxHeight && mobileMenu.style.maxHeight !== "0px";
            if (isOpen) {
                mobileMenu.style.maxHeight = "0px";
                menuIcon.setAttribute("data-lucide", "menu");
            } else {
                mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
                menuIcon.setAttribute("data-lucide", "x");
            }
            if (typeof lucide !== "undefined") {
                lucide.createIcons();
            }
        });
        
        document.querySelectorAll(".mobile-link").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.style.maxHeight = "0px";
                menuIcon.setAttribute("data-lucide", "menu");
                if (typeof lucide !== "undefined") {
                    lucide.createIcons();
                }
            });
        });
    }

    // 2. Before/After Draggable Slider
    const overlay = document.querySelector(".compare-overlay");
    const handle = document.querySelector(".compare-handle");
    const sliderInput = document.querySelector(".compare-slider");

    if (sliderInput && overlay && handle) {
        const updateSlider = (val) => {
            overlay.style.width = `${val}%`;
            handle.style.left = `${val}%`;
        };

        sliderInput.addEventListener("input", (e) => {
            updateSlider(e.target.value);
        });

        // Initialize at 50%
        updateSlider(50);
    }

    // 3. Interactive Solar Savings Calculator
    const billSlider = document.getElementById("billSlider");
    const billVal = document.getElementById("billVal");
    const homeType = document.getElementById("homeType");
    const location = document.getElementById("location");
    const roofSlider = document.getElementById("roofSlider");
    const roofVal = document.getElementById("roofVal");

    const estMonthlySavings = document.getElementById("estMonthlySavings");
    const estAnnualSavings = document.getElementById("estAnnualSavings");
    const estCo2 = document.getElementById("estCo2");
    const estPayback = document.getElementById("estPayback");

    const calculateSavings = () => {
        if (!billSlider || !roofSlider) return;

        const monthlyBill = parseFloat(billSlider.value);
        const roofSize = parseFloat(roofSlider.value);
        const homeMultiplier = homeType.value === "commercial" ? 1.15 : (homeType.value === "apartment" ? 0.85 : 1.0);
        const locMultiplier = location.value === "south" ? 1.1 : (location.value === "north" ? 0.9 : 1.0);

        // Savings calculations based on regional tariff
        const monthlySolarProduction = roofSize * 15 * locMultiplier; 
        const monthlyPowerNeeds = monthlyBill / 8.0; 
        
        const savingsRatio = Math.min(1.0, monthlySolarProduction / monthlyPowerNeeds);
        const monthlySavings = Math.round(monthlyBill * 0.85 * savingsRatio * homeMultiplier);
        const annualSavings = monthlySavings * 12;
        const co2Avoided = Math.round((annualSavings / 8.0) * 0.8); 
        
        const systemSizeKw = (roofSize * 0.12); // system kW size
        const systemCost = systemSizeKw * 80000; // system cost
        const paybackYears = annualSavings > 0 ? (systemCost / annualSavings).toFixed(1) : "0";

        // Render calculations
        estMonthlySavings.innerText = `₹${monthlySavings.toLocaleString('en-IN')}`;
        estAnnualSavings.innerText = `₹${annualSavings.toLocaleString('en-IN')}`;
        estCo2.innerText = `${co2Avoided.toLocaleString('en-IN')} kg`;
        estPayback.innerText = `${paybackYears} Years`;
    };

    if (billSlider && roofSlider) {
        billSlider.addEventListener("input", (e) => {
            billVal.innerText = `₹${parseInt(e.target.value).toLocaleString('en-IN')}`;
            calculateSavings();
        });
        roofSlider.addEventListener("input", (e) => {
            roofVal.innerText = `${e.target.value} sq. ft.`;
            calculateSavings();
        });
        homeType.addEventListener("change", calculateSavings);
        location.addEventListener("change", calculateSavings);

        // Initialize values
        calculateSavings();
    }

    // 4. Testimonials Carousel
    const slides = document.querySelectorAll(".carousel-slide");
    const prevBtn = document.getElementById("prevReview");
    const nextBtn = document.getElementById("nextReview");
    let currentSlide = 0;

    const showSlide = (index) => {
        if (slides.length === 0) return;
        slides.forEach(slide => slide.classList.add("hidden"));
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.remove("hidden");
    };

    if (prevBtn && nextBtn && slides.length > 0) {
        prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
        nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
        showSlide(0);

        // Auto transition reviews
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 8000);
    }

    // 5. Magnetic CTA Button hover effect
    const magnetics = document.querySelectorAll(".magnetic");
    magnetics.forEach(btn => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - (rect.width / 2);
            const y = e.clientY - rect.top - (rect.height / 2);
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });
        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "translate(0px, 0px)";
        });
    });

    // 6. Native Intersection Observer for Scroll Reveals (100% Reliable & Modern)
    const revealElements = document.querySelectorAll(".reveal");
    
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    
                    // Trigger numeric counter animations if the intersecting element contains counters
                    const counters = entry.target.querySelectorAll(".stat-counter");
                    counters.forEach(counter => {
                        if (counter.classList.contains("animated")) return;
                        counter.classList.add("animated");
                        
                        const target = parseInt(counter.getAttribute("data-target"));
                        let current = 0;
                        const duration = 2000; // 2s
                        const stepTime = Math.abs(Math.floor(duration / (target / 50)));
                        
                        const timer = setInterval(() => {
                            current += Math.ceil(target / 50);
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            counter.innerText = current.toLocaleString('en-IN');
                        }, Math.max(stepTime, 16));
                    });
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers: show everything immediately
        revealElements.forEach(el => el.classList.add("active"));
    }

    // Initialize Lucide Icons
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
});
