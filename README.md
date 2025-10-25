# 🧶 Ruebec - Tejidos Artesanales

Sitio web profesional de Ruebec, emprendimiento de tejidos artesanales hechos a mano en Córdoba, Argentina.

## 📋 Descripción

Ruebec es un sitio web e-commerce showcase completo que presenta **21 productos artesanales** tejidos a mano, permitiendo a los clientes explorar el catálogo, guardar favoritos y realizar pedidos directamente a través de WhatsApp.

## ✨ Características Principales

### 🎯 **Funcionalidades Core**
- 🛒 **Sistema de Favoritos**: Modal tipo carrito con lista de productos seleccionados
- 🌙 **Modo Oscuro**: Toggle completo con persistencia en LocalStorage
- 🔍 **Búsqueda Avanzada**: Filtrado en tiempo real por nombre y descripción
- 📊 **Filtros Múltiples**: Por categoría (4), precio (4 rangos) y ordenamiento (5 opciones)
- 🚚 **Calculadora de Envíos**: Estimación de costos por provincia y peso
- 📱 **Integración WhatsApp**: Mensajes pre-formateados para consultas y favoritos
- 🎨 **Diseño Responsivo**: Optimizado para móvil, tablet y escritorio
- ⚡ **Lazy Loading**: Carga optimizada de imágenes
- 🎭 **Animaciones**: Efectos visuales con AOS (Animate On Scroll)
- ♿ **Accesibilidad**: Roles ARIA y navegación semántica

### 🔎 **SEO & Marketing**
- ✅ Meta tags completos (Open Graph, Twitter Cards)
- ✅ Schema.org JSON-LD (LocalBusiness, ItemList, AboutPage)
- ✅ Sitemap.xml para mejor indexación
- ✅ Robots.txt configurado
- ✅ Placeholders para Google Analytics 4 y Facebook Pixel
- ✅ URLs amigables y breadcrumbs

### 🎨 **UX/UI Profesional**
- ✨ Efectos parallax en hero header
- 🔄 Loading spinners y skeleton screens
- 💫 Hover effects y transiciones suaves
- 🏅 Badges de confianza (100% artesanal, hecho en Argentina)
- 🎯 Estados vacíos amigables
- 📋 Contador de productos filtrados

## 📦 Catálogo de Productos

### **21 Productos en 4 Categorías:**

#### 🧸 **Juguetes (2)**
- Payasito Plim Plim
- Hombre Araña (Spider-Man)

#### 👜 **Accesorios (11)**
- Gorro de lana
- Mitones de lana
- Bufanda tejida
- Bolso-cartera
- Cuello Infinity
- Guantes de lana
- Medias de lana
- Gorritos y cuellitos para bebé
- Bolso tejido
- Aritos tejidos
- Capelina con moño

#### 👗 **Ropa (7)**
- Cardigan
- Saquito de bebé
- Poncho triangular
- Chaleco de lana
- Manta/Throw
- Sweater Oversize
- Ruana

#### 🏠 **Hogar (1)**
- Set de mate y latitas recicladas

### **3 Combos Especiales con Descuento:**
- Combo Invierno Completo
- Pack Regalo Perfecto
- Combo Invierno Premium

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **HTML5**: Estructura semántica completa
- **CSS3**: Custom properties, Grid, Flexbox, animaciones
- **JavaScript ES6+**: Módulos, async/await, LocalStorage
- **Bootstrap 5.3.3**: Framework CSS responsivo
- **Bootstrap Icons**: Iconografía principal
- **Font Awesome 6.5.1**: Iconos complementarios
- **AOS 2.3.4**: Animaciones on scroll
- **Google Fonts**: Lato, Pacifico, Playfair Display

### **Características Técnicas**
- ✅ Componentes dinámicos (navbar, footer)
- ✅ Carga asíncrona con fetch API
- ✅ Manejo de estado con LocalStorage
- ✅ Event delegation para performance
- ✅ Debounce en búsquedas
- ✅ Modal system con Bootstrap
- ✅ Responsive images con srcset (preparado)

## 📁 Estructura del Proyecto

