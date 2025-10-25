// Manejo del Modo Oscuro
(function() {
  // Obtener tema guardado o usar 'light' por defecto
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  // Aplicar tema inmediatamente
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Función para inicializar el toggle
  function initThemeToggle() {
    // Botones desktop y móvil
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const themeIconMobile = document.getElementById('theme-icon-mobile');
    
    if ((!themeToggle || !themeIcon) && (!themeToggleMobile || !themeIconMobile)) {
      // Si no encuentra los elementos, intenta de nuevo en 100ms
      setTimeout(initThemeToggle, 100);
      return;
    }
    
    // Configurar estado inicial del toggle (ambos)
    if (savedTheme === 'dark') {
      if (themeToggle) themeToggle.classList.add('active');
      if (themeIcon) themeIcon.className = 'bi bi-moon-stars-fill';
      if (themeToggleMobile) themeToggleMobile.classList.add('active');
      if (themeIconMobile) themeIconMobile.className = 'bi bi-moon-stars-fill';
    }
    
    // Función para cambiar tema
    function toggleTheme() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      // Aplicar nuevo tema
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Actualizar toggle (ambos)
      if (newTheme === 'dark') {
        if (themeToggle) themeToggle.classList.add('active');
        if (themeIcon) themeIcon.className = 'bi bi-moon-stars-fill';
        if (themeToggleMobile) themeToggleMobile.classList.add('active');
        if (themeIconMobile) themeIconMobile.className = 'bi bi-moon-stars-fill';
      } else {
        if (themeToggle) themeToggle.classList.remove('active');
        if (themeIcon) themeIcon.className = 'bi bi-sun-fill';
        if (themeToggleMobile) themeToggleMobile.classList.remove('active');
        if (themeIconMobile) themeIconMobile.className = 'bi bi-sun-fill';
      }
    }
    
    // Event listener para ambos botones
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
  }
  
  // Intentar inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
  } else {
    initThemeToggle();
  }
})();
