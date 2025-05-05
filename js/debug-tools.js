// Toggle layer outlines with 'O' key
function toggleLayerOutlines() {
    document.querySelectorAll('.layer').forEach(layer => {
        layer.style.outline = layer.style.outline ? '' : '2px dashed cyan';
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'o') toggleLayerOutlines();
});