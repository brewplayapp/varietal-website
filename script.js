const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -40px 0px",
};

const setInView = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(setInView, observerOptions);

const loadAnimated = document.querySelectorAll(".animate-on-load");
loadAnimated.forEach((item) => observer.observe(item));

const staggerGroups = document.querySelectorAll(".stagger-group");
staggerGroups.forEach((group) => {
  const children = group.children;
  Array.from(children).forEach((child, index) => {
    child.classList.add("stagger-item");
    child.style.transitionDelay = `${Math.min(index * 90, 360)}ms`;
    observer.observe(child);
  });
});

const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const siteHeader = document.querySelector(".site-header");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY && currentScrollY > 80) {
    siteHeader.classList.add("header-hidden");
  } else {
    siteHeader.classList.remove("header-hidden");
  }
  lastScrollY = currentScrollY;
}, { passive: true });


