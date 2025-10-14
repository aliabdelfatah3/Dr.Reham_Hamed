// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================
(function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMobileMenu = document.getElementById("closeMobileMenu");

  if (!mobileMenuBtn || !mobileMenuOverlay || !mobileMenu || !closeMobileMenu) {
    console.error("Mobile menu elements not found");
    return;
  }

  function closeMenu() {
    mobileMenu.classList.add("translate-x-full");
    setTimeout(() => {
      mobileMenuOverlay.classList.add("hidden");
    }, 300);
  }

  // Open menu
  mobileMenuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    mobileMenuOverlay.classList.remove("hidden");
    setTimeout(() => {
      mobileMenu.classList.remove("translate-x-full");
    }, 10);
  });

  // Close button
  closeMobileMenu.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeMenu();
  });

  // Close when clicking overlay
  mobileMenuOverlay.addEventListener("click", (e) => {
    if (e.target === mobileMenuOverlay) {
      closeMenu();
    }
  });

  // Close menu when clicking links
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });
})();

// ============================================
// PARALLAX EFFECT FOR PARTICLES
// ============================================
const particles = document.querySelectorAll(".particle");
document.addEventListener("mousemove", (e) => {
  particles.forEach((particle, index) => {
    const speed = (index + 1) * 0.02;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    particle.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// ============================================
// SERVICE TABS FUNCTIONALITY
// ============================================
const serviceTabs = document.querySelectorAll(".service-tab");
const serviceCards = document.querySelectorAll(".service-card");

serviceTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.target;

    // Remove active from all tabs
    serviceTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    // Remove active from all cards
    serviceCards.forEach((card) => card.classList.remove("active"));

    // Add active to target card
    const targetCard = document.querySelector(
      `.service-card[data-service="${target}"]`
    );
    if (targetCard) {
      targetCard.classList.add("active");
    }
  });
});

// ============================================
// BEFORE/AFTER IMAGE SLIDER
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".before-after-wrapper");
  if (!wrapper) return;

  const overlay = wrapper.querySelector(".before-after-overlay");
  const slider = wrapper.querySelector(".before-after-slider");
  let isDragging = false;

  const updatePosition = (x) => {
    const rect = wrapper.getBoundingClientRect();
    let position = ((x - rect.left) / rect.width) * 100;
    position = Math.max(0, Math.min(100, position));
    slider.style.left = position + "%";
    overlay.style.clipPath = `inset(0 ${100 - position}% 0 0)`;
  };

  const startDragging = (e) => {
    isDragging = true;
    wrapper.classList.add("dragging");
    e.preventDefault();
  };

  const stopDragging = () => {
    isDragging = false;
    wrapper.classList.remove("dragging");
  };

  const onMove = (e) => {
    if (!isDragging) return;
    const x = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
    updatePosition(x);
  };

  // Mouse events
  slider.addEventListener("mousedown", startDragging);
  document.addEventListener("mousemove", onMove);
  document.addEventListener("mouseup", stopDragging);

  // Touch events
  slider.addEventListener("touchstart", startDragging, { passive: false });
  document.addEventListener("touchmove", onMove, { passive: false });
  document.addEventListener("touchend", stopDragging);

  // Prevent image dragging
  wrapper.querySelectorAll("img").forEach((img) => {
    img.addEventListener("dragstart", (e) => e.preventDefault());
  });
});

// ============================================
// BOOKING FORM & TOAST MESSAGES
// ============================================
function showToast(message, type) {
  const toast = document.getElementById("toastMessage");
  if (!toast) return;

  toast.className =
    "fixed z-50 px-6 py-4 font-semibold tracking-wide text-center text-white transition-all duration-500 transform -translate-x-1/2 rounded-lg shadow-lg opacity-0 top-6 left-1/2";

  if (type === "error") {
    toast.classList.add("bg-red-600");
  } else {
    toast.classList.add("bg-[#daa520]");
  }

  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.remove("opacity-0", "-translate-y-4");
    toast.classList.add("opacity-100", "translate-y-0");
  }, 50);

  setTimeout(() => {
    toast.classList.add("opacity-0", "-translate-y-4");
    setTimeout(() => {
      toast.classList.add("hidden");
    }, 500);
  }, 3000);
}

// Simple form handler
const simpleForm = document.querySelector("form");
if (simpleForm) {
  simpleForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const msg = document.getElementById("formMessage");
    if (msg) {
      msg.classList.remove("hidden");
      this.reset();
      setTimeout(() => msg.classList.add("hidden"), 3000);
    }
  });
}

// Booking form validation
document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.querySelector("#booking form");
  if (!bookingForm) return;

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = bookingForm.querySelector('input[type="text"]').value;
    const treatment = bookingForm.querySelector("select").value;
    const date = bookingForm.querySelector('input[type="date"]').value;

    if (!name.trim()) {
      showToast("Please enter your name ❌", "error");
      return;
    }

    if (!treatment) {
      showToast("Please select a treatment ❌", "error");
      return;
    }

    if (!date) {
      showToast("Please select a date ❌", "error");
      return;
    }

    showToast(
      `✅ Thank you ${name}! Your appointment has been submitted successfully.`,
      "success"
    );
    bookingForm.reset();
  });
});

