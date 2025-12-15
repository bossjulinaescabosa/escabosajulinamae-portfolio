document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Navigation functionality
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
        
        // Close mobile menu if open
        closeMobileMenu();
    }

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    themeToggle.addEventListener('click', function() {
        body.setAttribute('data-theme', body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        themeToggle.textContent = body.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
    });

    // Hamburger menu
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
        // Hide all term contents
        document.querySelectorAll('.term-content').forEach(content => {
            content.classList.remove('active');
        });
        // Show selected term content
        document.getElementById(term + 'Content').classList.add('active');
        
        // Update active term button
        termBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-term="${term}"]`).classList.add('active');
    }

    // Handle choice buttons (e.g., Midterm Reports, Midterm Activities)
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

    // Handle topic buttons
    topicBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-open');
            showContent(target);
        });
    });

    // Handle back buttons
    backBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-back-to');
            showContent(target);
        });
    });

    function showContent(targetId) {
        // Hide all visible contents
        document.querySelectorAll('.activities-choices, .folder-content, .subfolder-content, .topic-content').forEach(content => {
            content.classList.remove('active');
        });
        // Show target content
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

    // Contact form
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });

    // Initialize default state
    showSection('cover');
    switchTerm('midterm');
});
