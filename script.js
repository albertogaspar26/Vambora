/* ==========================================================================
   DR. CESAR AUGUSTO — LANDING PAGE
   script.js — interações da página
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------
     0) CONFIGURAÇÃO DO WHATSAPP
     Troque o número abaixo pelo número real do consultório, no formato
     internacional, apenas dígitos (ex.: 55 + DDD + número).
     A mensagem pré-definida pode ser ajustada livremente.
  ------------------------------------------------------------------ */
  const WHATSAPP_NUMERO = '5500000000000'; // <-- SUBSTITUIR pelo número real
  const WHATSAPP_MENSAGEM = 'Olá! Gostaria de agendar uma avaliação com o Dr. Cesar Augusto.';
  const linkWhatsapp = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(WHATSAPP_MENSAGEM)}`;

  document.querySelectorAll('[data-whatsapp]').forEach((el) => {
    el.setAttribute('href', linkWhatsapp);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  /* ------------------------------------------------------------------
     1) ANO ATUAL NO RODAPÉ
  ------------------------------------------------------------------ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     2) CABEÇALHO — muda de estilo ao rolar a página
  ------------------------------------------------------------------ */
  const header = document.getElementById('siteHeader');
  const onScrollHeader = () => {
    if (window.scrollY > 12) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ------------------------------------------------------------------
     3) MENU MOBILE
  ------------------------------------------------------------------ */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  const closeNav = () => {
    mainNav.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  /* ------------------------------------------------------------------
     4) ASSINATURA VISUAL — "arco do sorriso" como indicador de progresso
        de rolagem, desenhado com stroke-dashoffset.
  ------------------------------------------------------------------ */
  const progressPath = document.getElementById('smileProgressPath');
  const onScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = docHeight > 0 ? scrollTop / docHeight : 0;
    const length = 220; // aproximado ao comprimento do path
    const offset = length - ratio * length;
    progressPath.style.strokeDashoffset = String(offset);
  };
  onScrollProgress();
  window.addEventListener('scroll', onScrollProgress, { passive: true });

  /* ------------------------------------------------------------------
     5) REVELAÇÃO SUAVE AO ROLAR (IntersectionObserver)
  ------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // pequeno atraso escalonado para elementos vizinhos (cards em grade)
            setTimeout(() => entry.target.classList.add('is-visible'), (index % 4) * 90);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------
     6) ROLAGEM SUAVE PARA LINKS INTERNOS (fallback para navegadores
        sem suporte total a scroll-behavior via CSS)
  ------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

});
