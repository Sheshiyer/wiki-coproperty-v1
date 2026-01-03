import fs from 'node:fs/promises';
import path from 'node:path';

const SOURCE_DIR = path.resolve('../Docs');
const DEST_DIR = path.resolve('src/content/docs');

// Tagging heuristics
const TAG_RULES = {
  'marketing': ['campaign', 'ads', 'marketing', 'audience', 'persona'],
  'email': ['email', 'sequence', 'newsletter'],
  'content': ['copy', 'script', 'voice', 'tone', 'blog', 'article'],
  'strategy': ['strategy', 'positioning', 'competitor', 'intelligence', 'plan'],
  'product': ['product', 'description', 'feature', 'builder'],
  'technical': ['orchestrator', 'status', 'system', 'build']
};

async function getFiles(dir) {
  // node 22 supports recursive readdir
  // However, simple readdir returns strings by default, or Dirents with withFileTypes
  // recursive option returns all files.
  try {
     const files = await fs.readdir(dir, { recursive: true, withFileTypes: true });
     return files.filter(f => f.isFile() && !f.name.startsWith('.'));
  } catch (e) {
      console.error("Error reading directory", e);
      return [];
  }
}

function generateTags(content, filename) {
  const text = (filename + ' ' + content).toLowerCase();
  const tags = new Set();
  
  for (const [tag, keywords] of Object.entries(TAG_RULES)) {
    if (keywords.some(k => text.includes(k))) {
      tags.add(tag);
    }
  }
  return Array.from(tags);
}

function extractTitle(content) {
  const lines = content.split('\n');
  for (const line of lines) {
    if (line.startsWith('# ')) {
      return line.substring(2).trim();
    }
  }
  return null;
}

function cleanContent(content) {
  const lines = content.split('\n');
  // Remove first line if it is a title
  if (lines.length > 0 && lines[0].startsWith('# ')) {
    return lines.slice(1).join('\n').trim();
  }
  return content;
}

async function main() {
  console.log(`Scanning ${SOURCE_DIR}...`);
  try {
    const files = await getFiles(SOURCE_DIR);
    console.log(`Found ${files.length} files.`);

    // Ensure dest dir exists
    await fs.mkdir(DEST_DIR, { recursive: true });

    for (const file of files) {
        // file.parentPath is available in Node 20+
        const srcPath = path.join(file.parentPath, file.name);
        const relPath = path.relative(SOURCE_DIR, srcPath);
        const destPath = path.join(DEST_DIR, relPath);

        const content = await fs.readFile(srcPath, 'utf-8');
        const stats = await fs.stat(srcPath);
        
        let title = extractTitle(content);
        // Fallback title from filename
        const fallbackTitle = file.name
            .replace(/\.md$/, '')
            .replace(/^\d+-/, '') // remove leading numbers like 01-
            .replace(/-/g, ' '); // replace dashes with spaces
            
        if (!title) {
            title = fallbackTitle.charAt(0).toUpperCase() + fallbackTitle.slice(1);
        }

        const tags = generateTags(content, file.name);
        const newContentBody = cleanContent(content);
        
        const frontmatter = [
            '---',
            `title: "${title.replace(/"/g, '\\"')}"`,
            // Use fallback title as description if needed, or just skip
            // Starlight doesn't strictly require date/author but user asked for metadata
            // We can add them to frontmatter. Starlight schema might need extension if we want to display them specially,
            // but standard frontmatter is fine.
            `date: ${stats.birthtime.toISOString().split('T')[0]}`,
            `lastUpdated: ${stats.mtime.toISOString().split('T')[0]}`,
            `tags: [${tags.map(t => `"${t}"`).join(', ')}]`,
            '---',
            '',
            newContentBody
        ].join('\n');

        await fs.mkdir(path.dirname(destPath), { recursive: true });
        await fs.writeFile(destPath, frontmatter);
        console.log(`Processed: ${file.name} -> ${relPath}`);
    }
    console.log('Migration complete.');
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
