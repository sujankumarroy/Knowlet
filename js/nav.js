class NavBar {
    render() {
        const navContainer = document.getElementById('bottom-nav');
        if (!navContainer) return;
    
        navContainer.innerHTML = `
            <a href="/" class="nav-item">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
                <span class="text">Home</span>
            </a>
            <a href="/favourite" class="nav-item">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3 c1.74 0 3.41.81 4.5 2.09 C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span class="text">Favourite</span>
            </a>
            <a href="/history" class="nav-item">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 3a9 9 0 0 0-9 9H1l4 4 4-4H6a7 7 0 1 1 7 7 c-1.93 0-3.68-.78-4.95-2.05l-1.42 1.42A8.96 8.96 0 1 0 13 3zm-1 5v5l4.25 2.52.75-1.23-3.5-2.04V8z"/>
                </svg>
                <span class="text">History</span>
            </a>
            <a href="/profile" class="nav-item">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.7 0 4.88-2.18 4.88-4.88S14.7 2.25 12 2.25 7.12 4.43 7.12 7.12 9.3 12 12 12zm0 2.25 c-3.25 0-9.75 1.63-9.75 4.88V21h19.5v-1.87 c0-3.25-6.5-4.88-9.75-4.88z"/>
                </svg>
                <span class="text">Profile</span>
            </a>
        `;
    
        this.setActiveNav();
    }

    setActiveNav() {
        const navItems = document.querySelectorAll(".nav-item");
        let currentPagePath = window.location.pathname.replace('.html', '');
        currentPagePath = currentPagePath === '/index' ? '/' : currentPagePath;
    
        navItems.forEach(item => {
            const linkPath = item.getAttribute('href');
    
            if (currentPagePath === linkPath) {
                item.classList.add('active-nav-item');
            } else {
                item.classList.remove('active-nav-item');
            }
        });
    }
}

new NavBar().render();
