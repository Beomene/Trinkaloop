document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        document.querySelectorAll('[data-speed]').forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed'));
            element.style.transform = `translateY(${scrollTop * speed}px)`;
        });
    });
    
    // Simple scene detection
    window.addEventListener('scroll', function() {
        const scenes = document.querySelectorAll('.comic-scene');
        const scrollPosition = window.scrollY;
        
        scenes.forEach(scene => {
            const sceneTop = scene.offsetTop;
            const sceneHeight = scene.offsetHeight;
            const sceneBottom = sceneTop + sceneHeight;
            
            if (scrollPosition >= sceneTop && scrollPosition < sceneBottom) {
                scene.classList.add('active');
            } else {
                scene.classList.remove('active');
            }
        });
    });
});