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

  // Function to show a specific section
  function showSection(id) {
    // Hide all sections
    sections.forEach(sec => {
      sec.classList.remove('active');
    });

    // Show target section
    const target = document.getElementById(id);
    if (target) {
      target.classList.add('active');
      // Scroll to top when changing sections
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Reset activities if not in activities section
    if (id !== 'activities') {
      resetAllActivities();
    }

    closeMobileMenu();
  }

  // Reset activities navigation
  function resetAllActivities() {
    // Hide all folder/subfolder/topic content
    document.querySelectorAll('.folder-content, .subfolder-content, .topic-content').forEach(el => {
      el.classList.remove('active');
    });

    // Show activities choices for active term
    const activeTerm = document.querySelector('.term-content.active');
    if (activeTerm) {
      const choices = activeTerm.querySelector('.activities-choices');
      if (choices) {
        choices.classList.add('active');
      }
    }

    // Reset term buttons
    document.querySelectorAll('.term-btn').forEach(btn => {
      if (btn.dataset.term === 'midterm') {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Reset term content
    document.querySelectorAll('.term-content').forEach(tc => {
      tc.classList.remove('active');
    });
    const midterm = document.getElementById('midtermContent');
    if (midterm) {
      midterm.classList.add('active');
    }
  }

  // Show cover section initially
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

  // Mobile menu nav links
  mobileMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
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
        tc.classList.remove('active');
      });

      const termId = `${btn.dataset.term}Content`;
      const termContent = document.getElementById(termId);
      if (termContent) {
        termContent.classList.add('active');
        // Reset to show choices within this term
        resetTermContent(termContent);
      }
    });
  });

  // Reset term content to show choices
  function resetTermContent(termContent) {
    // Hide all folder/subfolder/topic content
    termContent.querySelectorAll('.folder-content, .subfolder-content, .topic-content').forEach(el => {
      el.classList.remove('active');
    });

    // Show choices
    const choices = termContent.querySelector('.activities-choices');
    if (choices) {
      choices.classList.add('active');
    }
  }

  // Activities navigation (Reports/Activities/Quizzes)
  document.addEventListener('click', e => {
    const target = e.target;
    
    if (target.classList.contains('choice-btn')) {
      e.preventDefault();
      const targetId = target.dataset.open;
      const termContent = target.closest('.term-content');
      if (targetId && termContent) {
        const choices = termContent.querySelector('.activities-choices');
        if (choices) {
          choices.classList.remove('active');
        }
        
        const folder = document.getElementById(targetId);
        if (folder) {
          folder.classList.add('active');
        }
      }
    }

    if (target.classList.contains('subfolder-btn')) {
      e.preventDefault();
      const targetId = target.dataset.open;
      const currentFolder = target.closest('.folder-content');
      if (targetId && currentFolder) {
        currentFolder.classList.remove('active');
        const subfolder = document.getElementById(targetId);
        if (subfolder) {
          subfolder.classList.add('active');
        }
      }
    }

    if (target.classList.contains('topic-btn')) {
      e.preventDefault();
      const targetId = target.dataset.open;
      const reportContent = target.closest('.subfolder-content');
      if (targetId && reportContent) {
        reportContent.classList.remove('active');
        const topicContent = document.getElementById(targetId);
        if (topicContent) {
          topicContent.classList.add('active');
        }
      }
    }

    if (target.classList.contains('back-btn')) {
      e.preventDefault();
      const backToId = target.dataset.backTo;
      const current = target.closest('.folder-content, .subfolder-content, .topic-content');
      const backTo = document.getElementById(backToId);

      if (current && backTo) {
        current.classList.remove('active');
        backTo.classList.add('active');
      }
    }
  });

  // Image modal functionality
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const closeModal = document.querySelector('.close');

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

  // Handle image loading errors
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
