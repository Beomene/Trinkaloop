document.addEventListener('DOMContentLoaded', function() {
    // Smooth parallax effect with requestAnimationFrame
    let lastScrollPosition = 0;
    let ticking = false;
    
    function updateParallax() {
        const scrollPosition = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-speed]');
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.speed);
            const offset = scrollPosition * speed;
            
            // Only apply transform if element is in viewport
            const rect = element.getBoundingClientRect();
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
                element.style.transform = `translate3d(0, ${offset}px, 0)`;
            }
        });
        
        // Scene activation logic
        document.querySelectorAll('.comic-scene').forEach(scene => {
            const sceneTop = scene.offsetTop;
            const sceneHeight = scene.offsetHeight;
            const sceneBottom = sceneTop + sceneHeight;
            const scrollMiddle = scrollPosition + (window.innerHeight / 2);
            
            if (scrollMiddle > sceneTop && scrollMiddle < sceneBottom) {
                scene.classList.add('active');
            } else {
                scene.classList.remove('active');
            }
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        lastScrollPosition = window.pageYOffset;
        
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    // Initialize
    updateParallax();
    
    // Click-to-animate characters (bonus feature)
    document.querySelectorAll('.character').forEach(character => {
        character.addEventListener('click', function() {
            this.classList.toggle('animated');
        });
    });
});