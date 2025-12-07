document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing portfolio scripts...');
  
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section');
  const getStartedBtn = document.querySelector('.get-started-btn');
  const hamburgerBtn = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileCloseBtn = document.getElementById('mobileClose');
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  
  function showSection(sectionId) {
    sections.forEach(section => {
      section.classList.remove('active');
      section.style.display = 'none';
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.style.display = 'block';
      targetSection.classList.add('active');
      
      setTimeout(() => {
        targetSection.style.opacity = '1';
      }, 10);
    }
  }
  
  sections.forEach(section => {
    if (!section.classList.contains('active')) {
      section.style.display = 'none';
    }
  });
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('data-section');
      showSection(sectionId);
      
      if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
      }
    });
  });
  
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSection('about');
    });
  }
  
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', () => {
      mobileMenu.classList.add('active');
    });
  }
  
  if (mobileCloseBtn && mobileMenu) {
    mobileCloseBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  }
  
  document.addEventListener('click', (e) => {
    if (mobileMenu && mobileMenu.classList.contains('active')) {
      if (!mobileMenu.contains(e.target) && 
          (!hamburgerBtn || !hamburgerBtn.contains(e.target))) {
        mobileMenu.classList.remove('active');
      }
    }
  });
  
  if (themeToggle) {
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
  const termContents = document.querySelectorAll('.term-content');
  
  termBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const term = btn.getAttribute('data-term');
      
      termBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      termContents.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
        
        if (content.id === `${term}Content`) {
          content.style.display = 'block';
          content.classList.add('active');
        }
      });

      resetTermContent(term);
    });
  });
  
  function resetTermContent(term) {
    const termContent = document.getElementById(`${term}Content`);
    if (!termContent) return;
    
    const activitiesChoices = termContent.querySelector('.activities-choices');
    const allFolderContents = termContent.querySelectorAll('.folder-content');
    const allSubfolderContents = termContent.querySelectorAll('.subfolder-content');
    const allTopicContents = termContent.querySelectorAll('.topic-content');
    
    allFolderContents.forEach(el => {
      el.classList.remove('active');
      el.style.display = 'none';
    });
    allSubfolderContents.forEach(el => {
      el.classList.remove('active');
      el.style.display = 'none';
    });
    allTopicContents.forEach(el => {
      el.classList.remove('active');
      el.style.display = 'none';
    });
    
    if (activitiesChoices) {
      activitiesChoices.style.display = 'block';
      activitiesChoices.classList.add('active');
    }
  }
  
  function setupFolderNavigation() {
    document.addEventListener('click', (e) => {
      const target = e.target;
      
      if (target.classList.contains('choice-btn')) {
        e.preventDefault();
        const folderId = target.getAttribute('data-open');
        const folder = document.getElementById(folderId);
        const termContent = target.closest('.term-content');
        
        if (folder && termContent) {
          termContent.querySelectorAll('.folder-content, .activities-choices').forEach(el => {
            el.classList.remove('active');
            el.style.display = 'none';
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
        const termContent = target.closest('.term-content');
        
        if (targetElement && currentElement && termContent) {
          currentElement.classList.remove('active');
          currentElement.style.display = 'none';
          targetElement.style.display = 'block';
          targetElement.classList.add('active');
        }
      }
      
      if (target.classList.contains('subfolder-btn')) {
        e.preventDefault();
        const subfolderId = target.getAttribute('data-open');
        const subfolder = document.getElementById(subfolderId);
        const currentFolder = target.closest('.folder-content');
        
        if (subfolder && currentFolder) {
          currentFolder.classList.remove('active');
          currentFolder.style.display = 'none';
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
          currentSubfolder.classList.remove('active');
          currentSubfolder.style.display = 'none';
          topic.style.display = 'block';
          topic.classList.add('active');
        }
      }
    });
  }
  
  setupFolderNavigation();
  
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const closeModal = document.querySelector('.close');
  
  if (modal && modalImg && modalCaption && closeModal) {
    document.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-modal')) {
        modal.style.display = 'block';
        modalImg.src = e.target.src;
        modalImg.alt = e.target.alt;
        modalCaption.textContent = e.target.alt || '';
        document.body.style.overflow = 'hidden';
      }
    });
    
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
    
    modalImg.addEventListener('error', () => {
      modalImg.src = 'https://via.placeholder.com/500x300?text=Image+Not+Found';
      modalCaption.textContent = 'Image could not be loaded.';
    });
  }
  
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      if (name && email && message) {
        alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
        contactForm.reset();
        
        console.log('Form submitted:', { name, email, message });
      } else {
        alert('Please fill in all fields before submitting.');
      }
    });
  }
  
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
  
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
