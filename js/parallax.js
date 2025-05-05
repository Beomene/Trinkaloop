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
        this.sceneHeight = document.querySelector('.parallax-scene')?.offsetHeight || 2160;
    }

    setupEvents() {
        window.addEventListener('scroll', () => {
            this.scrollY = window.scrollY;
        }, { passive: true });

        const handlePointerMove = (e) => {
            this.mouseX = e.clientX || e.touches[0].clientX;
        };
        
        window.addEventListener('mousemove', handlePointerMove);
        window.addEventListener('touchmove', handlePointerMove, { passive: true });
        
        window.addEventListener('resize', () => {
            this.viewportCenter = window.innerWidth / 2;
        });
    }

    animate() {
        this.layers.forEach(layer => {
            const speed = parseFloat(layer.dataset.speed) || 0.1;
            const yOffset = this.scrollY * speed;
            const xOffset = (this.viewportCenter - this.mouseX) * speed * 0.1;
            
            layer.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
        });
        
        this.rafId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.rafId) cancelAnimationFrame(this.rafId);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => new ParallaxEngine());