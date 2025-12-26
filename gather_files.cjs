
const fs = require('fs');
const path = require('path');

const rootDir = '.';
const ignoreDirs = ['node_modules', 'dist', '.git'];
const ignoreFiles = ['.DS_Store'];

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    if (ignoreDirs.includes(file) || ignoreFiles.includes(file)) return;
    
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      // Skip gather_files.js itself and package-lock.json (too big)
      if (file === 'gather_files.js' || file === 'gather_files.cjs' || file === 'calc.js' || file === 'package-lock.json') return;
      
      const relativePath = path.relative(rootDir, filePath);
      const content = fs.readFileSync(filePath, 'utf8');
      fileList.push({
        path: relativePath,
        content: content
      });
    }
  });

  return fileList;
}

const allFiles = getAllFiles(rootDir);
fs.writeFileSync('files.json', JSON.stringify(allFiles, null, 2));
