<template>
    <Label
        :class="cn(
            error && 'text-destructive',
            props.class,
        )"
        :for="formItemId"
    >
        <slot />
    </Label>
</template>

<script lang="ts" setup>

    import { Label } from '@/components/ui/label'

    import { useFormField } from './useFormField'

    import type { LabelProps } from 'radix-vue'
    import type { HTMLAttributes } from 'vue'

    const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>()

    const { error, formItemId } = useFormField()
</script>
