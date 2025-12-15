document.addEventListener('DOMContentLoaded', () => {
    // --- Global Selectors ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const getStartedBtn = document.querySelector('.get-started-btn');
    const themeToggle = document.getElementById('themeToggle');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');

    // --- Utility Functions ---

    /**
     * Shows a specific content section and updates the URL hash.
     * @param {string} targetId The ID of the section to show (e.g., 'about').
     */
    const showSection = (targetId) => {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            // Apply animations to new section
            targetSection.querySelectorAll('.fade-in, .slide-up, .slide-up-delay').forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight; // Trigger reflow
                el.style.animation = '';
            });

            targetSection.classList.add('active');
            window.location.hash = targetId;

            // Update active state in desktop and mobile navigation
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === targetId) {
                    link.classList.add('active');
                }
            });
        }
    };

    /**
     * Handles navigation link clicks.
     */
    const handleNavClick = (event) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('data-section');
        showSection(targetId);
        
        // Close mobile menu after click
        if (mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('is-active');
        }
    };

    // --- Initial Setup ---

    // 1. Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // 2. Load section based on URL hash or default to 'cover'
    const initialSectionId = window.location.hash ? window.location.hash.substring(1) : 'cover';
    showSection(initialSectionId);

    // 3. Load theme preference
    const isDark = localStorage.getItem('theme') === 'dark';
    if (isDark) {
        document.body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }

    // --- Event Listeners ---

    // 1. Navigation and Get Started Button
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', handleNavClick);
    }

    // 2. Theme Toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDarkNow = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
        themeToggle.textContent = isDarkNow ? '☀️' : '🌙';
    });

    // 3. Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        hamburger.classList.toggle('is-active'); // Add a class for visual change if you add CSS
    });

    mobileClose.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('is-active');
    });


    // --- Activities (Reports & Activities) Folder Navigation ---

    /**
     * Manages the visibility of content within the #activities section.
     * @param {string} currentActiveContainerId The ID of the container to hide (e.g., 'midtermReportsFolder').
     * @param {string} targetContainerId The ID of the container to show (e.g., 'midtermActivitiesChoices').
     */
    const switchActivityContent = (currentActiveContainerId, targetContainerId) => {
        const currentActive = document.getElementById(currentActiveContainerId);
        const targetContainer = document.getElementById(targetContainerId);

        if (currentActive) {
            currentActive.classList.remove('active');
        }
        if (targetContainer) {
            targetContainer.classList.add('active');
        }
    };

    // Term Selector (Midterm/Finals)
    const termBtns = document.querySelectorAll('.term-btn');
    const midtermContent = document.getElementById('midtermContent');
    const finalsContent = document.getElementById('finalsContent');
    
    termBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const term = e.currentTarget.getAttribute('data-term');
            
            // Update button active state
            termBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            // Show/Hide Term Content
            midtermContent.classList.remove('active');
            finalsContent.classList.remove('active');
            
            if (term === 'midterm') {
                midtermContent.classList.add('active');
            } else if (term === 'finals') {
                finalsContent.classList.add('active');
            }
        });
    });

    // Folder and Content Switcher
    document.querySelectorAll('.choice-btn, .subfolder-btn, .topic-btn, .back-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetOpen = e.currentTarget.getAttribute('data-open');
            const targetBack = e.currentTarget.getAttribute('data-back-to');
            
            let currentActiveContainer;
            
            // Find the current active container to hide it
            if (e.currentTarget.closest('.activities-choices.active')) {
                currentActiveContainer = e.currentTarget.closest('.activities-choices.active');
            } else if (e.currentTarget.closest('.folder-content.active')) {
                currentActiveContainer = e.currentTarget.closest('.folder-content.active');
            } else if (e.currentTarget.closest('.subfolder-content.active')) {
                currentActiveContainer = e.currentTarget.closest('.subfolder-content.active');
            } else if (e.currentTarget.closest('.topic-content.active')) {
                currentActiveContainer = e.currentTarget.closest('.topic-content.active');
            }

            if (targetOpen) {
                // Moving forward (e.g., from choices to reports folder)
                switchActivityContent(currentActiveContainer ? currentActiveContainer.id : null, targetOpen);
            } else if (targetBack) {
                // Moving backward (e.g., from a report topic back to the report folder)
                switchActivityContent(currentActiveContainer ? currentActiveContainer.id : null, targetBack);
            }
        });
    });

    // --- Image Modal Functionality ---
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');
    const span = document.getElementsByClassName("close")[0];
    const imageItems = document.querySelectorAll('.image-item img[data-modal]');

    imageItems.forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = "block";
            modalImg.src = img.src;
            modalCaption.textContent = img.alt;
        });
    });

    // Close the modal when the close button (x) is clicked
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Close the modal when clicking anywhere outside of the image
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
