document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const progressBar = document.getElementById('scroll-progress');
    const scrollHint = document.getElementById('scroll-hint');
    const comicContainer = document.getElementById('comic-container');
    let isHorizontalActive = false;

    // Track scroll direction
    let lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Update UI based on scroll
    function updateUI() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
        
        // Hide/show scroll hint
        const currentScene = getCurrentScene();
        if (currentScene && currentScene.classList.contains('horizontal-expansion')) {
            scrollHint.textContent = "→ Swipe sideways →";
            isHorizontalActive = true;
        } else {
            scrollHint.textContent = "↓ Scroll down ↓";
            isHorizontalActive = false;
        }
    }
    
    // Get current active scene
    function getCurrentScene() {
        const scenes = document.querySelectorAll('.comic-scene');
        let currentScene = null;
        
        scenes.forEach(scene => {
            const rect = scene.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentScene = scene;
            }
        });
        
        return currentScene;
    }
    
    // Parallax effect for vertical scenes
    function updateVerticalParallax() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        document.querySelectorAll('.comic-scene:not(.horizontal-expansion) [data-depth]').forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed'));
            const yOffset = scrollTop * speed;
            element.style.transform = `translate3d(0, ${yOffset}px, 0)`;
        });
    }
    
    // Parallax effect for horizontal scenes
    function updateHorizontalParallax() {
        document.querySelectorAll('.horizontal-expansion').forEach(panelContainer => {
            const rect = panelContainer.getBoundingClientRect();
            const scrollLeft = panelContainer.scrollLeft;
            const width = panelContainer.scrollWidth - panelContainer.clientWidth;
            const progress = scrollLeft / width;
            
            panelContainer.querySelectorAll('.parallax-bg').forEach(bg => {
                const offset = progress * 100;
                bg.style.transform = `translateX(${offset}px)`;
            });
        });
    }
    
    // Handle wheel events for horizontal scrolling
    function handleWheelEvents(e) {
        if (!isHorizontalActive) return;
        
        const currentScene = getCurrentScene();
        if (currentScene && currentScene.classList.contains('horizontal-expansion')) {
            // Check if wheel is primarily vertical
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                currentScene.scrollLeft += e.deltaY * 2;
                e.preventDefault();
                updateHorizontalParallax();
                return false;
            }
        }
    }
    
    // Event Listeners
    window.addEventListener('scroll', function() {
        updateUI();
        updateVerticalParallax();
    }, { passive: true });
    
    window.addEventListener('wheel', handleWheelEvents, { passive: false });
    
    document.querySelectorAll('.horizontal-expansion').forEach(panel => {
        panel.addEventListener('scroll', updateHorizontalParallax, { passive: true });
    });
    
    // Mobile touch detection
    if ('ontouchstart' in window) {
        document.querySelectorAll('.horizontal-expansion').forEach(panel => {
            panel.style.overflowX = 'auto';
        });
        console.log('Mobile touch detected - horizontal scrolling enabled');
    }
    
    // Initial setup
    updateUI();
    updateVerticalParallax();
});