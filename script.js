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

// Sticky scroll showcase
const showcasePanels = document.querySelectorAll(".showcase-panel");
const showcaseImgs = document.querySelectorAll(".showcase-img");

if (showcasePanels.length && showcaseImgs.length) {
  const setActiveImage = (index) => {
    showcaseImgs.forEach((img, i) => img.classList.toggle("active", i === index));
  };

  // Trigger when the panel crosses the vertical midpoint of the viewport
  const showcaseObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveImage(parseInt(entry.target.dataset.index, 10));
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );

  showcasePanels.forEach((panel) => showcaseObserver.observe(panel));
}
