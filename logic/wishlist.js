// Sistema de Wishlist/Favoritos con LocalStorage
class Wishlist {
  constructor() {
    this.items = this.loadFromStorage();
    this.init();
  }
  
  // Cargar desde localStorage
  loadFromStorage() {
    const saved = localStorage.getItem('ruebec_wishlist');
    return saved ? JSON.parse(saved) : [];
  }
  
  // Guardar en localStorage
  saveToStorage() {
    localStorage.setItem('ruebec_wishlist', JSON.stringify(this.items));
  }
  
  // Agregar producto
  add(productId) {
    if (!this.items.includes(productId)) {
      this.items.push(productId);
      this.saveToStorage();
      this.updateUI();
      
      // Tracking de evento
      if (window.trackAddToWishlist) {
        const producto = productos.find(p => p.id === productId);
        if (producto) {
          window.trackAddToWishlist(producto.id, producto.nombre, producto.categoria, producto.precio);
        }
      }
      
      return true;
    }
    return false;
  }
  
  // Eliminar producto
  remove(productId) {
    const index = this.items.indexOf(productId);
    if (index > -1) {
      this.items.splice(index, 1);
      this.saveToStorage();
      this.updateUI();
      return true;
    }
    return false;
  }
  
  // Toggle (agregar o quitar)
  toggle(productId) {
    if (this.has(productId)) {
      this.remove(productId);
      return false;
    } else {
      this.add(productId);
      return true;
    }
  }
  
  // Verificar si producto está en wishlist
  has(productId) {
    return this.items.includes(productId);
  }
  
  // Obtener cantidad
  getCount() {
    return this.items.length;
  }
  
  // Obtener todos los productos
  getAll() {
    return [...this.items];
  }
  
  // Limpiar wishlist
  clear() {
    this.items = [];
    this.saveToStorage();
    this.updateUI();
  }
  
