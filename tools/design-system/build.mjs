import * as esbuild from "esbuild"
import fs from "fs"

const CARDS = ["Avatar","Badge","Button","Calendar","Card","Carousel","Checkbox","Collapsible","Command","Dialog","DropdownMenu","Form","Input","Label","NavigationMenu","Popover","Separator","Sheet","Sidebar","Skeleton","Toaster","Table","TagsInput","Textarea","Tooltip"]

const globals = {
  name: "react-globals",
  setup(b) {
    b.onResolve({ filter: /^(react|react-dom|react-dom\/client|react\/jsx-runtime|react\/jsx-dev-runtime)$/ }, (a) => ({ path: a.path, namespace: "g" }))
    b.onLoad({ filter: /.*/, namespace: "g" }, (a) => {
      if (a.path === "react") return { contents: "module.exports = window.React", loader: "js" }
      if (a.path.startsWith("react-dom")) return { contents: "module.exports = window.ReactDOM", loader: "js" }
      return {
        loader: "js",
        contents: `const R = window.React
function jsx(type, props, key) { const p = key === undefined ? props : Object.assign({}, props, { key }); return R.createElement(type, p) }
module.exports = { jsx, jsxs: jsx, jsxDEV: jsx, Fragment: R.Fragment }`,
      }
    })
  },
}

const r = await esbuild.build({
  entryPoints: ["src/index.ts"], bundle: true, format: "iife", globalName: "DawidNitka", minify: true,
  jsx: "automatic", target: "es2019", write: false, legalComments: "none",
  define: { ["process" + ".env.NODE_ENV"]: '"production"' }, plugins: [globals],
})
let js = r.outputFiles[0].text.replace(/<\/script/gi, "<\\/script").replace(/<!--/g, "\\x3C!--")
const header = `/* @ds-bundle: ${JSON.stringify({ format: 4, namespace: "DawidNitka", components: CARDS.map((name) => ({ name })) })} */\n`
js = header + js + "\nwindow.DawidNitka = DawidNitka;\n"
fs.mkdirSync("out", { recursive: true })
fs.writeFileSync("out/bundle.js", js)
console.log("bundle.js", (js.length / 1024).toFixed(1) + " KB")
