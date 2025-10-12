// // Header scroll effect
// const mainHeader = document.getElementById("mainHeader");
// window.addEventListener("scroll", () => {
//   if (window.scrollY > 50) {
//     mainHeader.classList.add("scrolled");
//   } else {
//     mainHeader.classList.remove("scrolled");
//   }
// });

// Mobile Menu Toggle
(function () {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMobileMenu = document.getElementById("closeMobileMenu");

  if (!mobileMenuBtn || !mobileMenuOverlay || !mobileMenu || !closeMobileMenu) {
    console.error("Mobile menu elements not found");
    return;
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

  // Close menu function
  function closeMenu() {
    mobileMenu.classList.add("translate-x-full");
    setTimeout(() => {
      mobileMenuOverlay.classList.add("hidden");
    }, 300);
  }

  // Close button
  closeMobileMenu.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeMenu();
  });

  // Close when clicking on overlay (outside menu)
  mobileMenuOverlay.addEventListener("click", (e) => {
    if (e.target === mobileMenuOverlay) {
      closeMenu();
    }
  });

  // Close menu when clicking on a link
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });
})();

// Parallax effect for particles
const particles = document.querySelectorAll(".particle");
document.addEventListener("mousemove", (e) => {
  particles.forEach((particle, index) => {
    const speed = (index + 1) * 0.02;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    particle.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// Service items click handler
const serviceItems = document.querySelectorAll(".service-item, a[href^='#']");
serviceItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    const serviceName = item.querySelector("span")?.textContent;
    if (serviceName) {
      console.log("Service selected:", serviceName);
    }
  });
});
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

// Before and After Image Slider
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".before-after-wrapper");

  if (!wrapper) return;

  const overlay = wrapper.querySelector(".before-after-overlay");
  const slider = wrapper.querySelector(".before-after-slider");

  let isDragging = false;

  const updatePosition = (x) => {
    const rect = wrapper.getBoundingClientRect();
    let position = ((x - rect.left) / rect.width) * 100;

    // Limit between 0% and 100%
    position = Math.max(0, Math.min(100, position));

    // Update slider position
    slider.style.left = position + "%";

    // Update overlay clip-path (يكشف الصورة من الشمال)
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

  // Mouse Events
  slider.addEventListener("mousedown", startDragging);
  document.addEventListener("mousemove", onMove);
  document.addEventListener("mouseup", stopDragging);

  // Touch Events (للموبايل)
  slider.addEventListener("touchstart", startDragging, { passive: false });
  document.addEventListener("touchmove", onMove, { passive: false });
  document.addEventListener("touchend", stopDragging);

  // منع السحب على الصور
  wrapper.querySelectorAll("img").forEach((img) => {
    img.addEventListener("dragstart", (e) => e.preventDefault());
  });
});

// Booking Form Validation & Toast Message
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
document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.querySelector("#booking form");
  const toast = document.getElementById("toastMessage");

  if (!bookingForm) return;

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const name = bookingForm.querySelector('input[type="text"]').value;
    const treatment = bookingForm.querySelector("select").value;
    const date = bookingForm.querySelector('input[type="date"]').value;

    // Basic validation
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

    // Success message
    showToast(
      `✅ Thank you ${name}! Your appointment has been submitted successfully.`,
      "success"
    );

    // Reset form
    bookingForm.reset();
  });

  function showToast(message, type) {
    if (!toast) return;

    // Set color based on message type
    toast.className =
      "fixed z-50 px-6 py-4 font-semibold tracking-wide text-center text-white transition-all duration-500 transform -translate-x-1/2 rounded-lg shadow-lg opacity-0 top-6 left-1/2";

    if (type === "error") {
      toast.classList.add("bg-red-600");
    } else {
      toast.classList.add("bg-[#daa520]");
    }

    // Show message
    toast.textContent = message;
    toast.classList.remove("hidden");
    setTimeout(() => {
      toast.classList.remove("opacity-0", "-translate-y-4");
      toast.classList.add("opacity-100", "translate-y-0");
    }, 50);

    // Hide after 3 seconds
    setTimeout(() => {
      toast.classList.add("opacity-0", "-translate-y-4");
      setTimeout(() => {
        toast.classList.add("hidden");
      }, 500);
    }, 3000);
  }
});

