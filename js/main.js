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
    if (mobileMenu && hamburger && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      hamburger.classList.remove('active');
    }
  }

  // Add listeners to all nav links (desktop and mobile)
  [...navLinks, ...mobileMenuLinks].forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('data-section');
      if (sectionId) {
        showSection(sectionId);
      }
    });
  });

  // Initial active section (Home/Cover)
  showSection('cover');

  // Get Started button on cover (scrolls to about)
  const getStartedBtn = document.querySelector('.get-started-btn');
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showSection('about');
    });
  }

  // Mobile Menu Toggle (Hamburger)
  const hamburger = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
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

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  }

  // Theme Toggle (Dark/Light Mode) with localStorage persistence
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  if (themeToggle) {
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
  }

  // Folder Interactions (Reports & Activities)
  const choiceBtns = document.querySelectorAll('.choice-btn');
  const backToChoicesBtns = document.querySelectorAll('.back-to-choices');
  const subfolderBtns = document.querySelectorAll('.subfolder-btn');
  const backToFolderBtns = document.querySelectorAll('.back-to-folder');
  const activitiesChoices = document.getElementById('activitiesChoices');
  const reportsFolder = document.getElementById('reportsFolder');
  const activitiesFolder = document.getElementById('activitiesFolder');
  const activitiesSection = document.getElementById('activities');

  // Choice buttons (Reports/Activities)
  choiceBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const target = this.getAttribute('data-open');
      if (activitiesChoices) {
        activitiesChoices.style.display = 'none';
      }
      // Clear instructional text
      const instructionalP = activitiesSection ? activitiesSection.querySelector('p.slide-up') : null;
      if (instructionalP) {
        instructionalP.textContent = '';
      }

      if (target === 'reportsFolder' && reportsFolder) {
        reportsFolder.style.display = 'block';
        reportsFolder.classList.add('active');
        reportsFolder.scrollIntoView({ behavior: 'smooth' });
      } else if (target === 'activitiesFolder' && activitiesFolder) {
        activitiesFolder.style.display = 'block';
        activitiesFolder.classList.add('active');
        activitiesFolder.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Back to choices buttons
  backToChoicesBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      if (reportsFolder) {
        reportsFolder.style.display = 'none';
        reportsFolder.classList.remove('active');
      }
      if (activitiesFolder) {
        activitiesFolder.style.display = 'none';
        activitiesFolder.classList.remove('active');
      }
      if (activitiesChoices) {
        activitiesChoices.style.display = 'block';
      }
      // Restore instructional text
      const instructionalP = activitiesSection ? activitiesSection.querySelector('p.slide-up') : null;
      if (instructionalP) {
        instructionalP.textContent = 'Click below to explore my school reports and activities:';
      }
      if (activitiesSection) {
        activitiesSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Subfolder buttons (inside folders)
  subfolderBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const target = this.getAttribute('data-open');
      const currentFolder = this.closest('.folder-content');
      const subfolderContent = document.getElementById(target);
      
      if (currentFolder) {
        // Hide all subfolder contents in current folder
        currentFolder.querySelectorAll('.subfolder-content').forEach(content => {
          content.style.display = 'none';
          content.classList.remove('active');
        });
      }
      
      // Show target subfolder
      if (subfolderContent) {
        subfolderContent.style.display = 'block';
        subfolderContent.classList.add('active');
        subfolderContent.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Back to folder buttons
  backToFolderBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetFolderId = this.getAttribute('data-target');
      const currentSubfolder = this.closest('.subfolder-content');
      const targetFolder = document.getElementById(targetFolderId);
      
      if (currentSubfolder) {
        currentSubfolder.style.display = 'none';
        currentSubfolder.classList.remove('active');
      }
      
      if (targetFolder) {
        targetFolder.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Image Modal Functionality
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const closeBtn = document.querySelector('.close');

  if (modal && modalImg && modalCaption) {
    // Event delegation for all images (click to open modal)
    document.addEventListener('click', function(e) {
      if (e.target.tagName === 'IMG' && e.target.src && e.target.alt) {
        modal.style.display = 'block';
        modalImg.src = e.target.src;
        modalCaption.textContent = e.target.alt;
        // Prevent bubbling if needed
        e.stopPropagation();
      }
    });

    // Close modal with X button
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
      });
    }

    // Close modal on outside click
    window.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
      }
    });
  }

  // Contact Form Submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (name && email && message) {
        alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon at ${email}.`);
        // Reset form
        contactForm.reset();
        // Scroll to home on success
        showSection('cover');
      } else {
        alert('Please fill in all fields.');
      }
    });
  }

  // Smooth scrolling for any anchor links (backup for future additions)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
