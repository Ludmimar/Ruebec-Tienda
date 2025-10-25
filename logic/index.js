// Tracking de página
if (window.trackPageView) {
    window.trackPageView('Inicio', window.location.href);
}

// Cargar productos destacados
const destacados = document.getElementById("destacados");

if (destacados) {
  productos.slice(0, 3).forEach((producto) => {
    const col = document.createElement("div");
    col.className = "col-md-4 col-sm-6 mb-4";

    // Carrusel para destacados con imágenes clickeables que abren modal
    const carruselId = `carouselDestacado${producto.id}`;
    const modalId = `modalImagenDestacado${producto.id}`;

    let slides = "";
    producto.imagenes.forEach((img, index) => {
      slides += `
        <div class="carousel-item ${index === 0 ? "active" : ""}">
          <img src="${img}" class="d-block w-100 imagen-carrusel" alt="${producto.nombre}" data-bs-toggle="modal" data-bs-target="#${modalId}" data-img="${img}">
        </div>
      `;
    });

    const modalHTML = `
      <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true" >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content bg-dark text-white">
            <div class="modal-header border-0">
              <h5 class="modal-title" id="${modalId}-titulo">${producto.nombre}</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body text-center">
              <img src="" class="img-fluid rounded mb-3" id="${modalId}-img" />
              <p id="${modalId}-descripcion" class="mb-0">${producto.descripcion}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    col.innerHTML = `
      <div class="card h-100 shadow-sm d-flex flex-column position-relative">
        <div id="${carruselId}" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
          <div class="carousel-inner">
            ${slides}
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#${carruselId}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#${carruselId}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
        <div class="card-body d-flex flex-column">
          <div class="mb-2">
            ${producto.personalizable ? '<span class="badge bg-info text-dark me-1"><i class="fa-solid fa-sparkles me-1"></i>Personalizable</span>' : ''}
            ${producto.stock <= 3 ? `<span class="badge bg-warning text-dark"><i class="fa-solid fa-triangle-exclamation me-1"></i>Últimas ${producto.stock} unidades</span>` : ''}
          </div>
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text descripcion-truncada">${producto.descripcion}</p>
          <div class="mb-2">
            <small class="text-muted">
              <i class="bi bi-clock-fill"></i> Listo en ${producto.tiempoProduccion}
            </small>
          </div>
          <p class="fw-bold text-primary mt-auto mb-2">$${producto.precio.toLocaleString('es-AR')}</p>
          <a href="https://wa.me/5493513891117?text=Hola!%20Me%20interesa%20el%20${encodeURIComponent(producto.nombre)}%20($${producto.precio}).%20¿Está%20disponible?%20¿Puedo%20personalizarlo?" 
             class="btn btn-success w-100" target="_blank"
             onclick="if(window.trackWhatsAppContact) window.trackWhatsAppContact('${producto.id}', '${producto.nombre}')">
            <i class="bi bi-whatsapp me-2"></i>Consultar por WhatsApp
          </a>
        </div>
      </div>
      ${modalHTML}
    `;

    destacados.appendChild(col);
    
    // Agregar botón de wishlist
    if (typeof addWishlistButton === 'function') {
      const card = col.querySelector('.card');
      addWishlistButton(producto.id, card);
    }

    // Inicializar modal y configurar evento click para mostrar imagen y texto
    setTimeout(() => {
      const modal = new bootstrap.Modal(document.getElementById(modalId));
      document.querySelectorAll(`#${carruselId} .imagen-carrusel`).forEach((img) => {
        img.addEventListener("click", (e) => {
          const src = e.target.getAttribute("data-img");
          document.getElementById(`${modalId}-img`).src = src;
          document.getElementById(`${modalId}-titulo`).textContent = producto.nombre;
          document.getElementById(`${modalId}-descripcion`).textContent = producto.descripcion;
          modal.show();
        });
      });
    }, 0);
  });
}

// Cargar combos
const combosContainer = document.getElementById("combos-container");

