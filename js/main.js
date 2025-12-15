document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const sections = document.querySelectorAll('.content-section');
  const navLinks = document.querySelectorAll('.nav-link');
  const getStartedBtn = document.querySelector('.get-started-btn');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const themeToggle = document.getElementById('themeToggle');
  const termBtns = document.querySelectorAll('.term-btn');

  // Function to show section
  function showSection(id) {
    sections.forEach(sec => {
      sec.classList.remove('active');
      sec.style.display = 'none';
    });

    const target = document.getElementById(id);
    if (target) {
      target.style.display = 'block';
      requestAnimationFrame(() => {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (id !== 'activities') {
      resetAllActivities();
    }

    closeMobileMenu();
  }

  function resetAllActivities() {
    // Itago lahat ng content
    document.querySelectorAll('.folder-content, .subfolder-content, .topic-content').forEach(el => {
      el.style.display = 'none';
      el.classList.remove('active');
    });

    document.querySelectorAll('.activities-choices').forEach(choice => {
      choice.style.display = 'block';
      choice.classList.add('active');
    });

    document.querySelectorAll('.term-btn').forEach(btn => {
      if (btn.dataset.term === 'midterm') {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    document.querySelectorAll('.term-content').forEach(tc => {
      tc.style.display = 'none';
      tc.classList.remove('active');
    });
    
    const midterm = document.getElementById('midtermContent');
    if (midterm) {
      midterm.style.display = 'block';
      midterm.classList.add('active');
    }
  }

  // Function to show content with automatic image display
  function showContent(targetId, hideParent = false, parentElement = null) {
    if (hideParent && parentElement) {
      parentElement.style.display = 'none';
      parentElement.classList.remove('active');
    }
    
    const target = document.getElementById(targetId);
    if (target) {
      target.style.display = 'block';
      target.classList.add('active');
      
      // Check if this is a topic content that should show images
      if (target.classList.contains('topic-content') || 
          target.classList.contains('subfolder-content')) {
        // Ensure images are visible
        const imagesGrid = target.querySelector('.images-grid');
        if (imagesGrid) {
          imagesGrid.style.display = 'grid';
        }
      }
    }
  }

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

  // Mobile menu functions
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

  // Hamburger menu
  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  if (mobileClose) {
    mobileClose.addEventListener('click', closeMobileMenu);
  }

  // Close mobile menu when clicking outside
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

  // Term buttons (Midterm/Finals)
  termBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      termBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.term-content').forEach(tc => {
        tc.style.display = 'none';
        tc.classList.remove('active');
      });

      const termId = `${btn.dataset.term}Content`;
      const termContent = document.getElementById(termId);
      if (termContent) {
        termContent.style.display = 'block';
        termContent.classList.add('active');
        
        // Show the choices section for the term
        const choices = termContent.querySelector('.activities-choices');
        if (choices) {
          choices.style.display = 'block';
          choices.classList.add('active');
        }
      }
    });
  });

  // Main event listener for all activity buttons
  document.addEventListener('click', e => {
    const target = e.target;
    
    // Prevent default for all activity buttons
    if (target.classList.contains('choice-btn') ||
        target.classList.contains('subfolder-btn') ||
        target.classList.contains('topic-btn') ||
        target.classList.contains('back-btn')) {
      e.preventDefault();
    }

    // Choice buttons (Midterm Reports / Midterm Activities / Finals Activities / Finals Quizzes)
    if (target.classList.contains('choice-btn')) {
      const targetId = target.dataset.open;
      const termContent = target.closest('.term-content');
      
      if (targetId && termContent) {
        // Hide choices
        const choices = termContent.querySelector('.activities-choices');
        if (choices) {
          choices.style.display = 'none';
          choices.classList.remove('active');
        }
        
        // Show the selected folder
        showContent(targetId);
      }
    }

    // Subfolder buttons (Report 1, Activity 1, etc.)
    if (target.classList.contains('subfolder-btn')) {
      const targetId = target.dataset.open;
      const currentFolder = target.closest('.folder-content');
      
      if (targetId && currentFolder) {
        showContent(targetId, true, currentFolder);
      }
    }

    // Topic buttons (Topic 1, Topic 2, etc.)
    if (target.classList.contains('topic-btn')) {
      const targetId = target.dataset.open;
      const reportContent = target.closest('.subfolder-content');
      
      if (targetId && reportContent) {
        showContent(targetId, true, reportContent);
      }
    }

    // Back buttons
    if (target.classList.contains('back-btn')) {
      const backToId = target.dataset.backTo;
      const current = target.closest('.folder-content, .subfolder-content, .topic-content');
      const backTo = document.getElementById(backToId);

      if (current && backTo) {
        current.style.display = 'none';
        current.classList.remove('active');
        backTo.style.display = 'block';
        backTo.classList.add('active');
      }
    }
  });

  // Image modal functionality
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const closeModal = document.querySelector('.close');

  // Open modal when clicking on images
  document.addEventListener('click', e => {
    if (e.target.hasAttribute('data-modal') && modal && modalImg) {
      modal.style.display = 'block';
      modalImg.src = e.target.src;
      modalCaption.textContent = e.target.alt || '';
      document.body.style.overflow = 'hidden';
    }
  });

  // Close modal
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Close modal when clicking outside
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

  // Set current year in footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! I will get back to you soon.');
      this.reset();
    });
  }
});
