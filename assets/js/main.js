// Mostrar más/menos trabajos en móvil, cargando dinámicamente los extras
document.addEventListener('DOMContentLoaded', function() {
  var btnMore = document.querySelector('.work-show-more');
  var btnLess = document.querySelector('.work-show-less');
  var more = document.querySelector('.work-more-items');
  var loaded = false;
  var extraWorks = `
    <article class="work-item square">
      <img src="assets/img/works/PLACAS-10.webp" alt="Proyecto Domika">
    </article>
    <article class="work-item square">
      <img src="assets/img/works/PLACAS-09 (1).webp" alt="Proyecto Domika">
    </article>
    <article class="work-item square">
      <img src="assets/img/works/POSTS-03.webp" alt="Proyecto Domika">
    </article>
    <article class="work-item vertical">
      <div class="work-media">
        <video autoplay muted loop playsinline preload="none">
          <source src="assets/videos/works/_ vivis al palo_ - alpalo .mp4" type="video/mp4">
        </video>
      </div>
      <div class="work-title">Al palo</div>
    </article>
    <article class="work-item square">
      <img src="assets/img/works/SEPTEMBER-38 - copia.webp" alt="Proyecto Domika">
    </article>
    <article class="work-item vertical">
      <div class="work-media">
        <video autoplay muted loop playsinline preload="none">
          <source src="assets/videos/works/Tratamiento Despigmentante-balance  - Clinic.mp4" type="video/mp4">
        </video>
      </div>
      <div class="work-title">Clinic</div>
    </article>
    <article class="work-item square">
      <img src="assets/img/works/WhatsApp Image 2025-04-25 at 21.26.49 (4).webp" alt="Proyecto Domika">
    </article>
    <article class="work-item square">
      <img src="assets/img/works/WhatsApp Image 2025-04-28 at 15.22.24.webp" alt="Proyecto Domika">
    </article>
  `;
  function isMobile() {
    return window.matchMedia('(max-width: 900px)').matches;
  }
  function showAllDesktop() {
    if (more && !loaded) {
      more.innerHTML = extraWorks;
      more.classList.add('active');
      if(btnMore) btnMore.style.display = 'none';
      if(btnLess) btnLess.style.display = 'none';
      loaded = true;
    }
  }
  function setupMobile() {
    if(btnMore && btnLess && more) {
      btnMore.style.display = 'block';
      btnLess.style.display = 'none';
      more.classList.remove('active');
      more.innerHTML = '';
      loaded = false;
      btnMore.addEventListener('click', function() {
        if(!loaded) {
          more.innerHTML = extraWorks;
          loaded = true;
        }
        more.classList.add('active');
        btnMore.style.display = 'none';
        btnLess.style.display = 'block';
      });
      btnLess.addEventListener('click', function() {
        more.classList.remove('active');
        btnMore.style.display = 'block';
        btnLess.style.display = 'none';
        // Scroll hacia arriba para ver los primeros trabajos
        const workSection = document.querySelector('.work');
        if(workSection) {
          workSection.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
      });
    }
  }
  function handleResize() {
    if (isMobile()) {
      setupMobile();
    } else {
      showAllDesktop();
    }
  }
  handleResize();
  window.addEventListener('resize', handleResize);
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