if (combosContainer && typeof combos !== 'undefined') {
  combos.filter(combo => combo.destacado).forEach((combo) => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-4";

    const productosIncluidos = combo.productos.map(id => {
      const prod = productos.find(p => p.id === id);
      return prod ? prod.nombre : '';
    }).filter(n => n).join(' + ');

    col.innerHTML = `
      <div class="card h-100 shadow-sm combo-card">
        <div class="combo-badge">
          <span class="badge bg-danger position-absolute top-0 end-0 m-3">
            <i class="fa-solid fa-fire me-1 text-danger"></i>Ahorrás $${combo.descuento.toLocaleString('es-AR')}
          </span>
        </div>
        <img src="${combo.imagenes[0]}" class="card-img-top" alt="${combo.nombre}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${combo.nombre}</h5>
          <p class="card-text">${combo.descripcion}</p>
          <p class="text-muted small">${productosIncluidos}</p>
          <div class="mt-auto">
            <p class="text-decoration-line-through text-muted mb-1">Antes: $${combo.precioOriginal.toLocaleString('es-AR')}</p>
            <p class="fw-bold text-success fs-4 mb-3">Ahora: $${combo.precio.toLocaleString('es-AR')}</p>
            <a href="https://wa.me/5493513891117?text=Hola!%20Me%20interesa%20el%20${encodeURIComponent(combo.nombre)}%20($${combo.precio}).%20¿Está%20disponible?" 
               class="btn btn-success w-100" target="_blank"
               onclick="if(window.trackWhatsAppContact) window.trackWhatsAppContact('combo-${combo.id}', '${combo.nombre}')">
              <i class="bi bi-whatsapp me-2"></i>Consultar Combo
            </a>
          </div>
        </div>
      </div>
    `;

    combosContainer.appendChild(col);
  });
}

// Newsletter con Google Forms
// El formulario ahora usa Google Forms embebido directamente en el HTML
// No se requiere JavaScript adicional

/* CÓDIGO ANTERIOR DE EMAILJS - COMENTADO (por si se necesita en el futuro)
const newsletterForm = document.getElementById("newsletter-form");
const newsletterSubmitBtn = document.getElementById("newsletter-submit-btn");

if (newsletterForm && newsletterSubmitBtn) {
  // CONFIGURA ESTOS VALORES CON TUS CREDENCIALES DE EMAILJS
  // Tutorial: https://www.emailjs.com/docs/
  const EMAILJS_PUBLIC_KEY = 'TU_PUBLIC_KEY_AQUI';  // ⬅️ Cambiar
  const EMAILJS_SERVICE_ID = 'TU_SERVICE_ID_AQUI';  // ⬅️ Cambiar
  const EMAILJS_TEMPLATE_ID = 'TU_TEMPLATE_ID_AQUI'; // ⬅️ Cambiar
  
  // Inicializar EmailJS (solo una vez)
  if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'TU_PUBLIC_KEY_AQUI') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
  
  // Función para manejar la suscripción
  const handleNewsletterSubmit = (e) => {
    if (e) e.preventDefault();
    
    const emailInput = document.getElementById("newsletter-email");
    const email = emailInput.value.trim();
    
    // Validar email
    if (!email || !emailInput.checkValidity()) {
      alert('Por favor, ingresá un email válido');
      return false;
    }
    
    const originalText = newsletterSubmitBtn.textContent;
    
    // Cambiar texto del botón mientras envía
    newsletterSubmitBtn.disabled = true;
    newsletterSubmitBtn.textContent = 'Enviando...';
    
    // Si EmailJS está configurado, usar ese método
    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'TU_PUBLIC_KEY_AQUI') {
      // Parámetros para la plantilla de EmailJS
      const templateParams = {
        email_usuario: email,
        fecha: new Date().toLocaleDateString('es-AR', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        from_email: 'noreply@ruebec.com'
      };
      
      // Enviar email usando EmailJS
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(() => {
          alert(`✅ ¡Gracias por suscribirte! Te contactaremos a ${email} con las novedades.`);
          if (window.trackNewsletterSignup) window.trackNewsletterSignup(email);
          newsletterForm.reset();
        })
        .catch((error) => {
          console.error('Error al enviar:', error);
          alert('❌ Hubo un error. Por favor, intenta de nuevo o contactanos por WhatsApp.');
        })
        .finally(() => {
          newsletterSubmitBtn.disabled = false;
          newsletterSubmitBtn.textContent = originalText;
        });
    } else {
      // MÉTODO ALTERNATIVO: Si EmailJS no está configurado, usar WhatsApp
      alert(`EmailJS no configurado. Redirigiendo a WhatsApp...`);
      const mensaje = `Hola! Me gustaría suscribirme al newsletter de Ruebec. Mi email es: ${email}`;
        window.open(`https://wa.me/5493513891117?text=${encodeURIComponent(mensaje)}`, '_blank');
      newsletterForm.reset();
      newsletterSubmitBtn.disabled = false;
      newsletterSubmitBtn.textContent = originalText;
    }
    
    return false;
  };
  
  // Eventos múltiples para asegurar que funcione
  newsletterSubmitBtn.addEventListener("click", handleNewsletterSubmit);
  newsletterForm.addEventListener("submit", handleNewsletterSubmit);
}
*/

