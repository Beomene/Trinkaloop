class SceneManager {
    constructor() {
        this.scenes = [
            // ===== EMPTY TOP PADDING =====
            {
                id: 'padding_top',
                layers: [{
                    type: 'sky',
                    image: '/Trinkaloop/assets/scenes/transparent.png',
                    speed: 0.01,
                    height: 1080
                }]
            },
            
            // ===== MAIN SCENE =====
            {
                id: 'test_scene_dusk',
                layers: [
                    {
                        type: 'sky',
                        image: '/Trinkaloop/assets/scenes/test/sky_dusk.webp',
                        speed: 0.01,
                        height: 2160
                    },
                    {
                        type: 'hyperdistal',
                        image: '/Trinkaloop/assets/scenes/test/ruins.png',
                        speed: 0.05,
                        yOffset: 300,
                        zIndex: 2
                    },
                    {
                        type: 'medium_text',
                        image: '/Trinkaloop/assets/scenes/test/graffiti.webp', // Fixed spelling
                        speed: 0.4,
                        x: 1200,
                        y: 600,
                        zIndex: 4
                    },
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
            
            // ===== EMPTY BOTTOM PADDING =====
            {
                id: 'padding_bottom',
                layers: [{
                    type: 'sky',
                    image: '/Trinkaloop/assets/scenes/transparent.png',
                    speed: 0.01,
                    height: 1080
                }]
            }
        ];
        this.init();
    }

    init() {
        const container = document.getElementById('parallax-world');
        container.innerHTML = ''; // Clear previous
        
        this.scenes.forEach(scene => {
            const sceneEl = document.createElement('section');
            sceneEl.className = 'parallax-scene';
            sceneEl.id = scene.id;
            
            scene.layers.forEach(layer => {
                const layerEl = document.createElement('div');
                layerEl.className = `layer ${layer.type}-layer`;
                layerEl.dataset.speed = layer.speed;
                
                if (layer.x) layerEl.style.left = `${layer.x}px`;
                if (layer.y) layerEl.style.top = `${layer.y}px`;
                if (layer.yOffset) layerEl.style.top = `${layer.yOffset}px`;
                if (layer.height) layerEl.style.height = `${layer.height}px`;
                if (layer.zIndex) layerEl.style.zIndex = layer.zIndex;
                
                const img = new Image();
                img.src = layer.image;
                img.alt = `${layer.type} layer`;
                layerEl.appendChild(img);
                
                sceneEl.appendChild(layerEl);
            });
            
            container.appendChild(sceneEl);
        });
    }
}

// Debug before init
const testLoad = () => {
    const testPaths = [
        '/Trinkaloop/assets/scenes/test/sky_dusk.webp',
        '/Trinkaloop/assets/scenes/test/graffiti.webp'
    ];
    
    testPaths.forEach(path => {
        const img = new Image();
        img.onload = () => console.log(`✅ Loaded: ${path}`);
        img.onerror = () => console.error(`❌ Failed: ${path}`);
        img.src = path;
    });
};
testLoad();

new SceneManager();