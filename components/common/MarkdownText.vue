<template>
    <component :is="renderMarkdown" />
</template>

<script lang="ts" setup>
    interface Props {
        content: string
    }

    const props = defineProps<Props>()

    /** Render markdown with multiple formatting options */
    const renderMarkdown = () => {
        let content = props.content

        // Process formatters in sequence (order matters for nested patterns)
        const formatters = [
            // Bold: **text** (process first to avoid conflicts with italic)
            {
                pattern: /\*\*(.*?)\*\*/g,
                replacement: (match: string, text: string) =>
                    `<strong class="text-foreground font-semibold">${text}</strong>`
            },
            // Italic: *text*
            {
                pattern: /\*(.*?)\*/g,
                replacement: (match: string, text: string) =>
                    `<em class="italic">${text}</em>`
            },
            // Underline: _text_
            {
                pattern: /_(.*?)_/g,
                replacement: (match: string, text: string) =>
                    `<u class="underline">${text}</u>`
            },
            // Code: `text`
            {
                pattern: /`(.*?)`/g,
                replacement: (match: string, text: string) =>
                    `<code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">${text}</code>`
            }
        ]

        // Apply each formatter
        for (const formatter of formatters) {
            content = content.replace(formatter.pattern, formatter.replacement)
        }

        // If content changed, return as innerHTML, otherwise return plain text
        return content === props.content ? content : h('span', { innerHTML: content })
    }
</script>