```
Ruebec/
│
├── index.html                   # Página principal con todas las secciones
├── style.css                   # Estilos personalizados (1000+ líneas)
├── README.md                   # Este archivo
├── robots.txt                  # Directivas para crawlers
├── sitemap.xml                 # Mapa del sitio para SEO
├── .gitignore                  # Archivos ignorados por Git
│
├── pages/                      # Páginas secundarias organizadas
│   ├── catalogo.html          # Catálogo completo con filtros avanzados
│   ├── sobre-nosotros.html    # Historia, valores y galería
│   ├── contacto.html           # Página de contacto con Google Forms
│   ├── politicas.html          # Políticas legales y FAQ
│   └── 404.html                # Página de error personalizada
│
├── components/                 # Componentes reutilizables
│   ├── navbar.html            # Navegación con wishlist y theme toggle
│   └── footer.html            # Footer con modales (talles, favoritos)
│
├── img/                        # Imágenes (48 archivos)
│   ├── productos/             # Fotos de productos
│   ├── combos/                # Imágenes de combos
│   ├── iconos/                # Iconos y logos
│   └── general/               # Imágenes generales
│
├── logic/                      # JavaScript modular
│   ├── layout.js              # Carga navbar/footer y scroll-to-top
│   ├── productos.js           # 21 productos + 3 combos
│   ├── index.js               # Lógica del home (featured, combos, newsletter)
│   ├── catalogo.js            # Filtros, búsqueda, ordenamiento
│   ├── theme.js               # Modo oscuro con persistencia
│   ├── wishlist.js            # Sistema de favoritos con modal
│   ├── analytics.js           # Google Analytics 4, Facebook Pixel, GTM
│   └── app.js                 # [Backup - no usado actualmente]
│
├── config/                     # Archivos de configuración
│   └── analytics.js           # Configuración de analíticas (crear manualmente)
│
└── documentacion/              # Guías y documentación interna
    ├── CONFIGURAR_ANALITICAS.md
    ├── CONFIGURAR_GOOGLE_ANALYTICS_COMPLETO.md
    └── INSTAGRAM_CARRUSEL_BOOTSTRAP.md
```

## 🚀 Instalación y Uso

### **Requisitos Previos**
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Servidor local para desarrollo (recomendado)

### **Archivos que Debes Crear Manualmente**

⚠️ **IMPORTANTE:** Los siguientes archivos están en `.gitignore` por seguridad y deben crearse manualmente:

#### **1. `config/analytics.js`** (Configuración de analíticas)
```javascript
const ANALYTICS_CONFIG = {
    GA4_ID: 'G-XXXXXXXXXX', // ← Tu ID de Google Analytics 4
    FACEBOOK_PIXEL_ID: 'TU_PIXEL_ID', // ← Tu ID de Facebook Pixel
    GTM_ID: 'GTM-XXXXXXX', // ← Tu ID de Google Tag Manager
    DEBUG_MODE: false,
    ENABLE_GTM: true,
    ENABLE_FB_PIXEL: true,
};
```

#### **2. `logic/analytics.js`** (Lógica de analíticas)
Ver sección "Configurar Google Analytics y Facebook Pixel" más abajo para el código completo.

> 📝 **Nota:** Estos archivos contienen información sensible y no deben subirse a Git por seguridad.

### **Opción 1: Python HTTP Server** ⭐ Recomendado

```bash
# Con Python 3
python -m http.server 8000

# Con Python 2
python -m SimpleHTTPServer 8000
```

Luego abre: `http://localhost:8000`

### **Opción 2: Node.js HTTP Server**

```bash
# Instalar globalmente (una sola vez)
npm install -g http-server

# Ejecutar
npx http-server -p 8000
```

### **Opción 3: Live Server (VS Code)**

1. Instalar extensión "Live Server"
2. Click derecho en `index.html`
3. "Open with Live Server"

### **Opción 4: XAMPP/WAMP/MAMP**

Copiar la carpeta del proyecto a:
- XAMPP: `htdocs/ruebec`
- WAMP: `www/ruebec`
- MAMP: `htdocs/ruebec`

Acceder: `http://localhost/ruebec`

> ⚠️ **IMPORTANTE:** No abrir `index.html` directamente (`file://`) porque las llamadas fetch a componentes fallarán por restricciones CORS.

## 📱 Información de Contacto

