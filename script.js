document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle (Assuming .theme-toggle exists if this code is active)
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const body = document.body;
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-moon');
                icon.classList.toggle('fa-sun');
            }
        });
    }

    // Navbar scroll effect (Assuming .sticky-nav exists if this code is active)
    const nav = document.querySelector('nav.fixed'); // More specific selector for your existing nav
    if (nav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled'); // You'll need to define .scrolled CSS if you want an effect
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu Functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.getElementById('close-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');

    // Log if elements are not found - crucial for debugging!
    if (!mobileMenuButton) console.error("Mobile menu button (mobile-menu-button) not found!");
    if (!closeMenuButton) console.error("Close menu button (close-menu-button) not found!");
    if (!mobileMenu) console.error("Mobile menu element (mobile-menu) not found!");
    if (!mobileMenuOverlay) console.error("Mobile menu overlay (mobile-menu-overlay) not found!");

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    closeMenuButton.addEventListener('click', toggleMobileMenu);
    mobileMenuOverlay.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking on a nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Smooth scrolling for ALL navigation items (desktop and mobile)
    // AND close mobile menu if a mobile nav item is clicked
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            const targetId = this.getAttribute('data-section');
            const targetElement = document.getElementById(targetId);
            
            // Determine if the click is from within the mobile menu, and if the mobile menu is currently open
            let isClickInsideOpenMobileMenu = false;
            if (mobileMenu && mobileMenuOverlay) { // Ensure elements exist
                 // Check based on the style that opens the menu
                isClickInsideOpenMobileMenu = (mobileMenu.style.transform === 'translateX(0)' && mobileMenu.contains(this));
            }

            if (targetElement) {
                e.preventDefault(); // Prevent default anchor behavior ONLY for valid internal section links

                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust 70px offset if your fixed header height changes
                    behavior: 'smooth'
                });

                // If the click originated from an item within the open mobile menu, close the menu.
                if (isClickInsideOpenMobileMenu) {
                    toggleMobileMenu();
                }
            } else {
                // If it's not a section link (no targetElement), but the click is inside an open mobile menu
                // (e.g., a hypothetical external link in the mobile menu), still close the menu.
                if (isClickInsideOpenMobileMenu) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // Animate elements when they come into view
    const animateOnScrollElements = document.querySelectorAll('.animate__animated');
    const animateOnScroll = function() {
        animateOnScrollElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) { // Adjust offset as needed
                // Add animation classes; assumes initial classes are like 'animate__fadeInLeft' but not yet active
                // This part of your original script might need adjustment if animations aren't triggering as expected.
                // The original logic was:
                // element.classList.forEach(cls => {
                //     if (cls.startsWith('animate__') && cls !== 'animate__animated') {
                //         element.classList.add(cls); // This re-adds existing classes, effectively trying to restart animation.
                //     }
                // });
                // A common pattern is to add a class like 'animate__active' or ensure the animation class is added once.
                // For Animate.css, simply ensuring the element has 'animate__animated' and 'animate__fadeInLeft' (for example)
                // and then becomes visible should trigger it. If you want to re-trigger, you might need to remove and re-add classes.
                // For simplicity, let's assume the classes are on the element and Animate.css handles visibility.
            }
        });
    };
    if (animateOnScrollElements.length > 0) {
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Run once on page load
    }


    // Skill progress animation
    const skillCards = document.querySelectorAll('.bg-white\\/10.backdrop-blur-sm.rounded-xl.p-6'); // More specific selector for skill cards
    const animateSkills = () => {
        skillCards.forEach(card => {
            const progressElement = card.querySelector('.bg-gradient.h-2\\.5.rounded-full'); // Skill progress bar
            if (progressElement) { // Check if progress element exists
                const cardPosition = card.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (cardPosition < windowHeight - 50) { // Adjust offset
                    // The original script had: progress.style.width = progress.style.width;
                    // This doesn't actually change anything. You need to set it to its target width.
                    // Assuming the target width is already set in the HTML style attribute.
                    // To animate it with JS, you'd typically read a data-width attribute and set it.
                    // For now, if HTML 'style="width: XX%"' is set, it should be fine.
                    // If you want JS to trigger an animation, you'd do something like:
                    // const targetWidth = progressElement.getAttribute('data-target-width') || '0%';
                    // progressElement.style.width = targetWidth;
                }
            }
        });
    };
    if (skillCards.length > 0) {
        window.addEventListener('scroll', animateSkills);
        animateSkills(); // Run once on page load
    }

    // Project cards hover effect (from original script, assuming .project-card exists)
    const projectCards = document.querySelectorAll('.project-card'); // Ensure this class exists on your project cards
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Form submission with validation
    const contactForm = document.querySelector('form.bg-white\\/10'); // Selector for your contact form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[placeholder="Your Name"]');
            const emailInput = this.querySelector('input[placeholder="Your Email"]');
            const subjectInput = this.querySelector('input[placeholder="Subject"]');
            const messageInput = this.querySelector('textarea[placeholder="Your Message"]');
            const submitBtn = this.querySelector('button[type="submit"]');

            if (!nameInput || !emailInput || !subjectInput || !messageInput || !submitBtn) {
                console.error("Form elements not found!");
                showNotification('Form error. Please refresh.', 'error');
                return;
            }

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const subject = subjectInput.value.trim();
            const message = messageInput.value.trim();
            
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Message sent successfully!', 'success');
                submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane ml-2"></i>';
                submitBtn.disabled = false;
                this.reset();
            }, 1500);
        });
    }

    // Notification system
    function showNotification(message, type) {
        const notification = document.createElement('div');
        // Basic Tailwind classes for notification styling - you can customize these
        notification.className = `fixed top-5 right-5 p-4 rounded-lg shadow-lg text-white text-sm z-[1001] transition-all duration-300 transform translate-x-full`;
        notification.classList.add(type === 'success' ? 'bg-green-500' : 'bg-red-500');
        
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Trigger slide-in animation
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
            notification.classList.add('translate-x-0');
        }, 100); // Short delay to allow element to be added to DOM
        
        // Auto-hide notification
        setTimeout(() => {
            notification.classList.add('opacity-0'); // Fade out
            setTimeout(() => {
                notification.remove();
            }, 300); // Remove after fade
        }, 3000);
    }

    // Email validation helper
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Typewriter effect for the name
    const typewriterElement = document.getElementById('typewriter-name');
    if (typewriterElement) {
        const fullText = typewriterElement.textContent || ""; // Ensure fullText is not null
        typewriterElement.textContent = ''; // Clear existing text
        let i = 0;
        
        function typeWriter() {
            if (i < fullText.length) {
                typewriterElement.textContent += fullText.charAt(i);
                i++;
                setTimeout(typeWriter, 100); // Adjust typing speed (milliseconds)
            }
        }
        if (fullText) typeWriter(); // Start typing
    }

    // Function to highlight active navigation item
    function highlightActiveNavItem() {
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-item');
        
        // Get current scroll position
        const scrollPosition = window.scrollY + 100; // Adding offset for better detection

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // Check if current scroll position is within this section
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav items
                navItems.forEach(item => {
                    item.classList.remove('text-primary');
                    item.classList.remove('after:w-full');
                });

                // Add active class to corresponding nav item
                const activeNavItem = document.querySelector(`.nav-item[data-section="${sectionId}"]`);
                if (activeNavItem) {
                    activeNavItem.classList.add('text-primary');
                    activeNavItem.classList.add('after:w-full');
                }
            }
        });
    }

    // Add scroll event listener for highlighting active nav item
    window.addEventListener('scroll', highlightActiveNavItem);
    
    // Run once on page load to set initial active state
    highlightActiveNavItem();

});
