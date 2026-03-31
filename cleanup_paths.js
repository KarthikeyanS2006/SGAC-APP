const fs = require('fs');
const path = require('path');

const rootDir = 'd:/Karthikeyan S/College Website/2nd time Upgrade';
const TN_LOGO = 'https://sgacrmd.edu.in/assets/tn_logo.png';
const CLG_LOGO = 'https://sgacrmd.edu.in/assets/logoclg.png';

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

    // Fix incorrect relative prefixes attached to external URLs
    const prefixRegexTN = /[./]*https:\/\/sgacrmd\.edu\.in\/assets\/tn_logo\.png/g;
    const prefixRegexCLG = /[./]*https:\/\/sgacrmd\.edu\.in\/assets\/logoclg\.png/g;

    if (prefixRegexTN.test(content)) {
        content = content.replace(prefixRegexTN, TN_LOGO);
        modified = true;
    }

    if (prefixRegexCLG.test(content)) {
        content = content.replace(prefixRegexCLG, CLG_LOGO);
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Fixed paths in: ${file}`);
    }
});

console.log('Final path cleanup complete!');
