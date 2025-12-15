document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const sections = document.querySelectorAll('.content-section');
  const navLinks = document.querySelectorAll('.nav-link');
  const getStartedBtn = document.querySelector('.get-started-btn');

  function showSection(id) {
    sections.forEach(sec => {
      sec.classList.remove('active');
      sec.style.display = 'none';
    });

    const target = document.getElementById(id);
    if (target) {
      target.style.display = 'block';
      requestAnimationFrame(() => target.classList.add('active'));
    }

    resetAllActivities();
    closeMobileMenu();
  }

  showSection('cover');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      showSection(link.dataset.section);
    });
  });

  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', e => {
      e.preventDefault();
      showSection('about');
    });
  }

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  function closeMobileMenu() {
    mobileMenu?.classList.remove('active');
  }

  hamburger?.addEventListener('click', () => mobileMenu.classList.add('active'));
  mobileClose?.addEventListener('click', closeMobileMenu);

  document.addEventListener('click', e => {
    if (
      mobileMenu?.classList.contains('active') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.dataset.theme = savedTheme;
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  themeToggle.addEventListener('click', () => {
    const newTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    body.dataset.theme = newTheme;
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', newTheme);
  });

  const termBtns = document.querySelectorAll('.term-btn');

  termBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      termBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.term-content').forEach(tc => {
        tc.style.display = 'none';
        tc.classList.remove('active');
      });

      const activeTerm = document.getElementById(`${btn.dataset.term}Content`);
      activeTerm.style.display = 'block';
      requestAnimationFrame(() => activeTerm.classList.add('active'));

      resetTerm(activeTerm);
    });
  });

  function resetAllActivities() {
    document.querySelectorAll('.folder-content, .subfolder-content, .topic-content').forEach(el => {
      el.style.display = 'none';
      el.classList.remove('active');
    });

    document.querySelectorAll('.activities-choices').forEach(choice => {
      choice.style.display = 'block';
      choice.classList.add('active');
    });
  }

  function resetTerm(term) {
    term.querySelectorAll('.folder-content, .subfolder-content, .topic-content').forEach(el => {
      el.style.display = 'none';
      el.classList.remove('active');
    });

    const choices = term.querySelector('.activities-choices');
    if (choices) {
      choices.style.display = 'block';
      choices.classList.add('active');
    }
  }

  document.addEventListener('click', e => {
    const t = e.target;

    if (t.matches('.choice-btn, .subfolder-btn, .topic-btn, .back-btn')) {
      e.preventDefault();
    }

    if (t.classList.contains('choice-btn')) {
      openContent(t.dataset.open, t.closest('.term-content'));
    }

    if (t.classList.contains('subfolder-btn') || t.classList.contains('topic-btn')) {
      openContent(t.dataset.open, t.closest('.folder-content, .subfolder-content'));
    }

    if (t.classList.contains('back-btn')) {
      const current = t.closest('.folder-content, .subfolder-content, .topic-content');
      const backTo = document.getElementById(t.dataset.backTo);
      current.style.display = 'none';
      backTo.style.display = 'block';
      backTo.classList.add('active');
    }
  });

  function openContent(id, container) {
    if (!container) return;
    container.querySelectorAll('.folder-content, .subfolder-content, .topic-content, .activities-choices')
      .forEach(el => {
        el.style.display = 'none';
        el.classList.remove('active');
      });

    const target = document.getElementById(id);
    target.style.display = 'block';
    target.classList.add('active');

    target.querySelectorAll('.images-grid').forEach(grid => {
      grid.style.display = 'grid';
    });
  }

  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const closeModal = document.querySelector('.close');

  document.addEventListener('click', e => {
    if (e.target.hasAttribute('data-modal')) {
      modal.style.display = 'block';
      modalImg.src = e.target.src;
      modalCaption.textContent = e.target.alt || '';
      document.body.style.overflow = 'hidden';
    }
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  window.addEventListener('click', e => {
    if (e.target === modal) closeModal.click();
  });

  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function () {
      if (this.dataset.failed) return;
      this.dataset.failed = "true";
      this.src = 'https://via.placeholder.com/400x300/4A90E2/FFFFFF?text=Image+Not+Available';
    });
  });

  const year = document.getElementById('currentYear');
  if (year) year.textContent = new Date().getFullYear();
});
