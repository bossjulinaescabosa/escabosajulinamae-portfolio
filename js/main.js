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
            // Re-trigger animations
            targetSection.querySelectorAll('.fade-in, .slide-up, .slide-up-delay').forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight; // Trigger reflow
                el.style.animation = '';
            });

            targetSection.classList.add('active');
            window.location.hash = targetId;

            // Update active state in navigation
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === targetId) {
                    link.classList.add('active');
                }
            });
            
            // SPECIAL HANDLER for ACTIVITIES section reset
            if (targetId === 'activities') {
                // Set Midterm as active term content and active term button
                document.querySelectorAll('.term-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelector('.term-btn[data-term="midterm"]').classList.add('active');

                document.querySelectorAll('.term-content').forEach(content => content.classList.remove('active'));
                document.getElementById('midtermContent').classList.add('active');
                
                // Reset all internal folder views across both terms
                document.querySelectorAll('.folder-content, .subfolder-content, .topic-content').forEach(el => el.classList.remove('active'));
                document.querySelectorAll('.activities-choices').forEach(el => el.classList.remove('active'));
                
                // Show the main choices for the default active term (Midterm)
                document.getElementById('midtermActivitiesChoices').classList.add('active');
            }
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
            // hamburger.classList.remove('is-active'); // No need for this class in current CSS
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
    });

    mobileClose.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });


    // --- Activities (Reports & Activities) Folder Navigation ---

    /**
     * Manages the visibility of content within the #activities section.
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
    
    termBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const term = e.currentTarget.getAttribute('data-term');
            
            // Update button active state
            termBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            // Show/Hide Term Content
            document.querySelectorAll('.term-content').forEach(content => content.classList.remove('active'));
            
            // Reset and set active term content
            const termContent = document.getElementById(term + 'Content');
            if (termContent) {
                termContent.classList.add('active');
                
                // Reset all internal folder views across both terms
                document.querySelectorAll('.folder-content, .subfolder-content, .topic-content').forEach(el => el.classList.remove('active'));
                document.querySelectorAll('.activities-choices').forEach(el => el.classList.remove('active'));

                // Show the main choices for the selected term
                document.getElementById(term + 'ActivitiesChoices').classList.add('active');
            }
        });
    });

    // Folder and Content Switcher (Handles choice-btn, subfolder-btn, topic-btn, back-btn)
    document.querySelectorAll('.choice-btn, .subfolder-btn, .topic-btn, .back-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetOpen = e.currentTarget.getAttribute('data-open');
            const targetBack = e.currentTarget.getAttribute('data-back-to');
            
            let currentActiveContainer;
            
            // Find the currently active container to hide it
            const activeTermContent = document.querySelector('.term-content.active');
            if (!activeTermContent) return;

            // Find the active container within the active term
            currentActiveContainer = activeTermContent.querySelector('.activities-choices.active, .folder-content.active, .subfolder-content.active, .topic-content.active');

            if (currentActiveContainer) {
                if (targetOpen) {
                    // Moving forward
                    switchActivityContent(currentActiveContainer.id, targetOpen);
                } else if (targetBack) {
                    // Moving backward
                    switchActivityContent(currentActiveContainer.id, targetBack);
                }
            } else if (targetOpen) {
                 // Fallback for initial state: If no container is active yet, but a choice-btn is clicked
                 switchActivityContent(null, targetOpen);
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
