const esbuild = require('esbuild');
const { resolve } = require('path');

const isProduction = process.argv.includes('--production');
const isWatch = process.argv.includes('--watch');

// Common build options for extension
const extensionOptions = {
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
};

// Common build options for webview
const webviewOptions = {
  entryPoints: [resolve('src/webview/App.tsx')],
  bundle: true,
  outfile: resolve('dist/webview.js'),
  format: 'esm',
  platform: 'browser',
  sourcemap: !isProduction,
  minify: isProduction,
  target: 'es2020',
  tsconfig: 'tsconfig.json',
};

// Build the extension (CommonJS for VS Code)
async function buildExtension() {
  try {
    if (isWatch) {
      const context = await esbuild.context({
        ...extensionOptions,
        logLevel: 'info', // Shows rebuild logs in watch mode
      });
      await context.watch();
      console.log('👀 Watching extension for changes...');
      return context; // Return context to keep it alive
    } else {
      await esbuild.build(extensionOptions);
      console.log('✅ Extension build completed');
    }
  } catch (error) {
    console.error('❌ Extension build failed:', error);
    process.exit(1);
  }
}

// Build the webview (ESM for browser)
async function buildWebview() {
  try {
    if (isWatch) {
      const context = await esbuild.context({
        ...webviewOptions,
        logLevel: 'info', // Shows rebuild logs in watch mode
      });
      await context.watch();
      console.log('👀 Watching webview for changes...');
      return context; // Return context to keep it alive
    } else {
      await esbuild.build(webviewOptions);
      console.log('✅ Webview build completed');
    }
  } catch (error) {
    console.error('❌ Webview build failed:', error);
    process.exit(1);
  }
}

// Run both builds
async function runBuilds() {
  const extensionPromise = buildExtension();
  const webviewPromise = buildWebview();

  await Promise.all([extensionPromise, webviewPromise]);

  if (!isWatch) {
    console.log('🚀 Build completed successfully');
  }
}

runBuilds().catch((error) => {
  console.error('❌ Build failed:', error);
  process.exit(1);
});