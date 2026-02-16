document.addEventListener('DOMContentLoaded', () => {

    // Selectors
    const preloader = document.querySelector('.royal_preloader');
    const bar = document.querySelector('.royal_preloader_bar');
    const percentage = document.querySelector('.royal_preloader_percentage');
    const site = document.querySelector('.site');

    // Function to Run Preloader
    function runPreloader(onComplete) {
        // Reset
        preloader.style.display = 'flex';
        preloader.style.opacity = '1';
        site.classList.remove('loaded');
        bar.style.width = '0%';
        percentage.textContent = '0%';

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 10) + 5;

            if (progress > 100) progress = 100;

            bar.style.width = progress + '%';
            percentage.textContent = progress + '%';

            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    if (onComplete) onComplete();
                    setTimeout(() => {
                        preloader.style.transition = 'opacity 0.5s ease';
                        preloader.style.opacity = '0';
                        site.classList.add('loaded');
                        setTimeout(() => {
                            preloader.style.display = 'none';
                        }, 500);
                    }, 200);
                }, 200);
            }
        }, 15);
    }

    runPreloader(null);

    // Click Transition Logic
    const links = document.querySelectorAll('.transition-link');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');

            runPreloader(() => {
                if (target.startsWith('#')) {
                    document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.location.href = target;
                }
            });
        });
    });

    // Scroll Events
    const header = document.querySelector('.main-header');
    const scrollTopBtn = document.querySelector('.scroll-to-top');

    window.addEventListener('scroll', () => {
        // Header Sticky
        if (window.scrollY > 0) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Scroll Top Button
        if (scrollTopBtn) {
            if (window.scrollY > 300) {
                scrollTopBtn.style.display = 'flex';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        }
    });

    // Mobile Menu
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.main-navigation');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            if (nav.style.display === 'block') {
                nav.style.display = 'none';
            } else {
                nav.style.display = 'block';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.background = '#0f6a36';
                nav.style.padding = '20px';
                nav.style.zIndex = '999';
            }
        });
    }
});
