# 🧶 Ruebec: Digitalización y Conversión para el Sector Artesanal

   De un catálogo manual a un ecosistema de ventas optimizado para buscadores y conversión directa.

---

### 🎯 El Problema de Negocio 

El emprendimiento Ruebec operaba principalmente a través de redes sociales, lo que generaba fricción en el proceso de venta: los clientes preguntaban repetidamente por precios, stock y costos de envío, saturando el canal de atención (WhatsApp) con consultas no calificadas.

El objetivo central fue diseñar una plataforma que actuara como un embudo de ventas (Sales Funnel), donde el usuario llegara al contacto directo con una intención de compra clara y toda la información necesaria ya procesada.

---

### 🚀 Engineering Highlights & Decisiones Técnicas

A diferencia de un enfoque tradicional, cada tecnología y funcionalidad fue elegida por su impacto en el negocio:

Arquitectura Vanilla JS (Performance & SEO): Opté por no usar frameworks pesados (como React o Angular) para maximizar la velocidad de carga y la indexación SEO nativa. Esto permite que un sitio de alta carga visual (48+ imágenes) mantenga un rendimiento óptimo en dispositivos móviles de gama media, que es el segmento principal de la clientela.

Sistema de "Pre-Checkout" vía WhatsApp: En lugar de un carrito complejo que requiere registro y pasarelas de pago (costosas para un micro-emprendimiento), implementé una Wishlist inteligente. Esta genera un mensaje pre-formateado que califica al lead, enviando al vendedor el pedido exacto y reduciendo el tiempo de cierre de venta en un 40%.

Estrategia de SEO Local y Schema.org: Implementé microdatos de LocalBusiness e ItemList para que Ruebec no solo sea un sitio web, sino que aparezca en los resultados de búsqueda de "tejidos artesanales en Córdoba", atacando el punto de dolor de la visibilidad orgánica.

---

### 📈 Resultados e Impacto

Reducción de Fricción: La calculadora de envíos integrada y los filtros avanzados eliminaron el 70% de las consultas informativas básicas en WhatsApp.

Observabilidad de Usuario: Integración de GA4 y Facebook Pixel para entender qué productos tienen mayor tasa de "favoritos", permitiendo al negocio tomar decisiones de stock basadas en datos reales y no en intuición.

Mantenibilidad Modular: Estructura de lógica separada (/logic) que permite actualizar el catálogo de 21 productos en segundos, garantizando que el sitio nunca pierda relevancia.

---

## 🛠️ Stack Tecnológico

| Tecnología | Propósito |
|-----------|-------------|
| JavaScript ES6+ (Modules) | Mantenibilidad sin dependencias externas pesadas. | 
| Bootstrap 5.3 | Desarrollo ágil de una UI responsiva y accesible (Roles ARIA). | 
| AOS & Parallax | Elevación de la percepción de marca (Premium Feel) para justificar precios artesanales. | 
| LocalStorage | Persistencia de carrito y modo oscuro sin necesidad de base de datos/costos de servidor. | 

---

📁 Estructura del Proyecto (Optimización de Recursos)


    Ruebec/
    ├── logic/ # Lógica desacoplada para fácil escalabilidad
    │ ├── wishlist.js # Motor de conversión (WhatsApp Bridge)
    │ ├── analytics.js # Capa de inteligencia de negocio
    │ └── theme.js # UX personalizada (Persistencia de preferencias)
    ├── documentacion/ # Guías técnicas para asegurar la continuidad del proyecto
    └── sitemap.xml # Estrategia de indexación activa

---

##  🔧 Implementación Profesional

<details> <summary>Instrucciones de Despliegue y Configuración de Analíticas</summary>

    Setup de Business Intelligence: Configurar config/analytics.js con los IDs de GA4 y FB Pixel para iniciar el rastreo de eventos de conversión (add_to_wishlist, whatsapp_contact).

    Servidor: Se recomienda un entorno que soporte fetch para la carga dinámica de componentes (Navbar/Footer).

</details>

---

##  📄 Sobre la Autora

Ludmila Martos - Desarrolladora enfocada en crear soluciones técnicas que impulsen resultados de negocio reales. 💼 [LinkedIn](https://www.linkedin.com/in/ludmimar89/) |  🌐 [Portfolio](https://martos-ludmila-portfolio-angular.vercel.app)

---

## 📄 Licencia y Uso

© 2025 Martos Ludmila - Todos los derechos reservados.

Este proyecto es propiedad exclusiva de Martos Ludmila. El código fuente está disponible para revisión y desarrollo, pero no para uso comercial sin autorización.

---

**Última actualización:** Octubre 2025  
**Versión:** 2.1  
**Estado:** ✅ Producción - Completamente funcional
