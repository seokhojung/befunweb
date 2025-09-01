// Simple placeholder creator for Windows
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images', 'products', 'v2');

// Create a simple SVG placeholder
function createSVG(width, height, color, text) {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${color}"/>
  <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#666" text-anchor="middle" dy=".3em">${text}</text>
</svg>`;
}

// Colors for thumbnails
const colors = {
  'white': '#FFFFFF',
  'grey': '#9CA3AF',
  'brown': '#8B4513',
  'black': '#000000',
  'green': '#22C55E'
};

console.log('Creating placeholder images...');

// Create main product images
for (let i = 1; i <= 5; i++) {
  const id = i.toString().padStart(2, '0');
  
  // Main image
  const mainSvg = createSVG(400, 300, '#F3F4F6', `Bookcase ${id}`);
  fs.writeFileSync(path.join(IMAGES_DIR, 'main', `bookcase-${id}-main.svg`), mainSvg);
  
  // Hover image
  const hoverSvg = createSVG(400, 300, '#E5E7EB', `Lifestyle ${id}`);
  fs.writeFileSync(path.join(IMAGES_DIR, 'hover', `bookcase-${id}-hover.svg`), hoverSvg);
}

// Create color thumbnails
Object.entries(colors).forEach(([name, color]) => {
  const thumbSvg = createSVG(64, 64, color, '');
  fs.writeFileSync(path.join(IMAGES_DIR, 'thumbnail', `swatch-${name}.svg`), thumbSvg);
});

console.log('✅ Placeholder images created!');