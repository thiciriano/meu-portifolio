// Theme toggle and form validation

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const logo = document.getElementById('logo');
const themeIcon = document.getElementById('theme-icon');

function setLightMode() {
  body.classList.remove('dark');
  themeToggle.setAttribute('aria-pressed', 'false');
  // Change icon to sun (black)
  themeIcon.innerHTML = `
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  `;
}

function setDarkMode() {
  body.classList.add('dark');
  themeToggle.setAttribute('aria-pressed', 'true');
  // Change icon to moon (white)
  themeIcon.innerHTML = `
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
  `;
}

function toggleTheme() {
  if (body.classList.contains('dark')) {
    setLightMode();
  } else {
    setDarkMode();
  }
}

themeToggle.addEventListener('click', () => {
  toggleTheme();
});

// Initialize icon and mode based on stored preference or default light mode
const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'dark') {
  setDarkMode();
} else {
  setLightMode();
}

// Save theme to localStorage on toggle
themeToggle.addEventListener('click', () => {
  const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', currentTheme);
});

// Form validation and tooltip functions
const form = document.getElementById('contact-form');

function setTooltip(element, message) {
  const tooltip = document.getElementById(element.id + '-tooltip');
  if (message) {
    tooltip.textContent = message;
    tooltip.classList.add('visible');
    element.setAttribute('aria-invalid', 'true');
  } else {
    tooltip.textContent = '';
    tooltip.classList.remove('visible');
    element.removeAttribute('aria-invalid');
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let valid = true;

  if (form.name.value.trim() === '') {
    setTooltip(form.name, 'Please enter your name.');
    valid = false;
  } else {
    setTooltip(form.name, '');
  }

  if (form.email.value.trim() === '') {
    setTooltip(form.email, 'Please enter your email.');
    valid = false;
  } else if (!form.email.value.includes('@') || !form.email.value.includes('.')) {
    setTooltip(form.email, 'Please enter a valid email.');
    valid = false;
  } else {
    setTooltip(form.email, '');
  }

  if (form.message.value.trim() === '') {
    setTooltip(form.message, 'Please write a message.');
    valid = false;
  } else {
    setTooltip(form.message, '');
  }

  if (!valid) return;

  // TODO: Implement actual sending logic here
  alert('Message sent! Thank you.');

  form.reset();
});
