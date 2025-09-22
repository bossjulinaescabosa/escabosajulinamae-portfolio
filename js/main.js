document.addEventListener('DOMContentLoaded', function() {
 
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  const modeToggle = document.getElementById('mode-toggle');
  const body = document.body;

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetSection = this.getAttribute('data-section');

      sections.forEach(section => {
        section.classList.remove('active');
      });

      const targetElement = document.getElementById(targetSection);
      if (targetElement) {
        targetElement.classList.add('active');
      }

      navLinks.forEach(nav => {
        nav.classList.remove('active');
      });
      this.classList.add('active');
    });
  });

  modeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
      this.textContent = '☀️ Light Mode';
      this.style.backgroundColor = '#9370DB'; 
    } else {
      this.textContent = '🌙 Dark Mode';
      this.style.backgroundColor = '#C8A2C8'; 
    }
  });

  if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    modeToggle.textContent = '☀️ Light Mode';
    modeToggle.style.backgroundColor = '#9370DB';
  }

  modeToggle.addEventListener('click', function() {
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.removeItem('darkMode');
    }
  });
});
