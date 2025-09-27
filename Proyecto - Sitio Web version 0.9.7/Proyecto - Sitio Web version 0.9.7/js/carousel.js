document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const images = document.querySelectorAll('.carousel img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentIndex = 0;
    const totalImages = images.length;
    let intervalId;
    let lastTransitionTime = 0;
    const transitionInterval = 5000; // 5 segundos
    
    // Configura el carrusel para mostrar la imagen actual
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Actualiza los indicadores
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        // Actualiza el tiempo de la última transición
        lastTransitionTime = Date.now();
    }
    
    // Avanza al siguiente slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
    }
    
    // Retrocede al slide anterior
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarousel();
    }
    
    // Función para verificar si es momento de cambiar de slide
    function checkAutoSlide() {
        const currentTime = Date.now();
        if (currentTime - lastTransitionTime >= transitionInterval) {
            nextSlide();
        }
    }
    
    // Inicia el movimiento automático
    function startAutoSlide() {
        // Limpia cualquier intervalo existente
        if (intervalId) {
            clearInterval(intervalId);
        }
        
        // Establece el tiempo inicial
        lastTransitionTime = Date.now();
        
        // Verifica cada 100ms si es momento de cambiar de slide
        intervalId = setInterval(checkAutoSlide, 100);
    }
    
    // Detiene el movimiento automático
    function stopAutoSlide() {
        clearInterval(intervalId);
    }
    
    // Event listeners para los botones
    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });
    
    // Event listeners para los indicadores
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            stopAutoSlide();
            currentIndex = parseInt(indicator.getAttribute('data-index'));
            updateCarousel();
            startAutoSlide();
        });
    });
    
    // Pausa el carrusel cuando el mouse está sobre él
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);
    
    // Inicia el carrusel automático al cargar la página
    startAutoSlide();
    
    // Ajusta el tamaño del carrusel al cargar y al redimensionar
    function adjustCarouselSize() {
        // Para imágenes 1920x1080, el contenedor mantiene la relación de aspecto 16:9
        // No necesita ajuste adicional gracias a aspect-ratio CSS
    }
    
    window.addEventListener('load', adjustCarouselSize);
    window.addEventListener('resize', adjustCarouselSize);
});