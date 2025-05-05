class DesktopExperience {
    constructor() {
        this.cursorHistory = [];
        this.maxHistoryLength = 5;
        this.init();
    }
    
    init() {
        this.setupParallaxEnhancements();
        this.setupMouseEffects();
        this.setupPerformanceMonitor();
    }
    
    setupParallaxEnhancements() {
        document.querySelectorAll('.parallax-layer').forEach(layer => {
            const speed = parseFloat(layer.dataset.speed) || 0.5;
            layer.style.transform = `translateZ(${speed * -100}px)`;
            layer.style.willChange = 'transform';
        });
    }
    
    setupMouseEffects() {
        const smoothMouseMove = (e) => {
            // Store cursor positions for smoothing
            this.cursorHistory.push({
                x: e.clientX / window.innerWidth - 0.5,
                y: e.clientY / window.innerHeight - 0.5,
                timestamp: Date.now()
            });
            
            // Maintain history size
            if (this.cursorHistory.length > this.maxHistoryLength) {
                this.cursorHistory.shift();
            }
            
            // Calculate averaged position
            const avgPos = this.cursorHistory.reduce((acc, pos) => {
                acc.x += pos.x;
                acc.y += pos.y;
                return acc;
            }, { x: 0, y: 0 });
            
            const x = avgPos.x / this.cursorHistory.length;
            const y = avgPos.y / this.cursorHistory.length;
            
            // Apply to character
            const foxLayer = document.querySelector('.fox-layer');
            if (foxLayer) {
                foxLayer.style.transform = `
                    translate(calc(-50% + ${x * 20}px), calc(-50% + ${y * 10}px))
                    rotate(${x * 5}deg)
                `;
            }
        };
        
        window.addEventListener('mousemove', smoothMouseMove);
    }
    
    setupPerformanceMonitor() {
        if (process.env.NODE_ENV === 'development') {
            const perfMonitor = document.createElement('div');
            perfMonitor.style.position = 'fixed';
            perfMonitor.style.bottom = '10px';
            perfMonitor.style.right = '10px';
            perfMonitor.style.color = 'white';
            perfMonitor.style.zIndex = '1000';
            document.body.appendChild(perfMonitor);
            
            let frameCount = 0;
            let lastTime = performance.now();
            
            const updateMonitor = () => {
                frameCount++;
                const now = performance.now();
                if (now - lastTime >= 1000) {
                    perfMonitor.textContent = `FPS: ${frameCount}`;
                    frameCount = 0;
                    lastTime = now;
                }
                requestAnimationFrame(updateMonitor);
            };
            
            updateMonitor();
        }
    }
}

// Initialize only on desktop
if (window.innerWidth >= 1200 && window.innerHeight <= window.innerWidth) {
    new DesktopExperience();
}