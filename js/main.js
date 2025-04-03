document.addEventListener('DOMContentLoaded', function() {
    loadSection('header-container', 'sections/header.html');
    loadSection('hero-container', 'sections/hero.html');
    loadSection('about-container', 'sections/about.html');
    loadSection('trainers-container', 'sections/trainers.html');
    loadSection('contact-container', 'sections/contact.html');
    loadSection('cta-container', 'sections/cta.html');
    loadSection('footer-container', 'sections/footer.html');
    
    function loadSection(containerId, sectionPath) {
        fetch(sectionPath)
            .then(response => response.text())
            .then(html => {
                document.getElementById(containerId).innerHTML = html;
                
                if (containerId === 'footer-container') {
                    initializeEventListeners();
                }
            })
            .catch(error => {
                console.error(`Error loading section ${sectionPath}:`, error);
            });
    }
    
    function initializeEventListeners() {
        const header = document.querySelector('header');
        const navbar = document.querySelector('.navbar');
        const menuBtn = document.getElementById('openMenu');
        const navLinks = document.getElementById('navLinks');
        const navItems = document.querySelectorAll('.nav-links ul li a');
        const heroVideo = document.getElementById('heroVideo');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        if (menuBtn) {
            menuBtn.addEventListener('click', () => {
                navLinks.classList.add('active');
            });
        }
        
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
        
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-links') && !e.target.closest('.fa-bars')) {
                if (navLinks) {
                    navLinks.classList.remove('active');
                }
            }
        });
        
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').substring(1) === current) {
                    item.classList.add('active');
                }
            });
        });
        
        if (heroVideo) {
            heroVideo.addEventListener('error', () => {
                const videoContainer = document.querySelector('.video-container');
                videoContainer.innerHTML = '';
                videoContainer.style.backgroundImage = 'url("assets/gym-background.jpg")';
                videoContainer.style.backgroundSize = 'cover';
                videoContainer.style.backgroundPosition = 'center';
            });
        }
    }
});

function copyEmail() {
    const emailElement = document.getElementById("email");
    const originalText = "ax7kram@gmail.com";
    
    navigator.clipboard.writeText(originalText).then(() => {
        emailElement.innerText = "🥳 Email copied! 🥳 ";
        emailElement.classList.add("no-hover");

        setTimeout(() => {
            emailElement.innerText = originalText;
            emailElement.classList.remove("no-hover");
        }, 5000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}