document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const body = document.body;
  const sections = document.querySelectorAll('.content-section');
  const navLinks = document.querySelectorAll('.nav-link');
  const getStartedBtn = document.querySelector('.get-started-btn');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const themeToggle = document.getElementById('themeToggle');
  const termBtns = document.querySelectorAll('.term-btn');
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const closeModal = document.querySelector('.close');

  // Function to show section
  function showSection(id) {
    // Hide all sections
    sections.forEach(sec => {
      sec.classList.remove('active');
    });

    // Show target section
    const target = document.getElementById(id);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Reset activities if not on activities section
    if (id !== 'activities') {
      resetAllActivities();
    }

    closeMobileMenu();
  }

  // Function to reset activities navigation
  function resetAllActivities() {
    // Hide all activity content
    document.querySelectorAll('.folder-content, .subfolder-content, .topic-content').forEach(el => {
      el.classList.remove('active');
    });

    // Hide all choices
    document.querySelectorAll('.activities-choices').forEach(choice => {
      choice.classList.remove('active');
    });

    // Show midterm choices by default
    const midtermChoices = document.getElementById('midtermActivitiesChoices');
    if (midtermChoices) {
      midtermChoices.classList.add('active');
    }

    // Reset term buttons
    document.querySelectorAll('.term-btn').forEach(btn => {
      if (btn.dataset.term === 'midterm') {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Hide all term content except midterm
    document.querySelectorAll('.term-content').forEach(tc => {
      tc.classList.remove('active');
    });
    
    const midterm = document.getElementById('midtermContent');
    if (midterm) {
      midterm.classList.add('active');
    }
  }

  // SIMPLIFIED ONE-CLICK NAVIGATION
  function handleActivityNavigation(target, dataAttribute) {
    const targetId = target.dataset[dataAttribute];
    if (!targetId) return;

    // Based on button type, show appropriate content
    if (target.classList.contains('choice-btn')) {
      // Show folder (Reports or Activities)
      const termContent = target.closest('.term-content');
      if (termContent) {
        termContent.querySelector('.activities-choices').classList.remove('active');
      }
      document.getElementById(targetId).classList.add('active');
    }
    else if (target.classList.contains('subfolder-btn')) {
      // Show subfolder (Report 1, Activity 1, etc.)
      // AUTOMATIC: Show topics grid immediately
      const currentFolder = target.closest('.folder-content');
      if (currentFolder) {
        currentFolder.classList.remove('active');
      }
      const subfolder = document.getElementById(targetId);
      if (subfolder) {
        subfolder.classList.add('active');
        
        // AUTOMATIC DISPLAY OF TOPICS
        const topicsGrid = subfolder.querySelector('.topics-grid');
        if (topicsGrid) {
          topicsGrid.style.display = 'grid';
        }
      }
    }
    else if (target.classList.contains('topic-btn')) {
      // Show topic content with IMAGES
      const currentSubfolder = target.closest('.subfolder-content');
      if (currentSubfolder) {
        currentSubfolder.classList.remove('active');
      }
      const topic = document.getElementById(targetId);
      if (topic) {
        topic.classList.add('active');
        
        // AUTOMATIC DISPLAY OF IMAGES - NO MORE CLICKS NEEDED!
        const imagesGrid = topic.querySelector('.images-grid');
        if (imagesGrid) {
          imagesGrid.style.display = 'grid';
        }
      }
    }
    else if (target.classList.contains('back-btn')) {
      // Go back
      const current = target.closest('.folder-content, .subfolder-content, .topic-content');
      const backTo = document.getElementById(targetId);
      
      if (current && backTo) {
        current.classList.remove('active');
        backTo.classList.add('active');
      }
    }
  }

  // Initialize
  showSection('cover');

  // Navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const section = link.dataset.section;
      if (section) showSection(section);
    });
  });

  // Get Started button
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', e => {
      e.preventDefault();
      showSection('about');
    });
  }

  // Mobile menu
  function toggleMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.toggle('active');
    }
  }

  function closeMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove('active');
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileMenu);
  }

  document.addEventListener('click', e => {
    if (
      mobileMenu?.classList.contains('active') &&
      !mobileMenu.contains(e.target) &&
      hamburger && !hamburger.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  // Theme toggle
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);
  if (themeToggle) {
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', newTheme);
      themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
      localStorage.setItem('theme', newTheme);
    });
  }

  // Term buttons
  termBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      termBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.term-content').forEach(tc => {
        tc.classList.remove('active');
      });

      const termId = `${btn.dataset.term}Content`;
      const termContent = document.getElementById(termId);
      if (termContent) {
        termContent.classList.add('active');
        
        // Reset to choices
        termContent.querySelectorAll('.folder-content, .subfolder-content, .topic-content').forEach(el => {
          el.classList.remove('active');
        });
        
        const choices = termContent.querySelector('.activities-choices');
        if (choices) {
          choices.classList.add('active');
        }
      }
    });
  });

  // ONE-CLICK EVENT HANDLER FOR ALL ACTIVITY BUTTONS
  document.addEventListener('click', (e) => {
    const target = e.target;
    
    // Prevent default for activity buttons
    if (target.classList.contains('choice-btn') || 
        target.classList.contains('subfolder-btn') || 
        target.classList.contains('topic-btn') || 
        target.classList.contains('back-btn')) {
      e.preventDefault();
      
      // Handle navigation based on button type
      if (target.classList.contains('choice-btn')) {
        handleActivityNavigation(target, 'open');
      }
      else if (target.classList.contains('subfolder-btn')) {
        handleActivityNavigation(target, 'open');
      }
      else if (target.classList.contains('topic-btn')) {
        handleActivityNavigation(target, 'open');
      }
      else if (target.classList.contains('back-btn')) {
        handleActivityNavigation(target, 'backTo');
      }
    }
  });

  // Image modal
  document.addEventListener('click', e => {
    if (e.target.hasAttribute('data-modal') && modal && modalImg) {
      modal.style.display = 'block';
      modalImg.src = e.target.src;
      modalCaption.textContent = e.target.alt || '';
      document.body.style.overflow = 'hidden';
    }
  });

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }

  if (modal) {
    window.addEventListener('click', e => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Handle broken images
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function () {
      if (!this.dataset.failed) {
        this.dataset.failed = 'true';
        this.src = 'https://via.placeholder.com/400x300/4A90E2/FFFFFF?text=Image+Not+Available';
      }
    });
  });

  // Set current year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! I will get back to you soon.');
      this.reset();
    });
  }
});