// Agregar Schema.org markup para productos destacados
function agregarSchemaProductos() {
  const productosDestacados = productos.filter(p => p.destacado).slice(0, 3);
  
  const schemaProductos = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": productosDestacados.map((producto, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": producto.nombre,
        "description": producto.descripcion,
        "image": `https://ruebec.netlify.app/${producto.imagenes[0]}`,
        "brand": {
          "@type": "Brand",
          "name": "Ruebec"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://ruebec.netlify.app/catalogo.html",
          "priceCurrency": "ARS",
          "price": producto.precio,
          "availability": producto.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          "seller": {
            "@type": "Organization",
            "name": "Ruebec"
          }
        }
      }
    }))
  };
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schemaProductos);
  document.head.appendChild(script);
}

// Ejecutar al cargar la página
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', agregarSchemaProductos);
} else {
  agregarSchemaProductos();
}

// Calculadora de Costos de Envío
document.addEventListener('DOMContentLoaded', function() {
  const btnCalcular = document.getElementById('calcular-envio-btn');
  
  if (!btnCalcular) return;
  
  const costos = {
    cordoba: { ligero: 1200, medio: 1800, pesado: 2500, tiempo: '2-4 días hábiles' },
    caba: { ligero: 1800, medio: 2500, pesado: 3200, tiempo: '3-5 días hábiles' },
    'buenosaires-interior': { ligero: 2000, medio: 2800, pesado: 3500, tiempo: '4-6 días hábiles' },
    centro: { ligero: 2200, medio: 3000, pesado: 3800, tiempo: '4-6 días hábiles' },
    cuyo: { ligero: 2500, medio: 3300, pesado: 4200, tiempo: '5-7 días hábiles' },
    norte: { ligero: 2800, medio: 3600, pesado: 4500, tiempo: '6-8 días hábiles' },
    nea: { ligero: 2600, medio: 3400, pesado: 4300, tiempo: '5-7 días hábiles' },
    patagonia: { ligero: 3200, medio: 4200, pesado: 5500, tiempo: '7-10 días hábiles' }
  };
  
  btnCalcular.addEventListener('click', function() {
    const provincia = document.getElementById('provincia-envio').value;
    const peso = document.getElementById('peso-envio').value;
    const resultado = document.getElementById('resultado-envio');
    const costoSpan = document.getElementById('costo-envio');
    const tiempoSpan = document.getElementById('tiempo-entrega');
    
    if (!provincia || !peso) {
      alert('Por favor completá todos los campos');
      return;
    }
    
    const costo = costos[provincia][peso];
    const tiempo = costos[provincia].tiempo;
    
    costoSpan.textContent = `$${costo.toLocaleString('es-AR')}`;
    tiempoSpan.textContent = tiempo;
    resultado.classList.remove('d-none');
    
    // Scroll suave al resultado
    resultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});
