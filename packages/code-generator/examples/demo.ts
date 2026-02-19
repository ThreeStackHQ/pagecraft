import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { generateNextJsCode } from '../src';

// Load sample design
const sampleDesign = JSON.parse(
  readFileSync(join(__dirname, 'sample-design.json'), 'utf-8')
);

// Generate code
console.log('🎨 Generating Next.js code from Stitch design...\n');
const result = generateNextJsCode(sampleDesign);

console.log('✅ Generated files:');
result.files.forEach(file => {
  console.log(`   - ${file.path}`);
});

// Write to output directory
const outDir = join(__dirname, 'output');
mkdirSync(outDir, { recursive: true });

result.files.forEach(file => {
  const fullPath = join(outDir, file.path);
  const dir = fullPath.substring(0, fullPath.lastIndexOf('/'));
  mkdirSync(dir, { recursive: true });
  writeFileSync(fullPath, file.content);
});

console.log(`\n📁 Output written to: ${outDir}`);
console.log('\n🚀 To run the generated project:');
console.log(`   cd ${outDir}`);
console.log('   npm install');
console.log('   npm run dev');
