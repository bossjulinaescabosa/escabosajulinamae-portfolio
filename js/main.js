document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');
    const themeToggle = document.getElementById('themeToggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const currentYear = document.getElementById('currentYear');
    const contactForm = document.getElementById('contactForm');
    const termBtns = document.querySelectorAll('.term-btn');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.querySelector('.close');
    const getStartedBtn = document.querySelector('.get-started-btn');

    init();

    function init() {
        currentYear.textContent = new Date().getFullYear();
        const hash = window.location.hash.substring(1);
        const initialSection = hash || 'cover';
        showSection(initialSection);
        updateNavLinks(initialSection);
        loadThemePreference();
        initLazyLoading();
        setupEventListeners();
        initScrollAnimations();
    }

    function setupEventListeners() {
        hamburger.addEventListener('click', toggleMobileMenu);
        mobileClose.addEventListener('click', toggleMobileMenu);
        
        document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = 'auto';
            });
        });

        themeToggle.addEventListener('click', toggleTheme);

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const section = this.getAttribute('data-section');
                showSection(section);
                updateNavLinks(section);
                
                history.pushState(null, null, `#${section}`);
            });
        });

        termBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const term = this.getAttribute('data-term');
                switchTerm(term);
            });
        });

        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const section = this.getAttribute('data-section');
                showSection(section);
                updateNavLinks(section);
                history.pushState(null, null, `#${section}`);
            });
        }

        setupFolderNavigation();
        setupImageModal();

        if (contactForm) {
            contactForm.addEventListener('submit', handleContactForm);
        }

        window.addEventListener('popstate', function() {
            const hash = window.location.hash.substring(1) || 'cover';
            showSection(hash);
            updateNavLinks(hash);
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('open');
        if (mobileMenu.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
        const spans = hamburger.querySelectorAll('span');
        if (mobileMenu.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    function toggleTheme() {
        const isDark = document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
    }

    function loadThemePreference() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.textContent = '☀️';
        } else {
            themeToggle.textContent = '🌙';
        }
    }

    function showSection(sectionId) {
        contentSections.forEach(section => {
            section.classList.remove('active');
            section.style.opacity = '0';
        });

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            setTimeout(() => {
                targetSection.style.opacity = '1';
            }, 50);
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        if (mobileMenu.classList.contains('open')) {
            toggleMobileMenu();
        }
    }

    function updateNavLinks(activeSection) {
        navLinks.forEach(link => {
            if (link.getAttribute('data-section') === activeSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
            if (link.getAttribute('data-section') === activeSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    function switchTerm(term) {
        termBtns.forEach(btn => {
            if (btn.getAttribute('data-term') === term) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        document.querySelectorAll('.term-content').forEach(content => {
            if (content.id === `${term}Content`) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });

        const initialChoices = document.getElementById(`${term}ActivitiesChoices`);
        if (initialChoices) {
            hideAllFolderContents(term);
            initialChoices.classList.add('active');
        }
    }

    function setupFolderNavigation() {
        document.querySelectorAll('.choice-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const targetId = this.getAttribute('data-open');
                const parentId = this.closest('.activities-choices').id;
                const term = parentId.includes('midterm') ? 'midterm' : 'finals';
                
                hideAllFolderContents(term);
                document.getElementById(targetId).classList.add('active');
            });
        });

        document.querySelectorAll('.subfolder-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const targetId = this.getAttribute('data-open');
                const parentId = this.closest('.folder-content').id;
                const parent = document.getElementById(parentId);
                
                parent.querySelectorAll('.subfolder-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                document.getElementById(targetId).classList.add('active');
            });
        });

        document.querySelectorAll('.topic-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const targetId = this.getAttribute('data-open');
                const parentId = this.closest('.subfolder-content').id;
                const parent = document.getElementById(parentId);
                
                parent.querySelectorAll('.topic-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                document.getElementById(targetId).classList.add('active');
            });
        });

        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const targetId = this.getAttribute('data-back-to');
                const current = this.closest('.folder-content, .subfolder-content, .topic-content');
                
                if (current) {
                    current.classList.remove('active');
                }
                
                document.getElementById(targetId).classList.add('active');
            });
        });
    }

    function hideAllFolderContents(term) {
        document.querySelectorAll(`#${term}Content .folder-content, #${term}Content .subfolder-content, #${term}Content .topic-content`).forEach(content => {
            content.classList.remove('active');
        });
        
        document.getElementById(`${term}ActivitiesChoices`).classList.add('active');
    }

    function setupImageModal() {
        document.addEventListener('click', function(e) {
            if (e.target.hasAttribute('data-modal') || e.target.parentElement.hasAttribute('data-modal')) {
                const img = e.target.tagName === 'IMG' ? e.target : e.target.querySelector('img');
                if (img) {
                    openModal(img);
                }
            }
        });

        modalClose.addEventListener('click', closeModal);
    }

    function openModal(imgElement) {
        modal.style.display = 'block';
        modalImg.src = imgElement.src;
        modalCaption.textContent = imgElement.alt || 'Image';
        
        document.body.style.overflow = 'hidden';
        
        modal.setAttribute('aria-hidden', 'false');
        modalClose.focus();
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modal.setAttribute('aria-hidden', 'true');
    }

    function handleContactForm(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all fields.');
            return;
        }

        alert('Thank you for your message, ' + formData.name + '! I\'ll get back to you soon.');
        
        contactForm.reset();
        
        console.log('Contact form submitted:', formData);
        
    }

    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                            img.classList.remove('loading');
                        }
                        
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                img.classList.remove('loading');
            });
        }
    }

    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
            observer.observe(el);
        });
    }

    function preloadImages(imageUrls) {
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    const importantImages = [
        'assets/images/IMG_20250823_131322_418.webp'
    ];
    
});
