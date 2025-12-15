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

  // Show section
  function showSection(id) {
    sections.forEach(sec => sec.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (id !== 'activities') resetAllActivities();
    closeMobileMenu();
  }

  // Reset activities nav
  function resetAllActivities() {
    document.querySelectorAll('.folder-content, .topic-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.activities-choices').forEach(c => c.classList.remove('active'));
    document.getElementById('midtermActivitiesChoices')?.classList.add('active');
    document.querySelectorAll('.term-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.term === 'midterm');
    });
    document.querySelectorAll('.term-content').forEach(tc => tc.classList.remove('active'));
    document.getElementById('midtermContent')?.classList.add('active');
  }

  // INIT
  showSection('cover');

  // Nav click
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      showSection(link.dataset.section);
    });
  });

  // Get started
  getStartedBtn?.addEventListener('click', e => {
    e.preventDefault();
    showSection('about');
  });

  // Mobile menu
  function toggleMobileMenu() {
    mobileMenu?.classList.toggle('active');
    const spans = hamburger?.querySelectorAll('span');
    if (!spans) return;
    if (mobileMenu?.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans.forEach(s => { s.style.transform = 'none'; s.style.opacity = '1'; });
    }
  }
  hamburger?.addEventListener('click', toggleMobileMenu);
  mobileClose?.addEventListener('click', () => mobileMenu?.classList.remove('active'));
  document.addEventListener('click', e => {
    if (mobileMenu?.classList.contains('active') && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      mobileMenu.classList.remove('active');
    }
  });

  // Theme toggle
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  themeToggle?.addEventListener('click', () => {
    const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', newTheme);
  });

  // Term switching
  termBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      termBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.term-content').forEach(tc => tc.classList.remove('active'));
      const termContent = document.getElementById(`${btn.dataset.term}Content`);
      termContent?.classList.add('active');
      const choices = termContent?.querySelector('.activities-choices');
      choices?.classList.add('active');
    });
  });

  // Activity navigation
  document.addEventListener('click', e => {
    const t = e.target;
    if (t.classList.contains('back-btn')) {
      e.preventDefault();
      const current = t.closest('.folder-content, .topic-content');
      const backTo = document.getElementById(t.dataset.back);
      current?.classList.remove('active');
      backTo?.classList.add('active');
      backTo?.scrollIntoView({ behavior: 'smooth' });
    } else if (t.hasAttribute('data-target')) {
      e.preventDefault();
      const targetId = t.dataset.target;
      const parent = t.closest('.term-content, .folder-content');
      parent?.querySelectorAll('.activities-choices, .folder-content, .topic-content').forEach(el => el.classList.remove('active'));
      const targetEl = document.getElementById(targetId);
      targetEl?.classList.add('active');
      targetEl?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Modal
  document.addEventListener('click', e => {
    if (e.target.hasAttribute('data-modal')) {
      modal.style.display = 'block';
      modalImg.src = e.target.src;
      modalCaption.textContent = e.target.alt || '';
      document.body.style.overflow = 'hidden';
    }
  });
  closeModal?.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Utilities
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function () {
      if (!this.dataset.failed) {
        this.dataset.failed = 'true';
        this.src = 'https://via.placeholder.com/400x300/4A90E2/FFFFFF?text=Image+Not+Available';
      }
    });
  });
  yearEl.textContent = new Date().getFullYear();
  contactForm?.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    e.target.reset();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
      mobileMenu?.classList.remove('active');
    }
  });

  console.log('Portfolio initialized successfully!');
});
