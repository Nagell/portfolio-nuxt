<template>
    <div :class="cn(props.class, 'flex gap-6')">
        <NuxtLink
            v-for="social in socialList"
            :key="social.link"
            :to="social.link"
            target="_blank"
            :aria-label="social.aria"
            class="text-muted-foreground hover:text-primary focus:text-primary transition-colors duration-300"
        >
            <component
                :is="social.icon"
                class="w-6 h-6"
            />
        </NuxtLink>
    </div>
</template>

<script lang="ts" setup>
    import { GitHubIcon, MediumIcon, XingIcon } from 'vue3-simple-icons'

    import LinkedInIcon from '~/components/common/icons/LinkedIn.vue'

    import type { HTMLAttributes } from 'vue'

    const { $const } = useNuxtApp()

    interface Props {
        class?: HTMLAttributes['class']
    }

    const socialList = [
        { icon: LinkedInIcon, link: $const.links.LINKEDIN, aria: 'LinkedIn - external link' },
        { icon: XingIcon, link: $const.links.XING, aria: 'Xing - external link' },
        { icon: MediumIcon, link: $const.links.MEDIUM, aria: 'Medium - external link' },
        { icon: GitHubIcon, link: $const.links.GITHUB, aria: 'GitHub - external link' },
    ]

    const props = defineProps<Props>()
</script>