const testimonials = [
  {
    id: "testimonial-1",
    fullText:
      "I came across Dr. Simmons on my hunt for the perfect Doctor and I'm so glad I did. I was a little worried being he didn't have many pics on IG. I just followed my intuition and he delivered. Not only did he give me the body of my dreams, he listened to me and answered all my questions through DM. He heard everything I had to say and gave me exactly what I wanted.",
    name: "Cynthia K.",
    procedure: "on Breast Augmentation",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  },
  {
    id: "testimonial-2",
    fullText:
      "The results were beyond my expectations. The doctor is very professional and I'm satisfied with the entire experience from start to finish. He explained everything clearly and made sure I felt comfortable throughout the process. I would definitely recommend him to anyone looking for quality and care.",
    name: "Nora J.",
    procedure: "on Body Contouring",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  },
  {
    id: "testimonial-3",
    fullText:
      "Amazing doctor with incredible attention to detail. The results look completely natural and I couldn't be happier. The entire staff made me feel comfortable and cared for throughout the entire process from consultation to recovery. I highly recommend this practice to anyone considering any procedure.",
    name: "Lama M.",
    procedure: "on Facelift",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
  },
];

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const indicatorsContainer = document.getElementById("indicators");

// تشيك لو كل العناصر موجودة قبل ما نشغل أي حاجة
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

    if (!textElement) return; // تشيك لو العنصر مش موجود

    const truncatedText = truncateText(testimonial.fullText, charLimit);
    const hasMore = shouldShowSeeMore(testimonial.fullText);

    textElement.innerHTML = truncatedText;
    textElement.classList.remove("expanded");

    if (hasMore) {
      const btn = document.createElement("button");
      btn.className = "see-more-btn";
      btn.innerHTML = " <span>See More</span>";
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        expandText(index, textElement, testimonial.fullText);
      });
      textElement.appendChild(btn);
    }

    // Update client info
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
    btn.innerHTML = " <span>See Less</span>";
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

  // Initialize
  createIndicators();
  showTestimonial(0);
}
// Auto-slide every 8 seconds
// setInterval(() => {
//   currentIndex = (currentIndex + 1) % testimonials.length;
//   updateTestimonial(currentIndex);
// }, 8000);

// الخدمات الأساسية - هتكتبها مرة واحدة بس!
const services = [
  "Facelift",
  "Rhinoplasty",
  "Mommy Makeover",
  "Tummy Tuck",
  "Liposuction",
  "Injectables",
];

