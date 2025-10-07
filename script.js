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
