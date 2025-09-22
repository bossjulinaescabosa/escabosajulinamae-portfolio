document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggleBtn = document.getElementById("mode-toggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");

  // --- Dark Mode ---
  if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️ Light Mode";
  }

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("dark-mode", "enabled");
      toggleBtn.textContent = "☀️ Light Mode";
    } else {
      localStorage.setItem("dark-mode", "disabled");
      toggleBtn.textContent = "🌙 Dark Mode";
    }
  });

  // --- Navigation ---
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("data-section");
      const targetSection = document.getElementById(targetId);

      if (!targetSection) return;

      // Hide all sections
      sections.forEach(sec => sec.classList.remove("active"));
      targetSection.classList.add("active");

      // Update nav active state
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      // Smooth scroll
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
});
