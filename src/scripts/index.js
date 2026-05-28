/* Scripts extraídos de index.html */

'use strict';

import flatpickr from 'flatpickr';
import { Portuguese } from 'flatpickr/dist/l10n/pt.js';
import 'flatpickr/dist/flatpickr.min.css';

    /* ─── NAV scroll shrink ─── */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    /* ─── Mobile menu ─── */
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('a');
    const spans = hamburger.querySelectorAll('span');
    let menuOpen = false;

    function toggleMenu(open) {
      menuOpen = typeof open === 'boolean' ? open : !menuOpen;
      if (menuOpen) {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
        hamburger.setAttribute('aria-label', 'Fechar menu');
        spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
      } else {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-label', 'Abrir menu');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
      }
    }

    hamburger.addEventListener('click', () => toggleMenu());
    mobileLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (menuOpen) toggleMenu(false);
        if (waPopup && waPopup.classList.contains('is-open')) closeWaModal();
      }
    });

    /* ─── WhatsApp phone mask ─── */
    function applyPhoneMask(input) {
      input.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 11) v = v.slice(0, 11);
        if (v.length > 6) {
          v = '(' + v.slice(0,2) + ') ' + v.slice(2,7) + '-' + v.slice(7);
        } else if (v.length > 2) {
          v = '(' + v.slice(0,2) + ') ' + v.slice(2);
        } else if (v.length > 0) {
          v = '(' + v;
        }
        e.target.value = v;
      });
    }
    document.querySelectorAll('input[name="telefone"]').forEach(applyPhoneMask);

    /* ─── Flatpickr — calendário de data ─── */
    const flatpickrConfig = {
      dateFormat: 'd/m/Y',
      locale: Portuguese,
      minDate: 'today',
      disableMobile: false,
      allowInput: true,
    };
    document.querySelectorAll('input[name="data"]').forEach((el) => {
      flatpickr(el, flatpickrConfig);
    });

    /* ─── Popup WhatsApp ─── */
    const openWaBtn = document.getElementById('openWaModal');
    const waBackdrop = document.getElementById('waModalOverlay');
    const waPopup   = document.getElementById('waPopup');
    const closeWaBtn = document.getElementById('closeWaModal');

    function closeWaModal() {
      waBackdrop.classList.remove('is-open');
      waPopup.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    if (openWaBtn && waPopup) {
      openWaBtn.addEventListener('click', () => {
        waBackdrop.classList.add('is-open');
        waPopup.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
      if (closeWaBtn) closeWaBtn.addEventListener('click', closeWaModal);
      waBackdrop.addEventListener('click', closeWaModal);
    }

    /* ─── IntersectionObserver scroll reveals ─── */
    const revealTargets = document.querySelectorAll(
      '.sobre-content, .hospedagem-header, .hosp-card, .cerim-content, .festa-content, .depoimento, .contato-info, .contato-form-wrap'
    );

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealTargets.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';
      el.style.transition = `opacity 0.7s ease ${(i % 4) * 60}ms, transform 0.7s ease ${(i % 4) * 60}ms`;
      revealObserver.observe(el);
    });

    /* ─── Staggered hospedagem cards ─── */
    document.querySelectorAll('.hosp-card').forEach((card, i) => {
      card.style.transitionDelay = `${i * 70}ms`;
    });