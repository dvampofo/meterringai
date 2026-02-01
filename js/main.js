/**
 * LiteLLM Gateway Landing Page - Main JavaScript
 * Handles smooth scrolling, button interactions, and pricing toggle
 */

document.addEventListener("DOMContentLoaded", function () {
  // ===================================
  // Price Data for Billing Toggle
  // ===================================
  const priceData = {
    starter: {
      monthly: "$9",
      yearly: "$81",
    },
    growth: {
      monthly: "$29",
      yearly: "$261",
    },
    enterprise: {
      monthly: "$99",
      yearly: "$891",
    },
  };

  // ===================================
  // Smooth Scrolling for CTA Buttons
  // ===================================
  const scrollButtons = document.querySelectorAll("[data-scroll]");

  scrollButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("data-scroll");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // ===================================
  // Pricing Billing Toggle
  // ===================================
  const toggleButtons = document.querySelectorAll(".toggle-btn");
  const pricingCards = document.querySelectorAll(".pricing-card");

  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Update active state
      toggleButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const billingMode = this.getAttribute("data-billing");

      // Update prices for all cards
      pricingCards.forEach((card) => {
        const plan = card.getAttribute("data-plan");
        const priceElement = card.querySelector(".price");
        const periodElement = card.querySelector(".period");

        if (priceData[plan]) {
          const newPrice = priceData[plan][billingMode];
          priceElement.textContent = newPrice;
          periodElement.textContent =
            billingMode === "monthly" ? "/month" : "/year";
        }
      });
    });
  });

  // ===================================
  // Contact Button Handlers
  // ===================================
  const linkedinBtn = document.getElementById("linkedinBtn");
  const emailBtn = document.getElementById("emailBtn");

  if (linkedinBtn) {
    linkedinBtn.addEventListener("click", function () {
      // Replace with your actual LinkedIn profile URL
      window.open("https://www.linkedin.com/in/dvampofo", "_blank");
    });
  }

  if (emailBtn) {
    emailBtn.addEventListener("click", function () {
      // Replace with your actual email
      window.location.href = "mailto:your-email@example.com";
    });
  }

  // ===================================
  // Pricing CTA Button Handlers
  // ===================================
  const pricingCtaButtons = document.querySelectorAll(".pricing-cta-btn");

  pricingCtaButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const card = this.closest(".pricing-card");
      const plan = card.getAttribute("data-plan");

      // Log for debugging - replace with your actual action
      console.log(`User clicked GET STARTED for ${plan} plan`);

      // You can replace this with:
      // - Navigation to checkout page
      // - Modal dialog
      // - Direct link to sign up
      // window.location.href = `/checkout/${plan}`;
    });
  });

  // ===================================
  // Navbar Active Link on Scroll
  // ===================================
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function setActiveNavLink() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveNavLink);

  // ===================================
  // Add Animation on Scroll
  // ===================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe feature cards for animation
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });

  // Observe pricing cards for animation
  const pricingCardsAnimation = document.querySelectorAll(".pricing-card");
  pricingCardsAnimation.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });

  // ===================================
  // Mobile Menu Auto-Close
  // ===================================
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const navbarToggler = document.querySelector(".navbar-toggler");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        navbarToggler.click();
      }
    });
  });

  // ===================================
  // Console Welcome Message
  // ===================================
  console.log(
    "%c👋 Welcome to LiteLLM Gateway!",
    "color: #4967bc; font-size: 20px; font-weight: bold;",
  );
  console.log(
    "%cInterested in the code? Check out the GitHub repo!",
    "color: #8a97d3; font-size: 14px;",
  );
});
