// Background service worker — injects scripts and bootstraps figma reference
// chrome.scripting.executeScript with world: 'MAIN' + files runs in extension scope.
// The inline func form runs in the TRUE page context with figma access.
// So: inject scripts via files, then bootstrap __figb.f = figma via func.

const injectedTabs = new Set();

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'complete') return;
  if (!tab.url || !/figma\.com\/(file|design|board|proto)/.test(tab.url)) return;
  if (injectedTabs.has(tabId)) return;
  injectedTabs.add(tabId);

  setTimeout(async () => {
    try {
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
      injectedTabs.delete(tabId);
    }
  }, 3000);
});

// Clear tracking when tab navigates to a new page
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url) injectedTabs.delete(tabId);
});

// Clear tracking when tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  injectedTabs.delete(tabId);
});
