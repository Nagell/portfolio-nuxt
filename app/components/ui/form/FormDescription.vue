<template>
    <p
        :id="formDescriptionId"
        :class="cn('text-sm text-muted-foreground', props.class)"
    >
        <slot />
    </p>
</template>

<script lang="ts" setup>

    import { useFormField } from './useFormField'

    import type { HTMLAttributes } from 'vue'

    const props = defineProps<{
        class?: HTMLAttributes['class']
    }>()

    const { formDescriptionId } = useFormField()
</script>