// Contact form handler
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('input[name="name"]').value;
    const email = contactForm.querySelector('input[name="email"]').value;
    const subject = contactForm.querySelector('select[name="subject"]').value;
    const message = contactForm.querySelector('textarea[name="message"]').value;

    if (!name.trim()) {
      showToast("Please enter your name ❌", "error");
      return;
    }

    if (!email.trim()) {
      showToast("Please enter your email ❌", "error");
      return;
    }

    if (!subject) {
      showToast("Please select a subject ❌", "error");
      return;
    }

    if (!message.trim()) {
      showToast("Please enter a message ❌", "error");
      return;
    }

    showToast(
      `✅ Thank you ${name}! Your message has been sent successfully.`,
      "success"
    );
    contactForm.reset();
  });
}

// ============================================
// TESTIMONIALS SECTION
// ============================================
let currentLang = localStorage.getItem("selectedLanguage") || "en";
let testimonials = testimonialsData[currentLang];

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const indicatorsContainer = document.getElementById("indicators");

if (prevBtn && nextBtn && indicatorsContainer) {
  let currentIndex = 0;
  const charLimit = 200;

  function truncateText(text, limit) {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  }

  function shouldShowSeeMore(text) {
    return text.length > charLimit;
  }

  function createIndicators() {
    testimonials.forEach((_, index) => {
      const indicator = document.createElement("div");
      indicator.className = `w-2 h-2 rounded-full ${
        index === 0 ? "bg-yellow-500" : "bg-gray-300"
      } cursor-pointer transition-colors`;
      indicator.addEventListener("click", () => goToTestimonial(index));
      indicatorsContainer.appendChild(indicator);
    });
  }

  function updateTestimonial(index) {
    const testimonial = testimonials[index];
    const textElement = document.getElementById(`text-${index + 1}`);
    if (!textElement) return;

    const truncatedText = truncateText(testimonial.fullText, charLimit);
    const hasMore = shouldShowSeeMore(testimonial.fullText);

    textElement.innerHTML = truncatedText;
    textElement.classList.remove("expanded");

    if (hasMore) {
      const btn = document.createElement("button");
      btn.className = "see-more-btn";
      btn.innerHTML = ` <span>${translations[currentLang].seeMore}</span>`;
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        expandText(index, textElement, testimonial.fullText);
      });
      textElement.appendChild(btn);
    }

    const nameElement = document.getElementById(`name-${index + 1}`);
    const procedureElement = document.getElementById(`procedure-${index + 1}`);
    const imgElement = document.getElementById(`img-${index + 1}`);

    if (nameElement) nameElement.textContent = testimonial.name;
    if (procedureElement) procedureElement.textContent = testimonial.procedure;
    if (imgElement) imgElement.src = testimonial.image;
  }

  function expandText(index, textElement, fullText) {
    textElement.innerHTML = fullText;
    textElement.classList.add("expanded");

    const btn = document.createElement("button");
    btn.className = "see-more-btn";
    btn.innerHTML = ` <span>${translations[currentLang].seeLess}</span>`;
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      updateTestimonial(index);
    });
    textElement.appendChild(btn);
  }

  function showTestimonial(index) {
    testimonials.forEach((t, i) => {
      const element = document.getElementById(t.id);
      if (element) {
        element.classList.add("hidden");
        element.classList.remove("active");
      }
      if (i < indicatorsContainer.children.length) {
        indicatorsContainer.children[i].classList.remove("bg-yellow-500");
        indicatorsContainer.children[i].classList.add("bg-gray-300");
      }
    });

    const element = document.getElementById(testimonials[index].id);
    if (element) {
      element.classList.remove("hidden");
      element.classList.add("active");
    }

    if (indicatorsContainer.children[index]) {
      indicatorsContainer.children[index].classList.add("bg-yellow-500");
      indicatorsContainer.children[index].classList.remove("bg-gray-300");
    }

    updateTestimonial(index);
  }

  function goToTestimonial(index) {
    currentIndex = index;
    showTestimonial(currentIndex);
  }

  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }

  function prevTestimonial() {
    currentIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
  }

  nextBtn.addEventListener("click", nextTestimonial);
  prevBtn.addEventListener("click", prevTestimonial);

  createIndicators();
  showTestimonial(0);
}

// ============================================
// SERVICES BAR
// ============================================
function getServicesList(lang) {
  return [
    translations[lang].serviceFacelift,
    translations[lang].serviceRhinoplasty,
    translations[lang].serviceMommy,
    translations[lang].serviceTummy,
    translations[lang].serviceLipo,
    translations[lang].serviceInject,
  ];
}

