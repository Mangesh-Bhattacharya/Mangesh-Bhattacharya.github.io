/* Site configuration.
   WORKER_ENDPOINT: URL of the Cloudflare Worker proxy that holds your
   Gemini API key server-side (see /worker/README.md for setup).
   Leave blank to run the "Ask" panel in honest rule-based mode only. */
window.MB_CONFIG = {
  WORKER_ENDPOINT: '' // e.g. 'https://mb-portfolio-ai.yoursubdomain.workers.dev'
};
