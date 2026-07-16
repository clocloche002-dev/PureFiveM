document.addEventListener('DOMContentLoaded', () => {
  
  // --- HEADER & SCROLL EFFECTS ---
  const header = document.getElementById('header');
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- MOBILE MENU TOGGLE ---
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // --- ACTIVE LINK SPY ON SCROLL ---
  const sections = document.querySelectorAll('section');
  const navLinksList = document.querySelectorAll('.nav-links .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinksList.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // --- INTERACTIVE PRICE CALCULATOR ---
  const serviceSelect = document.getElementById('service-select');
  const checkboxes = document.querySelectorAll('.option-checkbox');
  const summaryBase = document.getElementById('summary-base');
  const summaryOptions = document.getElementById('summary-options');
  const summaryTotal = document.getElementById('summary-total');

  const basePrices = {
    'none': 0,
    'starter': 55,
    'premium': 70,
    'custom': 110
  };

  function updatePrices() {
    const selectedService = serviceSelect.value;
    const basePrice = basePrices[selectedService] || 0;
    
    let optionsPrice = 0;
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        optionsPrice += parseFloat(checkbox.dataset.price);
      }
    });

    const totalPrice = basePrice + optionsPrice;

    // Update UI
    if (selectedService === 'custom') {
      summaryBase.textContent = `${basePrice}.00€ (Acompte)`;
    } else {
      summaryBase.textContent = `${basePrice}.00€`;
    }

    summaryOptions.textContent = `${optionsPrice}.00€`;
    
    if (selectedService === 'custom') {
      summaryTotal.textContent = `${totalPrice}.00€ *`;
    } else {
      summaryTotal.textContent = `${totalPrice}.00€`;
    }
  }

  if (serviceSelect) {
    serviceSelect.addEventListener('change', updatePrices);
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updatePrices);
    });
  }

  // --- PACK SELECTION FROM PRICING SECTION ---
  const selectPackButtons = document.querySelectorAll('.select-pack');
  selectPackButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pack = btn.dataset.pack;
      if (serviceSelect) {
        serviceSelect.value = pack;
        updatePrices();
      }
    });
  });

  // --- ORDER FORM SUBMISSION & SUCCESS MODAL ---
  const orderForm = document.getElementById('order-form');
  const submitButton = document.getElementById('btn-submit-order');
  const successOverlay = document.getElementById('success-overlay');
  const closeSuccessBtn = document.getElementById('btn-close-success');

  if (orderForm) {
    // We attach the submit handler to the form
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Animate submit button text or loading state
      const originalText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = '<span>Traitement...</span>';

      // Simulate a small network delay
      setTimeout(() => {
        // Reset submit button state
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;

        // Show Success Overlay
        successOverlay.classList.add('active');

        // Reset the form
        orderForm.reset();
        updatePrices();
      }, 1200);
    });
  }

  if (closeSuccessBtn && successOverlay) {
    closeSuccessBtn.addEventListener('click', () => {
      successOverlay.classList.remove('active');
    });

    // Close success overlay on clicking outside of it
    successOverlay.addEventListener('click', (e) => {
      if (e.target === successOverlay) {
        successOverlay.classList.remove('active');
      }
    });
  }
});
