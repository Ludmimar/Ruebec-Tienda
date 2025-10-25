// Manejo del Modo Oscuro
(function() {
  // Obtener tema guardado o usar 'light' por defecto
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  // Aplicar tema inmediatamente
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Función para inicializar el toggle
  function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    if (!themeToggle || !themeIcon) {
      // Si no encuentra los elementos, intenta de nuevo en 100ms
      setTimeout(initThemeToggle, 100);
      return;
    }
    
    // Configurar estado inicial del toggle
    if (savedTheme === 'dark') {
      themeToggle.classList.add('active');
      themeIcon.className = 'bi bi-moon-stars-fill';
    }
    
    // Función para cambiar tema
    function toggleTheme() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      // Aplicar nuevo tema
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Actualizar toggle
      if (newTheme === 'dark') {
        themeToggle.classList.add('active');
        themeIcon.className = 'bi bi-moon-stars-fill';
      } else {
        themeToggle.classList.remove('active');
        themeIcon.className = 'bi bi-sun-fill';
      }
    }
    
    // Event listener
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Intentar inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
  } else {
    initThemeToggle();
  }
})();
