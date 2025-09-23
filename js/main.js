document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const modeToggleBtn = document.getElementById('mode-toggle');
    const body = document.body;
  
    function showSection(sectionId) {
      sections.forEach(section => {
        section.classList.toggle('active', section.id === sectionId);
      });
  
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === sectionId);
      });
    }
  
    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetSection = link.dataset.section;
        showSection(targetSection);
      });
    });
  

    modeToggleBtn.addEventListener('click', () => {
      const darkModeEnabled = body.classList.toggle('dark-mode');
      modeToggleBtn.textContent = darkModeEnabled ? '☀️ Light Mode' : '🌙 Dark Mode';
  
      if (darkModeEnabled) {
        localStorage.setItem('darkMode', 'enabled');
      } else {
        localStorage.removeItem('darkMode');
      }
    });
  
    if (localStorage.getItem('darkMode') === 'enabled') {
      body.classList.add('dark-mode');
      modeToggleBtn.textContent = '☀️ Light Mode';
    }
  });
  
