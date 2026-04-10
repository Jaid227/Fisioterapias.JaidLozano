document.addEventListener('DOMContentLoaded', function() {
    // Configuración de WhatsApp
    const PHONE_NUMBER = '525591461227';
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
            const packageName = this.getAttribute('data-package');
            const price = this.getAttribute('data-price');
            openWhatsApp(packageName, price);
            console.log(`Redirigiendo a WhatsApp para: ${packageName} - $${price}`);
        });
    });

    // Animación suave al hacer scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Efecto de aparición gradual
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

    // Animación frases flotantes
    const phrases = document.querySelectorAll('.floating-phrases span');
    phrases.forEach((phrase, index) => {
        const duration = 15 + (index * 0.5);
        phrase.style.animationDuration = `${duration}s`;
    });
});

// Función para imágenes normales (Masaje, Ventosas, Acupuntura, Auriculoterapia)
function toggleFullscreen(img) {
    if (!document.fullscreenElement) {
        img.requestFullscreen().catch(err => {
            console.log(`Error al entrar en pantalla completa: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Función solo para la imagen del CV (pantalla completa + cierra con clic)
function toggleFullscreenCV(img) {
    // Entrar en pantalla completa
    img.requestFullscreen().catch(err => {
        console.log(`Error al entrar en pantalla completa: ${err.message}`);
    });
}

// Detectar clic en cualquier lugar durante pantalla completa para salir (SOLO para CV)
document.addEventListener('fullscreenchange', function() {
    if (!document.fullscreenElement) {
        return;
    }
    
    const handleClick = function() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        document.removeEventListener('click', handleClick);
    };
    
    setTimeout(() => {
        document.addEventListener('click', handleClick);
    }, 100);
});
