'use strict';

// ===== DOM ELEMENTS =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scrollTop');
const currentYearSpan = document.getElementById('current-year');

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ===== NAVIGATION =====
function initNavigation() {
  // Mobile menu toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Skip if it's an external link or resume link
      if (href.startsWith('http') || href === 'resume.html') {
        return;
      }

      e.preventDefault();
      const targetSection = document.querySelector(href);
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    });
  });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
  // Navbar background on scroll
  const handleScroll = throttle(() => {
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  }, 100);

  window.addEventListener('scroll', handleScroll);

  // Scroll to top button
  const handleScrollTop = throttle(() => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, 100);

  window.addEventListener('scroll', handleScrollTop);

  // Scroll to top functionality
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

// ===== INTERSECTION OBSERVER ANIMATIONS =====
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    '.project-card, .contact-card, .skill-tag, .timeline-item'
  );

  animateElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ===== PROJECT CARDS INTERACTIONS =====
function initProjectInteractions() {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach((card) => {
    const image = card.querySelector('.project-image img');
    const overlay = card.querySelector('.project-overlay');

    if (image && overlay) {
      card.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.05)';
        overlay.style.opacity = '1';
      });

      card.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
        overlay.style.opacity = '0';
      });
    }
  });
}

// ===== FORM VALIDATION =====
function initFormValidation() {
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      const name = contactForm.querySelector('#name').value.trim();
      const email = contactForm.querySelector('#email').value.trim();
      const message = contactForm.querySelector('#message').value.trim();

      if (!name || !email || !message) {
        e.preventDefault();
        alert('Please fill in all fields');
        return;
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        e.preventDefault();
        alert('Please enter a valid email address');
        return;
      }
    });
  }
}

// ===== SKILL TAGS INTERACTIONS =====
function initSkillInteractions() {
  const skillTags = document.querySelectorAll('.skill-tag');

  skillTags.forEach((tag) => {
    tag.addEventListener('mouseenter', () => {
      tag.style.transform = 'translateY(-4px) scale(1.05)';
    });

    tag.addEventListener('mouseleave', () => {
      tag.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// ===== TIMELINE ANIMATIONS =====
function initTimelineAnimations() {
  const timelineItems = document.querySelectorAll('.timeline-item');

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const marker = entry.target.querySelector('.timeline-marker');
          if (marker) {
            marker.style.animation = 'pulse 1s ease-in-out';
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  timelineItems.forEach((item) => {
    timelineObserver.observe(item);
  });
}

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
  const heroTitle = document.querySelector('.hero-title');
  if (!heroTitle) return;

  const text = heroTitle.textContent;
  heroTitle.textContent = '';

  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };

  // Start typing animation after a short delay
  setTimeout(typeWriter, 500);
}

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll(
    '.hero-image, .image-background'
  );

  const handleParallax = throttle(() => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    parallaxElements.forEach((element) => {
      element.style.transform = `translateY(${rate}px)`;
    });
  }, 16);

  window.addEventListener('scroll', handleParallax);
}

// ===== UTILITY FUNCTIONS =====
function updateCopyright() {
  const currentYear = new Date().getFullYear();
  if (currentYearSpan) {
    currentYearSpan.textContent = currentYear;
  }
}

function addCSSAnimations() {
  // Add pulse animation for timeline markers
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `;
  document.head.appendChild(style);
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function initPerformanceOptimizations() {
  // Lazy load images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// ===== ACCESSIBILITY IMPROVEMENTS =====
function initAccessibility() {
  // Add keyboard navigation for mobile menu
  hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      hamburger.click();
    }
  });

  // Add focus management for mobile menu
  navLinks.forEach((link) => {
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.focus();
      }
    });
  });

  // Add ARIA labels and roles
  scrollTopBtn.setAttribute('aria-label', 'Scroll to top of page');
  hamburger.setAttribute('aria-label', 'Toggle navigation menu');
  hamburger.setAttribute('aria-expanded', 'false');

  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
  });
}

// ===== INITIALIZATION =====
function init() {
  // Add CSS animations
  addCSSAnimations();

  // Initialize all functionality
  initNavigation();
  initScrollEffects();
  initScrollAnimations();
  initProjectInteractions();
  initFormValidation();
  initSkillInteractions();
  initTimelineAnimations();
  initParallaxEffects();
  initPerformanceOptimizations();
  initAccessibility();

  // Update copyright year
  updateCopyright();

  // Initialize typing animation after page load
  window.addEventListener('load', () => {
    setTimeout(initTypingAnimation, 1000);
  });
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', init);

// Handle window resize
window.addEventListener(
  'resize',
  debounce(() => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  }, 250)
);

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations when page is not visible
    document.body.style.setProperty('--transition-normal', '0ms');
  } else {
    // Resume animations when page becomes visible
    document.body.style.setProperty('--transition-normal', '250ms ease-in-out');
  }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    init,
    initNavigation,
    initScrollEffects,
    initScrollAnimations,
    debounce,
    throttle,
  };
}
