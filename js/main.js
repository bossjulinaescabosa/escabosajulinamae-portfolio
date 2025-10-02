// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Navigation: Handle section switching
  const navLinks = document.querySelectorAll('.nav-link');
  const contentSections = document.querySelectorAll('.content-section');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu .nav-link');

  function showSection(sectionId) {
    // Hide all sections
    contentSections.forEach(section => {
      section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.add('active');
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.getElementById('menuBtn');
    if (mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      hamburger.classList.remove('active');
    }
  }

  // Add listeners to all nav links (desktop and mobile)
  [...navLinks, ...mobileMenuLinks].forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('data-section');
      showSection(sectionId);
    });
  });

  // Initial active section
  showSection('cover');

  // Mobile Menu Toggle (Hamburger)
  const hamburger = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  // Close mobile menu on outside click
  document.addEventListener('click', function(e) {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      mobileMenu.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });

  // Theme Toggle (Dark/Light Mode) with localStorage persistence
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️'; // Sun for dark mode
  } else {
    themeToggle.textContent = '🌙'; // Moon for light mode
  }

  themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    this.textContent = isDark ? '☀️' : '🌙';
    
    // Save to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Folder Interactions (Reports & Activities)
  const choiceBtns = document.querySelectorAll('.choice-btn');
  const backToChoicesBtns = document.querySelectorAll('.back-to-choices');
  const subfolderBtns = document.querySelectorAll('.subfolder-btn');
  const backToFolderBtns = document.querySelectorAll('.back-to-folder');
  const activitiesChoices = document.getElementById('activitiesChoices');
  const reportsFolder = document.getElementById('reportsFolder');
  const activitiesFolder = document.getElementById('activitiesFolder');

  // Choice buttons (Reports/Activities)
  choiceBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const target = this.getAttribute('data-open');
      activitiesChoices.style.display = 'none';
      // Clear any instructional text
      const instructionalP = document.querySelector('#activities p.slide-up');
      if (instructionalP) {
        instructionalP.textContent = '';
      }

      if (target === 'reportsFolder') {
        reportsFolder.style.display = 'block';
        reportsFolder.classList.add('active');
        reportsFolder.scrollIntoView({ behavior: 'smooth' });
      } else if (target === 'activitiesFolder') {
        activitiesFolder.style.display = 'block';
        activitiesFolder.classList.add('active');
        activitiesFolder.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Back to choices buttons
  backToChoicesBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      reportsFolder.style.display = 'none';
      reportsFolder.classList.remove('active');
      activitiesFolder.style.display = 'none';
      activitiesFolder.classList.remove('active');
      activitiesChoices.style.display = 'block';
      // Restore instructional text
      const instructionalP = document.querySelector('#activities p.slide-up');
      if (instructionalP) {
        instructionalP.textContent = 'Click below to explore my school reports and activities:';
      }
      document.getElementById('activities').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Subfolder buttons (inside folders)
  subfolderBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const target = this.getAttribute('data-open');
      const currentFolder = this.closest('.folder-content');
      const subfolderContent = document.getElementById(target);
      
      // Hide all subfolder contents in current folder
      currentFolder.querySelectorAll('.subfolder-content').forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
      });
      
      // Show target subfolder
      subfolderContent.style.display = 'block';
      subfolderContent.classList.add('active');
      subfolderContent.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Back to folder buttons
  backToFolderBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetFolderId = this.getAttribute('data-target');
      const currentSubfolder = this.closest('.subfolder-content');
      const targetFolder = document.getElementById(targetFolderId);
      
      currentSubfolder.style.display = 'none';
      currentSubfolder.classList.remove('active');
      
      targetFolder.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Image Modal Functionality
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const closeBtn = document.querySelector('.close');

  // Event delegation for all images (current and future)
  document.addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG' && e.target.alt) {
      modal.style.display = 'block';
      modalImg.src = e.target.src;
      modalCaption.textContent = e.target.alt;
    }
  });

  // Close modal
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  // Close modal on outside click
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Contact Form Submission
  const contactForm = document.querySelector('.contact-form');
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
      alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon at ${email}.`);
      // Reset form
      contactForm.reset();
      // Optionally, scroll back to top or show success message
      showSection('cover');
    } else {
      alert('Please fill in all fields.');
    }
  });

  // Smooth scrolling for any anchor links (if added later)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
