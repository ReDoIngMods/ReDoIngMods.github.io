import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const searchIndexPath = path.join(projectRoot, 'public', 'search-index.json');

// Check if search index exists
const searchIndexExists = fs.existsSync(searchIndexPath);

// If search index doesn't exist or is older than 5 minutes, generate it
if (!searchIndexExists) {
  console.log('Search index not found. Generating...');
  
  // Run the search index generator
  exec('node scripts/generate-search-index.js', { cwd: projectRoot }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error generating search index: ${error.message}`);
      return;
    }
    
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    
    console.log(stdout);
  });
}

// Create a watcher for the docs directory
const docsDir = path.join(projectRoot, 'src', 'pages', 'docs');

fs.watch(docsDir, { recursive: true }, (eventType, filename) => {
  if (filename && (filename.endsWith('.mdx') || filename.endsWith('.md'))) {
    console.log(`File ${filename} changed. Regenerating search index...`);
    
    exec('node scripts/generate-search-index.js', { cwd: projectRoot }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error regenerating search index: ${error.message}`);
        return;
      }
      
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      
      console.log(stdout);
    });
  }
});