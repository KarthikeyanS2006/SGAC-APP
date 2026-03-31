const fs = require('fs');
const path = require('path');

const rootDir = 'd:/Karthikeyan S/College Website/2nd time Upgrade';
const TN_LOGO = 'https://sgacrmd.edu.in/assets/tn_logo.png';
const CLG_LOGO = 'https://sgacrmd.edu.in/assets/logoclg.png';
const NEW_ADDRESS = 'Atchunahtvayal Ramanathapuram 623501';

function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                getAllHtmlFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    return fileList;
}

const htmlFiles = getAllHtmlFiles(rootDir);

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // Update TN Logo
    if (content.includes('img/tamil_logo.png')) {
        content = content.replace(/img\/tamil_logo\.png/g, TN_LOGO);
        modified = true;
    }

    // Update College Logo
    if (content.includes('img/logo_new1.png')) {
        content = content.replace(/img\/logo_new1\.png/g, CLG_LOGO);
        modified = true;
    }

    // Update Footer Address
    // Most common pattern in my generated files:
    // <p>Ramanathapuram<br>Tamil Nadu - 623501</p>
    // Or in index.html: <p>Kenikkarai, Ramanathapuram<br>Tamil Nadu - 623501</p>

    // Using a more flexible approach to find address paragraphs
    const footerAddressRegex = /<p>.*Ramanathapuram(?:<br>)?.*(?:Tamil Nadu[\s-]*623501)?<\/p>/gi;
    if (footerAddressRegex.test(content)) {
        content = content.replace(footerAddressRegex, `<p>${NEW_ADDRESS}</p>`);
        modified = true;
    }

    // Also check for specific footer-section patterns
    if (content.includes('Kenikkarai, Ramanathapuram')) {
        content = content.replace('Kenikkarai, Ramanathapuram<br>Tamil Nadu - 623501', NEW_ADDRESS);
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated: ${file}`);
    }
});

console.log('Branding upgrade complete!');
