// Wait hanggang mag-load lahat
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".content-section");
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.createElement("div");
  const themeToggle = document.getElementById("themeToggle");

  // Create mobile menu container
  mobileMenu.classList.add("mobile-menu");
  mobileMenu.innerHTML = `
    <ul>
      <li><a href="#" data-section="cover">Home</a></li>
      <li><a href="#" data-section="about">About Me</a></li>
      <li><a href="#" data-section="activities">Reports & Activities</a></li>
      <li><a href="#" data-section="contact">Contact</a></li>
    </ul>
  `;
  document.body.appendChild(mobileMenu);

  // Switch section
  function showSection(id) {
    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");
  }

  // Nav click
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const sectionId = link.dataset.section;
      showSection(sectionId);
    });
  });

  // Mobile nav click
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const sectionId = link.dataset.section;
      showSection(sectionId);
      mobileMenu.classList.remove("active");
      menuBtn.classList.remove("open");
    });
  });

  // Hamburger toggle
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
    mobileMenu.classList.toggle("active");
  });

  // Theme toggle (dark/light mode)
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = 
      document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  });
});
