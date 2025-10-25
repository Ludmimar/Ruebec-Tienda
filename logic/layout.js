// Detectar si estamos en la carpeta pages/
const isInPagesFolder = window.location.pathname.includes('/pages/');
const basePath = isInPagesFolder ? '../' : '';

console.log('🔍 Debug layout.js:');
console.log('📍 Current path:', window.location.pathname);
console.log('📁 Is in pages folder:', isInPagesFolder);
console.log('🛤️ Base path:', basePath);

// Función para crear navbar con enlaces correctos
function createNavbarHTML() {
  const homeLink = isInPagesFolder ? '../index.html' : 'index.html';
  const faqLink = isInPagesFolder ? 'politicas.html#faq' : 'pages/politicas.html#faq';
  
  // Enlaces para páginas secundarias
  const sobreNosotrosLink = isInPagesFolder ? 'sobre-nosotros.html' : 'pages/sobre-nosotros.html';
  const catalogoLink = isInPagesFolder ? 'catalogo.html' : 'pages/catalogo.html';
  const contactoLink = isInPagesFolder ? 'contacto.html' : 'pages/contacto.html';
  const politicasLink = isInPagesFolder ? 'politicas.html' : 'pages/politicas.html';
  
  console.log('🔗 Generated links:');
  console.log('  Home:', homeLink);
  console.log('  FAQ:', faqLink);
  console.log('  Sobre Nosotros:', sobreNosotrosLink);
  console.log('  Catálogo:', catalogoLink);
  console.log('  Contacto:', contactoLink);
  console.log('  Políticas:', politicasLink);
  
  return `
<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm" role="navigation" aria-label="Navegación principal">
    <div class="container">
        <a class="navbar-brand fw-bold" href="${homeLink}">Ruebec</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarRuebec"
            aria-controls="navbarRuebec" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarRuebec">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" href="${homeLink}">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="${sobreNosotrosLink}">Sobre Ruebec</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="${catalogoLink}">Catálogo</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="${contactoLink}">Contacto</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="${politicasLink}">Políticas</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#modalTalles">Guía de Talles</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="${faqLink}">FAQ</a>
                </li>
            </ul>
            <ul class="navbar-nav d-flex flex-row align-items-center gap-2">
                <!-- Leyenda de prueba -->
                <li class="nav-item">
                    <span class="badge bg-warning text-dark small">
                        <i class="fa-solid fa-flask me-1"></i>Solo para pruebas
                    </span>
                </li>
                <li class="nav-item">
                    <a href="https://www.instagram.com/" target="_blank" class="nav-link">
                        <i class="bi bi-instagram fs-5"></i>
                    </a>
                </li>
                <li class="nav-item ms-2">
                    <a href="https://wa.me/5493513891117" target="_blank" class="nav-link">
                        <i class="bi bi-whatsapp fs-5"></i>
                    </a>
                </li>
                <!-- Wishlist -->
                <li class="nav-item ms-2 position-relative">
                    <a href="#" class="nav-link" id="wishlist-nav-btn" title="Mis Favoritos">
                        <i class="bi bi-heart fs-5"></i>
                        <span class="wishlist-badge d-none" id="wishlist-count">0</span>
                    </a>
                </li>
                <!-- Toggle Modo Oscuro -->
                <li class="nav-item ms-3">
                    <div class="theme-toggle" id="theme-toggle" title="Cambiar tema">
                        <div class="theme-toggle-slider">
                            <i class="bi bi-sun-fill" id="theme-icon"></i>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</nav>`;
}

// Cargar navbar dinámicamente
document.getElementById("navbar-container").innerHTML = createNavbarHTML();

// Actualizar wishlist después de cargar navbar
if (window.refreshWishlist) {
  setTimeout(() => window.refreshWishlist(), 50);
}

setTimeout(() => {
  const navbarCollapse = document.getElementById("navbarRuebec");
  const navLinks = document.querySelectorAll(".navbar .nav-link");
  const toggler = document.querySelector(".navbar-toggler");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (
        window.innerWidth < 992 &&
        navbarCollapse.classList.contains("show")
      ) {
        const bsCollapse =
          bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });

  if (toggler) {
    toggler.addEventListener("click", () => {
      const isExpanded = toggler.getAttribute("aria-expanded") === "true";
      const bsCollapse =
        bootstrap.Collapse.getOrCreateInstance(navbarCollapse);

      if (isExpanded) {
        bsCollapse.hide();
      } else {
        bsCollapse.show();
      }
    });
  }

  document.addEventListener("click", function (event) {
    const isClickInsideNavbar =
      navbarCollapse.contains(event.target) ||
      toggler.contains(event.target);
    if (
      !isClickInsideNavbar &&
      window.innerWidth < 992 &&
      navbarCollapse.classList.contains("show")
    ) {
      const bsCollapse =
        bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
      bsCollapse.hide();
    }
  });
}, 0);

// Cargar footer
fetch(basePath + "components/footer.html")
  .then((res) => {
    if (!res.ok) throw new Error('Error al cargar footer');
    return res.text();
  })
  .then((data) => {
    document.getElementById("footer-container").innerHTML = data;
  })
  .catch((err) => console.error('Error al cargar footer:', err));

const btnTop = document.getElementById("btn-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    btnTop.style.display = "flex";
  } else {
    btnTop.style.display = "none";
  }
});

btnTop.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.remove("fade-out");
});

document.body.addEventListener("click", (e) => {
  const link = e.target.closest("a");

  if (
    !link ||
    !link.href ||
    link.target === "_blank" ||
    link.href.includes("javascript:") ||
    link.getAttribute("href") === "#" ||
    link.id === "btn-top"
  ) {
    // Ignorar estos enlaces
    return;
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const linkUrl = new URL(link.href);
  const linkPage = linkUrl.pathname.split("/").pop() || "index.html";

  if (link.hostname !== window.location.hostname) {
    // Enlaces externos: no interferir
    return;
  }

  if (link.hash && currentPage === linkPage) {
    // Anclas internas en la misma página: hacer scroll suave (ya manejado en otro listener, o acá puedes agregarlo)
    e.preventDefault();
    const target = document.querySelector(link.hash);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    return;
  }

  if (currentPage === linkPage) {
    // Mismo archivo HTML sin hash: no hacer nada ni animar ni recargar
    e.preventDefault();
    return;
  }

  // Si llegamos acá, es un enlace a otra página del mismo sitio, aplicar animación y luego navegar
  e.preventDefault();
  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = link.href;
  }, 400);
});


// Modo oscuro
/*
const toggleDarkMode = () => {
      document.body.classList.toggle('bg-dark');
      document.body.classList.toggle('text-white');
    };

    // Animaciones ScrollReveal
    ScrollReveal().reveal('header, #destacados, #sobre-nosotros, #accesorios, #testimonios, footer', {
      distance: '50px',
      duration: 1000,
      easing: 'ease-in-out',
      origin: 'bottom',
      interval: 100
    });
    */