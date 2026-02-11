// Lazy-load + play/pause videos by visibility (reduces initial load)
document.addEventListener('DOMContentLoaded', () => {
  const lazyVideos = Array.from(document.querySelectorAll('video[data-lazy-video]'));
  if (!lazyVideos.length) return;

  const prefersReducedMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const loadVideo = (video) => {
    if (video.dataset.loaded === '1') return;
    const sources = Array.from(video.querySelectorAll('source[data-src]'));
    sources.forEach((source) => {
      if (!source.getAttribute('src')) source.setAttribute('src', source.dataset.src);
    });
    video.load();
    video.dataset.loaded = '1';
  };

  const safePlay = (video) => {
    if (prefersReducedMotion) return;
    if (!video.autoplay) return;
    const p = video.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  };

  const safePause = (video) => {
    try {
      video.pause();
    } catch {}
  };

  if (!('IntersectionObserver' in window)) {
    lazyVideos.forEach((video) => {
      loadVideo(video);
      safePlay(video);
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          loadVideo(video);
          safePlay(video);
        } else {
          safePause(video);
        }
      });
    },
    { root: null, rootMargin: '200px 0px', threshold: 0.05 }
  );

  lazyVideos.forEach((video) => observer.observe(video));
});

// Responsive video sources (<source media="...">)
// Fuerza re-evaluación al cambiar entre mobile/desktop (resize/orientación)
document.addEventListener('DOMContentLoaded', () => {
  if (!window.matchMedia) return;

  const responsiveVideos = Array.from(document.querySelectorAll('video')).filter((video) =>
    video.querySelector('source[media]')
  );

  if (!responsiveVideos.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mq = window.matchMedia('(max-width: 768px)');

  const safePlay = (video) => {
    if (prefersReducedMotion) return;
    if (!video.autoplay) return;
    const p = video.play();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  };

  const reloadIfLoaded = (video) => {
    const isLazy = video.hasAttribute('data-lazy-video');
    if (isLazy && video.dataset.loaded !== '1') return;

    const wasPlaying = !video.paused;
    video.load();
    if (wasPlaying) safePlay(video);
  };

  const onChange = () => responsiveVideos.forEach(reloadIfLoaded);

  if (typeof mq.addEventListener === 'function') mq.addEventListener('change', onChange);
  else if (typeof mq.addListener === 'function') mq.addListener(onChange);
});
// Animación de aparición lateral para service-item
document.addEventListener('DOMContentLoaded', function () {
  const serviceItems = document.querySelectorAll('.service-item');
  if (serviceItems.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, {
      threshold: 0.2
    });
    serviceItems.forEach(item => observer.observe(item));
  }
});
// Toggle menú fullscreen
document.addEventListener('DOMContentLoaded', function () {
	const menuToggle = document.querySelector('.menu-toggle');
	const modal = document.getElementById('fullscreen-modal');
	const closeModal = document.querySelector('.close-modal');

	if (menuToggle && modal && closeModal) {
		menuToggle.addEventListener('click', function () {
			modal.setAttribute('aria-hidden', 'false');
			modal.classList.add('active');
		});

		closeModal.addEventListener('click', function () {
			modal.setAttribute('aria-hidden', 'true');
			modal.classList.remove('active');
		});

		// Cerrar modal al hacer click fuera del nav
		modal.addEventListener('click', function (e) {
			if (e.target === modal) {
				modal.setAttribute('aria-hidden', 'true');
				modal.classList.remove('active');
			}
		});
	}

	// Navbar fondo dinámico al hacer scroll
	const header = document.querySelector('.header');
	window.addEventListener('scroll', function () {
		if (window.scrollY > 10) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	});
});

/* =====================================
   HERO — CONCEPTO 1: EDITORIAL VIVO
===================================== */

document.addEventListener("DOMContentLoaded", () => {
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  if (slides.length < 2) return;

  const motions = ["from-right", "from-left", "zoom-in"];
  let current = 0;
  let loop = 0;
  let timer = null;

  const isVideo = (slide) => slide.querySelector("video");

  const clearSlides = () => {
    slides.forEach(slide => {
      slide.classList.remove("active");
      motions.forEach(m => slide.classList.remove(m));
    });
  };

  const showSlide = () => {
    clearSlides();

    const active = slides[current];
    const motion = motions[current % motions.length];

    active.classList.add("active", motion);

    const baseDuration = isVideo(active) ? 15000 : 9000;
    const duration = loop === 0
      ? baseDuration * 0.7   // primera vuelta más rápida
      : baseDuration * 1.2;  // segunda vuelta más elegante

    timer = setTimeout(() => {
      current = (current + 1) % slides.length;
      if (current === 0) loop++;
      showSlide();
    }, duration);
  };

  showSlide();
});


document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('fullscreen-modal');
  const navLinks = document.querySelectorAll('.modal-nav a');
  const sections = document.querySelectorAll('section[id], footer[id]');

  // Cerrar modal al hacer click en un link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      modal.setAttribute('aria-hidden', 'true');
      modal.classList.remove('active');
    });
  });

  // Marcar link activo según sección visible
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');

          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    {
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    }
  );

  sections.forEach(section => observer.observe(section));
});
