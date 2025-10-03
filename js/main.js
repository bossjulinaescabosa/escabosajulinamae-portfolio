document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing portfolio scripts...');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section');
  const getStartedBtn = document.querySelector('.get-started-btn');

  function showSection(sectionId) {
    sections.forEach(section => section.classList.remove('active'));
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.add('active');
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute('data-section');
      showSection(sectionId);
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu) mobileMenu.classList.remove('active');
    });
  });

  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSection('about');
    });
  }

  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('active'));
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
      }
    });
  }

  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

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

  const activitiesChoices = document.getElementById('activitiesChoices');
  const choiceBtns = document.querySelectorAll('.choice-btn');
  const backToChoicesBtns = document.querySelectorAll('.back-to-choices');

  if (choiceBtns.length > 0) {
    choiceBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetFolderId = btn.getAttribute('data-open');
        const targetFolder = document.getElementById(targetFolderId);
        if (activitiesChoices && targetFolder) {
          activitiesChoices.style.display = 'none';
          targetFolder.style.display = 'block';
          console.log(`Opened folder: ${targetFolderId}`);
        }
      });
    });
  }

  if (backToChoicesBtns.length > 0) {
    backToChoicesBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const currentFolder = btn.closest('.folder-content');
        if (currentFolder && activitiesChoices) {
          currentFolder.style.display = 'none';
          activitiesChoices.style.display = 'block';
          console.log('Returned to activities choices');
        }
      });
    });
  }

  const subfolderBtns = document.querySelectorAll('.subfolder-btn');
  const backToFolderBtns = document.querySelectorAll('.back-to-folder');
  const topicButtons = document.querySelectorAll('.topic-btn');
  const backToTopics = document.querySelectorAll('.back-to-topics');

  subfolderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSubfolderId = btn.getAttribute('data-open');
      const subfolder = btn.closest('.subfolder');
      const subfolderContent = subfolder ? subfolder.querySelector('.subfolder-content') : null;
      if (subfolderContent) {
        subfolderContent.style.display = 'block';
        subfolderContent.classList.add('fade-in');
        btn.style.display = 'none';
        console.log(`Opened subfolder: ${targetSubfolderId}`);
      }
    });
  });

 
  backToFolderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const subfolderContent = btn.closest('.subfolder-content');
      const subfolder = subfolderContent ? subfolderContent.closest('.subfolder') : null;
      const subfolderBtn = subfolder ? subfolder.querySelector('.subfolder-btn') : null;
      if (subfolderContent && subfolderBtn) {
        subfolderContent.style.display = 'none';
        subfolderBtn.style.display = 'block';
        console.log('Closed subfolder, back to main folder');
      }
    });
  });

  topicButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-open');
      const topic = document.getElementById(targetId);
      const subfolderContent = btn.closest('.subfolder-content');
      if (subfolderContent) {
        subfolderContent.querySelectorAll('.topic-content')
                        .forEach(tc => tc.style.display = 'none');
      }
      if (topic) topic.style.display = 'block';
    });
  });

  backToTopics.forEach(btn => {
    btn.addEventListener('click', () => {
      const topicContent = btn.closest('.topic-content');
      if (topicContent) topicContent.style.display = 'none';
    });
  });

  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const closeModal = document.querySelector('.close');

  if (modal && modalImg && modalCaption && closeModal) {
    document.addEventListener('click', (e) => {
      if (e.target.matches('.subfolder-content img')) {
        modal.style.display = 'block';
        modalImg.src = e.target.src;
        modalImg.alt = e.target.alt;
        modalCaption.textContent = e.target.alt || '';
        console.log(`Opened modal for: ${e.target.alt}`);
      }
    });

    closeModal.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.style.display = 'none'; });

    modalImg.addEventListener('error', () => {
      modalImg.src = 'https://via.placeholder.com/500x300?text=Image+Not+Found';
      modalCaption.textContent = 'Image could not be loaded.';
    });
  }

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get('name') || document.getElementById('name').value;
      alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
      contactForm.reset();
      console.log('Form submitted');
    });
  }

  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in', 'slide-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in, .slide-up, .slide-up-delay, h2, .about-info-box, .activities-choices, .folder-content')
          .forEach(el => { if (el) observer.observe(el); });

  console.log('Portfolio + Reports scripts initialized successfully!');
});
