const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.ts') || file.endsWith('.html')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src/app');
let replacedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('localStorage')) {
        content = content.replace(/localStorage/g, 'sessionStorage');
        fs.writeFileSync(file, content, 'utf8');
        replacedCount++;
        console.log(`Updated ${file}`);
    }
});

console.log(`Replaced localStorage with sessionStorage in ${replacedCount} files.`);
