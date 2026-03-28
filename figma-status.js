// Figma Bridge — status panel API (MAIN world)
// Manages agent state and broadcasts to content script overlay via postMessage.
// All subsequent scripts use __figs.* helpers.

if (window.__figs) { /* already injected */ } else {

window.__figs = {
  _agents: {},

  _broadcast: () => {
    const agents = Object.values(__figs._agents);
    window.postMessage({
      type: 'FIGS_CMD',
      action: 'render',
      payload: {
        agents,
        activeCount: agents.filter(a => a.status !== 'done').length,
        version: typeof __figb !== 'undefined' ? __figb.version : '3.0.0',
      },
    }, '*');
  },

  // ── Public API ──

  // Initialize the status panel
  init: () => {
    __figs._agents = {};
    __figs._broadcast();
    return 'Status panel initialized';
  },

  // Register or update an agent
  // Usage: __figs.agent('a1', 'Dashboard Page', 'planning')
  // Status values: planning, fetching-images, fetching-icons, fetching-assets,
  //                generating, executing, verifying, done, error
  agent: (id, name, status, task) => {
    __figs._agents[id] = { id, name, status, task: task || status };
    __figs._broadcast();
    return `Agent ${id} set to ${status}`;
  },

  // Update agent task/status
  update: (id, status, task) => {
    if (__figs._agents[id]) {
      __figs._agents[id].status = status;
      if (task) __figs._agents[id].task = task;
    }
    __figs._broadcast();
    return `Agent ${id} updated to ${status}`;
  },

  // Mark agent as done
  done: (id) => {
    if (__figs._agents[id]) {
      __figs._agents[id].status = 'done';
      __figs._agents[id].task = 'Completed';
    }
    __figs._broadcast();
    return `Agent ${id} done`;
  },

  // Mark agent as error
  error: (id, message) => {
    if (__figs._agents[id]) {
      __figs._agents[id].status = 'error';
      __figs._agents[id].task = message || 'Error';
    }
    __figs._broadcast();
    return `Agent ${id} error`;
  },

  // Remove the status panel
  remove: () => {
    __figs._agents = {};
    window.postMessage({ type: 'FIGS_CMD', action: 'remove' }, '*');
    return 'Status panel removed';
  },

  // Get current status as data
  info: () => ({
    version: typeof __figb !== 'undefined' ? __figb.version : '3.0.0',
    agents: Object.values(__figs._agents),
    activeCount: Object.values(__figs._agents).filter(a => a.status !== 'done').length,
  }),
};

// Auto-broadcast on injection so the overlay picks up the correct version
__figs._broadcast();

'__figs injected';
} // end guard
