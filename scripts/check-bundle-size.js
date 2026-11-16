import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const ASSETS_DIR = path.join(DIST_DIR, 'assets');

// Budget definitions in bytes according to requirements:
// - Main JS bundle (index-*.js): <= 250 KB / 75 KB gzipped
// - Main CSS bundle (index-*.css): <= 50 KB / 10 KB gzipped
// - Dynamic route chunks (*.js): <= 25 KB uncompressed
const BUDGETS = {
  MAIN_JS: {
    name: 'Main JS Bundle',
    maxUncompressed: 250 * 1024, // 250 KB
    maxGzip: 75 * 1024,          // 75 KB
  },
  MAIN_CSS: {
    name: 'Main CSS Bundle',
    maxUncompressed: 50 * 1024,  // 50 KB
    maxGzip: 10 * 1024,          // 10 KB
  },
  DYNAMIC_CHUNK: {
    name: 'Dynamic Route Chunk',
    maxUncompressed: 25 * 1024,  // 25 KB
    maxGzip: null,
  },
};

function formatSize(bytes) {
  if (bytes === null || bytes === undefined) return 'N/A';
  return `${(bytes / 1024).toFixed(2)} KB`;
}

function checkBundleSizes() {
  if (!fs.existsSync(DIST_DIR) || !fs.existsSync(ASSETS_DIR)) {
    console.error(`❌ Error: Build directory not found at ${ASSETS_DIR}. Please run 'npm run build' first.`);
    process.exit(1);
  }

  const files = fs.readdirSync(ASSETS_DIR);
  const results = [];
  let hasError = false;

  for (const file of files) {
    const filePath = path.join(ASSETS_DIR, file);
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) continue;

    const content = fs.readFileSync(filePath);
    const uncompressedSize = content.length;
    const gzipSize = zlib.gzipSync(content).length;

    let category = null;

    if (file.startsWith('index-') && file.endsWith('.js')) {
      category = BUDGETS.MAIN_JS;
    } else if (file.startsWith('index-') && file.endsWith('.css')) {
      category = BUDGETS.MAIN_CSS;
    } else if (file.endsWith('.js')) {
      category = BUDGETS.DYNAMIC_CHUNK;
    } else {
      continue;
    }

    const uncompressedPassed = uncompressedSize <= category.maxUncompressed;
    const gzipPassed = category.maxGzip === null || gzipSize <= category.maxGzip;
    const passed = uncompressedPassed && gzipPassed;

    if (!passed) {
      hasError = true;
    }

    results.push({
      file,
      category: category.name,
      uncompressedSize,
      gzipSize,
      maxUncompressed: category.maxUncompressed,
      maxGzip: category.maxGzip,
      uncompressedPassed,
      gzipPassed,
      passed,
    });
  }

  if (results.length === 0) {
    console.error('❌ Error: No JS or CSS assets found in dist/assets directory.');
    process.exit(1);
  }

  // Print results in formatted terminal table
  const colWidths = { file: 34, cat: 22, size: 24, budget: 24, status: 8 };
  const pad = (str, width) => (str + ' '.repeat(width)).slice(0, width);

  console.log('\n===================================================================================================');
  console.log('                                  BUNDLE SIZE BUDGET CHECK RESULTS                                 ');
  console.log('===================================================================================================');
  console.log(
    pad('Asset Name', colWidths.file) +
    pad('Category', colWidths.cat) +
    pad('Actual (Unc / Gzip)', colWidths.size) +
    pad('Budget (Unc / Gzip)', colWidths.budget) +
    pad('Status', colWidths.status)
  );
  console.log('-'.repeat(112));

  for (const r of results) {
    const actualStr = `${formatSize(r.uncompressedSize)} / ${formatSize(r.gzipSize)}`;
    const budgetStr = `${formatSize(r.maxUncompressed)} / ${formatSize(r.maxGzip)}`;
    const statusStr = r.passed ? 'PASS' : 'FAIL';

    console.log(
      pad(r.file, colWidths.file) +
      pad(r.category, colWidths.cat) +
      pad(actualStr, colWidths.size) +
      pad(budgetStr, colWidths.budget) +
      pad(statusStr, colWidths.status)
    );
  }

  console.log('===================================================================================================\n');

  if (hasError) {
    console.error('❌ Bundle size budget verification FAILED! One or more build artifacts exceeded configured size thresholds.\n');
    process.exit(1);
  } else {
    console.log('✅ Bundle size budget verification PASSED! All build artifacts are within configured thresholds.\n');
    process.exit(0);
  }
}

checkBundleSizes();
