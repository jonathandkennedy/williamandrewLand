/* Shared harness. Serves the repo root on a random port and launches
   Chromium. CHROME_PATH lets a preinstalled browser be used instead of a
   downloaded one. Formspree is ALWAYS mocked — no test ever sends a real
   lead into the client's intake inbox. */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json' };

export async function serve() {
  const srv = http.createServer((req, res) => {
    let rel = decodeURIComponent(req.url.split('?')[0]);
    if (rel === '/') rel = '/index.html';
    const f = path.join(ROOT, rel);
    if (!f.startsWith(ROOT)) return res.writeHead(403).end();
    fs.readFile(f, (err, buf) => {
      if (err) {
        // Mirror Vercel: an unknown path serves the branded 404.
        return fs.readFile(path.join(ROOT, '404.html'), (e2, b2) =>
          e2 ? res.writeHead(404).end('nf') : res.writeHead(404, { 'Content-Type': TYPES['.html'] }).end(b2));
      }
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' }).end(buf);
    });
  });
  await new Promise((r) => srv.listen(0, r));
  return { url: `http://127.0.0.1:${srv.address().port}`, close: () => srv.close() };
}

export async function browser() {
  return chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
}

/** Blocks every third-party tag and mocks Formspree. */
export async function page(b, opts = {}) {
  const ctx = await b.newContext({
    viewport: opts.viewport || { width: 390, height: 700 },
    isMobile: true, hasTouch: true,
  });
  const p = await ctx.newPage();
  const state = { posted: null, status: opts.formStatus ?? 200, errors: [] };
  p.on('pageerror', (e) => state.errors.push(e.message));

  for (const host of ['**/googletagmanager.com/**', '**/calltrk.com/**', '**/clarity.ms/**']) {
    await p.route(host, (r) => r.fulfill({ status: 200, contentType: 'application/javascript', body: '' }));
  }
  await p.route('**/formspree.io/**', async (r) => {
    state.posted = JSON.parse(r.request().postData() || '{}');
    if (state.status === 0) return r.abort('failed');
    await r.fulfill({
      status: state.status,
      contentType: 'application/json',
      body: state.status === 200 ? '{"ok":true}' : '{"errors":[{"message":"forced test failure"}]}',
    });
  });
  return { p, state };
}

let pass = 0, fail = 0;
export function ok(name, cond, detail) {
  if (cond) { pass++; console.log(`  ✓ ${name}`); }
  else { fail++; console.log(`  ✗ ${name}${detail ? '  -> ' + detail : ''}`); }
}
export function summary(suite) {
  console.log(`\n${suite}: ${pass} passed, ${fail} failed`);
  if (fail) process.exitCode = 1;
  return fail;
}
