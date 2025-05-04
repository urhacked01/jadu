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

async function optimizeImage(inputPath, outputPath) {
  try {
    const inputBuffer = fs.readFileSync(inputPath);
    await sharp(inputBuffer)
      .webp({ quality: 80 })
      .toFile(outputPath);
    console.log(`Optimized: ${outputPath}`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}: ${error.message}`);
    // Copy the original file if optimization fails
    fs.copyFileSync(inputPath, outputPath);
    console.log(`Copied original: ${outputPath}`);
  }
}

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (stat.isFile() && /\.(jpg|jpeg|png)$/i.test(file)) {
      const outputPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      await optimizeImage(fullPath, outputPath);
    }
  }
}

// Start processing from the public directory
processDirectory(path.join(__dirname, '..', 'public'))
  .then(() => console.log('Image optimization complete'))
  .catch(error => console.error('Error during optimization:', error));
