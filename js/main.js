document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('current-year').textContent = new Date().getFullYear();

    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            body.classList.add('no-scroll');
        } else {
            body.classList.remove('no-scroll');
        }
        
        const icon = menuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                body.classList.remove('no-scroll');
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    document.addEventListener('click', function(event) {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(event.target) && 
            !menuBtn.contains(event.target)) {
            navLinks.classList.remove('active');
            body.classList.remove('no-scroll');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    const revealOnScroll = function() {
        const elementsToReveal = document.querySelectorAll('.section-header, .about-content, .skill-item, .project-item, .social-icons, .hero-content h1, .hero-content p, .hero-buttons');
        
        elementsToReveal.forEach(element => {
            if (!element.classList.contains('revealed') && !element.classList.contains('hidden')) {
                element.classList.add('hidden');
            }
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const parent = entry.target.parentElement;
                    const children = Array.from(parent.children);
                    const index = children.indexOf(entry.target);
                    
                    let delay = 0;
                    
                    if (entry.target.classList.contains('skill-item')) {
                        delay = index * 100;
                    } else if (entry.target.classList.contains('project-item')) {
                        delay = index * 150;
                    } else if (entry.target.matches('.hero-content h1, .hero-content p, .hero-buttons, .social-icons')) {
                        const heroElementIndex = {
                            'h1': 0,
                            'p': 1,
                            'hero-buttons': 2,
                            'social-icons': 3
                        };
                        const elementType = entry.target.tagName.toLowerCase() || entry.target.classList[0];
                        delay = (heroElementIndex[elementType] || 0) * 200;
                    }
                    
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                        entry.target.classList.remove('hidden');
                        observer.unobserve(entry.target);
                    }, delay);
                }
            });
        }, { 
            threshold: 0.1,
            root: null
        });
        
        elementsToReveal.forEach(element => {
            observer.observe(element);
        });
    };
    
    revealOnScroll();

    const skillItems = document.querySelectorAll('.skill-item');
    const animateSkills = function() {
        skillItems.forEach(item => {
            const progress = item.querySelector('.progress');
            progress.style.width = '0';
            setTimeout(() => {
                const targetWidth = progress.getAttribute('data-width') || progress.style.width;
                progress.style.width = targetWidth;
            }, 100);
        });
    };

    const skillsSection = document.querySelector('.skills');
    const observeSkills = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observeSkills.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    if (skillsSection) {
        observeSkills.observe(skillsSection);
    }

    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                item.style.display = 'none';
                item.classList.remove('fadeIn');
                
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    setTimeout(() => {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.add('fadeIn');
                        }, 50);
                    }, 200);
                }
            });
        });
    });

    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        const highlightSpan = heroTitle.querySelector('.highlight');
        const highlightText = highlightSpan ? highlightSpan.textContent : '';
        
        const textBeforeHighlight = originalText.split('<span')[0];
        
        heroTitle.innerHTML = '';
        let i = 0;
        
        function typeWriter() {
            if (i < textBeforeHighlight.length) {
                heroTitle.innerHTML += textBeforeHighlight.charAt(i);
                i++;
                setTimeout(typeWriter, 150);
            } else {
                if (highlightSpan) {
                    const newSpan = document.createElement('span');
                    newSpan.className = 'highlight typing-text';
                    heroTitle.appendChild(newSpan);
                    
                    let j = 0;
                    function typeHighlight() {
                        if (j < highlightText.length) {
                            newSpan.textContent += highlightText.charAt(j);
                            j++;
                            setTimeout(typeHighlight, 200);
                        }
                    }
                    setTimeout(typeHighlight, 700);
                }
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    const floatElements = document.querySelectorAll('.about-image');
    floatElements.forEach(element => {
        element.classList.add('float');
    });

    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.classList.add('pulse');
    });

    const projectItems2 = document.querySelectorAll('.project-item');
    const observeProjects = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('flipInX');
                observeProjects.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    projectItems2.forEach(item => {
        observeProjects.observe(item);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 