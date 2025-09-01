# 🖼️ Product V2 Images Directory

## 📁 Directory Structure

```
public/images/products/v2/
├── main/           # Main product images (hover default)
├── hover/          # Lifestyle/Instagram images (hover effect)
├── thumbnail/      # Color swatch thumbnails
└── README.md       # This file
```

## 🎯 Image Organization

### **Main Images** (`/main/`)
- **Purpose**: Primary product display images
- **Naming**: `bookcase-{productId}-main.webp`
- **Size**: ~800x600px (4:3 ratio)
- **Usage**: Default display, product cards

### **Hover Images** (`/hover/`)
- **Purpose**: Lifestyle/room context images
- **Naming**: `bookcase-{productId}-hover.webp`  
- **Size**: ~800x600px (4:3 ratio)
- **Usage**: Hover effect, Instagram-style images

### **Thumbnails** (`/thumbnail/`)
- **Purpose**: Color variant swatches
- **Naming**: `swatch-{colorName}.webp`
- **Size**: ~64x64px (1:1 ratio)
- **Usage**: Color selection UI, product variants

## 🚀 Download Scripts

### Option 1: Node.js Script
```bash
cd scripts
node download-images.mjs
```

### Option 2: Browser Script
1. Open https://tylko.com/kr/furniture/bookcase
2. Open Developer Console (F12)
3. Paste contents of `scripts/download-images.js`
4. Press Enter to execute

## 🎨 Image Mapping

### Real Images Available (15 Core Images):
- **Main Products**: 6 main + 6 hover = 12 images
- **Color Swatches**: 5 thumbnail images
- **Total Extracted**: 334 unique URLs from product-v2-example.txt

### Temporary Images (Development):
For missing images, use placeholder pattern:
```
/images/temp/bookcase-{color}-{type}.webp
```

## 📊 Usage Statistics

- **Total Products**: 34 products from real data
- **Colors per Product**: 8-12 variations
- **Image Types**: 3 per color (main, hover, thumbnail)
- **Estimated Total**: ~1,200 images needed for complete coverage

## ⚠️ Important Notes

1. **Copyright**: Tylko.com images are copyrighted
2. **Development Only**: Use for development/demo purposes
3. **Production**: Replace with own images before production
4. **CORS**: Some images may have CORS restrictions
5. **Performance**: External CDN may affect loading times

## 🔧 Integration with ProductV2

Images are automatically mapped via:
- `src/data/realImageMappings.ts` - Real image URLs
- `src/data/migration/imageMapping.ts` - Temp image fallbacks

```typescript
// Example usage in ProductV2
const product = {
  id: 'bookcase-001',
  mainImage: '/images/products/v2/main/bookcase-001-main.webp',
  instagramImage: '/images/products/v2/hover/bookcase-001-hover.webp',
  colorVariants: [
    {
      name: 'White',
      thumbnail: '/images/products/v2/thumbnail/swatch-white.webp'
    }
  ]
}
```

## 📋 Next Steps

1. ✅ Directory structure created
2. ✅ Download scripts ready
3. 🔄 Execute download scripts
4. ⏳ Update ProductV2 components to use local images
5. ⏳ Test image loading in development environment

---

*Last Updated: 2025-08-28*
*Scripts: `download-images.js` & `download-images.mjs`*