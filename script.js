// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Add mobile menu styles dynamically
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            flex-direction: column;
            background-color: white;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            padding: 2rem;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(style);

// // Hero Chart Animation
// const heroCtx = document.getElementById('heroChart').getContext('2d');
// const heroChart = new Chart(heroCtx, {
//     type: 'line',
//     data: {
//         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//         datasets: [{
//             label: 'Portfolio Performance',
//             data: [100, 105, 103, 108, 112, 118],
//             borderColor: '#A31F34',
//             backgroundColor: 'rgba(163, 31, 52, 0.1)',
//             borderWidth: 3,
//             tension: 0.4
//         }, {
//             label: 'Market Index',
//             data: [100, 102, 101, 104, 106, 108],
//             borderColor: '#8A8B8C',
//             backgroundColor: 'rgba(138, 139, 140, 0.1)',
//             borderWidth: 2,
//             tension: 0.4
//         }]
//     },
//     options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//             legend: {
//                 display: true,
//                 position: 'bottom'
//             },
//             tooltip: {
//                 mode: 'index',
//                 intersect: false
//             }
//         },
//         scales: {
//             y: {
//                 beginAtZero: false,
//                 min: 95,
//                 max: 120,
//                 ticks: {
//                     callback: function(value) {
//                         return value + '%';
//                     }
//                 }
//             }
//         },
//         interaction: {
//             mode: 'nearest',
//             axis: 'x',
//             intersect: false
//         }
//     }
// });

// Sports Progress Chart
// const progressCtx = document.getElementById('progressChart').getContext('2d');
// const progressChart = new Chart(progressCtx, {
//     type: 'bar',
//     data: {
//         labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
//         datasets: [{
//             label: 'Running (km)',
//             data: [4.5, 4.8, 5.0, 5.3, 5.2, 5.5],
//             backgroundColor: '#A31F34',
//             borderRadius: 5
//         }, {
//             label: 'Swimming (km)',
//             data: [1.2, 1.3, 1.4, 1.5, 1.5, 1.6],
//             backgroundColor: '#0066CC',
//             borderRadius: 5
//         }]
//     },
//     options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//             legend: {
//                 display: true,
//                 position: 'bottom'
//             },
//             tooltip: {
//                 callbacks: {
//                     label: function(context) {
//                         return context.dataset.label + ': ' + context.parsed.y + ' km';
//                     }
//                 }
//             }
//         },
//         scales: {
//             y: {
//                 beginAtZero: true,
//                 ticks: {
//                     callback: function(value) {
//                         return value + ' km';
//                     }
//                 }
//             }
//         }
//     }
// });

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');
const animateSkills = () => {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            bar.style.width = bar.style.width || '0%';
            setTimeout(() => {
                bar.style.width = bar.parentElement.parentElement.querySelector('.skill-progress').style.width;
            }, 100);
        }
    });
};

window.addEventListener('scroll', animateSkills);
animateSkills();

// Counter animation for stats
const animateCounter = (element, target, duration = 1000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Animate counters when visible
            if (entry.target.classList.contains('stat-value')) {
                const value = parseFloat(entry.target.textContent);
                entry.target.textContent = '0';
                animateCounter(entry.target, value);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.timeline-item, .course-card, .book-card, .blog-card, .stat-card').forEach(el => {
    observer.observe(el);
});

// Add animation styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .timeline-item,
    .course-card,
    .book-card,
    .blog-card,
    .stat-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(animationStyles);

// Form submission handling (for future contact form)
const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add form handling logic here
    console.log('Form submitted');
};

// Initialize tooltips for skill levels
const initTooltips = () => {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        const progress = item.querySelector('.skill-progress');
        const width = parseInt(progress.style.width);
        let level = '';
        
        if (width >= 90) level = 'Expert';
        else if (width >= 70) level = 'Advanced';
        else if (width >= 50) level = 'Intermediate';
        else level = 'Beginner';
        
        item.setAttribute('title', `Skill Level: ${level}`);
    });
};

