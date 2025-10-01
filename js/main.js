// THEME TOGGLE
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// HAMBURGER MENU
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  menuBtn.classList.toggle("open");
});

// CLOSE MOBILE MENU WHEN CLICK NAV LINK
document.querySelectorAll(".mobile-menu .nav-link").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    menuBtn.classList.remove("open");
  });
});

// SECTION NAVIGATION
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".content-section");

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = link.getAttribute("data-section");

    sections.forEach(section => section.classList.remove("active"));
    document.getElementById(target).classList.add("active");

    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// FOLDER TOGGLE (Reports / Activities)
const choiceBtns = document.querySelectorAll(".choice-btn");
const folderContents = document.querySelectorAll(".folder-content");
const backToChoicesBtns = document.querySelectorAll(".back-to-choices");

choiceBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById("activitiesChoices").style.display = "none";
    folderContents.forEach(f => f.style.display = "none");
    document.getElementById(btn.dataset.open).style.display = "block";
  });
});

backToChoicesBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById("activitiesChoices").style.display = "block";
    folderContents.forEach(f => f.style.display = "none");
  });
});

// SUBFOLDER TOGGLE
const subfolderBtns = document.querySelectorAll(".subfolder-btn");
const subfolderContents = document.querySelectorAll(".subfolder-content");
const backToFolderBtns = document.querySelectorAll(".back-to-folder");

subfolderBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    subfolderContents.forEach(s => s.style.display = "none");
    document.getElementById(btn.dataset.open).style.display = "block";
  });
});

backToFolderBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    subfolderContents.forEach(s => s.style.display = "none");
    document.getElementById(btn.dataset.target).style.display = "block";
  });
});

// IMAGE MODAL
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const modalCaption = document.getElementById("modalCaption");
const modalClose = document.querySelector(".modal .close");

document.querySelectorAll("img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
    modalCaption.innerHTML = img.alt;
  });
});

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
