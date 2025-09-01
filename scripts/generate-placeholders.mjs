// 🖼️ Placeholder Image Generator for ProductV2
// Creates temporary placeholder images until real images are downloaded

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images', 'products', 'v2');

// Color palette for thumbnails
const COLORS = {
  'white': '#FFFFFF',
  'grey': '#9CA3AF', 
  'brown': '#8B4513',
  'black': '#000000',
  'green': '#22C55E',
  'moss-green': '#4ADE80',
  'light-wood': '#D2B48C',
  'dark-wood': '#654321',
  'beige': '#F5F5DC',
  'sand': '#F4A460',
  'pink': '#FFC0CB',
  'blue': '#3B82F6',
  'burgundy': '#800020'
};

// Generate SVG placeholder
function generateSVGPlaceholder(width, height, color, text) {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${color}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${Math.min(width, height) / 8}" 
        fill="${color === '#FFFFFF' ? '#666' : '#FFF'}" text-anchor="middle" dy=".3em">
    ${text}
  </text>
</svg>`;
}

// Create placeholder files
function createPlaceholders() {
  console.log('🖼️ Generating placeholder images for ProductV2...');

  // Ensure directories exist
  ['main', 'hover', 'thumbnail'].forEach(dir => {
    const dirPath = path.join(IMAGES_DIR, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });

  let created = 0;

  // Generate main and hover images for products 01-34
  for (let i = 1; i <= 34; i++) {
    const productId = i.toString().padStart(2, '0');
    
    // Main image (800x600)
    const mainSvg = generateSVGPlaceholder(800, 600, '#F3F4F6', `Bookcase ${productId}`);
    const mainPath = path.join(IMAGES_DIR, 'main', `bookcase-${productId}-main.svg`);
    fs.writeFileSync(mainPath, mainSvg);
    
    // Hover image (800x600)  
    const hoverSvg = generateSVGPlaceholder(800, 600, '#E5E7EB', `Lifestyle ${productId}`);
    const hoverPath = path.join(IMAGES_DIR, 'hover', `bookcase-${productId}-hover.svg`);
    fs.writeFileSync(hoverPath, hoverSvg);
    
    created += 2;
  }

  // Generate color swatch thumbnails (64x64)
  Object.entries(COLORS).forEach(([colorName, colorValue]) => {
    const swatchSvg = generateSVGPlaceholder(64, 64, colorValue, '');
    const swatchPath = path.join(IMAGES_DIR, 'thumbnail', `swatch-${colorName}.svg`);
    fs.writeFileSync(swatchPath, swatchSvg);
    created++;
  });

  console.log(`✅ Created ${created} placeholder images:`);
  console.log(`   📁 Main images: 34`);
  console.log(`   📁 Hover images: 34`); 
  console.log(`   📁 Thumbnails: ${Object.keys(COLORS).length}`);
  console.log(`   📍 Location: ${IMAGES_DIR}`);
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createPlaceholders();
}

export { createPlaceholders };