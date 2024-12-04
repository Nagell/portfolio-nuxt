<template>
    <div :class="cn(props.class, 'flex gap-6')">
        <NuxtLink
            v-for="social in socialList"
            :key="social.link"
            :to="social.link"
            target="_blank"
        >
            <component
                :is="social.icon"
                class="w-6 h-6 text-muted-foreground hover:text-foreground transition-colors duration-300"
            />
        </NuxtLink>
    </div>
</template>

<script lang="ts" setup>
    import { GitHubIcon, LinkedInIcon, XingIcon } from 'vue3-simple-icons'

    import type { HTMLAttributes } from 'vue'

    const { $const } = useNuxtApp()

    interface Props {
        class?: HTMLAttributes['class']
    }

    const socialList = [
        { icon: LinkedInIcon, link: $const.links.LINKEDIN },
        { icon: XingIcon, link: $const.links.XING },
        { icon: GitHubIcon, link: $const.links.GITHUB },
    ]

    const props = defineProps<Props>()
</script>
