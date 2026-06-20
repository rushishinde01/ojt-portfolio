// main.js — entry point
// Imports all modules, wires all event listeners
// No module may import from main.js

import { state, setState } from './state.js';
import { getItem, setItem } from './storage.js';
import { renderTeam, renderProjects } from './render.js';

// ─── Constants ───────────────────────────────────────────────────────────────
const THEME_KEY = 'ojt-theme';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

// ─── Theme helpers ────────────────────────────────────────────────────────────

const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  setState('theme', theme);

  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.setAttribute('aria-label', theme === THEME_DARK ? 'Switch to light mode' : 'Switch to dark mode');
    btn.textContent = theme === THEME_DARK ? '☀️' : '🌙';
  }
};

const toggleTheme = () => {
  const next = state.theme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
  applyTheme(next);
  setItem(THEME_KEY, next);
};

// ─── Navbar scroll behaviour ──────────────────────────────────────────────────

const handleNavbarScroll = () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  if (window.scrollY > 10) {
    navbar.classList.add('navbar--scrolled');
  } else {
    navbar.classList.remove('navbar--scrolled');
  }
};

// ─── Mobile menu ─────────────────────────────────────────────────────────────

const toggleMobileMenu = () => {
  const nav = document.getElementById('nav-links');
  const btn = document.getElementById('menu-toggle');
  if (!nav || !btn) return;
  const isOpen = nav.classList.toggle('nav-links--open');
  btn.setAttribute('aria-expanded', String(isOpen));
  btn.textContent = isOpen ? '✕' : '☰';
};

// ─── Smooth scroll for nav links ─────────────────────────────────────────────

const bindNavLinks = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      // Close mobile menu if open
      const nav = document.getElementById('nav-links');
      const btn = document.getElementById('menu-toggle');
      if (nav && nav.classList.contains('nav-links--open')) {
        nav.classList.remove('nav-links--open');
        if (btn) {
          btn.setAttribute('aria-expanded', 'false');
          btn.textContent = '☰';
        }
      }
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
};

// ─── Contact form validation ──────────────────────────────────────────────────

const showError = (fieldId, message) => {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}-error`);
  if (!field || !errorEl) return;
  field.classList.add('input--error');
  field.setAttribute('aria-invalid', 'true');
  errorEl.textContent = message;
  errorEl.classList.add('error--visible');
};

const clearError = (fieldId) => {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}-error`);
  if (!field || !errorEl) return;
  field.classList.remove('input--error');
  field.removeAttribute('aria-invalid');
  errorEl.textContent = '';
  errorEl.classList.remove('error--visible');
};

const validateForm = (name, email, message) => {
  let valid = true;

  if (!name || name.trim().length < 2) {
    showError('contact-name', 'Name must be at least 2 characters.');
    valid = false;
  } else {
    clearError('contact-name');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    showError('contact-email', 'Please enter a valid email address.');
    valid = false;
  } else {
    clearError('contact-email');
  }

  if (!message || message.trim().length < 10) {
    showError('contact-message', 'Message must be at least 10 characters.');
    valid = false;
  } else {
    clearError('contact-message');
  }

  return valid;
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  const form = document.getElementById('contact-form');
  if (!form) return;

  const name = form.querySelector('#contact-name')?.value ?? '';
  const email = form.querySelector('#contact-email')?.value ?? '';
  const message = form.querySelector('#contact-message')?.value ?? '';

  if (!validateForm(name, email, message)) return;

  // Valid — show success, clear form
  const successMsg = document.getElementById('form-success');
  if (successMsg) {
    successMsg.classList.add('success--visible');
    setTimeout(() => successMsg.classList.remove('success--visible'), 4000);
  }
  form.reset();
};

// ─── Init ─────────────────────────────────────────────────────────────────────

const init = () => {
  // 1. Apply saved theme (or default to light)
  const savedTheme = getItem(THEME_KEY, THEME_LIGHT);
  applyTheme(savedTheme);

  // 2. Render dynamic sections
  renderTeam();
  renderProjects();

  // 3. Event listeners — theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  // 4. Mobile menu toggle
  const menuBtn = document.getElementById('menu-toggle');
  if (menuBtn) menuBtn.addEventListener('click', toggleMobileMenu);

  // 5. Scroll listener for navbar shadow
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  // 6. Smooth scroll nav links
  bindNavLinks();

  // 7. Contact form
  const form = document.getElementById('contact-form');
  if (form) form.addEventListener('submit', handleFormSubmit);

  // Live validation on blur
  ['contact-name', 'contact-email', 'contact-message'].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('blur', () => {
      const name = document.getElementById('contact-name')?.value ?? '';
      const email = document.getElementById('contact-email')?.value ?? '';
      const message = document.getElementById('contact-message')?.value ?? '';
      // Only validate the field that just lost focus
      if (id === 'contact-name') {
        name.trim().length >= 2
          ? clearError('contact-name')
          : showError('contact-name', 'Name must be at least 2 characters.');
      }
      if (id === 'contact-email') {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        re.test(email.trim())
          ? clearError('contact-email')
          : showError('contact-email', 'Please enter a valid email address.');
      }
      if (id === 'contact-message') {
        message.trim().length >= 10
          ? clearError('contact-message')
          : showError('contact-message', 'Message must be at least 10 characters.');
      }
    });
  });
};

init();
