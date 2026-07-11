import os
import glob
import re

spec_files = glob.glob('src/lib/**/*.spec.ts', recursive=True)

for file in spec_files:
    with open(file, 'r') as f:
        content = f.read()
    
    # Fix backticks in it()
    content = re.sub(r'it\(`([^`]*)`,\s*\(\)\s*=>\s*{', r'it(`\1`, async () => {', content)
    
    with open(file, 'w') as f:
        f.write(content)
