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

    // =================================
    // MOBILE MENU TOGGLE (Side Panel)
    // =================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const body = document.querySelector('body');

    // Create Mobile Menu Wrapper if not exists
    if (!document.querySelector('.mobile-nav-wrapper')) {
        const mobileNavHTML = `
             <div class="mobile-nav-overlay"></div>
             <div class="mobile-nav-wrapper">
                 <div class="mobile-nav-close"><i class="fas fa-times"></i></div>
                 <div class="mobile-logo mb-4">
                     <span style="color:white; font-size:24px; font-weight:bold; font-family:'Oswald'">SmartPlomb Clim</span>
                     <span style="display:block; color:white; font-size:10px; letter-spacing:1px; margin-top:0px;">URGENCE DÉPANNAGE • PLOMBERIE • CHAUFFAGE</span>
                 </div>
                 <ul class="mobile-menu-list">
                     <li><a href="index.html">Accueil</a></li>
                     <li><a href="plomberie.html">Plomberie</a></li>
                     <li><a href="chauffage.html">Chauffage</a></li>
                     <li><a href="climatisation.html">Climatisation</a></li>
                     <li><a href="devis.html">Demande de devis</a></li>
                     <li><a href="depannage.html" style="color:#FFD700; font-weight:bold;" class="nav-btn-urgent">Dépannage urgent</a></li>
                 </ul>
                 <div class="mt-5 text-white">
                     <p><i class="fas fa-phone-alt text-warning me-2"></i> 02 32 28 41 69</p>
                     <p><i class="fas fa-envelope text-warning me-2"></i> contact@stinc.fr</p>
                 </div>
             </div>
         `;
        body.insertAdjacentHTML('beforeend', mobileNavHTML);
    }

    if (mobileToggle) {
        // Toggle Click
        mobileToggle.addEventListener('click', function (e) {
            e.preventDefault();
            body.classList.add('mobile-nav-active');
        });
    }

    // Close Click (Close button or Overlay)
    document.addEventListener('click', function (e) {
        if (e.target.closest('.mobile-nav-close') || e.target.classList.contains('mobile-nav-overlay')) {
            body.classList.remove('mobile-nav-active');
        }
    });

    /**
     * DYNAMIC KEYWORD INSERTION (DKI)
     * Adapts content based on URL parameter ?q=keyword
     */
    function adaptContent() {
        const urlParams = new URLSearchParams(window.location.search);
        // Look for common search params
        const query = urlParams.get('q') || urlParams.get('kw') || urlParams.get('query') || '';

        if (!query) return; // No keyword, keep default

        const keyword = query.toLowerCase();

        // Target Elements
        const bracket = document.getElementById('dynamic-bracket');
        const title = document.getElementById('dynamic-title');
        const subtitle = document.getElementById('dynamic-subtitle');
        const cta = document.getElementById('dynamic-cta');

        // Logic Mappings
        if (keyword.includes('urgence') || keyword.includes('fuite') || keyword.includes('panne')) {
            // URGENCY MODE
            if (bracket) bracket.innerText = "[ INTERVENTION IMMEDIATE 24/7 ]";
            if (title) title.innerHTML = `DÉPANNAGE<br><span style="color:#FF4500;">URGENCE PLOMBERIE</span>`; // Red/Orange for urgency
            if (cta) {
                cta.innerText = "APPELER LE TECHNICIEN";
                cta.href = "tel:0232284169";
                cta.style.background = "#FF4500"; // Red background
                cta.style.color = "white";
            }
        }
        else if (keyword.includes('chauffage') || keyword.includes('chaudière') || keyword.includes('radiateur')) {
            // HEATING MODE
            if (bracket) bracket.innerText = "[ EXPERT CHAUFFAGISTE RGE ]";
            if (title) title.innerHTML = `CHAUFFAGE<br><span style="color:#FFD700;">& ENTRETIEN</span>`;
            if (subtitle) subtitle.innerText = "Installation et dépannage de chaudières, radiateurs et pompes à chaleur.";
        }
        else if (keyword.includes('clim') || keyword.includes('pompe')) {
            // CLIM MODE
            if (bracket) bracket.innerText = "[ CLIMATISATION & ÉNERGIE ]";
            if (title) title.innerHTML = `CLIMATISATION<br><span style="color:#0dcaf0;">RÉVERSIBLE</span>`; // Cyan for Cold
            if (subtitle) subtitle.innerText = "Restez au frais cet été. Installation et maintenance de votre climatisation.";
        }
    }

    // Run DKI
    adaptContent();

});
