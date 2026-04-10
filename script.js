document.addEventListener('DOMContentLoaded', function() {
    // Configuración de WhatsApp
    const PHONE_NUMBER = '5591461227'; // Reemplaza con tu número real
    const DEFAULT_MESSAGE = 'Hola Jaid, me gustaría reservar una sesión de';

    // Función para generar mensaje de WhatsApp
    function generateWhatsAppMessage(packageName, price) {
        const message = `${DEFAULT_MESSAGE} ${packageName} ($${price} MXN). ¿Podrías darme más información sobre disponibilidad?`;
        return encodeURIComponent(message);
    }

    // Función para abrir WhatsApp
    function openWhatsApp(packageName, price) {
        const message = generateWhatsAppMessage(packageName, price);
        const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    }

    // Agregar event listeners a todos los botones de WhatsApp
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener datos del paquete
            const packageName = this.getAttribute('data-package');
            const price = this.getAttribute('data-price');
            
            // Abrir WhatsApp con el mensaje personalizado
            openWhatsApp(packageName, price);
            
            // Opcional: Mostrar confirmación
            console.log(`Redirigiendo a WhatsApp para: ${packageName} - $${price}`);
        });
    });

    // Animación suave al hacer scroll para los enlaces internos (si los agregas después)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto de aparición gradual para las secciones al hacer scroll
    const sections = document.querySelectorAll('.therapy-section, .packages-section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Pequeña animación para las frases flotantes
    const phrases = document.querySelectorAll('.floating-phrases span');
    phrases.forEach((phrase, index) => {
        // Velocidades ligeramente diferentes para cada frase
        const duration = 15 + (index * 0.5);
        phrase.style.animationDuration = `${duration}s`;
    });

    // Validación de teléfono (aviso si no se ha configurado)
    if (PHONE_NUMBER === '5591461227') {
        console.warn('⚠️ Recuerda reemplazar el número de WhatsApp en script.js con tu número real');
        
        // Mostrar un aviso sutil en la consola
        const style = 'background: #f0f7ff; color: #1e4a6d; font-size: 14px; padding: 5px;';
        console.log('%c📱 No olvides actualizar tu número de WhatsApp en el archivo script.js', style);
    }

    // Función para compartir en redes (placeholder)
    window.shareOnSocial = function(platform) {
        const url = window.location.href;
        const text = 'Terapias a domicilio con Jaid Lozano - Fisioterapeuta';
        
        let shareUrl = '';
        
        switch(platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                break;
            default:
                return;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    };
});


function toggleFullscreen(img) {
    // Si ya estamos en pantalla completa, salimos
    if (document.fullscreenElement) {
        document.exitFullscreen();
        return;
    }
    
    // Si no, entramos en pantalla completa con la imagen
    img.requestFullscreen().catch(err => {
        console.log(`Error al entrar en pantalla completa: ${err.message}`);
    });
}

// Detectar clic en cualquier lugar durante pantalla completa para salir
document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement) {
        // Ya no estamos en pantalla completa, no hacemos nada adicional
        return;
    }
    
    // Cuando entramos a pantalla completa, agregamos un listener temporal
    const handleClick = function() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        document.removeEventListener('click', handleClick);
    };
    
    // Pequeño delay para evitar que el clic que activó el fullscreen lo cierre inmediatamente
    setTimeout(() => {
        document.addEventListener('click', handleClick);
    }, 100);
});