// دالة لإنشاء عنصر خدمة
function createServiceItem(serviceName) {
  const div = document.createElement("div");
  div.className = "service-item";
  div.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="7"></circle>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
        <span>${serviceName}</span>
      `;
  return div;
}

const servicesBar = document.getElementById("servicesBar");

if (servicesBar) {
  // أضف الكونتنت الأصلي مرة واحدة
  services.forEach((service) => {
    servicesBar.appendChild(createServiceItem(service));
  });

  // بعد ما الصفحة تحمل، احسب العرض وكلون
  window.addEventListener("load", function () {
    const contentWidth = servicesBar.scrollWidth;
    const viewportWidth = window.innerWidth;

    // احسب كام نسخة محتاجين علشان نملا الشاشة + شوية زيادة
    const copies = Math.ceil(viewportWidth / contentWidth) + 2;

    // كلون الكونتنت
    const originalContent = servicesBar.innerHTML;
    for (let i = 0; i < copies; i++) {
      servicesBar.innerHTML += originalContent;
    }

    // حدث الأنيميشن ديناميكياً
    const totalCopies = copies + 1;
    const animationDuration = 60; // seconds

    servicesBar.style.animation = `scrollServices ${animationDuration}s linear infinite`;

    // أضف الـ keyframe ديناميكياً
    const styleSheet = document.styleSheets[0];
    const keyframes = `
        @keyframes scrollServices {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / ${totalCopies})); }
        }
      `;

    // امسح الـ keyframe القديم وأضف الجديد
    for (let i = styleSheet.cssRules.length - 1; i >= 0; i--) {
      if (styleSheet.cssRules[i].name === "scrollServices") {
        styleSheet.deleteRule(i);
      }
    }
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  });
} // ← هنا قفلنا الـ if

// Animate elements on scroll
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

// شغله أول مرة لما الصفحة تفتح
handleScroll();

// شغله كل ما يحصل Scroll
window.addEventListener("scroll", handleScroll);

const bookingSection = document.querySelector(".booking-section");
if (bookingSection) {
  bookingSection.addEventListener("submit", function (e) {
    e.preventDefault();

    const formMessage = document.getElementById("formMessage");
    const nameInput = this.querySelector('input[type="text"]');
    const emailInput = this.querySelector('input[type="email"]');
    const treatmentSelect = this.querySelectorAll("select")[0];
    const dateInput = this.querySelector('input[type="date"]');

    if (!nameInput.value.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!emailInput.value.trim()) {
      alert("Please enter your email");
      return;
    }

    if (!treatmentSelect.value) {
      alert("Please select a treatment");
      return;
    }

    if (!dateInput.value) {
      alert("Please select a date");
      return;
    }

    formMessage.classList.remove("hidden");
    setTimeout(() => {
      formMessage.classList.add("hidden");
      this.reset();
    }, 3000);
  });
}
// Contact Form Submission
const contactForm = document.getElementById("contactForm");
const toast = document.getElementById("toastMessage");

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

function showToast(message, type) {
  if (!toast) return;

  toast.className =
    "fixed z-50 px-6 py-4 font-semibold tracking-wide text-center text-white transition-all duration-500 transform -translate-x-1/2 rounded-lg shadow-lg opacity-0 top-6 left-1/2";

  if (type === "error") {
    toast.classList.add("bg-red-600");
  } else {
    toast.classList.add("bg-gold");
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

// ============================================
// LANGUAGE SWITCHER
// ============================================

// Get current language from localStorage or default to English
let currentLang = localStorage.getItem("language") || "en";

// Initialize language on page load
document.addEventListener("DOMContentLoaded", () => {
  applyLanguage(currentLang);
});

// Function to change language
function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("language", lang);
  applyLanguage(lang);

  // Update button states
  updateLanguageButtons(lang);
}

// Function to apply language to all elements
function applyLanguage(lang) {
  // Set HTML attributes
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  // Update all elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      // Check if element is input placeholder
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.placeholder = translations[lang][key];
      } else {
        element.textContent = translations[lang][key];
      }
    }
  });

  // Update body class for RTL/LTR specific styles
  if (lang === "ar") {
    document.body.classList.add("rtl");
    document.body.classList.remove("ltr");
  } else {
    document.body.classList.add("ltr");
    document.body.classList.remove("rtl");
  }

  // Update select options if needed
  updateSelectOptions(lang);
}

// Function to update select dropdown options
function updateSelectOptions(lang) {
  const treatmentSelects = document.querySelectorAll("select");
  treatmentSelects.forEach((select) => {
    if (select.querySelector('option[value=""]')) {
      const firstOption = select.querySelector('option[value=""]');
      firstOption.textContent = translations[lang].selectTreatment;
    }
  });
}

// Function to update language button states
function updateLanguageButtons(lang) {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    if (btn.dataset.lang === lang) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// Expose changeLanguage function globally
window.changeLanguage = changeLanguage;
