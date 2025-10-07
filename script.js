// Header scroll effect
const mainHeader = document.getElementById("mainHeader");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    mainHeader.classList.add("scrolled");
  } else {
    mainHeader.classList.remove("scrolled");
  }
});

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

// Show/hide scroll to top button
const scrollBtn = document.querySelector(".scroll-top-btn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.style.opacity = "1";
    scrollBtn.style.pointerEvents = "auto";
  } else {
    scrollBtn.style.opacity = "0";
    scrollBtn.style.pointerEvents = "none";
  }
});

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
