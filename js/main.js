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

  // ——— SHOW SECTION ———
  function showSection(id) {
    // Itago lahat
    sections.forEach(sec => {
      sec.classList.remove('active');
      sec.style.display = 'none';
    });

    // I-show target
    const target = document.getElementById(id);
    if (target) {
      target.style.display = 'block';
      requestAnimationFrame(() => {
        target.classList.add('active');
        // Scroll to top when changing sections
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // I-reset ang activities section kapag umalis
    if (id !== 'activities') {
      resetAllActivities();
    }

    // Isara ang mobile menu
    closeMobileMenu();
  }

  // ——— RESET ACTIVITIES ———
  function resetAllActivities() {
    // Itago lahat ng content
    document.querySelectorAll('.folder-content, .subfolder-content, .topic-content').forEach(el => {
      el.style.display = 'none';
      el.classList.remove('active');
    });

    // I-show ang choices (midterm/finals options)
    document.querySelectorAll('.activities-choices').forEach(choice => {
      choice.style.display = 'block';
      choice.classList.add('active');
    });

    // Siguraduhing active ang "Midterm" button sa umpisa
    document.querySelectorAll('.term-btn').forEach(btn => {
      if (btn.dataset.term === 'midterm') {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // I-show ang midterm content
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

  // ——— INITIAL LOAD ———
  showSection('cover');

  // ——— NAVIGATION ———
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const section = link.dataset.section;
      if (section) showSection(section);
    });
  });

  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', e => {
      e.preventDefault();
      showSection('about');
    });
  }

  // ——— MOBILE MENU ———
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

  // ——— THEME TOGGLE ———
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

  // ——— TERM BUTTONS (MIDTERM / FINALS) ———
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
        // I-reset ang term: i-show ang choices
        const choices = termContent.querySelector('.activities-choices');
        if (choices) {
          choices.style.display = 'block';
          choices.classList.add('active');
        }
      }
    });
  });

  // ——— DYNAMIC BUTTON HANDLING (choice, subfolder, topic, back) ———
  document.addEventListener('click', e => {
    const target = e.target;

    // Prevent default for all action buttons
    if (
      target.classList.contains('choice-btn') ||
      target.classList.contains('subfolder-btn') ||
      target.classList.contains('topic-btn') ||
      target.classList.contains('back-btn')
    ) {
      e.preventDefault();
    }

    // ——— CHOICE BUTTON (e.g., "Midterm Reports") ———
    if (target.classList.contains('choice-btn')) {
      const targetId = target.dataset.open;
      const termContent = target.closest('.term-content');
      if (targetId && termContent) {
        // Itago ang choices
        const choices = termContent.querySelector('.activities-choices');
        if (choices) {
          choices.style.display = 'none';
          choices.classList.remove('active');
        }
        // I-show ang target folder
        const folder = document.getElementById(targetId);
        if (folder) {
          folder.style.display = 'block';
          folder.classList.add('active');
        }
      }
    }

    // ——— SUBFOLDER BUTTON (e.g., "Report 1", "Activity 1") ———
    if (target.classList.contains('subfolder-btn')) {
      const targetId = target.dataset.open;
      const currentFolder = target.closest('.folder-content');
      if (targetId && currentFolder) {
        currentFolder.style.display = 'none';
        currentFolder.classList.remove('active');
        const subfolder = document.getElementById(targetId);
        if (subfolder) {
          subfolder.style.display = 'block';
          subfolder.classList.add('active');
        }
      }
    }

    // ——— TOPIC BUTTON (e.g., "Topic 1") ———
    if (target.classList.contains('topic-btn')) {
      const targetId = target.dataset.open;
      const reportContent = target.closest('.subfolder-content');
      if (targetId && reportContent) {
        reportContent.style.display = 'none';
        reportContent.classList.remove('active');
        const topicContent = document.getElementById(targetId);
        if (topicContent) {
          topicContent.style.display = 'block';
          topicContent.classList.add('active');
        }
      }
    }

    // ——— BACK BUTTON ———
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

  // ——— IMAGE MODAL ———
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const closeModal = document.querySelector('.close');

  // Open modal
  document.addEventListener('click', e => {
    if (e.target.hasAttribute('data-modal') && modal && modalImg) {
      modal.style.display = 'block';
      modalImg.src = e.target.src;
      modalCaption.textContent = e.target.alt || '';
      document.body.style.overflow = 'hidden';
    }
  });

  // Close with X
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Close when clicking background
  if (modal) {
    window.addEventListener('click', e => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }

  // ——— IMAGE ERROR HANDLING ———
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function () {
      if (!this.dataset.failed) {
        this.dataset.failed = 'true';
        this.src = 'https://via.placeholder.com/400x300/4A90E2/FFFFFF?text=Image+Not+Available';
      }
    });
  });

  // ——— FOOTER YEAR ———
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ——— CONTACT FORM ———
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Simple form submission handling
      alert('Thank you for your message! I will get back to you soon.');
      this.reset();
    });
  }
});
