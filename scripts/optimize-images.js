#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const sharp = require('sharp');

// Check if sharp is installed
try {
  require.resolve('sharp');
} catch (e) {
  console.log('Sharp is not installed. Installing...');
  execSync('npm install sharp --save-dev');
}

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

// Ensure the images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// File extensions to process
const extensions = ['.jpg', '.jpeg', '.png', '.webp'];

// Maximum dimensions for resize
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;

// Quality settings
const JPEG_QUALITY = 80;
const PNG_QUALITY = 80;
const WEBP_QUALITY = 75;

async function optimizeImage(inputPath, outputPath, options = {}) {
  try {
    const image = sharp(inputPath);

    // Apply optimizations
    await image
      .resize(options.width, options.height, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 80 })
      .toFile(outputPath);

    console.log(`Optimized: ${outputPath}`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
  }
}

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else if (/\.(jpg|jpeg|png|gif)$/i.test(file)) {
      const outputPath = filePath.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
      await optimizeImage(filePath, outputPath, {
        width: 1920,
        height: 1080,
      });
    }
  }
}

// Process all images in the public directory
processDirectory(PUBLIC_DIR)
  .then(() => console.log('Image optimization complete'))
  .catch(error => console.error('Error during optimization:', error));
