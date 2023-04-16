// Get all the sections with the "reveal" class
const sections = document.querySelectorAll('.reveal');

// Add an event listener for when the window is scrolled
window.addEventListener('scroll', () => {
  sections.forEach(section => {
    // If the section is in the viewport, add the "visible" class
    if (isElementInViewport(section)) {
      section.classList.add('visible');
    }
  });
});

// Helper function to check if an element is in the viewport
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