  // Actualizar UI
  updateUI() {
    // Actualizar contador en navbar (con retry si no existe)
    this.updateNavbarCount();
    
    // Actualizar botones de wishlist en productos
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      const productId = parseInt(btn.dataset.productId);
      if (this.has(productId)) {
        btn.classList.add('active');
        btn.title = 'Quitar de favoritos';
      } else {
        btn.classList.remove('active');
        btn.title = 'Agregar a favoritos';
      }
    });
  }

  // Actualizar contador en navbar con retry
  updateNavbarCount() {
    const countBadge = document.getElementById('wishlist-count');
    const countBadgeFloat = document.getElementById('wishlist-count-float');
    const wishlistFloatBtn = document.getElementById('wishlist-float-btn');
    const count = this.getCount();
    
    // Actualizar badge desktop (si existe)
    if (countBadge) {
      countBadge.textContent = count;
      if (count > 0) {
        countBadge.classList.remove('d-none');
      } else {
        countBadge.classList.add('d-none');
      }
    }
    
    // Actualizar badge flotante
    if (countBadgeFloat) {
      countBadgeFloat.textContent = count;
      if (count > 0) {
        countBadgeFloat.classList.remove('d-none');
      } else {
        countBadgeFloat.classList.add('d-none');
      }
    }
    
    // Mostrar/ocultar botón flotante según tenga items
    if (wishlistFloatBtn) {
      if (count > 0) {
        wishlistFloatBtn.classList.add('has-items');
      } else {
        wishlistFloatBtn.classList.remove('has-items');
      }
    }
    
    if (!countBadge && !countBadgeFloat && !wishlistFloatBtn) {
      // Si no existe el badge, intentar de nuevo con múltiples reintentos
      setTimeout(() => this.updateNavbarCount(), 100);
      setTimeout(() => this.updateNavbarCount(), 300);
      setTimeout(() => this.updateNavbarCount(), 500);
    }
  }
  
  // Inicializar
  init() {
    // Actualizar UI cuando el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.updateUI());
    } else {
      // Intentar actualizar inmediatamente y luego con retry
      this.updateUI();
      setTimeout(() => this.updateUI(), 100);
      setTimeout(() => this.updateUI(), 500);
    }
    
    // Actualizar UI cuando se carga el navbar dinámicamente
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
      const observer = new MutationObserver(() => {
        // Cuando el navbar se carga, actualizar el contador
        this.updateNavbarCount();
      });
      observer.observe(navbarContainer, { childList: true });
    }
    
    // Event listener para el botón de wishlist en navbar y flotante
    document.addEventListener('click', (e) => {
      if (e.target.closest('#wishlist-nav-btn') || 
          e.target.closest('#wishlist-float-btn')) {
        e.preventDefault();
        this.showWishlistModal();
      }
    });
    
    // Actualizar UI cuando se cambia de página (para SPA-like behavior)
    window.addEventListener('popstate', () => {
      setTimeout(() => this.updateUI(), 100);
    });
  }
  
  // Mostrar modal con productos favoritos
  showWishlistModal() {
    // Obtener el modal de Bootstrap
    const modalElement = document.getElementById('modalWishlist');
    if (!modalElement) {
      console.error('Modal de wishlist no encontrado');
      return;
    }
    
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
    
    // Renderizar contenido del modal
    this.renderModalContent();
    
    // Event listener para el botón de WhatsApp
    const btnWhatsApp = document.getElementById('btn-enviar-favoritos-whatsapp');
    if (btnWhatsApp) {
      btnWhatsApp.onclick = () => this.enviarPorWhatsApp();
    }
  }
  
  // Renderizar contenido del modal
  renderModalContent() {
    const modalBody = document.getElementById('wishlist-modal-body');
    const btnWhatsApp = document.getElementById('btn-enviar-favoritos-whatsapp');
    
    if (!modalBody) return;
    
    // Mostrar loading
    modalBody.innerHTML = `
      <div class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p class="mt-3 text-muted">Cargando tus favoritos...</p>
      </div>
    `;
    
    // Cargar productos dinámicamente si no están disponibles
    this.loadProductsForModal().then(() => {
      this.renderModalContentWithProducts(modalBody, btnWhatsApp);
    });
  }

  // Cargar productos para el modal
  async loadProductsForModal() {
    // Si ya tenemos productos cargados, no hacer nada
    if (typeof productos !== 'undefined' && productos.length > 0) {
      return Promise.resolve();
    }
    
    // Detectar si estamos en la carpeta pages/ para usar la ruta correcta
    const isInPagesFolder = window.location.pathname.includes('/pages/');
    const productosPath = isInPagesFolder ? '../logic/productos.js' : 'logic/productos.js';
    
    console.log('🔄 Loading productos.js from:', productosPath);
    
    // Cargar productos.js dinámicamente
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = productosPath;
      script.onload = () => {
        // Esperar un poco para que se ejecute el script
        setTimeout(resolve, 100);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Renderizar contenido del modal con productos
  renderModalContentWithProducts(modalBody, btnWhatsApp) {
    // Si no hay productos
    if (this.items.length === 0) {
      modalBody.innerHTML = `
        <div class="text-center py-5">
          <i class="fa-regular fa-heart fs-1 text-muted mb-3"></i>
          <h5 class="text-muted">No tenés productos favoritos</h5>
          <p class="text-muted">Hacé click en el corazón <i class="fa-solid fa-heart text-danger"></i> de cualquier producto para agregarlo aquí.</p>
          <button class="btn btn-primary mt-3" id="btn-ir-catalogo">
            <i class="fa-solid fa-shop me-2"></i>Ir al Catálogo
          </button>
        </div>
      `;
      if (btnWhatsApp) btnWhatsApp.disabled = true;
      
      // Event listener para el botón de ir al catálogo
      const btnCatalogo = document.getElementById('btn-ir-catalogo');
      if (btnCatalogo) {
        btnCatalogo.addEventListener('click', () => {
          // Cerrar el modal primero
          const modalElement = document.getElementById('modalWishlist');
          if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) modal.hide();
          }
          // Navegar al catálogo con la ruta correcta según la ubicación
          setTimeout(() => {
            const isInPagesFolder = window.location.pathname.includes('/pages/');
            const catalogoPath = isInPagesFolder ? 'catalogo.html' : 'pages/catalogo.html';
            console.log('🔄 Navigating to catalog:', catalogoPath);
            window.location.href = catalogoPath;
          }, 300); // Esperar a que se cierre el modal
        });
      }
      
      return;
    }
    
    // Obtener productos del wishlist
    const wishlistProducts = this.items
      .map(id => productos.find(p => p.id === id))
      .filter(p => p); // Filtrar nulls
    
    // Calcular total
    const total = wishlistProducts.reduce((sum, p) => sum + p.precio, 0);
    
    // Renderizar productos
    let html = `
      <div class="wishlist-items">
        ${wishlistProducts.map(producto => this.renderProductCard(producto)).join('')}
      </div>
      <hr class="my-4">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Total estimado:</h5>
        <h4 class="mb-0 text-primary fw-bold">$${total.toLocaleString('es-AR')}</h4>
      </div>
      <p class="text-muted small mt-2">
        <i class="fa-solid fa-info-circle me-1"></i>
        Los precios pueden variar según personalización y talles. Este es solo un estimado.
      </p>
    `;
    
    modalBody.innerHTML = html;
    
    // Habilitar botón de WhatsApp
    if (btnWhatsApp) btnWhatsApp.disabled = false;
    
    // Agregar event listeners a los botones de eliminar
    modalBody.querySelectorAll('.btn-remove-wishlist').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = parseInt(e.currentTarget.dataset.productId);
        this.remove(productId);
        this.renderModalContent(); // Re-renderizar
      });
    });
  }
  
  // Renderizar card de producto en el modal
  renderProductCard(producto) {
    return `
      <div class="card mb-3 wishlist-item-card">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <div class="flex-grow-1">
              <h6 class="card-title mb-1">${producto.nombre}</h6>
              <p class="card-text text-muted small mb-2">${producto.descripcion}</p>
              <p class="text-primary fw-bold mb-0">$${producto.precio.toLocaleString('es-AR')}</p>
            </div>
            <button class="btn btn-sm btn-outline-danger btn-remove-wishlist ms-3" data-product-id="${producto.id}" title="Quitar de favoritos">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }
  
  // Enviar lista por WhatsApp
  enviarPorWhatsApp() {
    if (this.items.length === 0) return;
    
    // Obtener productos del wishlist
    const wishlistProducts = this.items
      .map(id => productos.find(p => p.id === id))
      .filter(p => p); // Filtrar nulls
    
    // Calcular total
    const total = wishlistProducts.reduce((sum, p) => sum + p.precio, 0);
    
    // Tracking de conversión
    if (window.trackPurchase) {
      const items = wishlistProducts.map(p => ({
        item_id: p.id,
        item_name: p.nombre,
        item_category: p.categoria,
        price: p.precio,
        quantity: 1
      }));
      window.trackPurchase(`wishlist-${Date.now()}`, total, items);
    }
    
    // Crear mensaje para WhatsApp
    let mensaje = '¡Hola! Me interesan estos productos de mis favoritos:\n\n';
    wishlistProducts.forEach((producto, index) => {
      mensaje += `${index + 1}. ${producto.nombre}\n   Precio: $${producto.precio.toLocaleString('es-AR')}\n\n`;
    });
    mensaje += `━━━━━━━━━━━━━━━━\n`;
    mensaje += `TOTAL ESTIMADO: $${total.toLocaleString('es-AR')}\n\n`;
    mensaje += '¿Podrían darme más información sobre disponibilidad, talles y opciones de personalización?';
    
    console.log('📱 WhatsApp message:', mensaje);
    console.log('🔗 Encoded URL:', `https://wa.me/5493513891117?text=${encodeURIComponent(mensaje)}`);
    
    // Abrir WhatsApp
    window.open(`https://wa.me/5493513891117?text=${encodeURIComponent(mensaje)}`, '_blank');
    
    // Cerrar el modal
    const modalElement = document.getElementById('modalWishlist');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) modal.hide();
    }
  }
}

// Crear instancia global
const wishlist = new Wishlist();

// Exponer wishlist globalmente
window.wishlist = wishlist;

// Función para forzar actualización del wishlist (útil para cambios de página)
function refreshWishlist() {
  if (window.wishlist) {
    window.wishlist.updateUI();
  }
}

// Exponer función globalmente para uso en otros scripts
window.refreshWishlist = refreshWishlist;

// Función helper para agregar botones a productos
function addWishlistButton(productId, container) {
  const btn = document.createElement('button');
  btn.className = 'wishlist-btn';
  btn.dataset.productId = productId;
  btn.innerHTML = '<i class="fa-regular fa-heart"></i>';
  btn.title = 'Agregar a favoritos';
  
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isAdded = wishlist.toggle(productId);
    
    if (isAdded) {
      btn.querySelector('i').className = 'fa-solid fa-heart';
    } else {
      btn.querySelector('i').className = 'fa-regular fa-heart';
    }
  });
  
  // Verificar si ya está en wishlist
  if (wishlist.has(productId)) {
    btn.classList.add('active');
    btn.querySelector('i').className = 'fa-solid fa-heart';
  }
  
  container.appendChild(btn);
  return btn;
}

