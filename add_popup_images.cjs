const fs = require('fs');
const path = require('path');

// Read the GalleryPage.tsx file
const filePath = path.join(__dirname, 'src', 'pages', 'GalleryPage.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Pattern to match gallery image objects that don't have popupImage yet
const imagePattern = /(\s+{\s+id: "[^"]+",\s+title: "[^"]+",\s+dimensions: "[^"]+",\s+medium: t\('oilOnCanvas'\),\s+img: "([^"]+)",\s+url: "#",\s+},)/g;

// Replace each match to add popupImage field
content = content.replace(imagePattern, (match, fullMatch, imgPath) => {
  // Extract the img path and create popupImage field
  const popupImage = `      popupImage: "${imgPath}", // Can be changed to any high-res image`;
  
  // Insert popupImage before the url field
  return fullMatch.replace('url: "#",', `${popupImage}\n      url: "#",`);
});

// Write the updated content back to the file
fs.writeFileSync(filePath, content, 'utf8');

console.log('Successfully added popupImage field to all gallery images');
