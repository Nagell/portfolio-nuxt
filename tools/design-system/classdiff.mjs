import fs from 'fs'; import path from 'path'
// Lists Tailwind classes that differ between the Vue components and their React ports.
const V=new URL('../../app/components/ui', import.meta.url).pathname, R=new URL('./src/ui', import.meta.url).pathname
const toks=s=>{const out=new Set();const re=/(["'`])((?:(?!\1).)*)\1/gs;let m;while((m=re.exec(s))){for(const t of m[2].split(/\s+/)) if(/^[!a-z\-\[\]:&>*@\/.0-9%_()=~"'#,+]+$/i.test(t)&&/[-:]/.test(t)&&!/^(@|\.|\/|http|aria-|data-test)/.test(t)&&t.length<80) out.add(t)};return out}
for(const d of fs.readdirSync(V)){ if(d==='tags-input')continue
  let vs='';for(const f of fs.readdirSync(path.join(V,d))) vs+=fs.readFileSync(path.join(V,d,f),'utf8')
  const rf=path.join(R,d+'.tsx'); if(!fs.existsSync(rf)){console.log(d,'NO REACT');continue}
  // strip script imports
  const v=toks(vs.replace(/^\s*import .*$/gm,'')), r=toks(fs.readFileSync(rf,'utf8').replace(/^\s*import .*$/gm,''))
  const onlyV=[...v].filter(x=>!r.has(x)), onlyR=[...r].filter(x=>!v.has(x))
  console.log(`## ${d}  vue-only(${onlyV.length}): ${onlyV.join(' ')}\n   react-only(${onlyR.length}): ${onlyR.join(' ')}`)}
