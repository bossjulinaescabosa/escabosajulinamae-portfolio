const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const navLinks = document.querySelectorAll('.nav-link');
const contentSections = document.querySelectorAll('.content-section');
const getStartedBtn = document.querySelector('.get-started-btn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const closeModal = document.querySelector('.close');
const activityImages = document.querySelectorAll('.activity-img');
const contactForm = document.querySelector('.contact-form');

themeToggle.addEventListener('click', () => {
body.classList.toggle('dark-mode');

if (body.classList.contains('dark-mode')) {
  themeToggle.textContent = '☀️';
  localStorage.setItem('theme', 'dark');
} else {
  themeToggle.textContent = '🌙';
  localStorage.setItem('theme', 'light');
}
});

if (localStorage.getItem('theme') === 'dark') {
 body.classList.add('dark-mode');
 themeToggle.textContent = '☀️';
}
  
function showSection(sectionId) {
 contentSections.forEach(section => {
 section.classList.remove('active');
});
            
document.getElementById(sectionId).classList.add('active');
 mobileMenu.classList.remove('active');
}

 navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
  e.preventDefault();
  const targetSection = link.getAttribute('data-section');
  showSection(targetSection);
 });
});

getStartedBtn.addEventListener('click', (e) => {
  e.preventDefault();
  showSection('about');
});

mobileMenuBtn.addEventListener('click', () => {
 mobileMenu.classList.toggle('active');
});

activityImages.forEach(img => {
  img.addEventListener('click', () => {
  modal.style.display = 'block';
  modalImg.src = img.src;
  modalCaption.textContent = img.alt;
  });
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
  modal.style.display = 'none';
  }
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (!name || !email || !message) {
  alert('Please fill in all required fields');
  return;
}
            
alert(`Thank you for your message, ${name}! I'll get back to you soon.`);

    contactForm.reset();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
  modal.style.display = 'none';
  mobileMenu.classList.remove('active');
  }
});
