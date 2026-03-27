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

// Sticky scroll showcase — driven by scroll position through the track
const showcaseTrack = document.querySelector(".showcase-track");
const showcasePanels = document.querySelectorAll(".showcase-panel");
const showcaseImgs = document.querySelectorAll(".showcase-img");

if (showcaseTrack && showcasePanels.length && showcaseImgs.length) {
  let activeIndex = 0;

  const setActive = (index) => {
    if (index === activeIndex) return;
    activeIndex = index;
    showcasePanels.forEach((p, i) => p.classList.toggle("active", i === index));
    showcaseImgs.forEach((img, i) => img.classList.toggle("active", i === index));
  };

  const onScroll = () => {
    const rect = showcaseTrack.getBoundingClientRect();
    const scrollable = showcaseTrack.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollable));
    const index = Math.min(
      Math.floor(progress * showcasePanels.length),
      showcasePanels.length - 1
    );
    setActive(index);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // set correct state on load
}
