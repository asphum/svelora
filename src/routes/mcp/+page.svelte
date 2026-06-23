<script lang="ts">
    import { CodeBlock, Link } from '$lib/index.js'
    import { renderHighlightedCode } from '$lib/docs/code-block.js'

    const cursorConfigCode = `{
  "mcpServers": {
    "svelora-docs": {
      "type": "stdio",
      "command": "bun",
      "args": ["run", "mcp:svelora-docs"],
      "cwd": "\${workspaceFolder}"
    }
  }
}`

    const runCode = `bun run mcp:svelora-docs`

    const toolsCode = `- svelora_docs_list_slugs
- svelora_docs_get_page_source { slug }
- svelora_docs_get_section_snippets { slug }
- svelora_docs_render_shiki { code, isDarkMode? }`

    const promptExamplesCode = `- "List docs slugs แล้วสรุปว่ามี components/hooks อะไรบ้าง"
- "ดึง section snippets ของ select-menu แล้วสรุปหัวข้อทั้งหมด"
- "render shiki ให้ snippet นี้ (dark=false) แล้วส่ง HTML กลับมา"`

    let isDarkMode = $state(true)
    let cursorConfigHtml = $state('')
    let runHtml = $state('')
    let toolsHtml = $state('')
    let promptsHtml = $state('')

    $effect(() => {
        if (typeof document === 'undefined') return

        const root = document.documentElement
        const updateMode = () => {
            isDarkMode = root.classList.contains('dark')
        }

        updateMode()

        const observer = new MutationObserver(() => {
            updateMode()
        })

        observer.observe(root, { attributes: true, attributeFilter: ['class'] })
        return () => observer.disconnect()
    })

    $effect(() => {
        const darkMode = isDarkMode
        let cancelled = false

        const tasks = [
            renderHighlightedCode(cursorConfigCode, darkMode).then((html) => {
                if (!cancelled) cursorConfigHtml = html
            }),
            renderHighlightedCode(runCode, darkMode).then((html) => {
                if (!cancelled) runHtml = html
            }),
            renderHighlightedCode(toolsCode, darkMode).then((html) => {
                if (!cancelled) toolsHtml = html
            }),
            renderHighlightedCode(promptExamplesCode, darkMode).then((html) => {
                if (!cancelled) promptsHtml = html
            })
        ]

        void Promise.all(tasks)

        return () => {
            cancelled = true
        }
    })
</script>

<div class="space-y-10">
    <section class="space-y-4 border-b border-outline-variant/60 pb-8">
        <nav class="text-sm text-on-surface-variant">
            <ol class="flex flex-wrap items-center gap-2">
                <li><Link href="/docs" raw class="hover:text-primary">Docs</Link></li>
                <li>/</li>
                <li>MCP</li>
            </ol>
        </nav>

        <div class="space-y-3">
            <p class="text-sm font-semibold tracking-[0.16em] text-primary uppercase">Automation</p>
            <h1 class="text-4xl font-semibold tracking-tight">MCP for Cursor IDE</h1>
            <p class="max-w-3xl text-lg leading-8 text-on-surface-variant">
                เชื่อมเครื่องมือช่วยงาน docs ของ Svelora เข้ากับ Cursor IDE ผ่าน MCP เพื่อให้ Agent เรียก tool ได้ตรง ๆ
                เช่น list slugs, ดึง section snippets, และ render shiki
            </p>
        </div>
    </section>

    <section class="space-y-4">
        <h2 class="text-xl font-semibold">ติดตั้งและเปิดใช้งาน</h2>
        <ol class="list-decimal space-y-2 pl-5 text-on-surface-variant">
            <li>เปิดโปรเจกต์นี้ใน Cursor</li>
            <li>ตรวจว่าไฟล์ <span class="font-medium text-on-surface">.cursor/mcp.json</span> มีอยู่ใน repo</li>
            <li>ติดตั้ง dependencies: <span class="font-medium text-on-surface">bun install</span></li>
            <li>Restart Cursor 1 ครั้ง เพื่อให้โหลด MCP servers ใหม่</li>
            <li>เข้า Agent Mode แล้วลองเรียก tools ได้ทันที</li>
        </ol>
    </section>

    <section class="space-y-4">
        <h2 class="text-xl font-semibold">ไฟล์ config สำหรับ Cursor</h2>
        <p class="text-on-surface-variant">
            โปรเจกต์นี้มี config ให้แล้วที่ <span class="font-medium text-on-surface">.cursor/mcp.json</span>
        </p>
        <CodeBlock title="mcp.json" code={cursorConfigCode} html={cursorConfigHtml} />
    </section>

    <section class="space-y-4">
        <h2 class="text-xl font-semibold">รัน server เองเพื่อทดสอบ</h2>
        <CodeBlock title="Command" code={runCode} html={runHtml} />
    </section>

    <section class="space-y-4">
        <h2 class="text-xl font-semibold">Tools ที่มีให้เรียก</h2>
        <p class="text-on-surface-variant">Tools จะปรากฏใน Cursor MCP tools เมื่อเปิดใช้งานสำเร็จ</p>
        <CodeBlock title="Tools" code={toolsCode} html={toolsHtml} />
    </section>

    <section class="space-y-4">
        <h2 class="text-xl font-semibold">ตัวอย่างการสั่งงานใน Cursor</h2>
        <CodeBlock title="Prompts" code={promptExamplesCode} html={promptsHtml} />
    </section>

    <section class="space-y-4">
        <h2 class="text-xl font-semibold">ข้อควรระวัง</h2>
        <ul class="list-disc space-y-2 pl-5 text-on-surface-variant">
            <li>config นี้ใช้ <span class="font-medium text-on-surface">bun</span> เป็น command ดังนั้นเครื่องที่ใช้ Cursor ต้องมี bun</li>
            <li>ถ้าต้องการไม่พึ่ง bun สามารถเปลี่ยน command เป็น <span class="font-medium text-on-surface">node</span> แล้วชี้ไปที่ไฟล์ server ได้</li>
            <li>อย่าใส่ secrets ลงใน <span class="font-medium text-on-surface">mcp.json</span> ตรง ๆ ให้ใช้ env vars แทน</li>
        </ul>
    </section>
</div>

