// REPLACE THE ENTIRE FILE with this:
class SceneManager {
    constructor() {
        this.scenes = [
            // TEST SCENE - DUSK (1920x2160 sky)
            {
                id: 'test_scene_dusk',
                layers: [
                    {
                        type: 'sky',
                        image: '/Trinkaloop/assets/scenes/test/sky_dusk.webp',
                        speed: 0.01,
                        height: 2160 // Custom height
                    },
                    {
                        type: 'hyperdistal',
                        image: '/Trinkaloop/assets/scenes/test/ruins.png',
                        speed: 0.05,
                        yOffset: 300
                    },
                    {
                        type: 'medium_text',
                        image: '/Trinkaloop/assets/scenes/test/graffiti.webp',
                        speed: 0.4,
                        x: 1200,
                        y: 600
                    },
                    {
                        type: 'text_frame',
                        image: '/Trinkaloop/assets/scenes/test/dialogue.png',
                        speed: 1.0,
                        x: 200,
                        y: 800
                    }
                ]
            }
            // Add more scenes below...
        ];
        this.init();
    }

    init() {
        const container = document.getElementById('parallax-world');
        
        this.scenes.forEach(scene => {
            const sceneEl = document.createElement('section');
            sceneEl.className = 'parallax-scene';
            sceneEl.id = scene.id;
            
            scene.layers.forEach(layer => {
                const layerEl = document.createElement('div');
                layerEl.className = `layer ${layer.type}-layer`;
                layerEl.dataset.speed = layer.speed;
                
                // Custom positioning
                if (layer.x) layerEl.style.setProperty('--x', layer.x);
                if (layer.y) layerEl.style.setProperty('--y', layer.y);
                if (layer.yOffset) layerEl.style.top = `${layer.yOffset}px`;
                if (layer.height) layerEl.style.height = `${layer.height}px`;
                
                layerEl.innerHTML = `<img src="${layer.image}" alt="${layer.type}">`;
                sceneEl.appendChild(layerEl);
            });
            
            container.appendChild(sceneEl);
        });
    }
}

// Initialize
new SceneManager();