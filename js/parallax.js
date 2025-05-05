class ParallaxEngine {
    constructor() {
        this.layers = [];
        this.scrollY = 0;
        this.mouseX = window.innerWidth / 2;
        this.rafId = null;
        this.init();
    }

    init() {
        this.cacheElements();
        this.setupEvents();
        this.animate();
    }

    cacheElements() {
        this.layers = Array.from(document.querySelectorAll('.layer'));
        this.viewportCenter = window.innerWidth / 2;
    }

    setupEvents() {
        // Single throttled event listener
        window.addEventListener('scroll', () => {
            this.scrollY = window.scrollY;
        }, { passive: true });

        // Unified pointer input handler
        const handlePointerMove = (e) => {
            this.mouseX = e.clientX || e.touches[0].clientX;
        };
        
        window.addEventListener('mousemove', handlePointerMove);
        window.addEventListener('touchmove', handlePointerMove, { passive: true });
        
        // Cleanup on orientation change
        window.addEventListener('resize', () => {
            this.viewportCenter = window.innerWidth / 2;
        });
    }

    applyParallax() {
        const baseSpeed = 0.1; // Default multiplier
        
        this.layers.forEach(layer => {
            const speed = parseFloat(layer.dataset.speed) || baseSpeed;
            const yOffset = this.scrollY * speed;
            const xOffset = (this.viewportCenter - this.mouseX) * speed * 0.1;
            
            layer.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
        });
    }

    animate() {
        this.applyParallax();
        this.rafId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.rafId) cancelAnimationFrame(this.rafId);
    }
}

// Initialize with DOM readiness check
document.readyState === 'complete' 
    ? new ParallaxEngine() 
    : window.addEventListener('load', () => new ParallaxEngine());