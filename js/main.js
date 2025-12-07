document.addEventListener('DOMContentLoaded', function() {
  console.log('Portfolio initialized...');
  
  const body = document.body;
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section');
  const themeToggle = document.getElementById('themeToggle');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const getStartedBtn = document.querySelector('.get-started-btn');
  
  function showSection(sectionId) {
    console.log('Showing:', sectionId);
    
    // Hide all sections
    sections.forEach(section => {
      section.style.display = 'none';
      section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.style.display = 'block';
      targetSection.classList.add('active');
      
      if (sectionId === 'activities') {
        resetAllTermContent();
      }
    }
    
    if (mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
    }
  }
  
  showSection('cover');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('data-section');
      showSection(sectionId);
    });
  });
  
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSection('about');
    });
  }
  
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
  
  if (themeToggle) {
    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    
    themeToggle.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      body.setAttribute('data-theme', newTheme);
      themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
      localStorage.setItem('theme', newTheme);
    });
  }
  
  const termBtns = document.querySelectorAll('.term-btn');
  
  termBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const term = btn.getAttribute('data-term');
      
      termBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      document.querySelectorAll('.term-content').forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
      });
      
      const termContent = document.getElementById(term + 'Content');
      if (termContent) {
        termContent.style.display = 'block';
        termContent.classList.add('active');
        resetTermContent(term);
      }
    });
  });
  
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
  
  function resetTermContent(term) {
    const termContent = document.getElementById(term + 'Content');
    if (!termContent) return;
    
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
  
  document.addEventListener('click', function(e) {
    const target = e.target;
    
    if (target.classList.contains('choice-btn')) {
      e.preventDefault();
      const folderId = target.getAttribute('data-open');
      const folder = document.getElementById(folderId);
      
      if (folder) {
        // Hide all content in current term
        const termContent = target.closest('.term-content');
        termContent.querySelectorAll('.folder-content, .activities-choices, .subfolder-content, .topic-content').forEach(el => {
          el.style.display = 'none';
          el.classList.remove('active');
        });
        
        folder.style.display = 'block';
        folder.classList.add('active');
      }
    }
    
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

  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const closeModal = document.querySelector('.close');
  
  if (modal) {
    // Open modal when clicking on images with data-modal attribute
    document.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-modal')) {
        modal.style.display = 'block';
        modalImg.src = e.target.src;
        modalImg.alt = e.target.alt;
        modalCaption.textContent = e.target.alt || '';
        document.body.style.overflow = 'hidden';
      }
    });
    
    function closeModalFunc() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
    
    if (closeModal) closeModal.addEventListener('click', closeModalFunc);
    
    window.addEventListener('click', (e) => {
      if (e.target === modal) closeModalFunc();
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModalFunc();
      }
    });
  }
  
  // 7. CONTACT FORM
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      if (name && email && message) {
        alert(`Thank you, ${name}! Your message has been sent.`);
        contactForm.reset();
      } else {
        alert('Please fill in all fields.');
      }
    });
  }
  
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
  
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      if (!this.src.includes('placeholder')) {
        this.src = 'https://via.placeholder.com/400x300/4A90E2/FFFFFF?text=Image+Not+Available';
        this.alt = 'Image not available';
      }
    });
  });
  
  console.log('All scripts loaded successfully!');
});
