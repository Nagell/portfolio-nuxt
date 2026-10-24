# Copies docs/<Name>.md into the design-system artifact as components/<Name>/README.md
# (drops the frontmatter, adds the title). docs/ is also what /design-sync reads.
import os, re, sys

S = sys.argv[1]
for f in sorted(os.listdir("docs")):
    name = f[:-3]
    body = re.sub(r"^---\n.*?\n---\n\n", "", open(f"docs/{f}").read(), flags=re.S)
    os.makedirs(f"{S}/components/{name}", exist_ok=True)
    open(f"{S}/components/{name}/README.md", "w").write(f"# {name}\n\n{body}")
print("ok")