// Call initialization functions
document.addEventListener('DOMContentLoaded', () => {
    initTooltips();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Loading animation style
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

// Animate test scores with counting effect (with decimal support)
const animateScores = () => {
    const scoreValues = document.querySelectorAll('.score-value');
    
    scoreValues.forEach(element => {
        const targetValue = element.textContent;
        const isRatio = targetValue.includes('/');
        
        if (!isRatio && !isNaN(targetValue)) {
            // For numeric scores (including decimals)
            const target = parseFloat(targetValue); // Use parseFloat instead of parseInt
            element.textContent = '0';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(element, target, 1500);
                        observer.unobserve(element);
                    }
                });
            });
            
            observer.observe(element);
        }
    });
};

// Animate language bars on scroll
const animateLanguages = () => {
    const languageBars = document.querySelectorAll('.language-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    languageBars.forEach(bar => observer.observe(bar));
};

// Interest items hover effect with tilt
const addInterestTilt = () => {
    const interests = document.querySelectorAll('.interest-item');
    
    interests.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
};

// Add navigation links for new sections
const updateNavigation = () => {
    const navMenu = document.querySelector('.nav-menu');
    
    // Check if navigation items already exist
    if (!document.querySelector('a[href="#education"]')) {
        // Create education link
        const educationLink = document.createElement('a');
        educationLink.href = '#education';
        educationLink.className = 'nav-link';
        educationLink.textContent = 'Education';
        
        // Create additional info link
        const infoLink = document.createElement('a');
        infoLink.href = '#additional-info';
        infoLink.className = 'nav-link';
        infoLink.textContent = 'Additional Info';
        
        // Insert after Experiences link
        const experiencesLink = document.querySelector('a[href="#experiences"]');
        if (experiencesLink) {
            experiencesLink.insertAdjacentElement('afterend', educationLink);
            educationLink.insertAdjacentElement('afterend', infoLink);
        }
        
        // Re-apply smooth scrolling to new links
        [educationLink, infoLink].forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
};

// Animate education timeline
const animateEducationTimeline = () => {
    const educationItems = document.querySelectorAll('.education-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    educationItems.forEach(item => observer.observe(item));
};

// Stagger animation for interests grid
const animateInterestsGrid = () => {
    const interestsGrid = document.querySelector('.interests-grid');
    const interestItems = document.querySelectorAll('.interest-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                interestItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate-in');
                    }, index * 100);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    if (interestsGrid) {
        observer.observe(interestsGrid);
    }
};

// Initialize new section animations
document.addEventListener('DOMContentLoaded', () => {
    // Update navigation
    updateNavigation();
    
    // Initialize animations
    animateScores();
    animateLanguages();
    addInterestTilt();
    animateEducationTimeline();
    animateInterestsGrid();
    
    // Add new sections to intersection observer
    const newElements = document.querySelectorAll('.education-item, .info-card');
    newElements.forEach(el => {
        observer.observe(el);
    });
});

// Update active navigation on scroll to include new sections
const updateActiveNavOnScroll = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
};

// Call the update function
updateActiveNavOnScroll();

// Progress circle animation for test scores (optional enhancement)
const createProgressCircle = (element, percentage) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100 * circumference);
    
    const svg = `
        <svg width="100" height="100" class="progress-circle">
            <circle
                cx="50"
                cy="50"
                r="${radius}"
                stroke="#e0e0e0"
                stroke-width="5"
                fill="none"
            />
            <circle
                cx="50"
                cy="50"
                r="${radius}"
                stroke="#A31F34"
                stroke-width="5"
                fill="none"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${offset}"
                transform="rotate(-90 50 50)"
                class="progress-circle-fill"
            />
        </svg>
    `;
    element.innerHTML = svg + element.innerHTML;
};

// Add custom cursor for interests (optional enhancement)
const addCustomCursor = () => {
    const interests = document.querySelectorAll('.interest-item');
    
    interests.forEach(item => {
        item.addEventListener('mouseenter', () => {
            document.body.style.cursor = 'pointer';
        });
        
        item.addEventListener('mouseleave', () => {
            document.body.style.cursor = 'default';
        });
    });
};