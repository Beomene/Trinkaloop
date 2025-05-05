class SceneManager {
    constructor() {
        this.scenes = [
            // ===== EMPTY SCENE (Top Padding) =====
            {
                id: 'padding_top',
                layers: [
                    {
                        type: 'sky',
                        image: '/Trinkaloop/assets/scenes/transparent.png', // 1x1px transparent image
                        speed: 0.01,
                        height: 1080 // Half screen height
                    }
                ]
            },
            
            // ===== MAIN TEST SCENE ===== 
            {
                id: 'test_scene_dusk',
                layers: [
                    // Sky Gradient (Full width, tall)
                    {
                        type: 'sky',
                        image: '/Trinkaloop/assets/scenes/test/sky_dusk.webp',
                        speed: 0.01,
                        height: 2160 // Double screen height
                    },
                    
                    // Distant Ruins
                    {
                        type: 'hyperdistal',
                        image: '/Trinkaloop/assets/scenes/test/ruins.png',
                        speed: 0.05,
                        yOffset: 300, // Starts below sky top
                        zIndex: 2
                    },
                    
                    // Graffiti Text (Mid-distance)
                    {
                        type: 'medium_text',
                        image: '/Trinkaloop/assets/scenes/test/graffiti.webp',
                        speed: 0.4,
                        x: 1200, // Horizontal position
                        y: 600,  // Vertical position
                        zIndex: 4
                    },
                    
                    // Dialogue Box (Foreground)
                    {
                        type: 'text_frame',
                        image: '/Trinkaloop/assets/scenes/test/dialogue.png',
                        speed: 1.0,
                        x: 200,
                        y: 800,
                        zIndex: 10
                    }
                ]
            },
            
            // ===== EMPTY SCENE (Bottom Padding) =====
            {
                id: 'padding_bottom',
                layers: [
                    {
                        type: 'sky',
                        image: '/Trinkaloop/assets/scenes/transparent.png',
                        speed: 0.01,
                        height: 1080
                    }
                ]
            }
        ];
        this.init();
    }

    init() {
        const container = document.getElementById('parallax-world');
        
        // Create all scenes
        this.scenes.forEach(scene => {
            const sceneEl = document.createElement('section');
            sceneEl.className = 'parallax-scene';
            sceneEl.id = scene.id;
            
            // Add all layers to this scene
            scene.layers.forEach(layer => {
                const layerEl = document.createElement('div');
                layerEl.className = `layer ${layer.type}-layer`;
                layerEl.dataset.speed = layer.speed;
                
                // Custom positioning
                if (layer.x) layerEl.style.setProperty('--x', layer.x);
                if (layer.y) layerEl.style.setProperty('--y', layer.y);
                if (layer.yOffset) layerEl.style.top = `${layer.yOffset}px`;
                if (layer.height) layerEl.style.height = `${layer.height}px`;
                if (layer.zIndex) layerEl.style.zIndex = layer.zIndex;
                
                // Image (with alt text for accessibility)
                layerEl.innerHTML = `<img src="${layer.image}" alt="${layer.type} layer">`;
                
                sceneEl.appendChild(layerEl);
            });
            
            container.appendChild(sceneEl);
        });
        
        // Debug output (remove later)
        console.log('Scenes loaded:', this.scenes.map(s => s.id));
    }
}

// Start the magic!
new SceneManager();