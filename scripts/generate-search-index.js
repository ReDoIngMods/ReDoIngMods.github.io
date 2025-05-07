import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as globModule from 'glob';
import matter from 'gray-matter';
import { remark } from 'remark';
import strip from 'strip-markdown';

// Use the glob function from the module
const glob = globModule.glob;

// Get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define paths
const docsDir = path.join(__dirname, '..', 'src', 'pages', 'docs');
const wikiDir = path.join(__dirname, '..', 'src', 'pages', 'wiki'); // Added wiki directory
const outputDir = path.join(__dirname, '..', 'public');
const outputFile = path.join(outputDir, 'search-index.json');

// Debug path resolution
console.log(`Looking for docs in: ${docsDir}`);
console.log(`Looking for wiki in: ${wikiDir}`); // Added debug log for wiki directory
console.log(`Directory exists: ${fs.existsSync(docsDir)}`);
console.log(`Wiki directory exists: ${fs.existsSync(wikiDir)}`); // Added debug log for wiki directory existence

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to extract headings from markdown content
async function extractHeadings(content) {
  const headingRegex = /^#{1,6}\s+(.+)$/gm;
  const headings = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push(match[1]);
  }
  
  return headings;
}

// Function to convert markdown to plain text
async function markdownToPlainText(markdown) {
  const result = await remark()
    .use(strip)
    .process(markdown);
  
  return String(result);
}

// Recursively find MDX files
function findMdxFiles(directory) {
  console.log(`Scanning directory: ${directory}`);
  const items = fs.readdirSync(directory, { withFileTypes: true });
  let results = [];
  
  for (const item of items) {
    const fullPath = path.join(directory, item.name);
    
    if (item.isDirectory()) {
      results = results.concat(findMdxFiles(fullPath));
    } else if (item.name.endsWith('.mdx') || item.name.endsWith('.md')) {
      console.log(`Found MDX file: ${fullPath}`);
      results.push(fullPath);
    }
  }
  
  return results;
}

// Main function to generate search index
async function generateSearchIndex() {
  try {
    console.log('Generating search index for documentation and wiki...'); // Updated log
    
    // Find all markdown files in the docs and wiki directories
    console.log('Searching for MDX files in docs and wiki...'); // Updated log
    const docFiles = findMdxFiles(docsDir);
    const wikiFiles = findMdxFiles(wikiDir); // Get wiki files
    const files = [...docFiles, ...wikiFiles]; // Combine file lists
    console.log(`Found ${files.length} MDX files in total.`); // Updated log
    
    if (files.length === 0) {
      console.log('Warning: No MDX files found. The search index will be empty.');
    }
    
    // Process each file
    const searchData = await Promise.all(files.map(async (file) => {
      console.log(`Processing file: ${file}`);
      // Read file content
      const content = fs.readFileSync(file, 'utf-8');
      
      // Parse frontmatter
      const { data, content: markdownContent } = matter(content);
      
      // Extract headings
      const headings = await extractHeadings(markdownContent);
      
      // Convert markdown to plain text for search
      const plainText = (await markdownToPlainText(markdownContent)).trim();
      
      // Generate URL path from file path
      let relativePath;
      let section;

      if (file.startsWith(docsDir)) {
        relativePath = path.relative(docsDir, file);
        section = 'docs';
      } else if (file.startsWith(wikiDir)) {
        relativePath = path.relative(wikiDir, file);
        section = 'wiki';
      } else {
        console.warn(`File ${file} is not in docsDir or wikiDir, skipping URL generation.`);
        return null; // Or handle as an error
      }
      
      const urlPath = relativePath
        .replace(/\\/g, '/')
        .replace(/\.mdx?$/, '');
      
      const url = urlPath === 'index' ? `/${section}` : `/${section}/${urlPath}`;
      
      console.log(`Generated URL: ${url} for section: ${section}`);
      
      // Return structured data for search
      return {
        title: data.title || 'Untitled',
        url,
        headings,
        content: plainText
      };
    }));
    
    // Write search index to file
    // Filter out any null results from files not in specified directories
    const validSearchData = searchData.filter(item => item !== null);
    fs.writeFileSync(outputFile, JSON.stringify(validSearchData, null, 2));
    
    console.log(`Search index generated at ${outputFile}`);
    console.log(`Indexed ${validSearchData.length} pages from docs and wiki`); // Updated log
  } catch (error) {
    console.error('Error generating search index:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the generator
generateSearchIndex();