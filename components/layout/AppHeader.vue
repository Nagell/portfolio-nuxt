<template>
    <NavigationMenu class="flex justify-between items-start">
        <NavigationMenuList>
            <NavigationMenuItem>
                <NuxtLink
                    to="/"
                >
                    Logo
                </NuxtLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NuxtLink
                    to="/#about"
                    @click.prevent="scrollToAnchor('about')"
                >
                    <NavigationMenuLink
                        as="span"
                        :class="navigationMenuTriggerStyle()"
                    >
                        About
                    </NavigationMenuLink>
                </NuxtLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NuxtLink
                    to="/#experience"
                    @click.prevent="scrollToAnchor('experience')"
                >
                    <NavigationMenuLink
                        as="span"
                        :class="navigationMenuTriggerStyle()"
                    >
                        Experience
                    </NavigationMenuLink>
                </NuxtLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NuxtLink
                    to="/#projects"
                    @click.prevent="scrollToAnchor('projects')"
                >
                    <NavigationMenuLink
                        as="span"
                        :class="navigationMenuTriggerStyle()"
                    >
                        Projects
                    </NavigationMenuLink>
                </NuxtLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NuxtLink
                    to="/admin/projects"
                    :class="navigationMenuTriggerStyle()"
                >
                    Admin
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
</script>
