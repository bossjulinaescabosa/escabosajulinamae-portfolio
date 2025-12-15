document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing portfolio scripts...');

  // DOM Elements
  const body = document.body;
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section');
  const getStartedBtn = document.querySelector('.get-started-btn');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const themeToggle = document.getElementById('themeToggle');
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const closeModal = document.querySelector('.close');
  const contactForm = document.getElementById('contactForm');

  // 1. SECTION NAVIGATION
  function showSection(sectionId) {
    console.log('Showing section:', sectionId);
    
    // Hide all sections
    sections.forEach(section => {
      section.classList.remove('active');
      section.style.display = 'none';
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.style.display = 'block';
      setTimeout(() => {
        targetSection.classList.add('active');
      }, 10);
      
      // Reset activities section if needed
      if (sectionId === 'activities') {
        resetAllTermContent();
      }
    }
    
    // Close mobile menu if open
    if (mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
    }
  }

  // Initialize by showing cover section
  sections.forEach(section => {
    if (!section.classList.contains('active')) {
      section.style.display = 'none';
    }
  });
  showSection('cover');

  // Navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('data-section');
      showSection(sectionId);
    });
  });

  // Get Started button
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSection('about');
    });
  }

  // 2. MOBILE MENU
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('active');
    });
  }

  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileMenu && mobileMenu.classList.contains('active')) {
      if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        mobileMenu.classList.remove('active');
      }
    }
  });

  // 3. THEME TOGGLE
  if (themeToggle) {
    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

    // Toggle theme
    themeToggle.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      body.setAttribute('data-theme', newTheme);
      themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
      localStorage.setItem('theme', newTheme);
    });
  }

  // 4. TERM SELECTION (Midterm/Finals)
  const termBtns = document.querySelectorAll('.term-btn');

  termBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const term = btn.getAttribute('data-term');
      
      // Update active button
      termBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Show selected term content
      document.querySelectorAll('.term-content').forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
        
        if (content.id === `${term}Content`) {
          content.style.display = 'block';
          setTimeout(() => {
            content.classList.add('active');
          }, 10);
        }
      });
      
      // Reset the term content to initial state
      resetTermContent(term);
    });
  });

  // Function to reset all term content
  function resetAllTermContent() {
    document.querySelectorAll('.term-content').forEach(content => {
      content.querySelectorAll('.folder-content, .subfolder-content, .topic-content').forEach(el => {
        el.style.display = 'none';
        el.classList.remove('active');
      });
      
      // Show choices
      const choices = content.querySelector('.activities-choices');
      if (choices) {
        choices.style.display = 'block';
        choices.classList.add('active');
      }
    });
  }
  
  // Function to reset specific term content
  function resetTermContent(term) {
    const termContent = document.getElementById(`${term}Content`);
    if (!termContent) return;
    
    // Hide all nested content
    termContent.querySelectorAll('.folder-content, .subfolder-content, .topic-content').forEach(el => {
      el.style.display = 'none';
      el.classList.remove('active');
    });
    
    // Show choices
    const choices = termContent.querySelector('.activities-choices');
    if (choices) {
      choices.style.display = 'block';
      choices.classList.add('active');
    }
  }

  // 5. FOLDER NAVIGATION
  document.addEventListener('click', function(e) {
    const target = e.target;
    
    // Choice buttons (Open folder)
    if (target.classList.contains('choice-btn')) {
      e.preventDefault();
      const folderId = target.getAttribute('data-open');
      const folder = document.getElementById(folderId);
      const termContent = target.closest('.term-content');
      
      if (folder && termContent) {
        // Hide all content in current term
        termContent.querySelectorAll('.folder-content, .activities-choices, .subfolder-content, .topic-content').forEach(el => {
          el.style.display = 'none';
          el.classList.remove('active');
        });
        
        // Show selected folder
        folder.style.display = 'block';
        folder.classList.add('active');
      }
    }
    
    // Back buttons
    if (target.classList.contains('back-btn')) {
      e.preventDefault();
      const targetId = target.getAttribute('data-back-to');
      const targetElement = document.getElementById(targetId);
      const currentElement = target.closest('.folder-content, .subfolder-content, .topic-content');
      
      if (targetElement && currentElement) {
        currentElement.style.display = 'none';
        currentElement.classList.remove('active');
        targetElement.style.display = 'block';
        targetElement.classList.add('active');
      }
    }
    
    // Subfolder buttons
    if (target.classList.contains('subfolder-btn')) {
      e.preventDefault();
      const subfolderId = target.getAttribute('data-open');
      const subfolder = document.getElementById(subfolderId);
      const currentFolder = target.closest('.folder-content, .subfolder-content');
      
      if (subfolder && currentFolder) {
        currentFolder.style.display = 'none';
        currentFolder.classList.remove('active');
        subfolder.style.display = 'block';
        subfolder.classList.add('active');
      }
    }
    
    // Topic buttons
    if (target.classList.contains('topic-btn')) {
      e.preventDefault();
      const topicId = target.getAttribute('data-open');
      const topic = document.getElementById(topicId);
      const currentSubfolder = target.closest('.subfolder-content');
      
      if (topic && currentSubfolder) {
        currentSubfolder.style.display = 'none';
        currentSubfolder.classList.remove('active');
        topic.style.display = 'block';
        topic.classList.add('active');
      }
    }
  });

  // 6. IMAGE MODAL
  if (modal && modalImg && modalCaption && closeModal) {
    // Open modal when clicking on images
    document.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-modal')) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        modalImg.src = e.target.src;
        modalCaption.textContent = e.target.alt || 'Image';
      }
    });

    // Close modal functions
    function closeImageModal() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }

    closeModal.addEventListener('click', closeImageModal);

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeImageModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'block') {
        closeImageModal();
      }
    });
    
    // Handle image errors in modal
    modalImg.addEventListener('error', () => {
      modalImg.src = 'https://via.placeholder.com/500x300?text=Image+Not+Found';
      modalCaption.textContent = 'Image could not be loaded.';
    });
  }

  // 7. CONTACT FORM
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      if (name && email && message) {
        alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
        contactForm.reset();
      } else {
        alert('Please fill in all fields before submitting.');
      }
    });
  }

  // 8. FOOTER YEAR
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = currentYear;
  }

  // 9. IMAGE ERROR HANDLING
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      // Only replace if not already a placeholder
      if (!this.src.includes('placeholder') && !this.src.includes('via.placeholder.com')) {
        this.src = 'https://via.placeholder.com/400x300/4A90E2/FFFFFF?text=Image+Not+Available';
        this.alt = 'Image not available';
      }
    });
  });

  console.log('Portfolio scripts initialized successfully!');
});
