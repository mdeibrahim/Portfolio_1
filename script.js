document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const nav = document.querySelector('.sticky-nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    

    // Smooth scrolling for navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.textContent.toLowerCase();
            let targetElement;
            
            if (targetId === 'home') {
                targetElement = document.querySelector('.banner');
            } else {
                targetElement = document.querySelector(`.${targetId}_section`);
            }
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate__animated');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.forEach(cls => {
                    if (cls.startsWith('animate__') && cls !== 'animate__animated') {
                        element.classList.add(cls);
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // 3D tilt effect for project cards
    // const projectCards = document.querySelectorAll('.project-card');
    
    // projectCards.forEach(card => {
    //     card.addEventListener('mousemove', (e) => {
    //         const xAxis = (window.innerWidth / 2- e.pageX) / 15;
    //         const yAxis = (window.innerHeight /2 - e.pageY) / 15;
    //         // card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    //     });
        
    //     card.addEventListener('mouseenter', () => {
    //         card.style.transition = 'none';
    //     });
        
    //     card.addEventListener('mouseleave', () => {
    //         card.style.transition = 'all 0.5s ease';
    //         // card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    //     });
    // });

    // Form submission
    const contactForm = document.querySelector('.contact_form_inner');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('.submit-btn');
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                setTimeout(() => {
                    submitBtn.innerHTML = 'Submit <i class="fas fa-paper-plane"></i>';
                    submitBtn.disabled = false;
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Typewriter effect for the name
    const typewriterElement = document.getElementById('typewriter-name');
    if (typewriterElement) {
        const fullText = typewriterElement.textContent;
        typewriterElement.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < fullText.length) {
                typewriterElement.textContent += fullText.charAt(i);
                i++;
                setTimeout(typeWriter, 100); // Adjust speed here (ms)
            }
        }
        typeWriter();
    }
});