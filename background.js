// Background service worker — injects scripts and bootstraps figma reference
// chrome.scripting.executeScript with world: 'MAIN' runs in the page context,
// but files loaded this way still have extension scope isolation.
// The inline func form (no files) runs in the TRUE page context with figma access.
// So: inject scripts via files, then bootstrap __figb.f = figma via func.

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'complete') return;
  if (!tab.url || !/figma\.com\/(file|design|board|proto)/.test(tab.url)) return;

  setTimeout(async () => {
    try {
      // Inject helper scripts (extension scope — defines __figb and __figs)
      await chrome.scripting.executeScript({
        target: { tabId },
        world: 'MAIN',
        files: ['figma-bridge.js'],
      });

      await chrome.scripting.executeScript({
        target: { tabId },
        world: 'MAIN',
        files: ['figma-status.js'],
      });

      // Bootstrap: pass real figma reference (inline func runs in true page context)
      await chrome.scripting.executeScript({
        target: { tabId },
        world: 'MAIN',
        func: () => {
          if (typeof figma !== 'undefined' && window.__figb) {
            window.__figb.f = figma;
            console.log('[Figma Bridge] v' + window.__figb.version + ' — ready');
          } else {
            console.warn('[Figma Bridge] figma not available yet');
          }
        },
      });
    } catch (e) {
      console.error('[Figma Bridge] injection failed:', e);
    }
  }, 3000);
});
