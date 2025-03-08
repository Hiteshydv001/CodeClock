const esbuild = require('esbuild');
const { resolve } = require('path');

const isProduction = process.argv.includes('--production');
const isWatch = process.argv.includes('--watch');

// Build the extension (CommonJS for VS Code)
async function buildExtension() {
  try {
    await esbuild.build({
      entryPoints: [resolve('src/extension.ts')],
      bundle: true,
      outfile: resolve('dist/extension.js'),
      external: ['vscode'],
      format: 'cjs',
      platform: 'node',
      sourcemap: !isProduction,
      minify: isProduction,
      target: 'es2020',
      tsconfig: 'tsconfig.json',
      watch: isWatch && {
        onRebuild(error) {
          if (error) console.error('Extension build failed:', error);
          else console.log('Extension build succeeded');
        },
      },
    });
    console.log('✅ Extension build completed');
  } catch (error) {
    console.error('❌ Extension build failed:', error);
    process.exit(1);
  }
}

// Build the webview (ESM for browser)
async function buildWebview() {
  try {
    await esbuild.build({
      entryPoints: [resolve('src/webview/App.tsx')],
      bundle: true,
      outfile: resolve('dist/webview.js'),
      format: 'esm',
      platform: 'browser',
      sourcemap: !isProduction,
      minify: isProduction,
      target: 'es2020',
      tsconfig: 'tsconfig.json',
      watch: isWatch && {
        onRebuild(error) {
          if (error) console.error('Webview build failed:', error);
          else console.log('Webview build succeeded');
        },
      },
    });
    console.log('✅ Webview build completed');
  } catch (error) {
    console.error('❌ Webview build failed:', error);
    process.exit(1);
  }
}

// Run both builds
Promise.all([buildExtension(), buildWebview()])
  .then(() => console.log('🚀 Build completed successfully'))
  .catch((error) => {
    console.error('❌ Build failed:', error);
    process.exit(1);
  });
