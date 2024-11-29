<template>
    <NavigationMenu class="">
        <NavigationMenuList>
            <NavigationMenuItem>
                <NuxtLink
                    to="/"
                    class="px-2 py-3 block"
                >
                    <CommonLogoWhite class="h-6" />
                </NuxtLink>
            </NavigationMenuItem>
            <NavigationMenuItem
                v-for="anchor in anchors"
                :key="anchor.name"
            >
                <NuxtLink
                    :to="anchor.link"
                    @click.prevent="anchor.onClick"
                >
                    <NavigationMenuLink
                        as="span"
                        :class="navigationMenuTriggerStyle()"
                    >
                        {{ anchor.name }}
                    </NavigationMenuLink>
                </NuxtLink>
            </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList class="hidden xs:flex">
            <NavigationMenuItem>
                <NuxtLink
                    to="/admin/projects"
                >
                    <NavigationMenuLink
                        as="span"
                        :class="[navigationMenuTriggerStyle(), 'pr-3']"
                    >
                        Login
                    </NavigationMenuLink>
                </NuxtLink>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
</template>

<script setup lang="ts">
    import { navigationMenuTriggerStyle } from '~/components/ui/navigation-menu'

    function scrollToAnchor(elementId: string) {
        document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' })
    }

    const anchors = [
        {
            name: 'About',
            link: '/#about',
            onClick: () => scrollToAnchor('about')
        },
        {
            name: 'Experience',
            link: '/#experience',
            onClick: () => scrollToAnchor('experience')
        },
        {
            name: 'Projects',
            link: '/#projects',
            onClick: () => scrollToAnchor('projects')
        }
    ]
</script>
