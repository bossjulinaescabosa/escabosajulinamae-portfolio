document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggleBtn = document.getElementById("mode-toggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");

  // --- DARK MODE TOGGLE ---
  // Load user preference
  if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
  }

  toggleBtn?.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("dark-mode", "enabled");
      toggleBtn.textContent = "☀️ Light Mode";
    } else {
      localStorage.setItem("dark-mode", "disabled");
      toggleBtn.textContent = "🌙 Dark Mode";
    }
  });

  // Set button text correctly on page load
  if (body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "☀️ Light Mode";
  } else {
    toggleBtn.textContent = "🌙 Dark Mode";
  }

  // --- NAVIGATION + SECTIONS ---
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      // Get the section ID from data-section
      const targetId = link.getAttribute("data-section");
      const targetSection = document.getElementById(targetId);

      if (!targetSection) return;

      // Hide all sections
      sections.forEach(sec => sec.classList.remove("active"));

      // Show selected section
      targetSection.classList.add("active");

      // Update active link
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      // Smooth scroll to section
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
});
