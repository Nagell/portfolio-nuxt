<template>
    <button
        v-if="props.onClick"
        :class="cn('mt-14 text-xl font-medium tracking-tight hover:text-primary focus:text-primary transition-colors duration-300 group', props.class)"
        @click="props.onClick"
    >
        <slot />
        <ArrowUpRight class="ml-1 align-bottom inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </button>
    <NuxtLink
        v-else-if="props.href"
        :href="props.href"
        class="inline-block hover:text-primary  focus:text-primary transition-colors duration-300 group"
        target="_blank"
        rel="noopener noreferrer"
    >
        <CommonTypography
            tag="h3"
            variant="h4"
            :class="cn(props.class)"
        >
            <slot />
            <ArrowUpRight class="ml-1 align-bottom inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </CommonTypography>
    </NuxtLink>
    <CommonTypography
        v-else
        tag="h3"
        variant="h4"
        :class="cn(props.class)"
    >
        <slot />
    </CommonTypography>
</template>

<script lang="ts" setup>
    import { ArrowUpRight } from 'lucide-vue-next'

    interface Props {
        onClick?: () => void
        href?: string | null
        class?: string
    }

    const props = defineProps<Props>()
</script>
