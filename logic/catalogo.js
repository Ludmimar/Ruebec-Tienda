document.addEventListener("DOMContentLoaded", () => {
  const catalogo = document.getElementById("catalogo");
  const buscador = document.getElementById("buscador");
  const filtroCategoria = document.getElementById("filtro-categoria");
  const filtroPrecio = document.getElementById("filtro-precio");
  const ordenamiento = document.getElementById("ordenamiento");
  const productosMostrados = document.getElementById("productos-mostrados");
  const productosTotales = document.getElementById("productos-totales");

  // Actualizar contador de productos totales
  productosTotales.textContent = productos.length;

  function renderizarCatalogo(filtrados = productos, mostrarLoading = false) {
    // Mostrar spinner si es necesario
    if (mostrarLoading) {
      catalogo.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="loading-spinner mx-auto mb-3"></div>
          <p class="text-muted">Cargando productos...</p>
        </div>
      `;
      
      // Simular pequeña demora para mostrar el spinner
      setTimeout(() => renderizarCatalogo(filtrados, false), 300);
      return;
    }
    
    catalogo.innerHTML = ""; // Limpiar catálogo

    // Actualizar contador
    productosMostrados.textContent = filtrados.length;

    if (filtrados.length === 0) {
      catalogo.innerHTML = `<div class="col-12"><p class="text-center fs-5 text-muted"><i class="fa-solid fa-magnifying-glass me-2"></i>No se encontraron productos.</p></div>`;
      return;
    }

    filtrados.forEach((producto) => {
      const col = document.createElement("div");
      col.className = "col-md-4 col-sm-6 col-12 mb-4";

      const carruselId = `carouselProducto${producto.id}`;
      const modalId = `modalImagenProducto${producto.id}`;

      let slides = "";
      producto.imagenes.forEach((img, index) => {
        // Usar rutas absolutas desde la raíz del sitio
        const imgSrc = img.startsWith('/') ? img : '/' + img;
        slides += `
          <div class="carousel-item ${index === 0 ? "active" : ""}">
            <img src="${imgSrc}" class="d-block w-100 imagen-carrusel" alt="${producto.nombre}" data-bs-toggle="modal" data-bs-target="#${modalId}" data-img="${imgSrc}">
          </div>
        `;
      });

      const modalHTML = `
        <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content bg-dark text-white">
              <div class="modal-header border-0">
                <h5 class="modal-title" id="${modalId}-titulo">${producto.nombre}</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
              </div>
              <div class="modal-body text-center">
                <img src="" class="img-fluid rounded mb-3" id="${modalId}-img" />
                <p class="mb-0" id="${modalId}-descripcion">${producto.descripcion}</p>
              </div>
            </div>
          </div>
        </div>
      `;

      col.innerHTML = `
        <div class="card h-100 shadow-sm d-flex flex-column position-relative">
          <div id="${carruselId}" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
            <div class="carousel-inner">${slides}</div>
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
              ${producto.stock <= 3 ? `<span class="badge bg-warning text-dark"><i class="fa-solid fa-triangle-exclamation me-1"></i>Solo ${producto.stock}</span>` : ''}
              ${producto.destacado ? '<span class="badge bg-danger"><i class="fa-solid fa-star me-1"></i>Destacado</span>' : ''}
            </div>
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text descripcion-truncada">${producto.descripcion}</p>
            <div class="mb-2">
              <small class="text-muted d-block">
                <i class="bi bi-clock-fill"></i> ${producto.tiempoProduccion}
              </small>
              <small class="text-muted d-block">
                <i class="bi bi-palette-fill"></i> ${producto.coloresDisponibles.length} colores disponibles
              </small>
            </div>
            <p class="fw-bold text-primary mb-3">$${producto.precio.toLocaleString('es-AR')}</p>
            <div class="mt-auto">
              <a href="https://wa.me/5493513891117?text=Hola!%20Me%20interesa%20el%20${encodeURIComponent(producto.nombre)}%20($${producto.precio}).%20¿Está%20disponible?%20¿En%20qué%20colores%20lo%20tienen?" class="btn btn-success w-100" target="_blank">
                <i class="bi bi-whatsapp me-2"></i>Consultar
              </a>
            </div>
          </div>
        </div>
        ${modalHTML}
      `;

      catalogo.appendChild(col);
      
      // Agregar botón de wishlist
      if (typeof addWishlistButton === 'function') {
        const card = col.querySelector('.card');
        addWishlistButton(producto.id, card);
      }

      // Modal clic
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

  // Función para ordenar productos
  function ordenarProductos(productosArray, criterio) {
    const copia = [...productosArray];
    
    switch (criterio) {
      case "precio-asc":
        return copia.sort((a, b) => a.precio - b.precio);
      case "precio-desc":
        return copia.sort((a, b) => b.precio - a.precio);
      case "nombre-asc":
        return copia.sort((a, b) => a.nombre.localeCompare(b.nombre));
      case "nombre-desc":
        return copia.sort((a, b) => b.nombre.localeCompare(a.nombre));
      case "destacado":
      default:
        // Destacados primero, luego por ID
        return copia.sort((a, b) => {
          if (a.destacado && !b.destacado) return -1;
          if (!a.destacado && b.destacado) return 1;
          return a.id - b.id;
        });
    }
  }

  // Función para filtrar por precio
  function filtrarPorPrecio(producto, rangoSeleccionado) {
    if (rangoSeleccionado === "todos") return true;
    
    const precio = producto.precio;
    
    switch (rangoSeleccionado) {
      case "0-3000":
        return precio <= 3000;
      case "3000-5000":
        return precio > 3000 && precio <= 5000;
      case "5000-7000":
        return precio > 5000 && precio <= 7000;
      case "7000+":
        return precio > 7000;
      default:
        return true;
    }
  }

  // Función para aplicar todos los filtros y ordenamiento
  function aplicarFiltrosYOrdenamiento(conLoading = false) {
    const termino = buscador.value.trim().toLowerCase();
    const categoriaSeleccionada = filtroCategoria.value;
    const precioSeleccionado = filtroPrecio.value;
    const ordenSeleccionado = ordenamiento.value;
    
    // Filtrar productos
    let filtrados = productos.filter(p => {
      const coincideNombre = p.nombre.toLowerCase().includes(termino) || 
                            p.descripcion.toLowerCase().includes(termino);
      const coincideCategoria = categoriaSeleccionada === "todos" || 
                               p.categoria === categoriaSeleccionada;
      const coincidePrecio = filtrarPorPrecio(p, precioSeleccionado);
      
      return coincideNombre && coincideCategoria && coincidePrecio;
    });
    
    // Ordenar productos filtrados
    filtrados = ordenarProductos(filtrados, ordenSeleccionado);
    
    renderizarCatalogo(filtrados, conLoading);
  }

  // Mostrar todos los productos al cargar la página (destacados primero)
  renderizarCatalogo(ordenarProductos(productos, 'destacado'), true);

  // Event listeners
  buscador.addEventListener("input", aplicarFiltrosYOrdenamiento);
  filtroCategoria.addEventListener("change", aplicarFiltrosYOrdenamiento);
  filtroPrecio.addEventListener("change", aplicarFiltrosYOrdenamiento);
  ordenamiento.addEventListener("change", aplicarFiltrosYOrdenamiento);

  // Calculadora de Costos de Envío
  const btnCalcular = document.getElementById('calcular-envio-btn');
  
  if (btnCalcular) {
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
  }
});
