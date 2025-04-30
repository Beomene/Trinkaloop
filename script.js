// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Scroll Progress Indicator
    const progressBar = document.getElementById('scroll-progress');
    
    // Enhanced Parallax System
    function updateParallax() {
        // Update progress bar
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
        
        // Parallax effect
        const scenes = document.querySelectorAll('.comic-scene');
        
        scenes.forEach(scene => {
            const rect = scene.getBoundingClientRect();
            const sceneCenter = rect.top + (rect.height / 2);
            const viewportCenter = window.innerHeight / 2;
            const distanceFromCenter = viewportCenter - sceneCenter;
            
            // Activate scene when centered
            if (Math.abs(distanceFromCenter) < window.innerHeight * 0.4) {
                scene.classList.add('active');
            } else {
                scene.classList.remove('active');
            }
            
            // Apply parallax to layers
            scene.querySelectorAll('[data-depth]').forEach(layer => {
                const depth = parseFloat(layer.dataset.depth);
                const yOffset = distanceFromCenter * depth * 0.2;
                
                layer.style.transform = `
                    translate3d(0, ${yOffset}px, 0)
                    scale(${1 + depth * 0.5})
                `;
                
                // Depth-based opacity
                layer.style.opacity = 1 - Math.abs(distanceFromCenter / window.innerHeight) * depth;
            });
        });
    }
    
    // Smooth Scroll Handling
    let isTicking = false;
    window.addEventListener('scroll', function() {
        if (!isTicking) {
            window.requestAnimationFrame(function() {
                updateParallax();
                isTicking = false;
            });
            isTicking = true;
        }
    });
    
    // Initial setup
    updateParallax();
    
    // Bonus: Mouse Tilt Effect
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        
        document.querySelectorAll('.character').forEach(char => {
            char.style.transform = `
                rotateY(${x * 10}deg)
                rotateX(${y * -5}deg)
                translateY(${y * -20}px)
            `;
        });
    });
});