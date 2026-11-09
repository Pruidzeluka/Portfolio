/**
 * LUKA FRUIDZE - PORTFOLIO INTERACTION ENGINE
 * Vanilla JavaScript (No heavy frameworks, ultra-fast & accessible)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year in Footer
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // -------------------------------------------------------------------------
  // 2. Typewriter Effect in Hero
  // -------------------------------------------------------------------------
  const typewriterText = document.getElementById('typewriterText');
  const phrases = [
    'Software & Web Developer',
    'TBC Academy Full-Stack Student',
    'Clean Code & UI Specialist',
    'Modern Web Architect'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  function handleTypewriter() {
    if (!typewriterText) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at full word
      typeSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400;
    }

    setTimeout(handleTypewriter, typeSpeed);
  }

  handleTypewriter();

  // -------------------------------------------------------------------------
  // 3. Header Scroll Glassmorphic Effect
  // -------------------------------------------------------------------------
  const header = document.getElementById('header');
  const scrollTopBtn = document.getElementById('scrollToTopBtn');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Header background blur on scroll
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scroll to Top visibility
    if (scrollTopBtn) {
      if (scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // -------------------------------------------------------------------------
  // 4. Mobile Navigation Toggle
  // -------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMenu(forceState) {
    const isOpen = typeof forceState === 'boolean' 
      ? forceState 
      : !navMenu.classList.contains('open');

    hamburgerBtn.classList.toggle('active', isOpen);
    navMenu.classList.toggle('open', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => toggleMenu());

    // Close when clicking links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          toggleMenu(false);
        }
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        toggleMenu(false);
      }
    });
  }

  // -------------------------------------------------------------------------
  // 5. Active Link Highlight on Scroll (IntersectionObserver)
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  const navObserverOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, navObserverOptions);

  sections.forEach(sec => navObserver.observe(sec));

  // -------------------------------------------------------------------------
  // 6. Interactive Spotlight Glow on Cards
  // -------------------------------------------------------------------------
  const glassCards = document.querySelectorAll('.glass-card');

  glassCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // -------------------------------------------------------------------------
  // 7. Toast Notification Utility
  // -------------------------------------------------------------------------
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimeout;

  function showToast(message, duration = 3000) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = message;

    clearTimeout(toastTimeout);
    toast.classList.add('show');

    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // -------------------------------------------------------------------------
  // 8. Copy Email to Clipboard
  // -------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const emailAddressText = document.getElementById('emailAddressText');

  if (copyEmailBtn && emailAddressText) {
    copyEmailBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const email = emailAddressText.textContent.trim();
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback
          const tempInput = document.createElement('input');
          tempInput.value = email;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }
        showToast('Email copied to clipboard!');
        
        // Visual button confirmation
        const icon = copyEmailBtn.querySelector('i');
        if (icon) {
          icon.className = 'fa-solid fa-check text-emerald';
          setTimeout(() => {
            icon.className = 'fa-regular fa-copy';
          }, 2000);
        }
      } catch (err) {
        showToast('Could not copy email, please select manually.');
      }
    });
  }

  // -------------------------------------------------------------------------
  // 9. Contact Form Handling & Validation
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const senderName = document.getElementById('senderName');
  const senderEmail = document.getElementById('senderEmail');
  const messageBody = document.getElementById('messageBody');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const btnIcon = document.getElementById('btnIcon');
  const formStatusAlert = document.getElementById('formStatusAlert');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function clearErrors() {
    [senderName, senderEmail, messageBody].forEach(input => {
      if (input) input.classList.remove('input-error');
    });
    [nameError, emailError, messageError].forEach(msg => {
      if (msg) msg.classList.remove('visible');
    });
    if (formStatusAlert) {
      formStatusAlert.style.display = 'none';
      formStatusAlert.className = 'form-status-alert';
      formStatusAlert.textContent = '';
    }
  }

  if (contactForm) {
    // Clear errors when typing
    [senderName, senderEmail, messageBody].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('input-error');
          const err = input.parentElement.parentElement.querySelector('.error-msg');
          if (err) err.classList.remove('visible');
        });
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      let isValid = true;

      // Name Check
      if (!senderName.value.trim()) {
        senderName.classList.add('input-error');
        nameError.classList.add('visible');
        isValid = false;
      }

      // Email Check
      if (!senderEmail.value.trim() || !validateEmail(senderEmail.value.trim())) {
        senderEmail.classList.add('input-error');
        emailError.classList.add('visible');
        isValid = false;
      }

      // Message Check
      if (!messageBody.value.trim() || messageBody.value.trim().length < 10) {
        messageBody.classList.add('input-error');
        messageError.classList.add('visible');
        isValid = false;
      }

      if (!isValid) return;

      // Simulate sending state
      submitBtn.disabled = true;
      const originalText = btnText.textContent;
      btnText.textContent = 'Sending Message...';
      btnIcon.className = 'fa-solid fa-spinner fa-spin';

      setTimeout(() => {
        submitBtn.disabled = false;
        btnText.textContent = originalText;
        btnIcon.className = 'fa-solid fa-paper-plane';

        // Show success alert
        if (formStatusAlert) {
          formStatusAlert.style.display = 'flex';
          formStatusAlert.className = 'form-status-alert success';
          formStatusAlert.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you, ' + escapeHtml(senderName.value.trim()) + '! Your message has been sent successfully.';
        }

        contactForm.reset();
        showToast('Message sent! Luka will be in touch soon.');
      }, 1200);
    });
  }

  function escapeHtml(string) {
    const div = document.createElement('div');
    div.textContent = string;
    return div.innerHTML;
  }
});

