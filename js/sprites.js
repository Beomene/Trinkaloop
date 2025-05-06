```javascript
class SpriteLoader {
    constructor() {
        this.foxSprite = new Image();
        this.loadingProgress = 0;
        this.init();
    }

    init() {
        // Create loading container
        const loader = document.createElement('div');
        loader.id = 'sprite-loader';
        loader.innerHTML = `
            <div class="fox-run"></div>
            <div class="loading-bar"></div>
            <div class="loading-text">0%</div>
        `;
        document.body.appendChild(loader);

        // Load sprite sheet
        this.foxSprite.src = '/Trinkaloop/assets/images/characters/fox_run_sheet.webp';
        this.foxSprite.onload = () => this.animateFox();
    }

    animateFox() {
        const foxElement = document.querySelector('.fox-run');
        let frame = 0;
        const totalFrames = 6; // Adjust based on your sprite sheet
        
        // Animation loop
        setInterval(() => {
            frame = (frame + 1) % totalFrames;
            foxElement.style.backgroundPosition = `-${frame * 200}px 0`; // Adjust 200px per frame
        }, 100);
    }
}

// Initialize when assets load
window.addEventListener('load', () => new SpriteLoader());