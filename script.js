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
  // 4. Mobile Navigation Toggle (Burger Menu & Backdrop)
  // -------------------------------------------------------------------------
  // Burger Menu Toggle Logic:
  // - Responsive Design: On screens <= 768px, desktop navigation links are hidden,
  //   and the hamburger button is displayed.
  // - JavaScript Interactivity: Clicking the burger icon toggles the '.open' class
  //   on the mobile navMenu and the '.active' class on the burger button and backdrop.
  // - Accessibility: Updates aria-expanded attribute to reflect open/closed state.
  // - UX Requirement: Clicking any navigation link inside the mobile menu
  //   automatically closes the menu and unlocks body scrolling.
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navBackdrop = document.getElementById('navBackdrop');
  const navLinks = document.querySelectorAll('.nav-link');
  const allNavActionLinks = navMenu ? navMenu.querySelectorAll('a') : [];

  function toggleMenu(forceState) {
    if (!hamburgerBtn || !navMenu) return;

    const isOpen = typeof forceState === 'boolean' 
      ? forceState 
      : !navMenu.classList.contains('open');

    // Toggle active/open classes
    hamburgerBtn.classList.toggle('active', isOpen);
    navMenu.classList.toggle('open', isOpen);
    if (navBackdrop) {
      navBackdrop.classList.toggle('active', isOpen);
    }
    hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

    // Prevent background scrolling while menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (hamburgerBtn && navMenu) {
    // Click event to toggle mobile menu
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // UX Requirement: Automatically close menu when any link inside is clicked
    allNavActionLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          toggleMenu(false);
        }
      });
    });

    // Close on backdrop click
    if (navBackdrop) {
      navBackdrop.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          toggleMenu(false);
        }
      });
    }

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        toggleMenu(false);
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleMenu(false);
      }
    });

    // Handle viewport resize: restore scroll if resized above 768px
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
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

  // =========================================================================
  // 10. TEAM MEMBERS SECTION (ASYNC FETCH API - JSONPlaceholder)
  // =========================================================================
  /**
   * Explanation of Async Fetch API Implementation:
   * - Uses modern ES6+ async/await syntax to perform asynchronous HTTP requests
   *   to the JSONPlaceholder REST API endpoint ('https://jsonplaceholder.typicode.com/users').
   * - UI Feedback: Displays a spinner loading indicator while awaiting the response.
   * - Robust Error Handling: Wraps execution in try...catch to intercept network failures
   *   or non-2xx HTTP status codes (response.ok check), gracefully showing an error alert with a retry button.
   * - Responsive DOM Rendering: Iterates over the returned array of user objects and renders
   *   structured cards displaying Name, @Username, active mailto: link, Company Name,
   *   external Website link, and an interactive 'View Posts' button.
   */
  const teamGrid = document.getElementById('teamGrid');
  const teamLoading = document.getElementById('teamLoading');
  const teamError = document.getElementById('teamError');
  const teamErrorMessage = document.getElementById('teamErrorMessage');
  const retryTeamBtn = document.getElementById('retryTeamBtn');

  async function fetchTeamMembers() {
    if (!teamGrid || !teamLoading) return;

    // Display loading state and hide error/grid containers
    teamLoading.style.display = 'flex';
    if (teamError) teamError.style.display = 'none';
    teamGrid.style.display = 'none';
    teamGrid.innerHTML = '';

    try {
      // Perform asynchronous GET request using fetch API
      const response = await fetch('https://jsonplaceholder.typicode.com/users');

      // Check if HTTP response status is within the 200-299 range
      if (!response.ok) {
        throw new Error(`Server returned HTTP status ${response.status}: ${response.statusText}`);
      }

      // Parse JSON response body asynchronously
      const users = await response.json();

      // Render user cards into DOM
      renderTeamMembers(users);

      // Hide loading spinner and display populated grid
      teamLoading.style.display = 'none';
      teamGrid.style.display = 'grid';
    } catch (error) {
      // Catch and handle any network or runtime errors
      console.error('Failed to fetch team members:', error);
      teamLoading.style.display = 'none';
      if (teamError) {
        teamError.style.display = 'block';
        if (teamErrorMessage) {
          teamErrorMessage.textContent = error.message || 'Unable to load team members from the API. Please check your connection and try again.';
        }
      }
    }
  }

  function renderTeamMembers(users) {
    if (!teamGrid || !Array.isArray(users)) return;

    teamGrid.innerHTML = users.map(user => {
      // Extract initials for stylized visual badge
      const initials = (user.name || 'LF')
        .split(' ')
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

      // Ensure website link has a protocol for secure external navigation
      const websiteUrl = user.website.startsWith('http://') || user.website.startsWith('https://')
        ? user.website
        : `https://${user.website}`;

      return `
        <article class="glass-card team-card">
          <div class="team-card-top">
            <div class="team-card-header">
              <div class="team-avatar-badge">${escapeHtml(initials)}</div>
              <div class="team-header-meta">
                <h3 class="team-card-name">${escapeHtml(user.name)}</h3>
                <span class="team-card-username">@${escapeHtml(user.username)}</span>
              </div>
            </div>

            <div class="team-card-info">
              <div class="team-info-row">
                <i class="fa-regular fa-envelope"></i>
                <a href="mailto:${escapeHtml(user.email)}" class="team-info-link" title="Send email to ${escapeHtml(user.name)}">
                  ${escapeHtml(user.email)}
                </a>
              </div>
              <div class="team-info-row">
                <i class="fa-solid fa-building"></i>
                <span class="team-company-text">${escapeHtml(user.company?.name || 'Independent')}</span>
              </div>
              <div class="team-info-row">
                <i class="fa-solid fa-globe"></i>
                <a href="${escapeHtml(websiteUrl)}" target="_blank" rel="noopener noreferrer" class="team-info-link team-website-link" title="Visit website (opens in new tab)">
                  ${escapeHtml(user.website)} <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.72rem; margin-left: 2px;"></i>
                </a>
              </div>
            </div>
          </div>

          <div class="team-card-footer">
            <button class="btn btn-outline btn-sm view-posts-btn" 
                    data-user-id="${user.id}" 
                    data-user-name="${escapeHtml(user.name)}"
                    aria-label="View posts by ${escapeHtml(user.name)}">
              <i class="fa-solid fa-file-lines"></i> View Posts
            </button>
          </div>
        </article>
      `;
    }).join('');

    // Attach click listeners to all dynamically created "View Posts" buttons
    const viewPostsButtons = teamGrid.querySelectorAll('.view-posts-btn');
    viewPostsButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const userId = e.currentTarget.getAttribute('data-user-id');
        const userName = e.currentTarget.getAttribute('data-user-name');
        openPostsModal(userId, userName);
      });
    });
  }

  // Handle retry button click
  if (retryTeamBtn) {
    retryTeamBtn.addEventListener('click', () => {
      fetchTeamMembers();
    });
  }

  // Initial load of team members
  fetchTeamMembers();

  // =========================================================================
  // 11. CUSTOM FEATURE: POSTS INTEGRATION (JSONPlaceholder Posts API)
  // =========================================================================
  /**
   * Explanation of Dynamic Posts Fetching:
   * - Triggered when user clicks 'View Posts' on any team card.
   * - Dynamically constructs API URL with query parameter:
   *   'https://jsonplaceholder.typicode.com/posts?userId={USER_ID}'
   * - Shows a modal loading spinner while fetching, and uses try...catch to handle errors.
   * - Renders post title and body for each item inside a sleek modal window.
   */
  const postsModal = document.getElementById('postsModal');
  const modalUserName = document.getElementById('modalUserName');
  const modalLoading = document.getElementById('modalLoading');
  const modalError = document.getElementById('modalError');
  const modalErrorMessage = document.getElementById('modalErrorMessage');
  const modalPostsBody = document.getElementById('modalPostsBody');
  const modalPostsList = document.getElementById('modalPostsList');
  const modalPostsCount = document.getElementById('modalPostsCount');
  const closeModalBtn = document.getElementById('closeModalBtn');

  async function openPostsModal(userId, userName) {
    if (!postsModal) return;

    // Set user title in modal header
    if (modalUserName) modalUserName.textContent = `Posts by ${userName}`;

    // Reset modal states
    if (modalLoading) modalLoading.style.display = 'flex';
    if (modalError) modalError.style.display = 'none';
    if (modalPostsBody) modalPostsBody.style.display = 'none';
    if (modalPostsList) modalPostsList.innerHTML = '';

    // Reveal modal with smooth animation
    postsModal.style.display = 'flex';
    requestAnimationFrame(() => {
      postsModal.classList.add('open');
    });
    document.body.style.overflow = 'hidden';

    try {
      // Async fetch to retrieve posts for the specific user ID
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

      if (!response.ok) {
        throw new Error(`Failed to load posts (status ${response.status})`);
      }

      const posts = await response.json();

      // Render posts into the modal body
      renderUserPosts(posts);

      if (modalLoading) modalLoading.style.display = 'none';
      if (modalPostsBody) modalPostsBody.style.display = 'block';
    } catch (err) {
      console.error('Fetch User Posts Error:', err);
      if (modalLoading) modalLoading.style.display = 'none';
      if (modalError) {
        modalError.style.display = 'block';
        if (modalErrorMessage) {
          modalErrorMessage.textContent = err.message || 'Unable to retrieve posts. Please try again.';
        }
      }
    }
  }

  function renderUserPosts(posts) {
    if (!modalPostsList) return;

    if (!Array.isArray(posts) || posts.length === 0) {
      modalPostsList.innerHTML = '<p class="text-secondary" style="text-align: center; padding: 2rem;">No posts found for this user.</p>';
      if (modalPostsCount) modalPostsCount.textContent = '0 posts';
      return;
    }

    if (modalPostsCount) {
      modalPostsCount.textContent = `${posts.length} publication${posts.length === 1 ? '' : 's'} available`;
    }

    modalPostsList.innerHTML = posts.map((post, index) => `
      <article class="post-item-card">
        <div class="post-item-header">
          <span class="post-id-tag">#${index + 1}</span>
          <h4 class="post-item-title">${escapeHtml(post.title)}</h4>
        </div>
        <p class="post-item-body">${escapeHtml(post.body)}</p>
      </article>
    `).join('');
  }

  function closePostsModal() {
    if (!postsModal) return;
    postsModal.classList.remove('open');
    setTimeout(() => {
      postsModal.style.display = 'none';
      // Only restore scroll if mobile nav menu is closed
      if (!navMenu || !navMenu.classList.contains('open')) {
        document.body.style.overflow = '';
      }
    }, 300);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closePostsModal);
  }

  if (postsModal) {
    // Close modal when clicking the dimmed backdrop
    postsModal.addEventListener('click', (e) => {
      if (e.target === postsModal) {
        closePostsModal();
      }
    });
  }

  // Close modal when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && postsModal && postsModal.classList.contains('open')) {
      closePostsModal();
    }
  });

  function escapeHtml(string) {
    const div = document.createElement('div');
    div.textContent = string;
    return div.innerHTML;
  }
});

