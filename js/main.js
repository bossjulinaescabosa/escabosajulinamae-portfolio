document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
        });
    });

    function showSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
        
        closeMobileMenu();
    }

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    themeToggle.addEventListener('click', function() {
        body.setAttribute('data-theme', body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        themeToggle.textContent = body.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
    });

    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');

    hamburger.addEventListener('click', function() {
        mobileMenu.classList.add('active');
    });

    mobileClose.addEventListener('click', closeMobileMenu);

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
    }

    // Activities navigation
    const termBtns = document.querySelectorAll('.term-btn');
    const choiceBtns = document.querySelectorAll('.choice-btn');
    const subfolderBtns = document.querySelectorAll('.subfolder-btn');
    const topicBtns = document.querySelectorAll('.topic-btn');
    const backBtns = document.querySelectorAll('.back-btn');

    termBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const term = this.getAttribute('data-term');
            switchTerm(term);
        });
    });

    function switchTerm(term) {
    
        document.querySelectorAll('.term-content').forEach(content => {
            content.classList.remove('active');
        });
        
        document.getElementById(term + 'Content').classList.add('active');
        
        termBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-term="${term}"]`).classList.add('active');
    }

    choiceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-open');
            showContent(target);
        });
    });

    // Handle subfolder buttons
    subfolderBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-open');
            showContent(target);
        });
    });

    topicBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-open');
            showContent(target);
        });
    });

    backBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-back-to');
            showContent(target);
        });
    });

    function showContent(targetId) {
        document.querySelectorAll('.activities-choices, .folder-content, .subfolder-content, .topic-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(targetId).classList.add('active');
    }

    // Modal functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.querySelector('.close');

    document.querySelectorAll('[data-modal]').forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            modalCaption.textContent = this.alt;
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });

    showSection('cover');
    switchTerm('midterm');
});
