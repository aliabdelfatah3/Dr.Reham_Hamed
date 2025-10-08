// // Header scroll effect
// const mainHeader = document.getElementById("mainHeader");
// window.addEventListener("scroll", () => {
//   if (window.scrollY > 50) {
//     mainHeader.classList.add("scrolled");
//   } else {
//     mainHeader.classList.remove("scrolled");
//   }
// });

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

// Services Tab Switching with Animation
const serviceTabs = document.querySelectorAll(".service-tab");
const serviceCards = document.querySelectorAll(".service-card");

let currentIndex = 0;

serviceTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    const targetService = tab.dataset.target;
    const targetCard = document.querySelector(
      `.service-card[data-service="${targetService}"]`
    );

    if (!targetCard || tab.classList.contains("active")) return;

    // إزالة active من الزرار الحالي
    serviceTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    // تحديد اتجاه الحركة
    const isMovingDown = index > currentIndex;

    // إخفاء الكارد الحالي
    const currentCard = document.querySelector(".service-card.active");
    currentCard.classList.remove("active");

    if (isMovingDown) {
      // الحركة لأسفل (الكارد الجديد يطلع من تحت)
      currentCard.style.transform = "translateY(-100%)";
      currentCard.style.opacity = "0";

      targetCard.style.transform = "translateY(100%)";
      targetCard.style.opacity = "0";

      setTimeout(() => {
        targetCard.classList.add("active");
        targetCard.style.transform = "translateY(0)";
        targetCard.style.opacity = "1";
      }, 50);
    } else {
      // الحركة لأعلى (الكارد الجديد ينزل من فوق)
      currentCard.style.transform = "translateY(100%)";
      currentCard.style.opacity = "0";

      targetCard.style.transform = "translateY(-100%)";
      targetCard.style.opacity = "0";

      setTimeout(() => {
        targetCard.classList.add("active");
        targetCard.style.transform = "translateY(0)";
        targetCard.style.opacity = "1";
      }, 50);
    }

    // إعادة تعيين الكاردات الأخرى
    setTimeout(() => {
      serviceCards.forEach((card) => {
        if (!card.classList.contains("active")) {
          card.style.transform = "translateY(100%)";
          card.style.opacity = "0";
        }
      });
    }, 700);

    currentIndex = index;
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
    text: "I came across Dr. Simmons on my hunt for the perfect Doctor and I'm so glad I did. I was a little worried being he didn't have many pics on IG. I just followed my intuition and he delivered. Not only did he give me the body of my dreams, he listened to me answered all my questions through dm. He heard everything I had to say and gave me exactly what I wanted.",
    name: "Cynthia K.",
    procedure: "on Breast Augmentation",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  },
  {
    text: "Dr. Hamed is simply the best! From the initial consultation to the final result, everything was perfect. She took the time to understand exactly what I wanted and delivered results beyond my expectations. Her attention to detail and genuine care for her patients is remarkable.",
    name: "Sarah M.",
    procedure: "on Rhinoplasty",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
  },
  {
    text: "I cannot recommend Dr. Hamed enough! The entire experience was wonderful. The staff was professional and caring, and the results speak for themselves. I finally feel confident in my own skin. Thank you for changing my life!",
    name: "Jennifer L.",
    procedure: "on Liposuction",
    image:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop",
  },
];

const content = document.getElementById("testimonialContent");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function updateTestimonial(index) {
  const testimonial = testimonials[index];

  content.style.opacity = "0";
  content.style.transform = "translateY(20px)";

  setTimeout(() => {
    content.innerHTML = `
                    <p class="text-2xl font-light italic leading-relaxed text-center text-[#666] mb-12">
                        ${testimonial.text}
                    </p>
                    <div class="flex flex-col items-center">
                        <div class="w-24 h-24 mb-6 overflow-hidden rounded-full">
                            <img src="${testimonial.image}" alt="${testimonial.name}" class="object-cover w-full h-full">
                        </div>
                        <h4 class="text-2xl font-semibold text-[#333] mb-2">${testimonial.name}</h4>
                        <p class="text-base text-[#999]">${testimonial.procedure}</p>
                    </div>
                `;

    setTimeout(() => {
      content.style.opacity = "1";
      content.style.transform = "translateY(0)";
    }, 50);
  }, 300);
}

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  updateTestimonial(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % testimonials.length;
  updateTestimonial(currentIndex);
});

// Auto-slide every 8 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % testimonials.length;
  updateTestimonial(currentIndex);
}, 8000);
