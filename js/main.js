document.addEventListener('DOMContentLoaded', () => {
  // Initialize
  showSection('cover');
  
  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  
  if (hamburger) hamburger.addEventListener('click', () => mobileMenu.classList.add('active'));
  if (mobileClose) mobileClose.addEventListener('click', () => mobileMenu.classList.remove('active'));
  
  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', newTheme);
  });
  
  // Navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showSection(link.dataset.section);
    });
  });
  
  // Get Started button
  document.querySelector('.get-started-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('about');
  });
  
  // Term buttons
  document.querySelectorAll('.term-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.term-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      document.querySelectorAll('.term-content').forEach(content => content.classList.remove('active'));
      document.getElementById(`${btn.dataset.term}Content`).classList.add('active');
    });
  });
  
  // SIMPLE ONE-CLICK NAVIGATION SYSTEM
  document.addEventListener('click', (e) => {
    const target = e.target;
    
    // Choice buttons (Midterm Reports, Midterm Activities, etc.)
    if (target.classList.contains('choice-btn') && target.dataset.target) {
      e.preventDefault();
      hideAllInTerm(target.closest('.term-content'));
      document.getElementById(target.dataset.target).classList.add('active');
    }
    
    // Subfolder buttons (Report 1, Activity 1, etc.)
    else if (target.classList.contains('subfolder-btn') && target.dataset.target) {
      e.preventDefault();
      const parentFolder = target.closest('.folder-content');
      hideAllInFolder(parentFolder);
      target.classList.add('active');
      document.getElementById(target.dataset.target).classList.add('active');
    }
    
    // Topic buttons (Topic 1, Topic 2, etc.)
    else if (target.classList.contains('topic-btn') && target.dataset.target) {
      e.preventDefault();
      const parentContent = target.closest('.folder-content');
      hideAllInTerm(parentContent?.closest('.term-content'));
      document.getElementById(target.dataset.target).classList.add('active');
    }
    
    // Back buttons
    else if (target.classList.contains('back-btn') && target.dataset.back) {
      e.preventDefault();
      hideAllInTerm(target.closest('.term-content'));
      document.getElementById(target.dataset.back).classList.add('active');
    }
    
    // Image modal
    else if (target.hasAttribute('data-modal')) {
      e.preventDefault();
      const modal = document.getElementById('imageModal');
      const modalImg = document.getElementById('modalImg');
      const modalCaption = document.getElementById('modalCaption');
      
      modal.style.display = 'block';
      modalImg.src = target.src;
      modalCaption.textContent = target.alt || '';
      document.body.style.overflow = 'hidden';
    }
  });
  
  // Close modal
  document.querySelector('.close')?.addEventListener('click', () => {
    document.getElementById('imageModal').style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  
  // Contact form
  document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    e.target.reset();
  });
  
  // Set current year
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Helper functions
  function showSection(id) {
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if (mobileMenu) mobileMenu.classList.remove('active');
  }
  
  function hideAllInTerm(termContent) {
    if (!termContent) return;
    termContent.querySelectorAll('.activities-choices, .folder-content, .topic-content, .images-content').forEach(el => {
      el.classList.remove('active');
    });
    termContent.querySelectorAll('.subfolder-btn, .topic-btn').forEach(btn => {
      btn.classList.remove('active');
    });
  }
  
  function hideAllInFolder(folderContent) {
    if (!folderContent) return;
    folderContent.querySelectorAll('.topics-grid, .images-content').forEach(el => {
      el.classList.remove('active');
    });
    folderContent.querySelectorAll('.subfolder-btn').forEach(btn => {
      btn.classList.remove('active');
    });
  }
});