function createServiceItem(serviceName) {
  const div = document.createElement("div");
  div.className =
    "flex items-center gap-1.5 text-white uppercase text-xs md:text-sm tracking-wider transition-all duration-300 cursor-default px-4 md:px-6 py-2 rounded-full no-underline whitespace-nowrap";
  div.innerHTML = `
    <svg class="flex-shrink-0 w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="7"></circle>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
    <span>${serviceName}</span>
  `;
  return div;
}

const servicesBar = document.getElementById("servicesBar");

function updateServicesBar(lang) {
  if (!servicesBar) return;

  servicesBar.innerHTML = "";
  const services = getServicesList(lang);

  services.forEach((service) => {
    servicesBar.appendChild(createServiceItem(service));
  });

  setTimeout(() => {
    const contentWidth = servicesBar.scrollWidth;
    const viewportWidth = window.innerWidth;
    const copies = Math.ceil(viewportWidth / contentWidth) + 2;
    const originalContent = servicesBar.innerHTML;

    for (let i = 0; i < copies; i++) {
      servicesBar.innerHTML += originalContent;
    }

    const totalCopies = copies + 1;
    const animationDuration = 150;

    servicesBar.style.animation = `scrollServices ${animationDuration}s linear infinite`;

    const styleSheet = document.styleSheets[0];
    const keyframes = `
      @keyframes scrollServices {
        0% { transform: translateX(0); }
        100% { transform: translateX(calc(-100% / ${totalCopies})); }
      }
    `;

    for (let i = styleSheet.cssRules.length - 1; i >= 0; i--) {
      if (styleSheet.cssRules[i].name === "scrollServices") {
        styleSheet.deleteRule(i);
      }
    }
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  }, 100);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in-up").forEach((el) => {
  observer.observe(el);
});

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const scrollBtn = document.querySelector(".scroll-top-btn");

const handleScroll = () => {
  if (window.scrollY > 300) {
    scrollBtn.style.opacity = "1";
    scrollBtn.style.pointerEvents = "auto";
  } else {
    scrollBtn.style.opacity = "0";
    scrollBtn.style.pointerEvents = "none";
  }
};

handleScroll();
window.addEventListener("scroll", handleScroll);

// ============================================
// LANGUAGE SWITCHER - FIXED VERSION
// ============================================
function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("selectedLanguage", lang);
  applyLanguage(lang);

  // Update testimonials
  testimonials = testimonialsData[lang];
  if (indicatorsContainer) {
    indicatorsContainer.innerHTML = "";
    createIndicators();
  }
  showTestimonial(0);

  // Update services bar
  updateServicesBar(lang);

  // Update button states - FIXED
  updateLanguageButtons(lang);
}

function applyLanguage(lang) {
  // Set HTML attributes
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lang;

  // Fix input/textarea direction
  document.querySelectorAll("input, textarea").forEach((el) => {
    el.style.textAlign = lang === "ar" ? "right" : "left";
    el.style.direction = lang === "ar" ? "rtl" : "ltr";
  });

  // Update all translatable elements
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.placeholder = translations[lang][key];
      } else {
        element.textContent = translations[lang][key];
      }
    }
  });

  // Update body class
  if (lang === "ar") {
    document.body.classList.add("rtl");
    document.body.classList.remove("ltr");
  } else {
    document.body.classList.add("ltr");
    document.body.classList.remove("rtl");
  }

  // Update select options
  updateSelectOptions(lang);
}

function updateSelectOptions(lang) {
  const treatmentSelects = document.querySelectorAll("select");
  treatmentSelects.forEach((select) => {
    const selectOption = select.querySelector('option[value="treatment"]');
    if (selectOption) {
      selectOption.textContent = translations[lang].selectTreatment;
    }

    const options = {
      facelift: translations[lang].serviceFacelift,
      rhinoplasty: translations[lang].serviceRhinoplasty,
      "mommy-makeover": translations[lang].serviceMommy,
      "tummy-tuck": translations[lang].serviceTummy,
      liposuction: translations[lang].serviceLipo,
      injectables: translations[lang].serviceInject,
    };

    Object.keys(options).forEach((value) => {
      const option = select.querySelector(`option[value="${value}"]`);
      if (option) {
        option.textContent = options[value];
      }
    });

    const hourOption = document.querySelector('option[value="hour"]');
    const minuteOption = document.querySelector('option[value="minute"]');
    if (hourOption) hourOption.textContent = translations[lang].hour;
    if (minuteOption) minuteOption.textContent = translations[lang].minute;
  });
}

function updateLanguageButtons(lang) {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    const btnLang = btn.getAttribute("data-lang");

    // إزالة كلاس active من كل الأزرار
    btn.classList.remove("active");

    // إضافة كلاس active للزرار الحالي فقط
    if (btnLang === lang) {
      btn.classList.add("active");
    }
  });
}

// Initialize language on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("selectedLanguage") || "en";
  applyLanguage(savedLang);
  updateServicesBar(savedLang);
  updateLanguageButtons(savedLang);
});

// Expose changeLanguage globally
window.changeLanguage = changeLanguage;
