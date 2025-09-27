document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section');
  const themeToggle = document.getElementById('themeToggle');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const getStartedBtn = document.querySelector('.get-started-btn');
  const activitiesChoices = document.getElementById('activitiesChoices');
  const folderContents = document.querySelectorAll('.folder-content');      
  const subfolderContents = document.querySelectorAll('.subfolder-content');
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = modal ? modal.querySelector('.close') : null;

  function hideAllSections() {
    sections.forEach(s => s.classList.remove('active'));
  }

  function showSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (!el) return;
    hideAllSections();
    el.classList.add('active');
    if (sectionId === 'activities') {
      showActivitiesChoices();
    }

    if (mobileMenu) mobileMenu.classList.remove('active');
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-section');
      if (target) showSection(target);
    });
  });

  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSection('about');
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-mode')) localStorage.setItem('theme', 'dark');
      else localStorage.setItem('theme', 'light');
    });

    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }

  function hideAllFolderAndSubfolderContent() {
    folderContents.forEach(f => f.style.display = 'none');
    subfolderContents.forEach(s => s.style.display = 'none');
  }

  function showActivitiesChoices() {
    if (activitiesChoices) activitiesChoices.style.display = 'block';
    hideAllFolderAndSubfolderContent();
  }

  showActivitiesChoices();

  document.querySelectorAll('.choice-btn[data-open]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.open;
      if (!targetId) return;
      if (activitiesChoices) activitiesChoices.style.display = 'none';
      hideAllFolderAndSubfolderContent();
      const folder = document.getElementById(targetId);
      if (folder) folder.style.display = 'block';
      folder && folder.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  document.querySelectorAll('.back-to-choices').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showActivitiesChoices();
      const activitiesSection = document.getElementById('activities');
      activitiesSection && activitiesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  document.querySelectorAll('.subfolder-btn[data-open]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.open;
      if (!targetId) return;
      const parentFolder = btn.closest('.folder-content');
      if (parentFolder) {
        parentFolder.querySelectorAll('.subfolder-content').forEach(sc => sc.style.display = 'none');
      }

      const sub = document.getElementById(targetId);
      if (sub) sub.style.display = 'block';
      sub && sub.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  document.querySelectorAll('.back-to-folder').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetFolderId = btn.dataset.target;
      if (!targetFolderId) return;
      const currentSub = btn.closest('.subfolder-content');
      if (currentSub) currentSub.style.display = 'none';
      const parentFolder = document.getElementById(targetFolderId);
      if (parentFolder) parentFolder.style.display = 'block';
      parentFolder && parentFolder.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  document.addEventListener('click', (e) => {
    const clickedImg = e.target.closest('img');
    if (!clickedImg) return;
    if (clickedImg.closest('.subfolder-content') || clickedImg.classList.contains('profile-img') || clickedImg.classList.contains('activity-img')) {
      if (!modal) return;
      modal.style.display = 'block';
      modalImg.src = clickedImg.src;
      modalCaption.textContent = clickedImg.alt || '';
      document.body.style.overflow = 'hidden';
    }
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
      if (mobileMenu) mobileMenu.classList.remove('active');
    }
  });

  const activitiesNavLink = Array.from(navLinks).find(l => l.getAttribute('data-section') === 'activities');
  if (activitiesNavLink) {
    activitiesNavLink.addEventListener('click', () => {
      setTimeout(() => showActivitiesChoices(), 10);
    });
  }
});
