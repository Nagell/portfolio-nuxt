<template>
    <div :class="cn(props.class, 'flex gap-6')">
        <NuxtLink
            v-for="social in socialList"
            :key="social.link"
            :to="social.link"
            target="_blank"
            :aria-label="social.aria"
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
        { icon: LinkedInIcon, link: $const.links.LINKEDIN, aria: 'LinkedIn - external link' },
        { icon: XingIcon, link: $const.links.XING, aria: 'Xing - external link' },
        { icon: GitHubIcon, link: $const.links.GITHUB, aria: 'GitHub - external link' },
    ]

    const props = defineProps<Props>()
</script>
