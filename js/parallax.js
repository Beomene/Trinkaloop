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
        // Robust event listener with null checks
        const handlePointerMove = (e) => {
            if (!e) return;
            this.mouseX = (e.clientX || e.touches?.[0]?.clientX || this.viewportCenter);
        };

        window.addEventListener('scroll', () => {
            this.scrollY = window.scrollY || window.pageYOffset;
        }, { passive: true });

        window.addEventListener('mousemove', handlePointerMove);
        window.addEventListener('touchmove', handlePointerMove, { passive: true });
    }

    animate() {
        if (!this.layers.length) return;
        
        this.layers.forEach(layer => {
            const speed = parseFloat(layer.dataset.speed) || 0.1;
            const yOffset = this.scrollY * speed;
            const xOffset = (this.viewportCenter - this.mouseX) * speed * 0.1;
            
            layer.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
        });
        
        this.rafId = requestAnimationFrame(() => this.animate());
    }
}

// Safer initialization
if (document.getElementById('parallax-world')) {
    new ParallaxEngine();
}