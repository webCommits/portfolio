// src/static/js/script.js

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navList.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (mobileMenuToggle && mobileMenuToggle.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        navList.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
      
      // Scroll to target
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Scroll Indicator Click
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      const aboutSection = document.querySelector('#about');
      if (aboutSection) {
        const headerOffset = 80;
        const elementPosition = aboutSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  }
  
  // Reveal Elements on Scroll
  const revealElements = document.querySelectorAll('.reveal-element');
  const revealThreshold = 0.15;
  
  const revealOnScroll = function() {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = window.innerHeight * revealThreshold;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  };
  
  // Initial check on load
  revealOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', revealOnScroll);
  
  // Header scroll behavior
  const header = document.querySelector('.site-header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
      header.style.opacity = '0';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
      header.style.opacity = '1';
    }
    
    if (scrollTop > 50) {
      header.style.backgroundColor = 'rgba(30, 30, 46, 0.95)';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.backgroundColor = 'rgba(30, 30, 46, 0.8)';
      header.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
  });
  
  // Active nav link on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      const scrollPosition = window.pageYOffset;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
  
  // Form submission handling
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Here you would typically add form validation and AJAX submission
      const formData = new FormData(this);
      const formEntries = Object.fromEntries(formData.entries());
      
      // Simulate form submission
      console.log('Form data submitted:', formEntries);
      
      // Show success message
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      submitButton.disabled = true;
      submitButton.textContent = 'Gesendet!';
      
      // Reset form
      setTimeout(() => {
        contactForm.reset();
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }, 2000);
    });
  }
  
  // Portfolio item hover effect
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.querySelector('.portfolio-overlay').style.opacity = '1';
    });
    
    item.addEventListener('mouseleave', function() {
      this.querySelector('.portfolio-overlay').style.opacity = '0';
    });
  });
  
  // Add CSS class for page load animations
  document.body.classList.add('page-loaded');
});

// Parallax effect on hero section
const heroSection = document.querySelector('.section-hero');

if (heroSection) {
  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    heroSection.style.backgroundPosition = `center ${scrollPosition * parallaxSpeed}px`;
  });
}

// Typewriter effect for hero section (optional)
function initTypewriter() {
  const titleElement = document.querySelector('.title');
  
  if (!titleElement) return;
  
  const textToType = titleElement.textContent;
  titleElement.textContent = '';
  titleElement.style.borderRight = '2px solid var(--primary)';
  
  let charIndex = 0;
  const typingSpeed = 100;
  
  function typeText() {
    if (charIndex < textToType.length) {
      titleElement.textContent += textToType.charAt(charIndex);
      charIndex++;
      setTimeout(typeText, typingSpeed);
    } else {
      titleElement.style.borderRight = 'none';
    }
  }
  
  setTimeout(typeText, 1000); // Start after a delay
}

// Uncomment to enable typewriter effect
// initTypewriter();

// Animated counter for statistics (can be added to About section)
function animateCounter(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const currentValue = Math.floor(progress * (end - start) + start);
    element.textContent = currentValue;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = end;
    }
  };
  window.requestAnimationFrame(step);
}

// Initialize counters when they come into view
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  
  if (counters.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const endValue = parseInt(target.getAttribute('data-count'), 10);
        animateCounter(target, 0, endValue, 2000);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// Uncomment to enable counter animations if you add them
// initCounters();
