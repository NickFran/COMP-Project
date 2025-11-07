// ...existing code...
(function(){
    const resourcesBtn = document.getElementById('resourcesBtn');
    const resourcesDropdown = document.getElementById('resourcesDropdown');
    const resourcesToggle = document.getElementById('resourcesToggle');

    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');

    function closeResources() {
        if (!resourcesDropdown) return;
        resourcesDropdown.classList.remove('open');
        resourcesDropdown.setAttribute('aria-hidden', 'true');
        if (resourcesToggle) resourcesToggle.setAttribute('aria-expanded', 'false');
    }

    if (resourcesToggle) {
        resourcesToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const opened = resourcesDropdown.classList.toggle('open');
            resourcesDropdown.setAttribute('aria-hidden', String(!opened));
            resourcesToggle.setAttribute('aria-expanded', String(opened));
        });
    }

    // Close resources when clicking outside
    document.addEventListener('click', (e) => {
        if (!resourcesBtn || !resourcesDropdown) return;
        if (!resourcesBtn.contains(e.target)) closeResources();
    });

    if (mobileToggle) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const opened = mainNav.classList.toggle('open');
            mobileToggle.setAttribute('aria-expanded', String(opened));
            mainNav.setAttribute('aria-hidden', String(!opened));
            if (!opened) closeResources();
        });
    }

    // Resource link behavior (close menus after click on mobile)
    if (resourcesDropdown) {
        resourcesDropdown.addEventListener('click', (e) => {
            if (e.target.classList.contains('dropdown-item')) {
                closeResources();
                if (window.innerWidth <= 700 && mainNav) {
                    mainNav.classList.remove('open');
                    mainNav.setAttribute('aria-hidden', 'true');
                    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }

    // Clicking a normal nav link on mobile closes the menu
    if (mainNav) {
        mainNav.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-item') && !e.target.closest('#resourcesBtn') && window.innerWidth <= 700) {
                mainNav.classList.remove('open');
                mainNav.setAttribute('aria-hidden', 'true');
                if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
                closeResources();
            }
        });
    }

    // Escape closes menus
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeResources();
            if (mainNav) {
                mainNav.classList.remove('open');
                mainNav.setAttribute('aria-hidden', 'true');
            }
            if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close dropdowns on resize changes
    window.addEventListener('resize', () => {
        if (!mainNav) return;
        if (window.innerWidth > 700) {
            mainNav.classList.remove('open');
            mainNav.setAttribute('aria-hidden', 'false');
            if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
        } else {
            closeResources();
        }
    });
})();