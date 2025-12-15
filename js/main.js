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
  const contactForm = document.getElementById('contactForm');
  const yearEl = document.getElementById('currentYear');

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
    console.log('Resetting all activities...');
    
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

  // Initialize with cover section
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
      // Toggle hamburger animation
      const spans = hamburger.querySelectorAll('span');
      if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    }
  }

  function closeMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove('active');
      // Reset hamburger
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
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
      // Update active button
      termBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Hide all term content
      document.querySelectorAll('.term-content').forEach(tc => {
        tc.classList.remove('active');
      });

      // Show selected term content
      const term = btn.dataset.term;
      const termContent = document.getElementById(`${term}Content`);
      if (termContent) {
        termContent.classList.add('active');
        
        // Reset to choices for this term
        const choices = termContent.querySelector('.activities-choices');
        if (choices) {
          // Hide all other content in this term
          termContent.querySelectorAll('.folder-content, .subfolder-content, .topic-content').forEach(el => {
            el.classList.remove('active');
          });
          choices.classList.add('active');
        }
      }
    });
  });

  // MAIN EVENT HANDLER FOR ALL ACTIVITY BUTTONS
  document.addEventListener('click', function(e) {
    const target = e.target;
    
    // Prevent default only for buttons that have data attributes
    if (target.classList.contains('choice-btn') || 
        target.classList.contains('subfolder-btn') || 
        target.classList.contains('topic-btn') || 
        target.classList.contains('back-btn')) {
      e.preventDefault();
    }
    
    // Choice buttons (📁 Midterm Reports, 📁 Midterm Activities, etc.)
    if (target.classList.contains('choice-btn') && target.dataset.open) {
      const termContent = target.closest('.term-content');
      const targetId = target.dataset.open;
      
      // Hide choices in this term
      if (termContent) {
        const choices = termContent.querySelector('.activities-choices');
        if (choices) {
          choices.classList.remove('active');
        }
      }
      
      // Show selected folder
      const folder = document.getElementById(targetId);
      if (folder) {
        folder.classList.add('active');
        
        // Ensure proper scroll position
        setTimeout(() => {
          folder.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
    
    // Subfolder buttons (Report 1, Activity 1, etc.)
    else if (target.classList.contains('subfolder-btn') && target.dataset.open) {
      const currentFolder = target.closest('.folder-content');
      const targetId = target.dataset.open;
      
      // Hide current folder
      if (currentFolder) {
        currentFolder.classList.remove('active');
      }
      
      // Show selected subfolder
      const subfolder = document.getElementById(targetId);
      if (subfolder) {
        subfolder.classList.add('active');
        
        // Ensure proper scroll position
        setTimeout(() => {
          subfolder.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
    
    // Topic buttons (Topic 1, Topic 2, etc.)
    else if (target.classList.contains('topic-btn') && target.dataset.open) {
      const currentReport = target.closest('.subfolder-content');
      const targetId = target.dataset.open;
      
      // Hide current report
      if (currentReport) {
        currentReport.classList.remove('active');
      }
      
      // Show selected topic (with images)
      const topic = document.getElementById(targetId);
      if (topic) {
        topic.classList.add('active');
        
        // Ensure images are visible
        const imagesGrid = topic.querySelector('.images-grid');
        if (imagesGrid) {
          imagesGrid.style.display = 'grid';
          imagesGrid.style.opacity = '1';
          imagesGrid.style.visibility = 'visible';
        }
        
        // Ensure proper scroll position
        setTimeout(() => {
          topic.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
    
    // Back buttons
    else if (target.classList.contains('back-btn') && target.dataset.backTo) {
      const current = target.closest('.folder-content, .subfolder-content, .topic-content');
      const backToId = target.dataset.backTo;
      
      // Hide current content
      if (current) {
        current.classList.remove('active');
      }
      
      // Show back target
      const backTo = document.getElementById(backToId);
      if (backTo) {
        backTo.classList.add('active');
        
        // Ensure proper scroll position
        setTimeout(() => {
          backTo.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
    
    // Regular navigation links in mobile menu
    else if (target.classList.contains('nav-link') && target.dataset.section) {
      const section = target.dataset.section;
      showSection(section);
    }
  });

  // Image modal functionality
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
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! I will get back to you soon.');
      this.reset();
    });
  }

  // Add smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add keyboard navigation support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modal && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
      closeMobileMenu();
    }
  });

  // Log for debugging
  console.log('Portfolio initialized successfully!');
});
