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

const secondarySurface = document.getElementById("secondary-surface");
const footer = document.querySelector(".site-footer");

const updateFloatingMotif = () => {
  if (!secondarySurface || !footer) return;

  const surfaceTop = secondarySurface.getBoundingClientRect().top;
  const footerTop = footer.getBoundingClientRect().top;
  const enteredLowerSurface = surfaceTop <= window.innerHeight * 0.25;
  const reachedFooter = footerTop <= window.innerHeight * 0.9;

  document.body.classList.toggle("show-floating-motif", enteredLowerSurface && !reachedFooter);
};

updateFloatingMotif();
window.addEventListener("scroll", updateFloatingMotif, { passive: true });
window.addEventListener("resize", updateFloatingMotif);
