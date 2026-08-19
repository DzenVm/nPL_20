// Generatywna grafika sceniczna: seedowany PRNG rysuje kompozycje z "nici" (smooth
// bezier polylines) i drobnych adnotacyjnych znaków (ptaszki, karety, kreskowane
// linie-tekst) na siatce kropek, renderowane z SVG do PNG przez headless Chromium.
// Zero zdjęć stockowych, zero zewnętrznego API do obrazów — każdy kształt powstaje
// z kodu w tym pliku.
import { chromium } from "playwright";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "images");
const iconsDir = path.join(__dirname, "..", "public", "icons");
const appDir = path.join(__dirname, "..", "src", "app");
const CHROMIUM_PATH = "/opt/pw-browsers/chromium";

const palette = {
  bg: "#f2f1f6",
  bgAlt: "#e8e6f0",
  ink: "#1c1830",
  rule: "#d7d3e3",
  violet: "#4c3a8f",
  violetDeep: "#362a67",
  violetSoft: "#e3ddf5",
  violetLine: "#7863c4",
  plum: "#8a2f56",
  plumDeep: "#6c2242",
  plumSoft: "#f3dde7",
  mint: "#157a63",
  mintSoft: "#d9f0e9",
};

function mulberry32(seed) {
  let a = seed >>> 0;
  return function rand() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const lerp = (a, b, t) => a + (b - a) * t;
const range = (rng, min, max) => lerp(min, max, rng());
const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];
const n1 = (v) => v.toFixed(1);

function smoothPath(points) {
  if (points.length < 2) return "";
  let d = `M ${n1(points[0][0])} ${n1(points[0][1])}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${n1(c1x)} ${n1(c1y)} ${n1(c2x)} ${n1(c2y)} ${n1(p2[0])} ${n1(p2[1])}`;
  }
  return d;
}

function walk(rng, { x0, y0, angle, length, segments, wobble }) {
  const points = [[x0, y0]];
  let x = x0;
  let y = y0;
  let a = angle;
  const step = length / segments;
  for (let i = 0; i < segments; i++) {
    a += range(rng, -wobble, wobble);
    x += Math.cos(a) * step;
    y += Math.sin(a) * step;
    points.push([x, y]);
  }
  return points;
}

function thread(rng, opts, color, width, opacity) {
  const d = smoothPath(walk(rng, opts));
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" opacity="${opacity}"/>`;
}

function dotGrid(w, h, spacing, color, opacity, id) {
  return `
    <defs>
      <pattern id="${id}" width="${spacing}" height="${spacing}" patternUnits="userSpaceOnUse">
        <circle cx="${spacing / 2}" cy="${spacing / 2}" r="1.15" fill="${color}" opacity="${opacity}" />
      </pattern>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#${id})" />
  `;
}

function tick(x, y, size, color, opacity = 1) {
  return `<path d="M ${n1(x - size * 0.6)} ${n1(y)} L ${n1(x - size * 0.12)} ${n1(y + size * 0.55)} L ${n1(x + size * 0.7)} ${n1(y - size * 0.58)}" fill="none" stroke="${color}" stroke-width="${n1(size * 0.16)}" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}"/>`;
}

function caret(x, y, size, color, opacity = 1) {
  return `<path d="M ${n1(x - size * 0.55)} ${n1(y + size * 0.42)} L ${n1(x)} ${n1(y - size * 0.5)} L ${n1(x + size * 0.55)} ${n1(y + size * 0.42)}" fill="none" stroke="${color}" stroke-width="${n1(size * 0.14)}" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}"/>`;
}

function dash(x, y, w, color, opacity, dashArray = "7 8") {
  return `<line x1="${n1(x)}" y1="${n1(y)}" x2="${n1(x + w)}" y2="${n1(y)}" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="${dashArray}" opacity="${opacity}"/>`;
}

function ring(cx, cy, r, color, width, opacity) {
  return `<circle cx="${n1(cx)}" cy="${n1(cy)}" r="${n1(r)}" fill="none" stroke="${color}" stroke-width="${width}" opacity="${opacity}"/>`;
}

function dot(cx, cy, r, color, opacity = 1) {
  return `<circle cx="${n1(cx)}" cy="${n1(cy)}" r="${n1(r)}" fill="${color}" opacity="${opacity}"/>`;
}

