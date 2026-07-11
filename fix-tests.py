import os
import glob
import re

spec_files = glob.glob('src/lib/**/*.spec.ts', recursive=True)

for file in spec_files:
    with open(file, 'r') as f:
        content = f.read()
    
    # Add await to render calls
    content = re.sub(r'(const\s+{[^}]*}\s*=\s*)render\(', r'\1await render(', content)
    content = re.sub(r'(const\s+\w+\s*=\s*)render\(', r'\1await render(', content)
    
    # Make it() and describe() callbacks async if they contain await render(
    # A simple approach: just make all it(...) and describe(...) with '() => {' inside them to be 'async () => {'
    # Actually, describe should NOT be async. Only `it` and `beforeEach`, `afterEach`.
    # Let's just make all `it('...', () => {` into `it('...', async () => {`
    content = re.sub(r"it\('([^']+)',\s*\(\)\s*=>\s*{", r"it('\1', async () => {", content)
    content = re.sub(r'it\("([^"]+)",\s*\(\)\s*=>\s*{', r'it("\1", async () => {', content)
    
    with open(file, 'w') as f:
        f.write(content)