- **WhatsApp**: [+54 9 351 389-1117](https://wa.me/5493513891117)
- **Email**: martosludmila@gmail.com
- **Instagram**: [@ruebec_](https://www.instagram.com/)
- **Ubicación**: Córdoba, Argentina

## 🎯 Páginas del Sitio

### **1. Página Principal (`index.html`)**
- ✨ Hero section con parallax
- 🎯 Productos destacados (6 productos)
- 🎁 Combos y paquetes especiales
- 🤝 Pedidos personalizados
- ℹ️ Sobre Ruebec
- 🔄 Proceso de producción "De la lana a tu hogar"
- 💬 Testimonios de clientas
- ❓ Preguntas frecuentes (FAQ)
- 📖 Guía de cuidados
- 📸 Galería Instagram (carousel Bootstrap)
- 🚚 Calculadora de costos de envío
- 📊 Schema.org LocalBusiness
- ⚠️ Leyenda "Solo para pruebas"

### **2. Catálogo (`pages/catalogo.html`)**
- 📋 Listado completo de 21 productos
- 🔍 Buscador en tiempo real
- 🏷️ Filtro por categoría (5 opciones: Todos, Accesorios, Ropa, Juguetes, Hogar)
- 💰 Filtro por precio (4 rangos)
- 🔄 Ordenamiento (5 opciones)
- 📊 Contador de productos
- 🖼️ Carruseles de imágenes
- ❤️ Botones de favoritos
- 📱 Consulta por WhatsApp
- 🍞 Breadcrumbs
- 📊 Schema.org ItemList
- ⚠️ Leyenda "Solo para pruebas"

### **3. Sobre Nosotros (`pages/sobre-nosotros.html`)**
- 📖 Historia personal de Rebeca y Ruebec
- 💎 Valores del emprendimiento
- 🔄 Proceso de producción expandido
- ✨ Beneficios de productos artesanales
- 🖼️ Galería de fotos
- 📞 CTA de contacto
- 📊 Schema.org AboutPage
- ⚠️ Leyenda "Solo para pruebas"

### **4. Contacto (`pages/contacto.html`)**
- 📞 Información de contacto (WhatsApp, Instagram)
- 📧 Newsletter con Google Forms integrado
- 📝 Formulario de mensajes
- ℹ️ Información útil (tiempos de respuesta, envíos, pagos)
- 🎯 CTA final para WhatsApp
- ⚠️ Leyenda "Solo para pruebas"

### **5. Políticas Legales (`pages/politicas.html`)**
- 🔒 Política de Privacidad
- 📋 Términos y Condiciones
- 🚚 Política de Envíos
- 🔄 Política de Devoluciones/Cambios
- ❓ FAQ interactivo con acordeones Bootstrap
- ⚠️ Leyenda "Solo para pruebas"

### **6. Error 404 (`pages/404.html`)**
- 🎨 Diseño personalizado
- 🔗 Enlaces de navegación
- 💫 Animación amigable
- 🏠 Retorno fácil al home
- ⚠️ Leyenda "Solo para pruebas"



### **Configurar Google Analytics y Facebook Pixel**

#### **Paso 1: Crear archivo de configuración**

Crear `config/analytics.js`:

```javascript
const ANALYTICS_CONFIG = {
    // Google Analytics 4
    GA4_ID: 'G-XXXXXXXXXX', // ← Reemplazar con tu ID real
    
    // Facebook Pixel
    FACEBOOK_PIXEL_ID: 'TU_PIXEL_ID', // ← Reemplazar con tu Pixel ID
    
    // Google Tag Manager
    GTM_ID: 'GTM-XXXXXXX', // ← Reemplazar con tu Container ID
    
    // Configuración adicional
    DEBUG_MODE: false, // Cambiar a true para desarrollo
    ENABLE_GTM: true,
    ENABLE_FB_PIXEL: true,
};
```

#### **Paso 2: Crear archivo principal de analíticas**

Crear `logic/analytics.js`:

```javascript
// Importar configuración
import { ANALYTICS_CONFIG } from '../config/analytics.js';

// Inicializar Google Analytics 4
function initGA4() {
    if (!ANALYTICS_CONFIG.GA4_ID || !ANALYTICS_CONFIG.ENABLE_GTM) return;
    
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', ANALYTICS_CONFIG.GA4_ID);
}

// Inicializar Facebook Pixel
function initFacebookPixel() {
    if (!ANALYTICS_CONFIG.FACEBOOK_PIXEL_ID || !ANALYTICS_CONFIG.ENABLE_FB_PIXEL) return;
    
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', ANALYTICS_CONFIG.FACEBOOK_PIXEL_ID);
    fbq('track', 'PageView');
}

// Función para trackear eventos personalizados
function trackEvent(eventName, parameters = {}) {
    if (ANALYTICS_CONFIG.DEBUG_MODE) {
        console.log('Analytics Event:', eventName, parameters);
    }
    
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, parameters);
    }
}

// Eventos específicos del sitio
function trackPageView(pageName) {
    trackEvent('page_view', {
        page_title: pageName,
        page_location: window.location.href
    });
}

function trackWhatsAppContact(method = 'whatsapp') {
    trackEvent('contact', {
        method: method,
        page_location: window.location.href
    });
}

function trackNewsletterSignup(email) {
    trackEvent('sign_up', {
        method: 'newsletter',
        email: email
    });
}

function trackAddToWishlist(productId) {
    trackEvent('add_to_wishlist', {
        item_id: productId,
        page_location: window.location.href
    });
}

function trackPurchase(total, items = []) {
    trackEvent('purchase', {
        transaction_id: Date.now().toString(),
        value: total,
        currency: 'ARS',
        items: items
    });
}

// Inicializar todo
document.addEventListener('DOMContentLoaded', function() {
    initGA4();
    initFacebookPixel();
    trackPageView(document.title);
});

// Exportar funciones globalmente
window.trackPageView = trackPageView;
window.trackWhatsAppContact = trackWhatsAppContact;
window.trackNewsletterSignup = trackNewsletterSignup;
window.trackAddToWishlist = trackAddToWishlist;
window.trackPurchase = trackPurchase;
window.trackEvent = trackEvent;
```

#### **Paso 3: Obtener IDs reales**

1. **Google Analytics 4:**
   - Ir a [analytics.google.com](https://analytics.google.com)
   - Crear cuenta y propiedad
   - Obtener Measurement ID (formato: G-XXXXXXXXXX)

2. **Facebook Pixel:**
   - Ir a [business.facebook.com](https://business.facebook.com)
   - Crear pixel
   - Obtener Pixel ID (formato: números)

3. **Google Tag Manager:**
   - Ir a [tagmanager.google.com](https://tagmanager.google.com)
   - Crear contenedor
   - Obtener Container ID (formato: GTM-XXXXXXX)

#### **Paso 4: Verificar funcionamiento**

1. Abrir consola del navegador (F12)
2. Navegar por el sitio
3. Verificar eventos en:
   - Google Analytics (Tiempo real)
   - Facebook Pixel Helper (extensión Chrome)
   - Google Tag Manager (Vista previa)


## 📊 Funcionalidades Detalladas

### **Sistema de Favoritos/Wishlist**
```javascript
// Agregar a favoritos
wishlist.add(productId);

// Ver favoritos
wishlist.showWishlistModal();

// Enviar por WhatsApp
wishlist.enviarPorWhatsApp();
```

**Características:**
- ✅ Persistencia con LocalStorage
- ✅ Modal tipo carrito de compras
- ✅ Contador en navbar
- ✅ Eliminar productos individuales
- ✅ Total estimado calculado
- ✅ Envío directo a WhatsApp

### **Modo Oscuro**
```javascript
// Cambiar tema
theme.toggle();

// Estado actual
theme.getCurrentTheme(); // 'light' o 'dark'
```

**Características:**
- ✅ Toggle en navbar
- ✅ Persistencia con LocalStorage
- ✅ Iconos adaptativos (sol/luna)
- ✅ Variables CSS personalizadas
- ✅ Transiciones suaves
- ✅ Soporte completo en todas las páginas

### **Filtros del Catálogo**
```javascript
// Filtrar por categoría
filtrarPorCategoria('accesorios');

// Filtrar por precio
filtrarPorPrecio('3000-5000');

// Ordenar
ordenarProductos('precio-asc');
```

**Opciones de filtrado:**
- 📂 **Categorías**: Todos, Accesorios, Ropa, Juguetes, Hogar
- 💰 **Precio**: Todos, Hasta $3k, $3k-$5k, $5k-$7k, +$7k
- 🔄 **Orden**: Destacados, Precio ↑↓, Nombre A-Z/Z-A

### **Integración con WhatsApp**
El sitio utiliza WhatsApp como canal principal de comunicación y ventas. La integración funciona de la siguiente manera:

#### **📱 Botones de WhatsApp**
- **Ubicación**: Navbar, footer, botones CTA en todas las páginas
- **Número**: `+54 9 351 389-1117`
- **Formato**: `https://wa.me/5493513891117`

#### **🛒 Pedidos desde Wishlist**
```javascript
// Función que genera mensaje automático
function enviarPorWhatsApp() {
    const productos = wishlist.getItems();
    let mensaje = "¡Hola! Me interesan estos productos de mis favoritos:\n\n";
    
    productos.forEach((producto, index) => {
        mensaje += `${index + 1}. ${producto.nombre} - $${producto.precio.toLocaleString('es-AR')}\n`;
    });
    
    mensaje += `\n━━━━━━━━━━━━━━━━\nTOTAL ESTIMADO: $${total.toLocaleString('es-AR')}\n\n`;
    mensaje += "¿Podrían darme más información sobre disponibilidad, talles y opciones de personalización?";
    
    window.open(`https://wa.me/5493513891117?text=${encodeURIComponent(mensaje)}`);
}
```

#### **📋 Consultas Generales**
- **Productos individuales**: Botón "Consultar" en cada producto
- **Información general**: Botones en navbar y footer
- **Contacto directo**: Página de contacto con formulario

#### **💬 Mensajes Predefinidos**
1. **Consulta de producto**: "Hola! Me interesa el [NOMBRE_PRODUCTO]. ¿Podrían darme más información?"
2. **Pedido personalizado**: "Hola! Me gustaría hacer un pedido personalizado. ¿Qué opciones tienen?"
3. **Consulta de talles**: "Hola! Necesito ayuda con los talles del [PRODUCTO]. ¿Podrían asesorarme?"
4. **Información de envíos**: "Hola! Quería consultar sobre costos y tiempos de envío."

#### **🔧 Configuración**
```javascript
// Cambiar número de WhatsApp
const whatsappNumber = "5493513891117"; // Sin el + inicial

// Cambiar mensaje por defecto
const defaultMessage = "¡Hola! Me interesa conocer más sobre sus productos artesanales.";
```

**Características:**
- ✅ **URLs automáticas** - Generación de enlaces con mensajes predefinidos
- ✅ **Codificación UTF-8** - Soporte para caracteres especiales y emojis
- ✅ **Mensajes personalizados** - Diferentes mensajes según el contexto
- ✅ **Integración completa** - Funciona desde cualquier página del sitio
- ✅ **Responsive** - Botones optimizados para móvil y desktop


## 🔒 Seguridad y Privacidad

- ✅ Sin datos sensibles en el código
- ✅ Todas las conexiones externas con HTTPS
- ✅ LocalStorage solo para preferencias del usuario
- ✅ Sin cookies de terceros
- ✅ Contenido estático (sin backend)


## 🎉 Agradecimientos

Desarrollado con ❤️ para **Ruebec** - Tejidos Artesanales de Córdoba, Argentina.

---
## 📞 Contacto

**Ludmila Martos**
- 📧 Email: [ludmilamartos@gmail.com](mailto:ludmilamartos@gmail.com)
- 💼 LinkedIn: [Ludmila Martos](https://www.linkedin.com/in/ludmimar89/)
- 🐙 GitHub: [Ludmimar](https://github.com/Ludmimar)
- 🌐 Portfolio: [ludmilamartos.dev](https://ludmilamartos.dev)


---

## 📄 Licencia y Uso

© 2025 Martos Ludmila - Todos los derechos reservados.

Este proyecto es propiedad exclusiva de Martos Ludmila. El código fuente está disponible para revisión y desarrollo, pero no para uso comercial sin autorización.

---

**Última actualización:** Octubre 2025  
**Versión:** 2.1  
**Estado:** ✅ Producción - Completamente funcional