function svgDoc(w, h, inner) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;}
    html,body{background:${palette.bg};}
    svg{display:block;}
  </style></head><body>
  <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${inner}</svg>
  </body></html>`;
}

/* ---------- Scene 1: hero — threads converging on a shared point ---------- */
function sceneHero(w, h, seed) {
  const rng = mulberry32(seed);
  const cx = w * 0.62;
  const cy = h * 0.5;
  let out = `
    <defs>
      <radialGradient id="heroGlow" cx="62%" cy="50%" r="62%">
        <stop offset="0" stop-color="${palette.violetSoft}" stop-opacity="0.95"/>
        <stop offset="100%" stop-color="${palette.bg}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#heroGlow)"/>
  `;
  out += dotGrid(w, h, 26, palette.rule, 0.5, "gridHero");

  for (let i = 0; i < 7; i++) {
    const y0 = h * (0.08 + (i / 6) * 0.84);
    const x0 = w * range(rng, -0.02, 0.05);
    const targetAngle = Math.atan2(cy - y0, cx - x0);
    const isChosen = i === 3;
    out += thread(
      rng,
      {
        x0,
        y0,
        angle: targetAngle + range(rng, -0.07, 0.07),
        length: Math.hypot(cx - x0, cy - y0) * 0.97,
        segments: 8,
        wobble: 0.14,
      },
      isChosen ? palette.plum : palette.violetLine,
      isChosen ? 3.6 : 1.8,
      isChosen ? 0.92 : range(rng, 0.24, 0.42),
    );
  }

  out += ring(cx, cy, h * 0.2, palette.violet, 2, 0.55);
  out += dot(cx, cy, h * 0.05, palette.violet, 1);
  out += tick(cx, cy, h * 0.045, "#fdfcff", 1);

  for (let i = 0; i < 5; i++) {
    const x = w * range(rng, 0.72, 0.93);
    const y = h * range(rng, 0.12, 0.86);
    out += dash(x, y, range(rng, 36, 84), palette.ink, range(rng, 0.16, 0.28));
  }
  out += caret(w * 0.87, h * 0.22, 30, palette.plum, 0.55);
  out += caret(w * 0.91, h * 0.72, 24, palette.mint, 0.5);
  return out;
}

/* ---------- Scene 2: diagnosis — many faint threads, one named ---------- */
function sceneDiagnoza(w, h, seed) {
  const rng = mulberry32(seed);
  const cx = w * 0.5;
  const cy = h * 0.5;
  let out = dotGrid(w, h, 24, palette.rule, 0.6, "gridDiag");

  for (let i = 0; i < 9; i++) {
    const angle = (i / 9) * Math.PI * 2 + range(rng, -0.15, 0.15);
    const len = h * range(rng, 0.28, 0.4);
    const x0 = cx + Math.cos(angle) * len;
    const y0 = cy + Math.sin(angle) * len;
    const isChosen = i === 3;
    out += thread(
      rng,
      { x0, y0, angle: angle + Math.PI, length: len * 0.94, segments: 6, wobble: 0.22 },
      isChosen ? palette.plum : palette.violetLine,
      isChosen ? 4 : 1.8,
      isChosen ? 0.95 : 0.22,
    );
    if (!isChosen) out += dot(x0, y0, 3.2, palette.violetLine, 0.35);
  }

  out += ring(cx, cy, h * 0.1, palette.plum, 2.5, 0.9);
  out += ring(cx, cy, h * 0.14, palette.plumSoft, 10, 0.5);
  out += dot(cx, cy, h * 0.045, palette.plum, 1);
  return out;
}

/* ---------- Scene 3: four-week cycle — a rotating loop of stages ---------- */
function sceneCykl(w, h, seed) {
  const rng = mulberry32(seed);
  const cx = w * 0.5;
  const cy = h * 0.54;
  const r = h * 0.3;
  const colors = [palette.violet, palette.plum, palette.mint, palette.violetDeep];
  let out = dotGrid(w, h, 24, palette.rule, 0.55, "gridCykl");

  for (let i = 0; i < 4; i++) {
    const a0 = (i / 4) * Math.PI * 2 - Math.PI / 2 + 0.12;
    const a1 = ((i + 1) / 4) * Math.PI * 2 - Math.PI / 2 - 0.12;
    const large = 0;
    const x0 = cx + Math.cos(a0) * r;
    const y0 = cy + Math.sin(a0) * r;
    const x1 = cx + Math.cos(a1) * r;
    const y1 = cy + Math.sin(a1) * r;
    out += `<path d="M ${n1(x0)} ${n1(y0)} A ${n1(r)} ${n1(r)} 0 ${large} 1 ${n1(x1)} ${n1(y1)}" fill="none" stroke="${colors[i]}" stroke-width="10" stroke-linecap="round" opacity="0.85"/>`;

    const mid = (a0 + a1) / 2;
    const mx = cx + Math.cos(mid) * (r + 26);
    const my = cy + Math.sin(mid) * (r + 26);
    out += dot(mx, my, 15, palette.bg, 1);
    out += ring(mx, my, 15, colors[i], 2, 1);
    out += `<text x="${n1(mx)}" y="${n1(my + 5)}" font-family="monospace" font-size="14" text-anchor="middle" fill="${colors[i]}">${i + 1}</text>`;
  }

  for (let i = 0; i < 3; i++) {
    const angle = range(rng, 0, Math.PI * 2);
    const rr = range(rng, r * 1.35, r * 1.55);
    out += dash(cx + Math.cos(angle) * rr, cy + Math.sin(angle) * rr, range(rng, 30, 60), palette.ink, 0.18);
  }

  out += dot(cx, cy, 5, palette.ink, 0.5);
  return out;
}

/* ---------- Scene 4: friction points — two bundles tangling ---------- */
function sceneTarcie(w, h, seed) {
  const rng = mulberry32(seed);
  let out = dotGrid(w, h, 24, palette.rule, 0.6, "gridTarcie");

  for (let i = 0; i < 5; i++) {
    out += thread(
      rng,
      { x0: w * range(rng, -0.02, 0.06), y0: h * range(rng, 0.1, 0.9), angle: range(rng, -0.35, 0.35), length: w * 0.62, segments: 8, wobble: 0.3 },
      palette.violetLine,
      2,
      0.4,
    );
  }
  for (let i = 0; i < 5; i++) {
    out += thread(
      rng,
      { x0: w * range(rng, 0.94, 1.02), y0: h * range(rng, 0.1, 0.9), angle: Math.PI + range(rng, -0.35, 0.35), length: w * 0.62, segments: 8, wobble: 0.3 },
      palette.plum,
      2,
      0.4,
    );
  }

  const midX = w * 0.5;
  for (let i = 0; i < 6; i++) {
    const y = h * (0.14 + i * 0.14);
    const x = midX + range(rng, -26, 26);
    out += `<path d="M ${n1(x - 9)} ${n1(y - 9)} L ${n1(x + 9)} ${n1(y + 9)} M ${n1(x - 9)} ${n1(y + 9)} L ${n1(x + 9)} ${n1(y - 9)}" stroke="${palette.ink}" stroke-width="2.4" stroke-linecap="round" opacity="0.55"/>`;
  }
  out += `<line x1="${n1(midX)}" y1="${n1(h * 0.06)}" x2="${n1(midX)}" y2="${n1(h * 0.94)}" stroke="${palette.ink}" stroke-width="1.5" stroke-dasharray="1 10" opacity="0.3"/>`;
  return out;
}

/* ---------- Scene 5: teaching standard — a field of checks, one confirmed ---------- */
function sceneStandard(w, h, seed) {
  const rng = mulberry32(seed);
  let out = dotGrid(w, h, 22, palette.rule, 0.7, "gridStandard");

  const cols = 6;
  const rows = 4;
  const marginX = w * 0.14;
  const marginY = h * 0.18;
  const cellW = (w - marginX * 2) / (cols - 1);
  const cellH = (h - marginY * 2) / (rows - 1);
  const heroIndex = 14;
  let index = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = marginX + c * cellW + range(rng, -8, 8);
      const y = marginY + r * cellH + range(rng, -8, 8);
      const isHero = index === heroIndex;
      if (isHero) {
        out += dot(x, y, 22, palette.violetSoft, 1);
        out += tick(x, y, 20, palette.violet, 1);
        out += ring(x, y, 30, palette.violet, 2, 0.6);
      } else {
        out += tick(x, y, 13, palette.violetLine, range(rng, 0.22, 0.42));
      }
      index += 1;
    }
  }
  return out;
}

/* ---------- Scene 6: companies — two bundles braiding into one ---------- */
function sceneFirmy(w, h, seed) {
  const rng = mulberry32(seed);
  let out = dotGrid(w, h, 26, palette.rule, 0.55, "gridFirmy");

  const joinX = w * 0.58;
  const joinY = h * 0.5;

  for (let i = 0; i < 3; i++) {
    const y0 = h * (0.28 + i * 0.1);
    out += thread(
      rng,
      { x0: w * 0.06, y0, angle: Math.atan2(joinY - y0, joinX - w * 0.06) + range(rng, -0.08, 0.08), length: w * 0.42, segments: 7, wobble: 0.16 },
      palette.violet,
      2.6,
      0.7,
    );
  }
  for (let i = 0; i < 3; i++) {
    const y0 = h * (0.62 + i * 0.1);
    out += thread(
      rng,
      { x0: w * 0.06, y0, angle: Math.atan2(joinY - y0, joinX - w * 0.06) + range(rng, -0.08, 0.08), length: w * 0.42, segments: 7, wobble: 0.16 },
      palette.mint,
      2.6,
      0.7,
    );
  }

  out += thread(
    rng,
    { x0: joinX, y0: joinY, angle: 0, length: w * 0.36, segments: 6, wobble: 0.1 },
    palette.plum,
    5,
    0.95,
  );
  out += dot(joinX, joinY, 8, palette.plum, 1);
  return out;
}

/* ---------- App icon — abstract proofreading insertion mark ---------- */
function sceneMark(size) {
  const cx = size * 0.5;
  const cy = size * 0.54;
  const s = size * 0.34;
  return `
    <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="${palette.violet}"/>
    <path d="M ${n1(cx - s * 0.62)} ${n1(cy + s * 0.34)} L ${n1(cx)} ${n1(cy - s * 0.62)} L ${n1(cx + s * 0.62)} ${n1(cy + s * 0.34)}"
      fill="none" stroke="#fdfcff" stroke-width="${n1(size * 0.055)}" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${n1(cx)}" cy="${n1(cy + s * 0.78)}" r="${n1(size * 0.045)}" fill="#fdfcff"/>
  `;
}

const scenes = [
  { name: "hero-watek", w: 1920, h: 1080, seed: 8123, render: sceneHero, dir: outDir },
  { name: "diagnoza-fokus", w: 1440, h: 1080, seed: 4271, render: sceneDiagnoza, dir: outDir },
  { name: "cykl-petla", w: 1440, h: 1080, seed: 5518, render: sceneCykl, dir: outDir },
  { name: "tarcie-splot", w: 1440, h: 1080, seed: 3392, render: sceneTarcie, dir: outDir },
  { name: "standard-siatka", w: 1440, h: 1080, seed: 6650, render: sceneStandard, dir: outDir },
  { name: "firmy-warkocz", w: 1440, h: 1080, seed: 7784, render: sceneFirmy, dir: outDir },
  { name: "app-icon-192", w: 192, h: 192, seed: 1, render: (w) => sceneMark(w), dir: iconsDir },
  { name: "app-icon-512", w: 512, h: 512, seed: 1, render: (w) => sceneMark(w), dir: iconsDir },
  { name: "icon", w: 32, h: 32, seed: 1, render: (w) => sceneMark(w), dir: appDir },
  { name: "apple-icon", w: 180, h: 180, seed: 1, render: (w) => sceneMark(w), dir: appDir },
  { name: "opengraph-image", w: 1200, h: 630, seed: 8123, render: sceneHero, dir: appDir },
];

async function main() {
  await mkdir(outDir, { recursive: true });
  await mkdir(iconsDir, { recursive: true });
  await mkdir(appDir, { recursive: true });
  const browser = await chromium.launch({ executablePath: CHROMIUM_PATH });
  try {
    const page = await browser.newPage();
    for (const scene of scenes) {
      await page.setViewportSize({ width: scene.w, height: scene.h });
      const inner = `<rect width="${scene.w}" height="${scene.h}" fill="${palette.bg}"/>` + scene.render(scene.w, scene.h, scene.seed);
      await page.setContent(svgDoc(scene.w, scene.h, inner), { waitUntil: "load" });
      const buffer = await page.screenshot({ type: "png" });
      const outPath = path.join(scene.dir, `${scene.name}.png`);
      await writeFile(outPath, buffer);
      console.log(`wrote ${outPath} (${scene.w}x${scene.h})`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
