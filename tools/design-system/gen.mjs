// Writes components/<Comp>/preview.html into the system folder, plus local harness pages
// (tokens.css compiled the way the Design System page does) for screenshot checks.
import fs from "fs"
import path from "path"
import { previews } from "./previews/previews.mjs"

const SYS = process.argv[2] // the system folder: <dir>/project
const H = "harness"
fs.mkdirSync(H, { recursive: true })
const REL = path.relative(H, SYS) // harness pages load fonts and logos from the system folder

const esc = (s) => s.replace(/"/g, "&quot;")
for (const [name, p] of Object.entries(previews)) {
  const html = `<!-- @dsCard group="${p.group}" height=${p.height} subtitle="${esc(p.subtitle)}" -->
<div id="root"></div>
<script>
(function () {
  var h = React.createElement, D = window.DawidNitka
  function App() {${p.body}
  }
  ReactDOM.createRoot(document.getElementById("root")).render(h(App))
})()
</script>
`
  const dir = path.join(SYS, "components", name)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, "preview.html"), html)
  for (const theme of ["light", "dark"]) {
    const page = `<!doctype html><html data-theme="${theme}"><head><meta charset="utf-8">
<link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="../out/bundle.css">
<script src="../node_modules/react/umd/react.production.min.js"></script>
<script src="../node_modules/react-dom/umd/react-dom.production.min.js"></script>
<script src="../out/bundle.js"></script></head>
<body style="margin:0"><div style="width:720px;min-height:${p.height}px;position:relative">${html
      .replace("/_blob/ad6e81b0d495ffd4f3809694cb838ad4", `${REL}/assets/Logos/mark-ink.svg`)
      .replace("/_blob/c6d84875482963718223e75e5a8d2e63", `${REL}/assets/Logos/mark-white.svg`)}</div></body></html>`
    fs.writeFileSync(path.join(H, `${name}.${theme}.html`), page)
  }
}

// tokens.css, laid out as the page compiles it
const t = JSON.parse(fs.readFileSync(path.join(SYS, "tokens.json"), "utf8"))
const [first, ...rest] = t.color.themes.map((x) => x.id)
const val = (tok, th) => (typeof tok.value === "string" ? tok.value : tok.value[th] ?? tok.value[first])
let css = `/* Dawid Nitka Portfolio — generated from tokens.json */\n`
css += `:root, [data-theme="${first}"] {\n${t.color.tokens.map((k) => `  --${k.name}: ${val(k, first)};`).join("\n")}\n}\n`
for (const th of rest) css += `[data-theme="${th}"] {\n${t.color.tokens.map((k) => `  --${k.name}: ${val(k, th)};`).join("\n")}\n}\n`
const others = ["spacing", "radius", "layout"].flatMap((f) => t[f]?.tokens ?? [])
css += `:root {\n${others.map((k) => `  --${k.name}: ${k.value};`).join("\n")}\n${Object.entries(t.type.families).map(([k, v]) => `  --font-${k}: ${v};`).join("\n")}\n}\n`
for (const f of t.type.fonts) css += `@font-face { font-family: "${f.family}"; src: url("${REL}/${f.file}") format("woff2"); font-weight: ${f.weight}; font-style: ${f.style}; }\n`
fs.writeFileSync(path.join(H, "tokens.css"), css)
console.log("wrote", Object.keys(previews).length, "previews")
